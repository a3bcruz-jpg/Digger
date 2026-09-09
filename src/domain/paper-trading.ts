export type PositionSide = 'LONG' | 'SHORT';
export type PaperTradeStatus = 'OPEN' | 'CLOSED' | 'CANCELLED';
export type CloseReason = 'TAKE_PROFIT' | 'STOP_LOSS' | 'MANUAL' | 'SIGNAL_INVALIDATED';

export interface PaperAccount {
  id: string;
  currency: 'PHP';
  initialBalancePHP: number;
  cashBalancePHP: number;
  equityPHP: number;
  realizedPnlPHP: number;
  unrealizedPnlPHP: number;
  peakEquityPHP: number;
  drawdownPHP: number;
  drawdownPct: number;
  updatedAt: string;
}

export interface PaperPosition {
  id: string;
  accountId: string;
  assetId: string;
  side: PositionSide;
  quantity: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss: number;
  takeProfit: number;
  riskAmountPHP: number;
  openedAt: string;
  status: 'OPEN';
}

export interface PaperTrade {
  id: string;
  positionId: string;
  accountId: string;
  assetId: string;
  side: PositionSide;
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  realizedPnlPHP?: number;
  feesPHP?: number;
  closeReason?: CloseReason;
  status: PaperTradeStatus;
  openedAt: string;
  closedAt?: string;
  signalId?: string;
}

export interface PortfolioSnapshot {
  accountId: string;
  timestamp: string;
  cashBalancePHP: number;
  openPositionValuePHP: number;
  equityPHP: number;
  realizedPnlPHP: number;
  unrealizedPnlPHP: number;
  drawdownPHP: number;
  drawdownPct: number;
}

export function calculatePositionPnl(side: PositionSide, entryPrice: number, exitPrice: number, quantity: number): number {
  const priceChange = side === 'LONG' ? exitPrice - entryPrice : entryPrice - exitPrice;
  return priceChange * quantity;
}
