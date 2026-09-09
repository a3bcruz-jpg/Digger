import type { Candle } from '@/domain/trading';
import type { IndicatorSnapshot, TechnicalAnalysisResult, Trend } from '@/domain/analysis';

const average = (values: number[]) => values.length ? values.reduce((a, b) => a + b, 0) / values.length : undefined;

const ema = (values: number[], period: number): number | undefined => {
  if (values.length < period) return undefined;
  const multiplier = 2 / (period + 1);
  let result = average(values.slice(0, period))!;
  for (const value of values.slice(period)) result = (value - result) * multiplier + result;
  return result;
};

const rsi = (values: number[], period = 14): number | undefined => {
  if (values.length <= period) return undefined;
  let gains = 0;
  let losses = 0;
  for (let i = 1; i <= period; i++) {
    const delta = values[i] - values[i - 1];
    if (delta >= 0) gains += delta;
    else losses -= delta;
  }
  if (losses === 0) return 100;
  return 100 - 100 / (1 + gains / losses);
};

const detectTrend = (indicators: IndicatorSnapshot): Trend => {
  if (indicators.ema20 === undefined || indicators.ema50 === undefined) return 'UNCERTAIN';
  if (indicators.ema20 > indicators.ema50 && (indicators.rsi14 ?? 50) >= 50) return 'BULLISH';
  if (indicators.ema20 < indicators.ema50 && (indicators.rsi14 ?? 50) <= 50) return 'BEARISH';
  return 'RANGING';
};

export function analyzeCandles(candles: Candle[]): TechnicalAnalysisResult {
  const closes = candles.map(c => c.close);
  const ema20 = ema(closes, 20);
  const ema50 = ema(closes, 50);
  const rsi14 = rsi(closes);
  const indicators: IndicatorSnapshot = { ema20, ema50, sma200: average(closes.slice(-200)), rsi14 };
  const trend = detectTrend(indicators);
  const evidence: string[] = [];
  const conflicts: string[] = [];

  if (ema20 !== undefined && ema50 !== undefined) evidence.push(ema20 > ema50 ? 'EMA20 is above EMA50' : 'EMA20 is below EMA50');
  if (rsi14 !== undefined) evidence.push(`RSI14 is ${rsi14.toFixed(1)}`);
  if (trend === 'RANGING') conflicts.push('Trend confirmation is insufficient');
  if (closes.length < 50) conflicts.push('Insufficient candles for full trend confirmation');

  const mean = average(closes);
  const volatility = closes.length > 1 && mean ? Math.abs((closes.at(-1)! - closes[0]) / mean) : 0;
  return {
    timeframeAnalyses: [{ timeframe: '1H', trend, indicators, candlesAnalyzed: candles.length }],
    overallTrend: trend,
    marketCondition: closes.length < 50 ? 'INSUFFICIENT_DATA' : volatility > 0.08 ? 'HIGH_VOLATILITY' : 'NORMAL',
    latestCandle: candles.at(-1) ?? null,
    dataQualityOk: candles.length >= 50,
    evidence,
    conflicts,
  };
}
