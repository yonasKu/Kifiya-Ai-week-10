# backend/app.py

from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from models import load_model, forecast_markov_switching

app = Flask(__name__)
CORS(app)

# Load the Markov Switching model when the server starts
ms_result = load_model()

@app.route('/api/forecast', methods=['POST'])
def forecast():
    """API to forecast future Brent oil prices."""
    data = request.get_json()
    
    # Check for 'steps' in the request body
    if 'steps' not in data:
        return jsonify({"error": "Number of steps is required."}), 400
    
    steps = data['steps']
    
    # Generate forecast using the model
    forecast_values = forecast_markov_switching(ms_result, steps)
    
    # Return forecast as JSON response
    return jsonify({"forecast": forecast_values.tolist()})

@app.route('/api/prices', methods=['GET'])
def get_prices():
    """API to get historical Brent oil prices."""
    # Load historical data (replace with the actual path)
    df = pd.read_csv("data/BrentOilPrices.csv")  # Adjust this line
    return jsonify(df.to_dict(orient='records'))

if __name__ == '__main__':
    app.run(debug=True)
