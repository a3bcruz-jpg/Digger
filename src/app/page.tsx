'use client';

import { useState } from 'react';

const markets = [
  { symbol: 'XAU/USD', name: 'Gold', type: 'Commodity', price: '$3,645.20', change: '+1.24%', signal: 'STRONG BUY', score: 92, trend: 'Bullish', condition: 'Trending' },
  { symbol: 'BTC/USDT', name: 'Bitcoin', type: 'Crypto', price: '$113,842.00', change: '+2.18%', signal: 'BUY', score: 81, trend: 'Bullish', condition: 'Trending' },
  { symbol: 'EUR/USD', name: 'Euro / US Dollar', type: 'Forex', price: '1.1738', change: '+0.34%', signal: 'WAIT', score: 58, trend: 'Neutral', condition: 'Ranging' },
  { symbol: 'GBP/USD', name: 'British Pound', type: 'Forex', price: '1.3542', change: '-0.42%', signal: 'SELL', score: 76, trend: 'Bearish', condition: 'Trending' },
  { symbol: 'ETH/USDT', name: 'Ethereum', type: 'Crypto', price: '$4,212.60', change: '+0.91%', signal: 'BUY', score: 73, trend: 'Bullish', condition: 'Volatile' },
];

const positions = [
  { asset: 'XAU/USD', side: 'LONG', entry: '$3,621.80', current: '$3,645.20', pnl: '+₱1,248.00', risk: '₱620' },
  { asset: 'BTC/USDT', side: 'LONG', entry: '$112,420', current: '$113,842', pnl: '+₱782.40', risk: '₱540' },
];

const timeframes = [['5M', 'Bullish', 88], ['15M', 'Bullish', 91], ['1H', 'Bullish', 94], ['4H', 'Bullish', 86], ['1D', 'Neutral', 62]];

function SignalBadge({ signal }: { signal: string }) {
  const tone = signal.includes('BUY') ? 'buy' : signal.includes('SELL') ? 'sell' : 'wait';
  return <span className={`signal ${tone}`}>{signal}</span>;
}

