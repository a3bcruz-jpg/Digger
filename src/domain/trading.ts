export type MarketType = 'CRYPTO' | 'FOREX' | 'COMMODITY';

export type Timeframe = '1M' | '5M' | '15M' | '30M' | '1H' | '4H' | '1D';

export type SignalType = 'STRONG_BUY' | 'BUY' | 'WAIT' | 'SELL' | 'STRONG_SELL';

export type SignalStatus =
  | 'DETECTED'
  | 'CONFIRMED'
  | 'ACTIVE'
  | 'TRIGGERED'
  | 'COMPLETED'
  | 'INVALIDATED'
  | 'EXPIRED'
  | 'CANCELLED';

export type DataFreshness = 'LIVE' | 'RECENT' | 'DELAYED' | 'STALE' | 'UNAVAILABLE';

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
  symbol: string;
  timeframe: Timeframe;
  timestamp: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface IndicatorSnapshot {
  ema20?: number;
  ema50?: number;
  ema200?: number;
  sma50?: number;
  sma200?: number;
  rsi14?: number;
  macd?: number;
  macdSignal?: number;
  bollingerUpper?: number;
  bollingerMiddle?: number;
  bollingerLower?: number;
  atr14?: number;
}

export interface Signal {
  id: string;
  assetId: string;
  marketType: MarketType;
  timeframe: Timeframe;
  signalType: SignalType;
  currentPrice: number;
  phpEquivalent?: number;
  entry?: number;
  stopLoss?: number;
  takeProfit?: number;
  riskReward?: number;
  signalQuality: number;
  technicalConfidence: number;
  marketTrend: string;
  marketCondition: string;
  reasoning: string[];
  invalidationCondition?: string;
  status: SignalStatus;
  generatedAt: string;
  expiresAt?: string;
}

export interface PaperTradingAccount {
  id: string;
  userId: string;
  currency: 'PHP';
  startingBalance: number;
  cashBalance: number;
  equity: number;
}

export interface RiskSettings {
  riskPerTradePct: number;
  maxOpenRiskPct: number;
  maxDailyLossPct: number;
  maxDrawdownPct: number;
  minimumRiskReward: number;
}

export function isActionableSignal(signalType: SignalType): signalType is 'STRONG_BUY' | 'BUY' | 'SELL' | 'STRONG_SELL' {
  return signalType !== 'WAIT';
}

export function isStrongSignal(signalType: SignalType): signalType is 'STRONG_BUY' | 'STRONG_SELL' {
  return signalType === 'STRONG_BUY' || signalType === 'STRONG_SELL';
}
