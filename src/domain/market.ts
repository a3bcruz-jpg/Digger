export type MarketType = 'CRYPTO' | 'FOREX';
export type Timeframe = '5m' | '15m' | '1h' | '4h' | '1d';

export interface Asset {
  id: string;
  symbol: string;
  name: string;
  marketType: MarketType;
  baseCurrency: string;
  quoteCurrency: string;
  active: boolean;
}

export interface Candle {
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export type DataQuality = 'LIVE' | 'RECENT' | 'DELAYED' | 'STALE' | 'UNAVAILABLE';

export interface MarketSnapshot {
  asset: Asset;
  timeframe: Timeframe;
  price: number;
  phpEquivalent?: number;
  candles: Candle[];
  dataQuality: DataQuality;
  observedAt: string;
}

export interface MarketDataProvider {
  getSnapshot(asset: Asset, timeframe: Timeframe): Promise<MarketSnapshot>;
  getCandles(asset: Asset, timeframe: Timeframe, limit: number): Promise<Candle[]>;
}
