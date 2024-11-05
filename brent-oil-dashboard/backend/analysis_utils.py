import pandas as pd
import numpy as np

import pandas as pd

def get_event_correlation():
    """Calculate the correlation between Brent oil prices and other economic indicators."""
    # Load your dataset
    df = pd.read_csv("data/BrentOilPrices.csv")  # Ensure this contains your economic indicators

    # Drop the 'Date' column if it exists
    if 'Date' in df.columns:
        df = df.drop(columns=['Date'])

    # Calculate correlation
    correlation_matrix = df.corr()
    
    # Extract the correlations with the 'Price' column
    correlation_with_price = correlation_matrix['Price'].drop('Price')  # Remove self-correlation
    return correlation_with_price.to_dict()


def get_performance_metrics(ms_result):
    """Calculate performance metrics for the Markov Switching model."""
    # Assuming ms_result.fittedvalues contains the fitted values of the model
    actual_prices = ms_result.model.endog  # The original price data
    fitted_prices = ms_result.fittedvalues  # Fitted values from the model
    
    rmse = np.sqrt(np.mean((actual_prices - fitted_prices) ** 2))
    mae = np.mean(np.abs(actual_prices - fitted_prices))
    
    return {
        "RMSE": rmse,
        "MAE": mae,
        "Fitted Prices": fitted_prices.tolist()  # Optional: Return fitted prices for debugging
    }