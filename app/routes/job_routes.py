from fastapi import APIRouter, HTTPException
# Assuming these models are correctly defined elsewhere in your project (e.g., app.models.schemas)
from app.models.schemas import JobCompareRequest, ComparisonReportResponse 
# Import the functions from your updated service file
from app.services.job_service import compare_with_user_resume, compare_with_resume_file

router = APIRouter(prefix="/job", tags=["Job Matching"])

@router.get("/check_score", response_model=ComparisonReportResponse)
def check_score(user_id: str, job_description: str):
    """
    Compares a job description with a user's resume stored in the database 
    and returns the SBERT contextual score and a simple fit status.
    """
    try:
        # Calls the updated service which uses local SBERT and returns score + fit status
        result = compare_with_user_resume(user_id, job_description)

    
        # print(user_id, job_description, result)  # Debugging line
        
        # The service returns a dict; we map it to the expected response model
        return {"score": result["score"], "feedback": result["feedback"]}
        
    except ValueError as e:
        # Handles errors like "User not found" or "No resume stored"
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        # Catches unexpected server errors
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")


@router.post("/compare_file", response_model=ComparisonReportResponse)
def compare_file(req: JobCompareRequest):
    """
    Compares a job description with an uploaded resume file (via URL) 
    and returns the SBERT contextual score and a simple fit status.
    """
    try:
        # Calls the updated service which uses local SBERT and returns score + fit status
        result = compare_with_resume_file(req.job_description, req.file_url)
        
        # The service returns a dict; we map it to the expected response model
        return {"score": result["score"], "feedback": result["feedback"]}
        
    except ValueError as e:
        # Handles errors like "Could not extract text from file"
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        # Catches unexpected server errors
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {e}")