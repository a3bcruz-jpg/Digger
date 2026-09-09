import type { SignalType } from '@/domain/trading';
import type { TechnicalAnalysisResult } from '@/domain/analysis';

export interface SignalDecision {
  signal: SignalType;
  score: number;
  reasons: string[];
  invalidation: string;
}

export function decideSignal(analysis: TechnicalAnalysisResult): SignalDecision {
  if (!analysis.dataQualityOk || analysis.marketCondition === 'INSUFFICIENT_DATA') {
    return { signal: 'WAIT', score: 0, reasons: ['Market data is insufficient for a reliable decision'], invalidation: 'Signal remains WAIT until sufficient valid data is available.' };
  }

  let score = 50;
  if (analysis.overallTrend === 'BULLISH') score += 25;
  if (analysis.overallTrend === 'BEARISH') score += 25;
  if (analysis.conflicts.length) score -= Math.min(20, analysis.conflicts.length * 10);
  if (analysis.marketCondition === 'HIGH_VOLATILITY') score -= 10;

  const reasons = [...analysis.evidence, ...analysis.conflicts.map(c => `Caution: ${c}`)];
  if (analysis.overallTrend === 'BULLISH' && score >= 80) return { signal: 'STRONG_BUY', score, reasons, invalidation: 'Bullish trend confirmation is no longer valid.' };
  if (analysis.overallTrend === 'BULLISH' && score >= 65) return { signal: 'BUY', score, reasons, invalidation: 'Bullish confirmation weakens or market data becomes invalid.' };
  if (analysis.overallTrend === 'BEARISH' && score >= 80) return { signal: 'STRONG_SELL', score, reasons, invalidation: 'Bearish trend confirmation is no longer valid.' };
  if (analysis.overallTrend === 'BEARISH' && score >= 65) return { signal: 'SELL', score, reasons, invalidation: 'Bearish confirmation weakens or market data becomes invalid.' };
  return { signal: 'WAIT', score, reasons: [...reasons, 'Confluence is not strong enough for a directional signal'], invalidation: 'WAIT until multiple confirmations align.' };
}
