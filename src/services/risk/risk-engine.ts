import type { RiskSettings, Signal, SignalType } from '@/domain/trading';

export interface RiskValidationInput {
  signal: Pick<Signal, 'signalType' | 'currentPrice' | 'entry' | 'stopLoss' | 'takeProfit' | 'riskReward'>;
  accountEquityPHP: number;
  openRiskPHP: number;
  dailyLossPHP: number;
  peakEquityPHP: number;
  settings: RiskSettings;
}

export interface RiskValidationResult {
  allowed: boolean;
  reason: string;
  riskAmountPHP: number;
  potentialProfitPHP: number;
  riskReward: number | undefined;
  positionNotionalPHP?: number;
}

const directional = (type: SignalType) => type === 'BUY' || type === 'STRONG_BUY' || type === 'SELL' || type === 'STRONG_SELL';
const bullish = (type: SignalType) => type === 'BUY' || type === 'STRONG_BUY';

export function validatePaperTrade(input: RiskValidationInput): RiskValidationResult {
  const { signal, accountEquityPHP, openRiskPHP, dailyLossPHP, peakEquityPHP, settings } = input;
  if (accountEquityPHP <= 0) return { allowed: false, reason: 'Account equity must be positive.', riskAmountPHP: 0, potentialProfitPHP: 0, riskReward: signal.riskReward };
  if (!directional(signal.signalType)) return { allowed: false, reason: 'WAIT signals cannot be executed.', riskAmountPHP: 0, potentialProfitPHP: 0, riskReward: signal.riskReward };
  if (signal.entry === undefined || signal.stopLoss === undefined || signal.takeProfit === undefined) {
    return { allowed: false, reason: 'Entry, stop loss, and take profit are required.', riskAmountPHP: 0, potentialProfitPHP: 0, riskReward: signal.riskReward };
  }

  const distanceToStop = Math.abs(signal.entry - signal.stopLoss);
  const distanceToTarget = Math.abs(signal.takeProfit - signal.entry);
  if (distanceToStop <= 0 || distanceToTarget <= 0) return { allowed: false, reason: 'Invalid entry, stop loss, or take profit geometry.', riskAmountPHP: 0, potentialProfitPHP: 0, riskReward: undefined };

  const directionIsValid = bullish(signal.signalType)
    ? signal.stopLoss < signal.entry && signal.takeProfit > signal.entry
    : signal.stopLoss > signal.entry && signal.takeProfit < signal.entry;
  if (!directionIsValid) return { allowed: false, reason: 'Stop loss and take profit do not match signal direction.', riskAmountPHP: 0, potentialProfitPHP: 0, riskReward: undefined };

  const riskReward = distanceToTarget / distanceToStop;
  const riskAmountPHP = accountEquityPHP * (settings.riskPerTradePct / 100);
  const maxOpenRiskPHP = accountEquityPHP * (settings.maxOpenRiskPct / 100);
  const maxDailyLossPHP = accountEquityPHP * (settings.maxDailyLossPct / 100);
  const drawdownPct = peakEquityPHP > 0 ? ((peakEquityPHP - accountEquityPHP) / peakEquityPHP) * 100 : 0;
  const potentialProfitPHP = riskAmountPHP * riskReward;

  if (riskReward < settings.minimumRiskReward) return { allowed: false, reason: `Risk/reward ${riskReward.toFixed(2)} is below the minimum ${settings.minimumRiskReward.toFixed(2)}.`, riskAmountPHP, potentialProfitPHP, riskReward };
  if (openRiskPHP + riskAmountPHP > maxOpenRiskPHP) return { allowed: false, reason: 'Maximum open portfolio risk would be exceeded.', riskAmountPHP, potentialProfitPHP, riskReward };
  if (dailyLossPHP + riskAmountPHP > maxDailyLossPHP) return { allowed: false, reason: 'Maximum daily loss limit would be exceeded.', riskAmountPHP, potentialProfitPHP, riskReward };
  if (drawdownPct >= settings.maxDrawdownPct) return { allowed: false, reason: 'Maximum portfolio drawdown limit has been reached.', riskAmountPHP, potentialProfitPHP, riskReward };

  return { allowed: true, reason: 'Paper trade passes configured risk controls.', riskAmountPHP, potentialProfitPHP, riskReward };
}
