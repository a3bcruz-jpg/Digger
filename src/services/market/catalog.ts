import type { Asset } from '@/domain/market';

export const supportedAssets: Asset[] = [
  { id: 'btc-usdt', symbol: 'BTC/USDT', name: 'Bitcoin / Tether', marketType: 'CRYPTO', baseCurrency: 'BTC', quoteCurrency: 'USDT', active: true },
  { id: 'eth-usdt', symbol: 'ETH/USDT', name: 'Ethereum / Tether', marketType: 'CRYPTO', baseCurrency: 'ETH', quoteCurrency: 'USDT', active: true },
  { id: 'eur-usd', symbol: 'EUR/USD', name: 'Euro / US Dollar', marketType: 'FOREX', baseCurrency: 'EUR', quoteCurrency: 'USD', active: true },
  { id: 'gbp-usd', symbol: 'GBP/USD', name: 'British Pound / US Dollar', marketType: 'FOREX', baseCurrency: 'GBP', quoteCurrency: 'USD', active: true },
];

export function findAsset(id: string): Asset | undefined {
  return supportedAssets.find(asset => asset.id === id && asset.active);
}
