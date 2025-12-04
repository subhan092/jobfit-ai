from pydantic import BaseModel
from typing import List, Optional

class ResumeUploadRequest(BaseModel):
    user_id: str
    file_url: str   

class ResumeResponse(BaseModel):
    text: str
    embeddings: List[float]

class JobCompareRequest(BaseModel):
    job_description: str
    file_url: str
    
class SimilarityResponse(BaseModel):
    score: float

class CandidateOut(BaseModel):
    name: Optional[str]
    email: Optional[str]
    phone: Optional[int]

class ApplicationOut(BaseModel):
    applicationId: str
    status: Optional[str]

class RankedCandidate(BaseModel):
    application: ApplicationOut
    candidate: CandidateOut
    score: float
    resumeLink: Optional[str]


class ComparisonReportResponse(BaseModel):
    score: float
    feedback: str

