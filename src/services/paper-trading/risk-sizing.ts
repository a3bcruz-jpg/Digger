import type { RiskSettings } from '@/domain/trading';
import type { PaperAccount, PaperPosition } from '@/domain/paper-trading';
import type { PhpConversionRate } from './php-conversion';

export interface PositionSizingRequest {
  account: PaperAccount;
  settings: RiskSettings;
  entryPrice: number;
  stopLoss: number;
  quoteToPhp: PhpConversionRate;
  existingOpenRiskPHP: number;
}

export interface PositionSizingResult {
  quantity: number;
  riskBudgetPHP: number;
  riskPerUnitPHP: number;
  riskAmountPHP: number;
  remainingOpenRiskBudgetPHP: number;
}

export function calculatePositionSize(request: PositionSizingRequest): PositionSizingResult {
  const { account, settings } = request;
  if (!Number.isFinite(account.equityPHP) || account.equityPHP <= 0) throw new Error('Account equity must be positive.');
  if (!Number.isFinite(settings.riskPerTradePct) || settings.riskPerTradePct <= 0) throw new Error('Risk per trade must be positive.');
  if (!Number.isFinite(settings.maxOpenRiskPct) || settings.maxOpenRiskPct <= 0) throw new Error('Maximum open risk must be positive.');
  if (!Number.isFinite(request.entryPrice) || !Number.isFinite(request.stopLoss) || request.entryPrice === request.stopLoss) {
    throw new Error('Entry and stop loss must be finite and different.');
  }
  if (!Number.isFinite(request.quoteToPhp.rate) || request.quoteToPhp.rate <= 0) throw new Error('PHP conversion rate must be positive.');
  if (!Number.isFinite(request.existingOpenRiskPHP) || request.existingOpenRiskPHP < 0) throw new Error('Existing open risk must be non-negative.');

  const riskBudgetPHP = account.equityPHP * (settings.riskPerTradePct / 100);
  const maxOpenRiskPHP = account.equityPHP * (settings.maxOpenRiskPct / 100);
  const remainingOpenRiskBudgetPHP = maxOpenRiskPHP - request.existingOpenRiskPHP;
  if (remainingOpenRiskBudgetPHP <= 0) throw new Error('Maximum open-risk limit has been reached.');

  const allowedRiskPHP = Math.min(riskBudgetPHP, remainingOpenRiskBudgetPHP);
  const riskPerUnitPHP = Math.abs(request.entryPrice - request.stopLoss) * request.quoteToPhp.rate;
  if (!Number.isFinite(riskPerUnitPHP) || riskPerUnitPHP <= 0) throw new Error('Calculated PHP risk per unit is invalid.');

  const quantity = allowedRiskPHP / riskPerUnitPHP;
  return {
    quantity,
    riskBudgetPHP,
    riskPerUnitPHP,
    riskAmountPHP: quantity * riskPerUnitPHP,
    remainingOpenRiskBudgetPHP,
  };
}

export function sumOpenRiskPHP(positions: PaperPosition[]): number {
  return positions.reduce((total, position) => total + Math.max(0, position.riskAmountPHP), 0);
}
