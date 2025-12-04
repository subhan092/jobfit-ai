from fastapi import FastAPI
from app.routes import resume_routes, job_routes, ranking_routes, report_routes
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow your frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app = FastAPI(title="FYP AI Resume Screening Backend")

# Register routes
app.include_router(resume_routes.router, prefix="/resume", tags=["Resume"])
app.include_router(job_routes.router, prefix="/job", tags=["Job Matching"])
app.include_router(ranking_routes.router, prefix="/ranking", tags=["Recruiter Ranking"])
app.include_router(report_routes.router, prefix="/report", tags=["Recruiter Report"])

@app.get("/")
def root():
    return {"message": "Backend is running 🚀"}
