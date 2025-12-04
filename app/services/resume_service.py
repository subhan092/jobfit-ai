from bson import ObjectId
from sentence_transformers import SentenceTransformer
from app.utils.file_utils import extract_text_from_file
from app.database.mongodb import users_col
from fastapi import HTTPException

model = SentenceTransformer("all-MiniLM-L6-v2")

def process_resume(user_id: str, file_url: str):
    try:
        # Convert string id to ObjectId
        try:
            object_id = ObjectId(user_id)
        except:
            raise HTTPException(status_code=400, detail="Invalid user_id format")

        # Extract text from resume file
        text = extract_text_from_file(file_url)
        embeddings = model.encode(text).tolist()

        # Update only resume fields
        result = users_col.update_one(
            {"_id": object_id},   
            {"$set": {
                "profile.resumeText": text,
                "profile.resumeEmbedding": embeddings,
                "profile.resume": file_url
            }},
            upsert=False
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="User not found")

        return {"text": text, "embeddings": embeddings}

    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Resume processing failed: {str(e)}")
