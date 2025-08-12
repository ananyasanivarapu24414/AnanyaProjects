# This part trains the LSTM model using sequences of window size (30 days)


import yfinance as yf
import pandas as pd
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout


tickers = [
    'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA', 'PEP', 'AVGO',
    'COST', 'ADBE', 'CMCSA', 'CSCO', 'NFLX', 'TXN', 'AMGN', 'QCOM', 'INTC', 'AMD',
    'INTU', 'HON', 'BKNG', 'VRTX', 'GILD', 'ISRG', 'ADI', 'LRCX', 'REGN', 'ADP',
    'MU', 'ASML', 'CDNS', 'PANW', 'MELI', 'PDD', 'MAR', 'MNST', 'KDP', 'CTSH',
    'FTNT', 'ROST', 'KLAC', 'WBD', 'EXC', 'EA', 'ORLY', 'CRWD', 'WDAY', 'NXPI',
    'AZN', 'PAYX', 'SIRI', 'DXCM', 'CHTR', 'IDXX', 'TEAM', 'BIIB', 'MRNA', 'CEG',
    'VRSK', 'ZS', 'DLTR', 'AEP', 'CTAS', 'ODFL', 'ANSS', 'PCAR', 'FAST', 'CSGP',
    'CDW', 'ALGN', 'MTCH', 'CPRT', 'BKR', 'GEHC', 'LCID', 'FANG', 'TTD', 'VERI',
    'BIDU', 'ZBRA', 'OKTA', 'ON', 'GFS', 'RIVN', 'META', 'NTES', 'TSLA',
    'JD', 'ZM', 'DOCU', 'DDOG', 'SNPS', 'PDD', 'MDB', 'CHKP', 'XEL'
]

window_size = 30
start_date = "2018-01-01"
end_date = "2024-12-31"

df = pd.DataFrame()
for ticker in tickers:
    data = yf.download(ticker, start=start_date, end=end_date)
    df[ticker] = data["Close"]
    df[f"{ticker} pct change"] = df[ticker].pct_change()

df.dropna(inplace=True)


def create_sequences(series, window_size):
    X, y = [], []
    for i in range(len(series) - window_size):
        X.append(series[i:i+window_size])
        y.append(series[i+window_size])
    return np.array(X), np.array(y)

all_X, all_y = [], []

for ticker in tickers:
    prices = df[f"{ticker} pct change"].values
    X_ticker, y_ticker = create_sequences(prices, window_size)
    
    if len(X_ticker) > 0:
        all_X.append(X_ticker)
        all_y.append(y_ticker)

X = np.concatenate(all_X, axis=0)
y = np.concatenate(all_y, axis=0)
X = X.reshape((X.shape[0], X.shape[1], 1))


model = Sequential()
model.add(LSTM(64, return_sequences=True, input_shape=(window_size, 1)))
model.add(Dropout(0.2))
model.add(LSTM(32))
model.add(Dense(1))

model.compile(loss='mse', optimizer='adam')
model.fit(X, y, epochs=10, batch_size=16, verbose=1)





"""
This part predicts the next set of percentage change using the 
 model that we trained earlier. It also logs all the results. 
"""

import pandas as pd
import numpy as np
import yfinance as yf
import matplotlib.pyplot as plt



def get_risk_free_rate():
      treasury = yf.download("^IRX", start="2024-01-01", end="2025-08-01", progress=False)
      if not treasury.empty:
          annual_rate = treasury["Close"].iloc[-1] / 100 
          daily_rate = annual_rate / 252  
          print(f"Using risk-free rate: {annual_rate:.2%} annually ({daily_rate:.6f} daily)")
          return daily_rate


risk_free_rate_daily = get_risk_free_rate()

