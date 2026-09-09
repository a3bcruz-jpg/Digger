import type { Candle, Timeframe } from './trading';

export interface IndicatorSnapshot {
  rsi14?: number;
  macd?: number;
  macdSignal?: number;
  ema20?: number;
  ema50?: number;
  sma200?: number;
  bollingerUpper?: number;
  bollingerMiddle?: number;
  bollingerLower?: number;
  atr14?: number;
}

export type Trend = 'BULLISH' | 'BEARISH' | 'RANGING' | 'UNCERTAIN';
export type MarketCondition = 'NORMAL' | 'HIGH_VOLATILITY' | 'LOW_VOLATILITY' | 'INSUFFICIENT_DATA';

export interface TimeframeAnalysis {
  timeframe: Timeframe;
  trend: Trend;
  indicators: IndicatorSnapshot;
  candlesAnalyzed: number;
}

export interface TechnicalAnalysisResult {
  timeframeAnalyses: TimeframeAnalysis[];
  overallTrend: Trend;
  marketCondition: MarketCondition;
  latestCandle: Candle | null;
  dataQualityOk: boolean;
  evidence: string[];
  conflicts: string[];
}

export interface SignalInput {
  assetId: string;
  timeframe: Timeframe;
  analysis: TechnicalAnalysisResult;
}
