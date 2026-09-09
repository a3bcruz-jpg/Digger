import type { Asset } from '@/domain/market';
import type { PaperAccount, PaperPosition, PaperTrade, PositionSide } from '@/domain/paper-trading';
import type { TradingSignal } from '@/services/signals/signal';

export interface OpenTradeRequest {
  account: PaperAccount;
  asset: Asset;
  signal: TradingSignal;
  side: PositionSide;
  quantity: number;
  phpConversionRate?: number;
}

export function openPaperPosition(request: OpenTradeRequest): { position: PaperPosition; warnings: string[] } {
  const { account, asset, signal, side, quantity } = request;
  const warnings: string[] = [];
  if (signal.signal === 'WAIT') throw new Error('WAIT signals cannot be executed as paper trades.');
  if (!Number.isFinite(quantity) || quantity <= 0) throw new Error('Paper position quantity must be greater than zero.');
  if (signal.entry === undefined || signal.stopLoss === undefined || signal.takeProfit === undefined) {
    throw new Error('Entry, stop loss, and take profit are required before opening a paper position.');
  }
  if (side === 'LONG' && !(signal.stopLoss < signal.entry && signal.takeProfit > signal.entry)) {
    throw new Error('Invalid LONG risk levels: stop loss must be below entry and take profit above entry.');
  }
  if (side === 'SHORT' && !(signal.stopLoss > signal.entry && signal.takeProfit < signal.entry)) {
    throw new Error('Invalid SHORT risk levels: stop loss must be above entry and take profit below entry.');
  }
  if (signal.marketCondition === 'HIGH_VOLATILITY') warnings.push('High volatility: paper trade carries elevated market risk.');
  if (account.currency !== 'PHP') throw new Error('Paper accounts must use PHP.');

  const riskPerUnit = Math.abs(signal.entry - signal.stopLoss);
  const riskAmountPHP = riskPerUnit * quantity * (request.phpConversionRate ?? 1);
  return {
    warnings,
    position: {
      id: crypto.randomUUID(), accountId: account.id, assetId: asset.id, side, quantity,
      entryPrice: signal.entry, currentPrice: signal.entry, stopLoss: signal.stopLoss,
      takeProfit: signal.takeProfit, riskAmountPHP, openedAt: new Date().toISOString(), status: 'OPEN',
    },
  };
}

export function closePaperPosition(position: PaperPosition, exitPrice: number, reason: PaperTrade['closeReason']): PaperTrade {
  if (position.status !== 'OPEN') throw new Error('Only open paper positions can be closed.');
  if (!Number.isFinite(exitPrice) || exitPrice <= 0) throw new Error('Exit price must be a positive number.');
  const pnl = position.side === 'LONG'
    ? (exitPrice - position.entryPrice) * position.quantity
    : (position.entryPrice - exitPrice) * position.quantity;
  return {
    id: crypto.randomUUID(), positionId: position.id, accountId: position.accountId, assetId: position.assetId,
    side: position.side, quantity: position.quantity, entryPrice: position.entryPrice, exitPrice,
    realizedPnlPHP: pnl, status: 'CLOSED', closeReason: reason, openedAt: position.openedAt,
    closedAt: new Date().toISOString(),
  };
}
