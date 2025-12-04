from fastapi import APIRouter, HTTPException
from typing import List
from app.models.schemas import RankedCandidate
from app.services.ranking_service import rank_candidates

router = APIRouter()

@router.get("/{job_id}/ranked-candidates", response_model=List[RankedCandidate])
def get_ranked_candidates(job_id: str):
    try:
        results = rank_candidates(job_id)
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))