import { formatPhp } from '@/lib/currency';

const markets = [
  { symbol: 'BTC/USDT', type: 'Crypto', regime: 'BULLISH', signal: 'WAIT' },
  { symbol: 'ETH/USDT', type: 'Crypto', regime: 'BULLISH', signal: 'WAIT' },
  { symbol: 'EUR/USD', type: 'Forex', regime: 'RANGING', signal: 'WAIT' },
  { symbol: 'GBP/USD', type: 'Forex', regime: 'BEARISH', signal: 'WAIT' },
];

export default function Home() {
  return (
    <main>
      <span className="badge">DIG­GER · PAPER TRADING</span>
      <h1>Trading Intelligence Dashboard</h1>
      <p className="muted">
        Real-time market analysis, explainable signals, intelligent alerts, and PHP-first paper trading.
      </p>

      <section className="grid" aria-label="Portfolio summary">
        <div className="card"><div className="muted">Paper Balance</div><strong>{formatPhp(100000)}</strong></div>
        <div className="card"><div className="muted">Portfolio Equity</div><strong>{formatPhp(100000)}</strong></div>
        <div className="card"><div className="muted">Open Risk</div><strong>0.00%</strong></div>
        <div className="card"><div className="muted">Active Alerts</div><strong>0</strong></div>
      </section>

      <section style={{ marginTop: 24 }}>
        <div className="card">
          <h2>Market Monitor</h2>
          <div className="grid">
            {markets.map((market) => (
              <article key={market.symbol} className="card">
                <span className="badge">{market.type}</span>
                <h3>{market.symbol}</h3>
                <p className="muted">Regime: {market.regime}</p>
                <strong>{market.signal}</strong>
              </article>
            ))}
          </div>
          <p className="muted" style={{ marginBottom: 0 }}>
            Signal generation remains disabled in this foundation build until a verified market-data provider is configured.
          </p>
        </div>
      </section>
    </main>
  );
}