export default function Home() {
  const [active, setActive] = useState('Overview');
  const [timeframe, setTimeframe] = useState('1H');

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><div className="brand-mark">D</div><div><strong>DIGGER</strong><small>TRADING INTELLIGENCE</small></div></div>
        <nav>{['Overview', 'Markets', 'Signals', 'Paper Trading', 'Portfolio', 'Backtesting'].map((item) => <button key={item} className={active === item ? 'nav-item active' : 'nav-item'} onClick={() => setActive(item)}><span className="nav-icon">{item === 'Overview' ? '⌂' : item === 'Markets' ? '◫' : item === 'Signals' ? '⌁' : item === 'Paper Trading' ? '↗' : item === 'Portfolio' ? '◔' : '◌'}</span>{item}</button>)}</nav>
        <div className="sidebar-bottom"><div className="system"><span className="dot" />System operational</div><div className="user-row"><div className="avatar">A</div><div><strong>Ace</strong><small>Paper account</small></div><span>•••</span></div></div>
      </aside>

      <main className="dashboard">
        <header className="topbar"><div className="mobile-brand"><div className="brand-mark">D</div><strong>DIGGER</strong></div><div className="page-heading"><span className="eyebrow">TRADING TERMINAL</span><h1>{active}</h1></div><div className="top-actions"><div className="data-status"><span className="dot" />Development data</div><button className="icon-button" aria-label="Notifications">♢<span className="notification-dot" /></button><button className="avatar small">A</button></div></header>
        <div className="notice"><span>SIMULATED DATA</span> Market prices and signals shown in this preview are development data. Live provider integration is not enabled.</div>

        <section className="hero-grid">
          <div className="hero-card"><div className="section-label">PORTFOLIO EQUITY <span className="live-pill">PAPER</span></div><div className="hero-value">₱101,842.40</div><div className="gain">+₱1,842.40 <span>+1.84% today</span></div><div className="sparkline">{Array.from({ length: 16 }, (_, i) => <i key={i} style={{ height: `${28 + ((i * 17) % 55)}%` }} />)}</div><div className="chart-labels"><span>9:00</span><span>12:00</span><span>15:00</span><span>Now</span></div></div>
          <div className="metric-card"><span className="section-label">AVAILABLE CASH</span><strong>₱98,436.80</strong><span className="muted">96.7% of equity</span><div className="progress"><span style={{ width: '82%' }} /></div></div>
          <div className="metric-card"><span className="section-label">OPEN RISK</span><strong>1.14%</strong><span className="muted">₱1,160 at risk</span><div className="risk-meter"><span style={{ width: '28%' }} /></div><small>Limit 4.00%</small></div>
          <div className="metric-card"><span className="section-label">TODAY'S P&L</span><strong className="positive">+₱1,842.40</strong><span className="muted">2 wins · 0 losses</span><div className="mini-stats"><b>Win rate <em>100%</em></b><b>Profit factor <em>3.2</em></b></div></div>
        </section>

        <section className="content-grid">
          <div className="main-column">
            <div className="section-header"><div><span className="eyebrow">OPPORTUNITIES</span><h2>Market signals</h2></div><button className="ghost">View all signals →</button></div>
            <div className="market-list">{markets.slice(0, 4).map((market) => <article className="market-row" key={market.symbol}><div className="asset-icon">{market.symbol.startsWith('XAU') ? 'Au' : market.symbol.split('/')[0].slice(0, 2)}</div><div className="asset-name"><strong>{market.symbol}</strong><span>{market.name} · {market.type}</span></div><div className="price"><strong>{market.price}</strong><span className={market.change.startsWith('+') ? 'positive' : 'negative'}>{market.change}</span></div><div className="trend"><span>{market.trend}</span><small>{market.condition}</small></div><div className="score"><div><span style={{ width: `${market.score}%` }} /></div><strong>{market.score}</strong></div><SignalBadge signal={market.signal} /><button className="row-arrow" aria-label={`Open ${market.symbol}`}>›</button></article>)}</div>

            <div className="section-header analysis-heading"><div><span className="eyebrow">MULTI TIMEFRAME</span><h2>XAU/USD analysis</h2></div><div className="tabs">{['5M', '15M', '1H', '4H', '1D'].map((tf) => <button key={tf} className={timeframe === tf ? 'tab active' : 'tab'} onClick={() => setTimeframe(tf)}>{tf}</button>)}</div></div>
            <div className="analysis-card"><div className="analysis-top"><div><strong>XAU/USD</strong><span>Gold / US Dollar</span></div><div className="analysis-price"><strong>$3,645.20</strong><span className="positive">+1.24%</span></div><SignalBadge signal="STRONG BUY" /></div><div className="timeframe-grid">{timeframes.map(([tf, state, score]) => <div className={tf === timeframe ? 'tf active' : 'tf'} key={tf} onClick={() => setTimeframe(tf)}><span>{tf}</span><b>{state}</b><div><i style={{ width: `${score}%` }} /></div><small>{score}% confluence</small></div>)}</div><div className="levels"><div><span>ENTRY</span><strong>$3,638.00</strong></div><div><span>STOP LOSS</span><strong>$3,621.00</strong></div><div><span>TAKE PROFIT</span><strong>$3,672.00</strong></div><div><span>RISK / REWARD</span><strong>1 : 2.00</strong></div></div><p className="reasoning"><b>Why Digger likes this setup</b> Strong bullish alignment across 5M to 4H, price holding above key EMA levels, positive momentum, and clean upside structure. Daily timeframe is neutral, so the setup remains monitored rather than treated as guaranteed.</p></div>
          </div>

          <aside className="right-column"><div className="section-header"><div><span className="eyebrow">PAPER TRADING</span><h2>Open positions</h2></div></div>{positions.map((position) => <div className="position-card" key={position.asset}><div className="position-top"><div><strong>{position.asset}</strong><span className="long">{position.side}</span></div><strong className="positive">{position.pnl}</strong></div><div className="position-grid"><span>Entry <b>{position.entry}</b></span><span>Current <b>{position.current}</b></span><span>Risk <b>{position.risk}</b></span></div></div>)}<button className="full-button">Manage paper account</button><div className="section-header alerts-heading"><div><span className="eyebrow">INTELLIGENT ALERTS</span><h2>Alert feed</h2></div><span className="alert-count">2</span></div><div className="alert-card"><span className="alert-dot buy-dot" /><div><strong>XAU/USD · STRONG BUY</strong><p>Confluence score reached 92% on 1H.</p><small>2 min ago</small></div></div><div className="alert-card"><span className="alert-dot buy-dot" /><div><strong>BTC/USDT · BUY</strong><p>Momentum confirmation across 15M / 1H.</p><small>8 min ago</small></div></div></aside>
        </section>
        <footer><span>Digger Trading Intelligence</span><span>Decision support only · No guaranteed returns · <b>PHP account currency</b></span></footer>
      </main>
    </div>
  );
}
