import type { Asset, MarketDataProvider, Timeframe } from '@/domain/market';
import { analyzeCandles } from '@/services/analysis/technical';

const timeframes: Timeframe[] = ['5m', '15m', '1h', '4h', '1d'];

export async function analyzeMultipleTimeframes(provider: MarketDataProvider, asset: Asset) {
  const results = await Promise.all(timeframes.map(async timeframe => {
    const snapshot = await provider.getSnapshot(asset, timeframe);
    return {
      timeframe,
      snapshot,
      analysis: analyzeCandles(snapshot.candles),
    };
  }));

  const bullish = results.filter(result => result.analysis.overallTrend === 'BULLISH').length;
  const bearish = results.filter(result => result.analysis.overallTrend === 'BEARISH').length;
  const uncertain = results.filter(result => !result.analysis.dataQualityOk).length;

  return {
    results,
    consensus: uncertain > 0 ? 'UNVERIFIED' : bullish > bearish && bullish >= 3 ? 'BULLISH' : bearish > bullish && bearish >= 3 ? 'BEARISH' : 'MIXED',
  } as const;
}
