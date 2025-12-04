from fastapi import APIRouter, HTTPException
from app.models.schemas import ResumeUploadRequest, ResumeResponse
from app.services.resume_service import process_resume

router = APIRouter(prefix="/resume", tags=["Resume"])

@router.post("/upload", response_model=ResumeResponse)
def upload_resume(request: ResumeUploadRequest):
    """
    Upload a resume (PDF/DOCX via URL), extract text & embeddings,
    and store in MongoDB.
    """
    try:
        result = process_resume(request.user_id, request.file_url)
        return ResumeResponse(text=result["text"], embeddings=result["embeddings"])
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
