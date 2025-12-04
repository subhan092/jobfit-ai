import json
from bson import ObjectId
from app.database.mongodb import users_col
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
from app.utils.file_utils import extract_text_from_file

# ---------------------------------------------------------
# 🔹 Configure Local SBERT Model (No API Key Required)
# ---------------------------------------------------------
MODEL_NAME = "all-MiniLM-L6-v2"
# Load embedding model once globally for UNLIMITED, LOCAL use.
embedding_model = SentenceTransformer(MODEL_NAME)

# Define threshold for "Good Fit"
# NOTE: This threshold (e.g., 0.65) is crucial and should be calibrated based on your data.
GOOD_FIT_THRESHOLD = 0.7 

# ---------------------------------------------------------
# 1️⃣ Helper: Calculate contextual cosine similarity (Local SBERT)
# ---------------------------------------------------------
def _calculate_similarity(text1: str, text2: str) -> float:
    """Compute cosine similarity between two text embeddings using local SBERT and return percentage."""
    embeddings = embedding_model.encode([text1, text2])
    score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]

    # Convert to percentage (0–100) and round to 2 decimal places
    score = round(float(score) * 100, 2)

    return score


# ---------------------------------------------------------
# 2️⃣ Core comparison logic (Updated with Fit Logic)
# ---------------------------------------------------------
def compare_resume_job(job_desc: str, resume_text: str):
    """
    Compare resume text and job description using SBERT embeddings.
    Returns the score and a simple fit status.
    """
    # 1. Calculate the contextual similarity score
    score = _calculate_similarity(job_desc, resume_text)
    
    # 2. Determine the Fit Status
    if score >= GOOD_FIT_THRESHOLD:
        fit_status = "GOOD_FIT"
        detail_message = "The resume shows strong semantic alignment with the job description."
    elif score >= 0.50:
        fit_status = "MODERATE_FIT"
        detail_message = "The resume shows moderate semantic alignment; some tailoring is recommended."
    else:
        fit_status = "BAD_FIT"
        detail_message = "The resume lacks semantic alignment with the job description."

    # 3. Create the minimal JSON response for the 'feedback' key
    feedback_message = {
        "fit_status": fit_status,
        "detail": detail_message
    }
    # Return a JSON string for the 'feedback' key to match the expected schema
    feedback_json_str = json.dumps(feedback_message, indent=2)

    return {
        "jobDescription": job_desc,
        "resumeText": resume_text[:1000] + "...", 
        "score": round(score, 3),
        "feedback": feedback_json_str,
    }


# ---------------------------------------------------------
# 3️⃣ Compare with user resume stored in MongoDB (Unchanged Logic)
# ---------------------------------------------------------
def compare_with_user_resume(user_id: str, job_desc: str):
    """Compare job description with a user’s resume stored in MongoDB."""
    try:
        user = users_col.find_one({"_id": ObjectId(user_id)})
    except Exception:
        raise ValueError("Invalid user_id format")

    if not user:
        raise ValueError("User not found")

    resume_text = user.get("profile", {}).get("resumeText")
    if not resume_text:
        raise ValueError("No resume stored for this user")

    # Calls the updated compare_resume_job
    return compare_resume_job(job_desc, resume_text)


# ---------------------------------------------------------
# 4️⃣ Compare with uploaded resume file (PDF/DOCX) (Unchanged Logic)
# ---------------------------------------------------------
def compare_with_resume_file(job_desc: str, file_url: str):
    """Compare job description with uploaded resume file."""
    resume_text = extract_text_from_file(file_url)
    if not resume_text:
        raise ValueError("Could not extract text from resume file")

    # Calls the updated compare_resume_job
    return compare_resume_job(job_desc, resume_text)