tickers = [
    'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA', 'PEP', 'AVGO',
    'COST', 'ADBE', 'CMCSA', 'CSCO', 'NFLX', 'TXN', 'AMGN', 'QCOM', 'INTC', 'AMD',
    'INTU', 'HON', 'BKNG', 'VRTX', 'GILD', 'ISRG', 'ADI', 'LRCX', 'REGN', 'ADP',
    'MU', 'ASML', 'CDNS', 'PANW', 'MELI', 'PDD', 'MAR', 'MNST', 'KDP', 'CTSH',
    'FTNT', 'ROST', 'KLAC', 'WBD', 'EXC', 'EA', 'ORLY', 'CRWD', 'WDAY', 'NXPI',
    'AZN', 'PAYX', 'SIRI', 'DXCM', 'CHTR', 'IDXX', 'TEAM', 'BIIB', 'MRNA', 'CEG',
    'VRSK', 'ZS', 'DLTR', 'AEP', 'CTAS', 'ODFL', 'ANSS', 'PCAR', 'FAST', 'CSGP',
    'CDW', 'ALGN', 'MTCH', 'CPRT', 'BKR', 'GEHC', 'LCID', 'FANG', 'TTD', 'VERI',
    'BIDU', 'ZBRA', 'OKTA', 'ON', 'GFS', 'RIVN', 'META', 'NTES', 'TSLA',
    'JD', 'ZM', 'DOCU', 'DDOG', 'SNPS', 'PDD', 'MDB', 'CHKP', 'XEL'
]


df_test = pd.DataFrame()

for ticker in tickers:
    data = yf.download(ticker, start="2025-01-01", end="2025-05-01")
    df_test[ticker] = data["Close"]
    df_test[f"{ticker} pct change"] = df_test[ticker].pct_change()

df_test.reset_index(inplace=True)

#print(df_test)
window_size = 30


alpha = 0.05
sentiment_scores = {'AAPL': 0.8565685153007507, 'ADBE': 0.8671663403511047, 'ADI': 0.8714855909347534, 'ADP': 0.879578709602356, 'AEP': 0.8758891820907593, 'ALGN': 0.8993104100227356, 'AMD': 0.8989866971969604, 'AMGN': 0.8451793789863586, 'AMZN': 0.8346267938613892, 'ANSS': 0.9044936895370483, 'ASML': 0.835474967956543, 'AVGO': 0.8160659074783325, 'AZN': 0.861590564250946, 'BIDU': 0.8928799629211426, 'BIIB': 0.8997279405593872, 'BKNG': 0.875617504119873, 'BKR': 0.7194335460662842, 'CDNS': 0.8441869616508484, 'CDW': 0.8525170087814331, 'CEG': 0.7950603365898132, 'CHKP': 0.8953276872634888, 'CHTR': 0.8420071601867676, 'CMCSA': 0.8570408821105957, 'COST': 0.8230902552604675, 'CPRT': 0.880419135093689, 'CRWD': 0.9029189944267273, 'CSCO': 0.8834717869758606, 'CSGP': 0.8684375882148743, 'CTAS': 0.9007748365402222, 'CTSH': 0.9084229469299316, 'Company': 0.9060114622116089, 'DDOG': 0.8680157661437988, 'DLTR': 0.8489271998405457, 'DOCU': 0.8840826153755188, 'DXCM': 0.8400995135307312, 'EA': 0.8708301782608032, 'EXC': 0.905443549156189, 'FANG': 0.8461163640022278, 'FAST': 0.8794324994087219, 'FTNT': 0.8482252955436707, 'GEHC': 0.8860928416252136, 'GFS': 0.8714815974235535, 'GILD': 0.8769150972366333, 'GOOG': 0.855096161365509, 'GOOGL': 0.8314918279647827, 'HON': 0.7630417943000793, 'IDXX': 0.8698877096176147, 'INTC': 0.8885709643363953, 'INTU': 0.8931528925895691, 'ISRG': 0.8956297636032104, 'JD': 0.8556051254272461, 'KDP': 0.8805988430976868, 'KLAC': 0.83711177110672, 'LCID': 0.8477314114570618, 'LRCX': 0.8915966749191284, 'MAR': 0.9022384881973267, 'MDB': 0.8691242933273315, 'MELI': 0.8893457651138306, 'META': 0.8226011395454407, 'MNST': 0.8664585947990417, 'MRNA': 0.9056342840194702, 'MSFT': 0.8631680607795715, 'MTCH': 0.7576017379760742, 'MU': 0.8947461843490601, 'NFLX': 0.8534752130508423, 'NTES': 0.8510954976081848, 'NVDA': 0.8296329379081726, 'NXPI': 0.7433351278305054, 'ODFL': 0.821667492389679, 'OKTA': 0.9011214375495911, 'ON': 0.8125465512275696, 'ORLY': 0.812829852104187, 'PANW': 0.8528487086296082, 'PAYX': 0.847032368183136, 'PCAR': 0.8242992162704468, 'PDD': 0.8286526799201965, 'PEP': 0.8109321594238281, 'QCOM': 0.8602533340454102, 'REGN': 0.858138918876648, 'RIVN': 0.681819498538971, 'ROST': 0.8069396018981934, 'SIRI': 0.8502987623214722, 'SNPS': 0.875931441783905, 'SPLK': 0.4807718098163605, 'TEAM': 0.8965919613838196, 'TSLA': 0.8277606964111328, 'TTD': 0.8096410632133484, 'TXN': 0.8212636113166809, 'VERI': 0.8069775700569153, 'VRSK': 0.8890593647956848, 'VRTX': 0.9083713293075562, 'WBD': 0.8743882179260254, 'WDAY': 0.8020032644271851, 'XEL': 0.8587783575057983, 'ZBRA': 0.8928402066230774, 'ZM': 0.8962620496749878, 'ZS': 0.895825207233429}



