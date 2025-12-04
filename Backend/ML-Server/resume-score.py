from flask import Flask, request, jsonify
from sentence_transformers import SentenceTransformer
import numpy as np
import os

app = Flask(__name__)

# 🔹 Model name
MODEL_NAME = "all-MiniLM-L6-v2"

# 🔹 Hugging Face default cache directory
HF_CACHE_DIR = os.path.join(os.path.expanduser("~"), ".cache", "huggingface", "hub")

# Function to load model (cache -> online)
def load_model():
    try:
        print("🔍 Checking local cache...")
        model = SentenceTransformer(MODEL_NAME)  # Auto uses cache if available
        print(" Model loaded successfully (from cache or online).")
        return model
    except Exception as e:
        print(" Error loading model:", e)
        raise

# Load model at app start
model = load_model()

@app.route('/similarity', methods=['POST'])
def similarity():
    try:
        data = request.json
        job_desc = data.get('job_description', '')
        resume_text = data.get('resume_text', '')

        if not job_desc or not resume_text:
            return jsonify({"error": "Both job_description and resume_text are required"}), 400

        # Encode texts into embeddings
        embeddings = model.encode([job_desc, resume_text])

        # Calculate cosine similarity
        similarity_score = np.dot(embeddings[0], embeddings[1]) / (
            np.linalg.norm(embeddings[0]) * np.linalg.norm(embeddings[1])
        )

        return jsonify({"score": float(similarity_score)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
