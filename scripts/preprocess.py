# preprocess.py

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.arima.model import ARIMA  # Importing ARIMA model
from arch import arch_model  # Importing GARCH model
import pymc as pm  # Importing PyMC3 for Bayesian modeling

# Load and inspect dataset
def load_and_inspect_data(file_path):
    # Load the data
    df = pd.read_csv(file_path, parse_dates=['Date'], dayfirst=True)
    
    # Display basic information
    print("Data Info:")
    print(df.info())
    print("\nMissing Values:")
    print(df.isnull().sum())
    print("\nData Sample:")
    print(df.head())
    
    return df

# Preprocess the data
def preprocess_data(df):
    # Check and handle missing values (remove rows if any missing)
    df.dropna(inplace=True)
    
    # Set Date as index for time series analysis
    df.set_index('Date', inplace=True)
    
    # Sort the data by Date
    df.sort_index(inplace=True)
    
    return df

# Feature Engineering
def feature_engineering(df):
    # Calculate daily price difference
    df['Price_Diff'] = df['Price'].diff()
    
    # Calculate log returns
    df['Log_Return'] = np.log(df['Price'] / df['Price'].shift(1))
    
    # Calculate 7-day and 30-day moving averages
    df['MA_7'] = df['Price'].rolling(window=7).mean()
    df['MA_30'] = df['Price'].rolling(window=30).mean()
    
    return df

# Resample data to different temporal granularities
def resample_data(df, freq='ME'):
    # Resample data based on frequency: 'D' for daily, 'W' for weekly, 'M' for monthly
    resampled_df = df['Price'].resample(freq).mean()
    return resampled_df

# Event Annotation
def annotate_events(df, events):
    # Assume 'events' is a list of dictionaries with 'Date', 'Event', and 'Category' keys
    events_df = pd.DataFrame(events)
    events_df['Date'] = pd.to_datetime(events_df['Date'])
    events_df.set_index('Date', inplace=True)
    
    # Join events with main dataset on Date
    annotated_df = df.merge(events_df, how='left', left_index=True, right_index=True)
    
    return annotated_df

# Exploratory Data Analysis
def plot_data(df):
    # Set up the figure
    plt.figure(figsize=(14, 8))
    
    # Plot the original price data
    plt.plot(df.index, df['Price'], label='Brent Oil Price', color='blue')
    plt.plot(df.index, df['MA_7'], label='7-Day MA', linestyle='--', color='orange')
    plt.plot(df.index, df['MA_30'], label='30-Day MA', linestyle='--', color='green')
    
    # Plot significant events if present
    if 'Event' in df.columns:
        event_dates = df[df['Event'].notna()].index
        plt.scatter(event_dates, df.loc[event_dates, 'Price'], color='red', marker='o', label='Significant Events')

    # Labels and title
    plt.xlabel('Date')
    plt.ylabel('Brent Oil Price (USD)')
    plt.title('Brent Oil Price with Moving Averages and Events')
    plt.legend()
    plt.show()

# Volatility Analysis (plotting volatility)
def plot_volatility(df):
    plt.figure(figsize=(14, 8))
    plt.plot(df.index, df['Log_Return'].rolling(window=30).std(), label='30-Day Rolling Volatility', color='purple')
    plt.xlabel('Date')
    plt.ylabel('Volatility')
    plt.title('Brent Oil Price Volatility')
    plt.legend()
    plt.show()

# Model Selection and Parameterization

# Define ARIMA model for trend and seasonality
def arima_model(df, order=(1,1,1)):
    model = ARIMA(df['Price'].dropna(), order=order)
    arima_result = model.fit()
    return arima_result

# Define GARCH model for volatility clustering
def garch_model(df):
    model = arch_model(df['Log_Return'].dropna() * 100, vol='Garch', p=1, q=1)
    garch_result = model.fit(disp="off")
    return garch_result

# Example Bayesian Model with PyMC3
def bayesian_model(df):
    with pm.Model() as model:
        mu = pm.Normal('mu', mu=0, sigma=1)
        sigma = pm.HalfNormal('sigma', sigma=1)
        obs = pm.Normal('obs', mu=mu, sigma=sigma, observed=df['Log_Return'].dropna())
        trace = pm.sample(1000, tune=500, chains=2)
    return model, trace

# Fit models and output summary
def fit_and_evaluate_models(df):
    arima_result = arima_model(df)
    garch_result = garch_model(df)
    
    # Rename either the function call or the variable for clarity
    bayesian_result, bayesian_trace = bayesian_model(df)  # Using bayesian_result instead

    print("ARIMA Model Summary:\n", arima_result.summary())
    print("GARCH Model Summary:\n", garch_result.summary())
    
    # Bayesian Traceplot
    pm.traceplot(bayesian_trace)
    plt.show()

# Quantify the impact of events on prices and create a report summary
def report_insights(df):
    print("Significant Events and Their Impact:\n", df[df['Event'].notna()][['Event', 'Price']])
    print("\nRisk and Volatility Indicators:\n")
    print("Mean Price:", df['Price'].mean())
    print("Standard Deviation of Returns:", df['Log_Return'].std())
    print("Volatility (30-day Rolling):\n", df['Log_Return'].rolling(30).std().mean())
