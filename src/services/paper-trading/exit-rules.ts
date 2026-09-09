import type { PaperPosition } from '@/domain/paper-trading';

export function evaluatePositionExit(position: PaperPosition): 'TAKE_PROFIT' | 'STOP_LOSS' | null {
  if (position.side === 'LONG') {
    if (position.currentPrice >= position.takeProfit) return 'TAKE_PROFIT';
    if (position.currentPrice <= position.stopLoss) return 'STOP_LOSS';
  } else {
    if (position.currentPrice <= position.takeProfit) return 'TAKE_PROFIT';
    if (position.currentPrice >= position.stopLoss) return 'STOP_LOSS';
  }
  return null;
}
