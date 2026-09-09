import type { SignalType } from '@/domain/trading';
import type { Asset, Timeframe } from '@/domain/market';
import type { TechnicalAnalysisResult } from '@/domain/analysis';

export interface TradingSignal {
  id: string;
  asset: Asset;
  timeframe: Timeframe;
  signal: SignalType;
  currentPrice: number;
  phpEquivalent?: number;
  entry?: number;
  stopLoss?: number;
  takeProfit?: number;
  riskReward?: number;
  signalQuality: number;
  technicalConfidence: number;
  marketTrend: TechnicalAnalysisResult['overallTrend'];
  marketCondition: TechnicalAnalysisResult['marketCondition'];
  reasoning: string[];
  invalidationCondition: string;
  generatedAt: string;
  expiresAt: string;
}

export function buildSignal(params: {
  asset: Asset;
  timeframe: Timeframe;
  price: number;
  analysis: TechnicalAnalysisResult;
  decision: { signal: SignalType; score: number; reasons: string[]; invalidation: string };
}): TradingSignal {
  const { asset, timeframe, price, analysis, decision } = params;
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    asset,
    timeframe,
    signal: decision.signal,
    currentPrice: price,
    signalQuality: Math.max(0, Math.min(100, decision.score)),
    technicalConfidence: Math.max(0, Math.min(100, decision.score)),
    marketTrend: analysis.overallTrend,
    marketCondition: analysis.marketCondition,
    reasoning: decision.reasons,
    invalidationCondition: decision.invalidation,
    generatedAt: new Date(now).toISOString(),
    expiresAt: new Date(now + 60 * 60 * 1000).toISOString(),
  };
}
