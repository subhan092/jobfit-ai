from io import BytesIO
import requests
from pdfminer.high_level import extract_text
import docx

def extract_text_from_pdf(url: str) -> str:
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    pdf_file = BytesIO(response.content)
    return extract_text(pdf_file).strip()

def extract_text_from_docx(url: str) -> str:
    response = requests.get(url, timeout=10)
    response.raise_for_status()
    file_stream = BytesIO(response.content)
    doc = docx.Document(file_stream)
    text = "\n".join([para.text for para in doc.paragraphs])
    return text.strip()

def extract_text_from_file(url: str) -> str:
    if url.lower().endswith(".pdf"):
        return extract_text_from_pdf(url)
    elif url.lower().endswith(".docx"):
        return extract_text_from_docx(url)
    else:
        raise ValueError("Unsupported file format. Only PDF and DOCX allowed.")
