export type SupportedQuoteCurrency = 'PHP' | 'USD' | 'USDT' | 'EUR' | 'GBP';

export interface PhpConversionRate {
  fromCurrency: SupportedQuoteCurrency;
  toCurrency: 'PHP';
  rate: number;
  asOf: string;
  source: string;
}

export interface PhpConversionProvider {
  getRate(fromCurrency: SupportedQuoteCurrency): Promise<PhpConversionRate>;
}

export function convertToPhp(amount: number, rate: PhpConversionRate): number {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Amount must be a non-negative finite number.');
  if (!Number.isFinite(rate.rate) || rate.rate <= 0) throw new Error('PHP conversion rate must be positive.');
  return amount * rate.rate;
}

export function assertFreshPhpRate(rate: PhpConversionRate, maxAgeSeconds = 300, now = Date.now()): void {
  const timestamp = Date.parse(rate.asOf);
  if (!Number.isFinite(timestamp)) throw new Error('PHP conversion rate timestamp is invalid.');
  if (timestamp > now) throw new Error('PHP conversion rate timestamp cannot be in the future.');
  if (now - timestamp > maxAgeSeconds * 1000) throw new Error('PHP conversion rate is stale; paper execution is blocked.');
}
