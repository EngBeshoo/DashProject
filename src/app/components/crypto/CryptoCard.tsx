import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import Sparkline from '../stocks/Sparkline';

export type Crypto = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  pct: number;
  high: number;
  low: number;
  marketCap: number;
  volume: number;
  spark: number[];
  color: string;
};

/**
 * بيختار عدد الـ decimals حسب سعر العملة
 * BTC: 67,234.12 → $67,234.12
 * XRP: 0.6218   → $0.6218
 * DOGE: 0.1584  → $0.1584
 */
function formatPrice(price: number): string {
  if (price >= 1000) return price.toLocaleString('en-US', { maximumFractionDigits: 2 });
  if (price >= 1) return price.toFixed(2);
  if (price >= 0.01) return price.toFixed(4);
  return price.toFixed(6);
}

function formatCompact(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(1)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(1)}M`;
  return `$${n.toLocaleString()}`;
}

export default function CryptoCard({ crypto }: { crypto: Crypto }) {
  const isUp = crypto.change >= 0;
  const range = crypto.high - crypto.low;
  const position =
    range === 0 ? 50 : ((crypto.price - crypto.low) / range) * 100;

  return (
    <div className="group bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
      {/* Header: Icon + Symbol + % */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Circle with brand color */}
          <div
            className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
            style={{ backgroundColor: crypto.color }}
          >
            {crypto.symbol.slice(0, 3)}
          </div>

          <div>
            <p className="font-bold text-base dark:text-white">
              {crypto.symbol}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {crypto.name}
            </p>
          </div>
        </div>

        <div
          className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${
            isUp
              ? 'bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400'
              : 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400'
          }`}
        >
          {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {isUp ? '+' : ''}
          {crypto.pct.toFixed(2)}%
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="text-2xl font-bold dark:text-white">
          ${formatPrice(crypto.price)}
        </p>
        <p
          className={`text-xs font-medium mt-0.5 ${
            isUp ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {isUp ? '+' : ''}
          {formatPrice(Math.abs(crypto.change))}
          {' · '}24h
        </p>
      </div>

      {/* Sparkline */}
      <div className="mb-4">
        <Sparkline
          data={crypto.spark}
          color={isUp ? '#22c55e' : '#ef4444'}
        />
      </div>

      {/* Range Bar */}
      <div className="mb-4">
        <div className="relative h-1.5 w-full rounded-full bg-gradient-to-r from-red-500 via-yellow-400 to-green-500">
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white border-2 border-blue-600 shadow-sm"
            style={{ left: `${position}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 mt-1">
          <span>L: ${formatPrice(crypto.low)}</span>
          <span>H: ${formatPrice(crypto.high)}</span>
        </div>
      </div>

      {/* Footer: Market Cap + Volume */}
      <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-100 dark:border-zinc-800">
        <div>
          <p className="text-[10px] uppercase text-gray-400 dark:text-gray-500">
            Market Cap
          </p>
          <p className="text-xs font-semibold dark:text-white">
            {formatCompact(crypto.marketCap)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase text-gray-400 dark:text-gray-500">
            Volume
          </p>
          <p className="text-xs font-semibold dark:text-white">
            {formatCompact(crypto.volume)}
          </p>
        </div>
      </div>
    </div>
  );
}