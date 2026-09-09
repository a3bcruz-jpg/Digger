import type { PaperAccount, PaperPosition, PaperTrade, PortfolioSnapshot } from '@/domain/paper-trading';

export interface PaperTradingStore {
  getAccount(accountId: string): Promise<PaperAccount | null>;
  saveAccount(account: PaperAccount): Promise<void>;
  listOpenPositions(accountId: string): Promise<PaperPosition[]>;
  savePosition(position: PaperPosition): Promise<void>;
  closePosition(positionId: string): Promise<void>;
  saveTrade(trade: PaperTrade): Promise<void>;
  saveSnapshot(snapshot: PortfolioSnapshot): Promise<void>;
}

/** In-memory adapter for local development and deterministic tests. */
export class InMemoryPaperTradingStore implements PaperTradingStore {
  private readonly accounts = new Map<string, PaperAccount>();
  private readonly positions = new Map<string, PaperPosition>();
  private readonly trades = new Map<string, PaperTrade>();
  private readonly snapshots: PortfolioSnapshot[] = [];

  async getAccount(accountId: string) { return this.accounts.get(accountId) ?? null; }
  async saveAccount(account: PaperAccount) { this.accounts.set(account.id, account); }
  async listOpenPositions(accountId: string) { return [...this.positions.values()].filter(p => p.accountId === accountId && p.status === 'OPEN'); }
  async savePosition(position: PaperPosition) { this.positions.set(position.id, position); }
  async closePosition(positionId: string) { this.positions.delete(positionId); }
  async saveTrade(trade: PaperTrade) { this.trades.set(trade.id, trade); }
  async saveSnapshot(snapshot: PortfolioSnapshot) { this.snapshots.push(snapshot); }
}
