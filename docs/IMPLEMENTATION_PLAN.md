# Digger Implementation Plan

## Milestone 1 — Foundation

- [x] Initialize Next.js/TypeScript application shell
- [x] Add core trading-domain contracts
- [x] Add PHP currency utility
- [x] Add environment-variable template
- [x] Add architecture documentation
- [x] Add repository ignores

## Milestone 2 — Market Data

- [ ] Select and document crypto provider
- [ ] Select and document Forex provider
- [ ] Implement provider adapters
- [ ] Implement normalized candle/current-price contracts
- [ ] Implement freshness classification
- [ ] Implement caching/rate-limit handling
- [ ] Add market-data tests

## Milestone 3 — Technical Analysis

- [ ] Indicator service
- [ ] Market structure service
- [ ] Support/resistance detection
- [ ] Market regime detection
- [ ] Unit tests with deterministic fixtures

## Milestone 4 — Signal Intelligence

- [ ] Strategy modules
- [ ] Multi-timeframe aggregation
- [ ] Confluence engine
- [ ] Technical confidence scoring
- [ ] Signal quality scoring
- [ ] Invalidation/expiry lifecycle
- [ ] BUY/SELL/WAIT tests

## Milestone 5 — Monitoring & Alerts

- [ ] Background scanner
- [ ] Signal-change detection
- [ ] Alert deduplication/cooldown
- [ ] In-app notification center
- [ ] Browser push integration
- [ ] Sound/vibration preferences where supported
- [ ] Alert-history persistence

## Milestone 6 — Paper Trading

- [ ] PHP paper account
- [ ] Position sizing
- [ ] Open/close paper positions
- [ ] SL/TP handling
- [ ] Fees/spread/slippage assumptions
- [ ] Trade history

## Milestone 7 — Portfolio & Performance

- [ ] Equity tracking
- [ ] P&L
- [ ] Drawdown
- [ ] Win rate/profit factor/expectancy
- [ ] Strategy/asset/timeframe performance
- [ ] Portfolio risk engine
- [ ] Correlation/concentration analysis

## Milestone 8 — Backtesting & Validation

- [ ] Historical data ingestion
- [ ] Backtest engine using shared strategy contracts
- [ ] In-sample/out-of-sample separation
- [ ] Walk-forward validation
- [ ] Robustness testing
- [ ] Overfitting diagnostics

## Milestone 9 — AI Intelligence

- [ ] Server-side AI explanation service
- [ ] Structured prompt/schema contract
- [ ] Evidence-grounded explanations
- [ ] Risk/invalidation summaries
- [ ] AI safety boundaries

## Milestone 10 — Production Hardening

- [ ] Authentication hardening
- [ ] Authorization and data isolation tests
- [ ] Rate limiting
- [ ] Error monitoring
- [ ] Secrets audit
- [ ] E2E tests
- [ ] Responsive regression tests
- [ ] Production build/CI verification

## Verification rule

At the end of every milestone, run the full readiness gate. A feature is PASS only when implemented, integrated, executable, and actually tested. Planned, architecturally ready, mocked, or unverified behavior must not be marked PASS.
