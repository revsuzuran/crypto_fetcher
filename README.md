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
);```

