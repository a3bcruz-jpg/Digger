import type { PaperAccount, PaperPosition, PaperTrade, PortfolioSnapshot } from '@/domain/paper-trading';

export function markToMarket(account: PaperAccount, positions: PaperPosition[], trades: PaperTrade[], now = new Date().toISOString()): PortfolioSnapshot {
  const unrealizedPnlPHP = positions.reduce((total, position) => {
    const priceChange = position.side === 'LONG' ? position.currentPrice - position.entryPrice : position.entryPrice - position.currentPrice;
    return total + priceChange * position.quantity;
  }, 0);
  const realizedPnlPHP = trades.reduce((total, trade) => total + (trade.realizedPnlPHP ?? 0) - (trade.feesPHP ?? 0), 0);
  const openPositionValuePHP = positions.reduce((total, position) => total + position.currentPrice * position.quantity, 0);
  const equityPHP = account.initialBalancePHP + realizedPnlPHP + unrealizedPnlPHP;
  const peak = Math.max(account.peakEquityPHP || account.initialBalancePHP, equityPHP);
  const drawdownPHP = Math.max(0, peak - equityPHP);

  return {
    accountId: account.id,
    timestamp: now,
    cashBalancePHP: account.cashBalancePHP,
    openPositionValuePHP,
    equityPHP,
    realizedPnlPHP,
    unrealizedPnlPHP,
    drawdownPHP,
    drawdownPct: peak > 0 ? (drawdownPHP / peak) * 100 : 0,
  };
}
