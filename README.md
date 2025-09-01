# Crypto Fetcher

![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

Crypto Fetcher is a Node.js service that collects candlestick (OHLCV) data for cryptocurrencies from Binance and stores them into a PostgreSQL database.  
It can be used for **trading analysis, machine learning datasets, or backtesting strategies**.

---

## ✨ Features
- Fetch **Top 100 coins** from [CoinGecko](https://www.coingecko.com).
- Fetch **Binance USDT trading pairs** from [Binance API](https://binance-docs.github.io/apidocs/spot/en/).
- Validate symbols between CoinGecko & Binance.
- Collect **1-hour candlestick data** (OHLCV).
- Store data into PostgreSQL (`altcoin_prices_v2` table).
- Runs continuously and updates data every 2 minutes.

---

## 🛠 Tech Stack
- **Node.js** (JavaScript)
- **Axios** → HTTP requests
- **PostgreSQL** with `pg` library

---

## 🗄 Database Schema

Table `altcoin_prices_v2`:

```sql
CREATE TABLE altcoin_prices_v2 (
    symbol TEXT,
    open_time BIGINT,
    open_price NUMERIC,
    high_price NUMERIC,
    low_price NUMERIC,
    close_price NUMERIC,
    volume NUMERIC,
    close_time BIGINT,
    quote_asset_volume NUMERIC,
    number_of_trades BIGINT,
    taker_buy_base_asset_volume NUMERIC,
    taker_buy_quote_asset_volume NUMERIC,
    PRIMARY KEY (symbol, open_time)
);
```
---

### 📄 `LICENSE`

```text
MIT License

Copyright (c) 2025 revsuzuran

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights  
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell  
copies of the Software, and to permit persons to whom the Software is  
furnished to do so, subject to the following conditions:  

The above copyright notice and this permission notice shall be included in  
all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR  
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,  
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE  
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER  
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING  
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER  
DEALINGS IN THE SOFTWARE.
```

