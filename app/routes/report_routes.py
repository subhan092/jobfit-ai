from fastapi import APIRouter, HTTPException
from app.services.report_service import generate_recruiter_report_pdf

router = APIRouter(prefix="/report", tags=["Report"])


@router.get("/job/{job_id}")
def generate_and_store_report(job_id: str):
    """
    Recruiter generates a job-specific PDF report:
    - PDF is uploaded to Cloudinary
    - Returns JSON with link
    """
    try:
        result = generate_recruiter_report_pdf(job_id)
        return {
            "message": "Report generated & uploaded",
            "url": result["url"],
            "generated_at": result["report_generated_at"]
        }
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Report generation failed: {str(e)}")
