

# This file creates another file which is basically a list of the news headlines
# for that company for all the companies in the following ticker list to calculate 
#sentiment scores. 


import yfinance as yf
import pandas as pd

#nasdaq_100_tickers = yf.Ticker("QQQ").constituents.keys()
#nasdaq_100_list = list(nasdaq_100_tickers)
ticker_list = [
    'AAPL', 'MSFT', 'GOOGL', 'GOOG', 'AMZN', 'NVDA', 'META', 'TSLA', 'PEP', 'AVGO',
    'COST', 'ADBE', 'CMCSA', 'CSCO', 'NFLX', 'TXN', 'AMGN', 'QCOM', 'INTC', 'AMD',
    'INTU', 'HON', 'BKNG', 'VRTX', 'GILD', 'ISRG', 'ADI', 'LRCX', 'REGN', 'ADP',
    'MU', 'ASML', 'CDNS', 'PANW', 'MELI', 'PDD', 'MAR', 'MNST', 'KDP', 'CTSH',
    'FTNT', 'ROST', 'KLAC', 'WBD', 'EXC', 'EA', 'ORLY', 'CRWD', 'WDAY', 'NXPI',
    'AZN', 'PAYX', 'SIRI', 'DXCM', 'CHTR', 'IDXX', 'TEAM', 'BIIB', 'MRNA', 'CEG',
    'VRSK', 'ZS', 'DLTR', 'AEP', 'CTAS', 'ODFL', 'ANSS', 'PCAR', 'FAST', 'CSGP',
    'CDW', 'ALGN', 'MTCH', 'CPRT', 'BKR', 'GEHC', 'LCID', 'FANG', 'TTD', 'VERI',
    'BIDU', 'ZBRA', 'SPLK', 'OKTA', 'ON', 'GFS', 'RIVN', 'META', 'NTES', 'TSLA',
    'JD', 'ZM', 'DOCU', 'DDOG', 'SNPS', 'PDD', 'MDB', 'SGEN', 'CHKP', 'XEL'
]



data = []

for ticker in ticker_list:
    stock = yf.Ticker(ticker)
    news = stock.get_news(count=10, tab='news')

    for article in news:
        title = article.get('content', {}).get('title', 'No Title Found')
        data.append({
            'Company': ticker,
            'Title': title
        })

# Create a DataFrame
df_news = pd.DataFrame(data)


print(df_news)
df_news.to_csv("company_news.csv", index=False)

