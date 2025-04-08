from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import joblib
import json

app = Flask(__name__)
CORS(app)

# Load best model (Random Forest)
try:
    rf_model = joblib.load('./models/random_forest_model.pkl')
except Exception as e:
    rf_model = None
    print(f"Error loading Random Forest model: {e}")

# Load model metrics
try:
    with open('./models/model_metrics.json', 'r') as f:
        all_metrics = json.load(f)
        rf_metrics = next((m for m in all_metrics['models'] if m['name'] == "Random Forest"), {})
except Exception as e:
    rf_metrics = {}
    print(f"Error loading metrics: {e}")

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        input_df = pd.DataFrame(data, index=[0])
        
        # Get prediction and probabilities
        predicted_class = int(rf_model.predict(input_df)[0])
        proba = rf_model.predict_proba(input_df)[0]  # [prob_0, prob_1]
        
        response = {
            "prediction": {
                "predicted_class": predicted_class,
                "probabilities": {
                    "0": round(proba[0], 4),
                    "1": round(proba[1], 4)
                }
            },
            "metrics": rf_metrics
        }
        return jsonify(response)

    except Exception as e:
        return jsonify({"error": str(e)}), 400

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'ok', 'model': 'Random Forest'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
