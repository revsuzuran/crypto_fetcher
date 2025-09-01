
const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'aqil',
  host: 'localhost',
  database: 'crypto_future',
  password: 'secret2025',
  port: 5432,
});

const getTop100CoinGeckoSymbols = async () => {
  try {
    const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false,
      },
    });
    return response.data.map(coin => coin.symbol.toUpperCase());
  } catch (error) {
    console.error('Error fetching top 100 coins from CoinGecko:', error);
    return [];
  }
};

const getBinanceSymbols = async () => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/exchangeInfo');
    // We are interested in symbols that are traded against USDT
    return response.data.symbols
      .filter(s => s.quoteAsset === 'USDT')
      .map(s => s.baseAsset);
  } catch (error) {
    console.error('Error fetching Binance symbols:', error);
    return [];
  }
};

const getValidatedCoins = async () => {
  console.log("Getting validated coins...");
  const top100 = await getTop100CoinGeckoSymbols();
  const binanceSymbols = await getBinanceSymbols();
  //const validated = top100.filter(symbol => binanceSymbols.includes(symbol));
  //console.log("Validated coins:", validated);
  console.log("all binance coin ", binanceSymbols)
  return binanceSymbols;
};


const getCandlestickData = async (symbol) => {
  try {
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol: `${symbol}USDT`,
        interval: '1h',
        limit: 1,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching candlestick data for ${symbol}:`, error);
    return [];
  }
};

const storeCandlestickData = async (symbol, kline) => {
  const client = await pool.connect();
  try {
    const query = `
      INSERT INTO altcoin_prices_v2 (
        symbol, open_time, open_price, high_price, low_price, close_price, volume,
        close_time, quote_asset_volume, number_of_trades, taker_buy_base_asset_volume,
        taker_buy_quote_asset_volume
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      --ON CONFLICT (symbol, open_time) DO NOTHING;
    `;
    const values = [
      symbol,
      kline[0],
      kline[1],
      kline[2],
      kline[3],
      kline[4],
      kline[5],
      kline[6],
      kline[7],
      kline[8],
      kline[9],
      kline[10],
    ];
    await client.query(query, values);
    console.log(`Stored data for ${symbol}`);
  } catch (error) {
    console.error(`Error storing data for ${symbol}:`, error);
  } finally {
    client.release();
  }
};

const fetchAndStoreData = async (validatedCoins) => {
  console.log('Fetching and storing data...');
  for (const symbol of validatedCoins) {
    const klines = await getCandlestickData(symbol);
    if (klines.length > 0) {
      await storeCandlestickData(symbol, klines[0]);
    }
  }
  console.log('Data fetching and storing complete.');
};

const main = async () => {
  const validatedCoins = await getValidatedCoins();

  // Initial fetch
  fetchAndStoreData(validatedCoins);

  // Fetch data every hour
  setInterval(() => fetchAndStoreData(validatedCoins), 2 * 60 * 1000);
}

main();
