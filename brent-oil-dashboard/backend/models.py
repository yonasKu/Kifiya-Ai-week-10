# backend/models.py

import pickle
import numpy as np
import pandas as pd

# Path to your saved model
MODEL_PATH = "saved_models/markov_switching_model.pkl"

def load_model():
    """Load the Markov Switching model from disk."""
    with open(MODEL_PATH, "rb") as f:
        model = pickle.load(f)
    return model

def forecast_markov_switching(ms_result, steps=5):
    """Forecast future values using the Markov Switching model."""
    forecast_values = []
    last_price = ms_result.fittedvalues.iloc[-1]
    current_regime = np.argmax(ms_result.smoothed_marginal_probabilities.iloc[-1])

    for _ in range(steps):
        if current_regime == 0:
            last_price = ms_result.params['const[0]'] + np.sqrt(ms_result.params['sigma2[0]']) * np.random.randn()
        else:
            last_price = ms_result.params['const[1]'] + np.sqrt(ms_result.params['sigma2[1]']) * np.random.randn()

        forecast_values.append(last_price)
        current_regime = np.random.choice(
            [0, 1],
            p=[ms_result.params['p[0->0]'], 1 - ms_result.params['p[0->0]']]
        )

    return np.array(forecast_values)
