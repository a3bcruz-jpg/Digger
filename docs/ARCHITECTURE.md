# Digger Architecture

## System boundary

Digger is a trading decision-support platform. The MVP monitors market data, computes technical analysis, generates explainable BUY/SELL/WAIT signals, sends configurable alerts, and supports PHP-denominated paper trading. It does not execute real-money trades.

## Core pipeline

```text
Market Provider
  -> Data Adapter
  -> Normalized Market Data
  -> Data Validation / Freshness
  -> Indicators
  -> Market Structure
  -> Market Regime
  -> Strategy Modules
  -> Confluence Engine
  -> Signal Quality
  -> Risk Engine
  -> BUY / SELL / WAIT
  -> Alert Engine
  -> Notification Service
  -> Paper Trading
  -> Portfolio Analytics
  -> Backtesting / Validation
  -> AI Explanation
```

## Architectural rules

1. Market-provider integrations are adapters behind a stable interface.
2. Technical calculations live in domain services, never in UI components.
3. Signal generation is deterministic and explainable.
4. The AI layer receives structured analysis and explains it; it does not invent indicators or override risk controls.
5. Paper trading shares the same signal/risk contracts as monitoring.
6. PHP is the user/account/portfolio currency; native market quotations remain unchanged.
7. Stale or invalid market data prevents new actionable signals.
8. Notifications are downstream of the signal/alert engine and must not contain trading logic.
9. User data is isolated through authentication and authorization at every protected API boundary.
10. Real-money order execution is outside the MVP.

## Suggested source layout

```text
src/
  app/                 # Next.js routes, pages, layouts
  components/          # shared UI components
  domain/              # domain types and business rules
  services/            # application services
  server/              # server-only orchestration and adapters
  lib/                 # small framework-agnostic utilities
  styles/              # shared styling
```

As the project grows, keep domain modules cohesive and avoid a large generic `utils` bucket for business logic.

## Market data contracts

Every provider must map into a normalized model containing symbol, market type, timeframe, OHLC values, optional volume, and timestamp. Freshness is tracked separately so downstream systems can safely reject stale data.

## Signal contract

A signal contains its asset, market, timeframe, state, price context, optional entry/SL/TP, risk/reward, quality score, technical confidence score, trend/regime, reasoning, invalidation condition, lifecycle status, and timestamps.

`WAIT` is a first-class result and should be returned whenever confirmation is insufficient.

## Notification architecture

```text
Signal
 -> Alert Eligibility
 -> Deduplication/Cooldown
 -> Priority
 -> Notification Service
 -> In-App / Browser Push / Mobile Push
 -> Sound / Vibration where supported
```

Notification channels must be configurable per user. Platform limitations must be surfaced rather than silently claiming delivery.

## Trading safety

No signal can guarantee profit. Scores are normalized technical assessments, not guaranteed win probabilities. Paper trading results are simulations and must remain clearly labeled as such.
