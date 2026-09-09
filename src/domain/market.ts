import type { Asset, Candle, DataFreshness, Timeframe } from './trading';

export type { Asset, Candle, Timeframe } from './trading';
export type DataQuality = DataFreshness;

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
