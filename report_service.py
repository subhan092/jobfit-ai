from io import BytesIO
from datetime import datetime
from bson import ObjectId
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import cm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
)

import cloudinary
import cloudinary.uploader
import pytz   # 👈 Added for timezone

from app.database.mongodb import jobs_col, companies_col
from app.services.ranking_service import rank_candidates


# ---------------- Cloudinary Config ----------------
cloudinary.config(
    cloud_name="dosdhmelz",
    api_key="915334447387245",
    api_secret="P6IPvlXIR6KBktAHmRuhNSKdnec",
    secure=True
)


def _safe(x, default=""):
    return x if x is not None else default


def _fmt_pct(x: float) -> str:
    try:
        return f"{x:.1f}%"
    except Exception:
        return "-"


def _avg(nums):
    nums = [n for n in nums if isinstance(n, (int, float))]
    return round(sum(nums) / len(nums), 4) if nums else 0.0


def generate_recruiter_report_pdf(job_id: str) -> dict:
    """
    Generate a recruiter-facing PDF report for a given job.
    Uploads PDF to Cloudinary and returns a public URL.
    """
    try:
        job = jobs_col.find_one({"_id": ObjectId(job_id)})
    except Exception:
        raise ValueError("Invalid job_id format")

    if not job:
        raise ValueError("Job not found")

    # --- Job details
    title = _safe(job.get("title"), "Untitled Job")
    desc = _safe(job.get("description"), "")
    reqs = job.get("requirments") or job.get("requirements") or []
    loc = _safe(job.get("location"), "")
    company_id = job.get("company")

    company_name = ""
    if company_id:
        try:
            comp = companies_col.find_one({"_id": ObjectId(company_id)})
            if comp:
                company_name = _safe(comp.get("name"), "")
        except Exception:
            pass

    # --- Ranked candidates (Top 10 only)
    ranked = rank_candidates(job_id)
    top_candidates = ranked[:10]

    scores = [r["score"] for r in ranked]
    total = len(ranked)
    avg_score = _avg(scores)
    top = ranked[0] if ranked else None

    # --- PDF build
    buf = BytesIO()
    doc = SimpleDocTemplate(
        buf,
        pagesize=A4,
        leftMargin=2 * cm, rightMargin=2 * cm,
        topMargin=1.5 * cm, bottomMargin=1.5 * cm
    )

    styles = getSampleStyleSheet()
    H1 = styles["Heading1"]
    H2 = styles["Heading2"]
    Body = styles["BodyText"]
    Small = ParagraphStyle(
        "Small", parent=Body, fontSize=9, leading=12, textColor=colors.grey
    )
    LinkStyle = ParagraphStyle(
        "LinkStyle", parent=Body, fontSize=8, leading=10, wordWrap="CJK"
    )

    story = []

    # --- Time in Pakistan Standard Time (PKT)
    pkt = pytz.timezone("Asia/Karachi")
    pkt_now = datetime.now(pkt)

    # --- Header
    story.append(Paragraph("JobFit AI – Recruiter Report", H1))
    story.append(Paragraph(pkt_now.strftime("Generated on %Y-%m-%d %I:%M %p PKT"), Small))
    story.append(Spacer(1, 12))

    # --- Job details
    story.append(Paragraph("Job Details", H2))
    job_lines = [
        f"<b>Title:</b> {title}",
        f"<b>Company:</b> {company_name or '—'}",
        f"<b>Location:</b> {loc or '—'}"
    ]
    story.append(Paragraph("<br/>".join(job_lines), Body))
    story.append(Spacer(1, 8))

    if reqs:
        req_html = "<br/>".join([f"• {r}" for r in reqs])
        story.append(Paragraph("<b>Requirements:</b><br/>" + req_html, Body))
        story.append(Spacer(1, 8))

    if desc:
        story.append(Paragraph("<b>Job Description:</b>", Body))
        story.append(Paragraph(desc, Body))
        story.append(Spacer(1, 12))

    # --- Top Candidates Table
    story.append(Paragraph("Top 10 Candidates", H2))
    table_data = [["Rank", "Candidate", "Score", "Resume Link"]]

    if not top_candidates:
        table_data.append(["-", "No candidates found", "-", "-"])
    else:
        for idx, r in enumerate(top_candidates, start=1):
    # --- Candidate name handling
            cand = r.get("candidate") or {}
            if isinstance(cand, dict):
                candidate_name = cand.get("name", "Unknown")
            else:
                candidate_name = str(cand)
            score = _fmt_pct(r.get("score"))
            raw_link = _safe(r.get("resumeLink"), "")
            if raw_link:
                resume_link = Paragraph(f'<a href="{raw_link}">{candidate_name} Resume</a>', LinkStyle)
            else:
                resume_link = Paragraph("-", LinkStyle)
            table_data.append([
                str(idx),
                candidate_name,
                score,
                resume_link
            ])

    table = Table(table_data, colWidths=[1.5*cm, 5*cm, 2.5*cm, 7.5*cm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#e6e6e6")),
        ("ALIGN", (0, 0), (0, -1), "CENTER"),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("GRID", (0, 0), (-1, -1), 0.25, colors.grey),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
    ]))
    story.append(table)
    story.append(Spacer(1, 12))

    # --- Summary
    story.append(Paragraph("Summary", H2))
    summary_lines = [
        f"<b>Total Applicants:</b> {total}",
        f"<b>Average Score (All):</b> {_fmt_pct(avg_score)}",
        f"<b>Top Candidate:</b> {top.get('candidate','Unknown')} ({_fmt_pct(top['score'])})" if top else "No candidates"
    ]
    story.append(Paragraph("<br/>".join(summary_lines), Body))
    story.append(Spacer(1, 18))
    story.append(Paragraph("Generated by JobFit AI", Small))

    doc.build(story)
    pdf_bytes = buf.getvalue()
    buf.close()

    # --- Upload to Cloudinary (force public, no 401)
    upload_result = cloudinary.uploader.upload_large(
        BytesIO(pdf_bytes),
        resource_type="raw",          # 👈 treat as file (PDF)
        folder="reports",
        public_id=f"Recruiter_Report_{job_id}",
        format="pdf",                 # 👈 ensure .pdf extension
        overwrite=True,
        type="upload"   
    )

    report_url = upload_result.get("secure_url")

    return {
        "url": report_url,
        "report_generated_at": pkt_now  # 👈 PKT datetime
    }