for ticker in tickers:
      prices = df_test[f"{ticker} pct change"].values
      df_test[f"{ticker} estimated price"] = np.nan
      df_test[f"{ticker} sharpe score"] = np.nan


      for x in range(window_size,  len(df_test)):
        last_window = prices[x-window_size:x].reshape((1, window_size, 1))
        volatility = prices[x-window_size:x].std()
        next_pct_change = model.predict(last_window)[0][0]
        # remembering that the adjused next pct change is what you predict the next percentage change to be .
        adjusted_next_pct_change = next_pct_change * (1 + alpha * (sentiment_scores[ticker] - 0.5))
        df_test.loc[df_test.index[x],f"{ticker}_adjusted_expected_next_pct_change"] = adjusted_next_pct_change
        df_test.loc[df_test.index[x],f"{ticker}_adjusted_expected_excess_returns"] = adjusted_next_pct_change - risk_free_rate_daily
        df_test.loc[df_test.index[x],f"{ticker}_sharpe_score"] = (adjusted_next_pct_change - risk_free_rate_daily) / volatility



# Calculating portfolio allocation based on sharpe scores:

sharpe_columns = [f"{ticker}_sharpe_score" for ticker in tickers]
df_test["total_sharpe"] = df_test[sharpe_columns].sum(axis=1)

allocation_matrix = pd.DataFrame(index=df_test.index)
for ticker in tickers:
    allocation_matrix[ticker] = df_test[f"{ticker}_sharpe_score"] / df_test["total_sharpe"]
    allocation_matrix[ticker] = allocation_matrix[ticker].fillna(0) 

df_test["portfolio_allocations"] = allocation_matrix.values.tolist()

for ticker in tickers:
    df_test[f"{ticker}_allocation"] = allocation_matrix[ticker]




#RESULTS!!!



df_results = pd.DataFrame()
df_results["date"] = df_test["Date"]

df_results["current_allocations"] = df_test["portfolio_allocations"]
df_results["previous_allocations"] = df_results["current_allocations"].shift(1)

for ticker in tickers:
    df_results[f"{ticker}_allocation"] = df_test[f"{ticker}_allocation"]
    df_results[f"{ticker}_weight"] = df_test[f"{ticker}_allocation"].shift(1)



# Generate trading signals 

for ticker in tickers:
    df_results[f"{ticker}_SIGNAL"] = (df_results[f"{ticker}_allocation"] - df_results[f"{ticker}_weight"]) > 0


"""
Calculatung the portfolio returns : 

For the dynamic portfolio allocation, the current day's returns all calculated 
based on the previous day's allocations. 
"""


