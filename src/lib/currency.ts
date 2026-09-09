export type SupportedCurrency = 'PHP' | 'USD' | 'USDT' | 'EUR' | 'GBP' | 'JPY';

export interface FxRate {
  from: SupportedCurrency;
  to: SupportedCurrency;
  rate: number;
  asOf: string;
  source: string;
}

export function formatPhp(amount: number): string {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function convert(amount: number, rate: FxRate): number {
  if (!Number.isFinite(amount) || !Number.isFinite(rate.rate) || rate.rate <= 0) {
    throw new Error('Invalid currency conversion input.');
  }
  return amount * rate.rate;
}
