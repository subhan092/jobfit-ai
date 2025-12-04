from bson import ObjectId
from sklearn.metrics.pairwise import cosine_similarity
from sentence_transformers import SentenceTransformer
from app.database.mongodb import jobs_col, applications_col, users_col

model = SentenceTransformer("all-MiniLM-L6-v2")

def rank_candidates(job_id: str):
    job = jobs_col.find_one({"_id": ObjectId(job_id)})
    if not job:
        return []

    job_text = job.get("title", "") + " " + job.get("description", "")
    job_embedding = model.encode(job_text, convert_to_numpy=True).reshape(1, -1)

    application_ids = job.get("applications", [])
    applications = list(applications_col.find({"_id": {"$in": application_ids}}))
    ranked_results = []

    for app in applications:
        user = users_col.find_one({"_id": app["applicant"]})
        if user:
            resume_text = user.get("profile", {}).get("resumeText")
            resume_link = user.get("profile", {}).get("resume")
            if resume_text:
                cand_embedding = model.encode(resume_text, convert_to_numpy=True).reshape(1, -1)
                score = cosine_similarity(job_embedding, cand_embedding)[0][0] * 100
                score = round(float(score), 2)
                ranked_results.append({
                    "application": {
                        "applicationId": str(app["_id"]),   # ObjectId ko string banaya
                        "status": app.get("status")         # status bhi add kiya
                        },
                    "candidate": {
                        "name": user.get("name"),
                        "email": user.get("email"),
                        "phone": user.get("phone"),
                        },
                    "score": float(score),
                    "resumeLink": resume_link
                })

    return sorted(ranked_results, key=lambda x: x["score"], reverse=True)