# Dynamic portfolio return (weighted by previous day's allocations)

portfolio_return = 0
equal_weight_return = 0
num_tickers = len(tickers)

for ticker in tickers:
    portfolio_return += df_results[f"{ticker}_weight"] * df_test[f"{ticker} pct change"]
    equal_weight_return += df_test[f"{ticker} pct change"] / num_tickers


df_results["portfolio_return"] = portfolio_return
df_results["benchmark_equal_weighted"] = equal_weight_return




# Filtering the results to start from February 15, 2025 ( to account for lookback window)
df_results = df_results.dropna()
feb_start_date = pd.to_datetime('2025-02-16')
df_results = df_results[df_results['date'] >= feb_start_date].reset_index(drop=True)





# Calculating the performance metrics

def calculate_max_drawdown(returns):
    cumulative = (1 + returns).cumprod()
    running_max = cumulative.expanding().max()
    drawdown = (cumulative - running_max) / running_max
    return drawdown.min()

def calculate_sharpe_ratio(returns, risk_free_rate):
    
    excess_returns = returns - risk_free_rate
    if excess_returns.std() == 0:
        return 0
    sharpe_daily = excess_returns.mean() / excess_returns.std()
    return sharpe_daily * np.sqrt(252)


print("These are the performance metrics: ")


portfolio_sharpe = calculate_sharpe_ratio(df_results["portfolio_return"], risk_free_rate_daily)
portfolio_max_dd = calculate_max_drawdown(df_results["portfolio_return"])
portfolio_total_return = (1 + df_results["portfolio_return"]).prod() - 1
portfolio_volatility = df_results["portfolio_return"].std() * np.sqrt(252)


print(f"This is the dynamically allocated annualized sharpe ratio: {portfolio_sharpe}")
print(f"This is the dynamically allocated max dd: {portfolio_max_dd}")
print(f"This is the dynamically allocated total return: {portfolio_total_return}")
print(f"This is the dynamically allocated volatility: {portfolio_volatility}")


benchmark_sharpe = calculate_sharpe_ratio(df_results["benchmark_equal_weighted"], risk_free_rate_daily)
benchmark_max_dd = calculate_max_drawdown(df_results["benchmark_equal_weighted"])
benchmark_total_return = (1 + df_results["benchmark_equal_weighted"]).prod() - 1
benchmark_volatility = df_results["benchmark_equal_weighted"].std() * np.sqrt(252)

print(f"This is the equally allocated annualized sharpe ratio: {benchmark_sharpe}")
print(f"This is the equally allocated max dd: {benchmark_max_dd}")
print(f"This is the equally allocated total return: {benchmark_total_return}")
print(f"This is the equally allocated volatility: {benchmark_volatility}")


win_rate = (df_results["portfolio_return"] > df_results["benchmark_equal_weighted"]).mean()
print(f"Portfolio Win Rate: {win_rate}")



# Plotting all the results
plt.figure(figsize=(15, 10))

plt.subplot(2, 2, 1)
portfolio_cumulative = (1 + df_results["portfolio_return"]).cumprod()
benchmark_cumulative = (1 + df_results["benchmark_equal_weighted"]).cumprod()

plt.plot(df_results["date"], portfolio_cumulative, label="Dynamic Strategy", linewidth=2)
plt.plot(df_results["date"], benchmark_cumulative, label="Equal Weight Benchmark", linestyle='--', linewidth=2)
plt.title("Cumulative Returns")
plt.xlabel("Date")
plt.ylabel("Cumulative Return")
plt.legend()
plt.grid(True, alpha=0.3)


plt.subplot(2, 2, 2)
plt.plot(df_results["date"], df_results["portfolio_return"], alpha=0.7, label="Portfolio")
plt.plot(df_results["date"], df_results["benchmark_equal_weighted"], alpha=0.7, label="Benchmark")
plt.title("Daily Returns")
plt.xlabel("Date")
plt.ylabel("Daily Return")
plt.legend()
plt.grid(True, alpha=0.3)









print(df_results)
