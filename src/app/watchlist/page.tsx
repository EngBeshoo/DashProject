'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, TrendingUp, TrendingDown, Plus, X } from 'lucide-react';

type Item = {
  ticker: string;
  name: string;
  price: number;
  change: number;
};

const initialItems: Item[] = [
  { ticker: 'AAPL', name: 'Apple Inc.',     price: 229.87, change: +1.03 },
  { ticker: 'NVDA', name: 'NVIDIA Corp.',   price: 132.75, change: +4.08 },
  { ticker: 'BTC',  name: 'Bitcoin',        price: 67234.12, change: +1.24 },
  { ticker: 'ETH',  name: 'Ethereum',       price: 3245.88, change: -0.55 },
];

export default function WatchlistPage() {
  const [items, setItems] = useState(initialItems);

  const remove = (ticker: string) =>
    setItems((prev) => prev.filter((i) => i.ticker !== ticker));

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-yellow-50 dark:bg-yellow-950 flex items-center justify-center">
            <Star className="text-yellow-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-white">Watchlist</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {items.length} assets you&apos;re tracking
            </p>
          </div>
        </div>

        <button className="inline-flex items-center gap-2 rounded-xl bg-[#01245E] text-white px-4 py-2 text-sm font-medium hover:bg-[#01347D] transition">
          <Plus size={16} />
          Add Asset
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-10 text-center border border-gray-100 dark:border-zinc-800">
          <Star size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 dark:text-gray-400">
            Your watchlist is empty
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            const isUp = item.change >= 0;
            return (
              <div
                key={item.ticker}
                className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800 hover:shadow-md transition"
              >
                <button
                  onClick={() => remove(item.ticker)}
                  className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                  aria-label={`Remove ${item.ticker}`}
                >
                  <X size={16} />
                </button>

                <Link href={`/stocks/${item.ticker}`} className="block">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-bold text-lg dark:text-white">
                        {item.ticker}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {item.name}
                      </p>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-medium ${
                        isUp ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {isUp ? '+' : ''}
                      {item.change.toFixed(2)}%
                    </div>
                  </div>
                  <p className="text-2xl font-bold dark:text-white">
                    ${item.price.toLocaleString()}
                  </p>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}