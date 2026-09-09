# Digger

AI-powered Forex and Cryptocurrency Trading Alert Platform.

## Project status

This repository is being initialized from an empty Git repository. The implementation will follow the approved architecture and development sequence for a PHP-first, paper-trading and alert-focused platform.

## Product principles

- Market pairs retain their native quotation (for example, `BTC/USDT` and `EUR/USD`).
- PHP (`₱`) is the primary user/account/portfolio currency.
- Signals are decision-support information, not guaranteed predictions.
- `STRONG BUY`, `BUY`, `WAIT`, `SELL`, and `STRONG SELL` are first-class signal states.
- High-quality signals can trigger configurable sound, vibration, in-app, and push notifications where platform capabilities permit.
- The MVP does not execute automatic real-money trades.
- Deterministic market-analysis and risk engines remain authoritative; AI is an explanation layer.
- Stale, invalid, or insufficient market data must not produce misleading signals.

## Planned implementation sequence

1. Foundation and shared domain contracts
2. Market data infrastructure
3. Technical analysis engine
4. Signal and confluence engine
5. Real-time monitoring
6. Intelligent alerts and notifications
7. Paper trading
8. Portfolio and performance analytics
9. Backtesting and strategy validation
10. Advanced portfolio risk
11. AI market intelligence and explainability
12. Security hardening and production QA
13. Production deployment

## Initial technical direction

- Next.js / React / TypeScript
- PostgreSQL
- Prisma or equivalent typed ORM
- Redis-compatible cache/job layer where required
- Modular market-data provider adapters
- Modular notification provider adapters
- AI provider isolated behind a server-side explanation service

See future implementation documentation for detailed domain contracts, API specifications, database schema, testing, and deployment requirements.
