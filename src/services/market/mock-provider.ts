import type { Asset, Candle, MarketDataProvider, MarketSnapshot, Timeframe } from '@/domain/market';

/**
 * Deterministic development provider. It is deliberately not labeled as live data.
 * Replace this adapter with a real provider before enabling live signals.
 */
export class DevelopmentMarketDataProvider implements MarketDataProvider {
  async getCandles(asset: Asset, timeframe: Timeframe, limit: number): Promise<Candle[]> {
    const now = Date.now();
    const step = timeframe === '5M' ? 5 * 60_000 : timeframe === '15M' ? 15 * 60_000 : timeframe === '1H' ? 60 * 60_000 : timeframe === '4H' ? 4 * 60 * 60_000 : timeframe === '1D' ? 24 * 60 * 60_000 : 60_000;
    const seed = [...asset.symbol].reduce((sum, char) => sum + char.charCodeAt(0), 0);
    const base = asset.marketType === 'CRYPTO' ? (asset.symbol.startsWith('BTC') ? 100_000 : 5_000) : 1.15;

    return Array.from({ length: Math.max(1, limit) }, (_, index) => {
      const wave = Math.sin((index + seed) / 7) * base * 0.004;
      const close = base + wave;
      return {
        symbol: asset.symbol,
        timeframe,
        timestamp: new Date(now - (limit - index) * step).toISOString(),
        open: close * 0.998,
        high: close * 1.003,
        low: close * 0.997,
        close,
        volume: 1000 + ((seed + index * 17) % 5000),
      };
    });
  }

  async getSnapshot(asset: Asset, timeframe: Timeframe): Promise<MarketSnapshot> {
    const candles = await this.getCandles(asset, timeframe, 100);
    return {
      asset,
      timeframe,
      price: candles.at(-1)?.close ?? 0,
      candles,
      dataQuality: 'DELAYED',
      observedAt: new Date().toISOString(),
    };
  }
}
