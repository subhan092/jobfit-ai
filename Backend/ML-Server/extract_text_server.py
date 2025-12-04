from flask import Flask, request, jsonify
from io import BytesIO
import requests
from pdfminer.high_level import extract_text
from sentence_transformers import SentenceTransformer
import os
import logging
import numpy as np

# Initialize Flask app
app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Constants
MODEL_NAME = "all-MiniLM-L6-v2"
HF_CACHE_DIR = os.path.join(os.path.expanduser("~"), ".cache", "huggingface", "hub")

# Load model at startup (singleton pattern)
model = None

def load_model():
    """Load the SentenceTransformer model with caching."""
    global model
    if model is None:
        try:
            logger.info(f"Loading model: {MODEL_NAME}")
            model = SentenceTransformer(MODEL_NAME, cache_folder=HF_CACHE_DIR)
            logger.info("Model loaded successfully")
        except Exception as e:
            logger.error(f"Failed to load model: {str(e)}")
            raise
    return model

# Load model when app starts
load_model()

@app.route('/extract-resumetext', methods=['POST'])
def extract_resume_text():
    try:
        # Validate input
        data = request.get_json()
        if not data or 'fileurl' not in data:
            return jsonify({'success': False, 'error': 'Missing fileurl parameter'}), 400

        # Download PDF
        url = data['fileurl']
        logger.info(f"Downloading PDF from: {url}")
        response = requests.get(url, timeout=10)
        if response.status_code != 200:
            return jsonify({'success': False, 'error': 'Failed to download PDF'}), 400

        # Extract text
        pdf_file = BytesIO(response.content)
        text = extract_text(pdf_file).strip()
        logger.info(f"Extracted text (length: {len(text)})")

        # Generate embeddings
        embeddings = model.encode(text)  # Use the globally loaded model
        logger.info(f"Generated embeddings (dim: {len(embeddings)})")

        return jsonify({
            'success': True,
            'text': text,
            'embeddings': embeddings.tolist(),  # Convert numpy array to list
            'model': MODEL_NAME
        })

    except requests.exceptions.Timeout:
        logger.error("Request timeout when downloading PDF")
        return jsonify({'success': False, 'error': 'PDF download timeout'}), 408
    except Exception as e:
        logger.error(f"Unexpected error: {str(e)}", exc_info=True)
        return jsonify({'success': False, 'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)