import { Bitcoin, TrendingUp, TrendingDown, Activity, DollarSign, BarChart3 } from 'lucide-react';
import CryptoCard from '../components/crypto/CryptoCard';

const cryptos = [
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    price: 67234.12,
    change: +823.42,
    pct: +1.24,
    high: 68120.00,
    low: 65980.00,
    marketCap: 1325000000000,
    volume: 28500000000,
    spark: [58, 60, 59, 62, 61, 64, 63, 66, 68, 67, 70, 72],
    color: '#f7931a', // Bitcoin orange
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    price: 3245.88,
    change: -17.94,
    pct: -0.55,
    high: 3298.40,
    low: 3210.20,
    marketCap: 390000000000,
    volume: 14200000000,
    spark: [55, 58, 56, 54, 57, 55, 52, 53, 51, 50, 52, 49],
    color: '#627eea', // Ethereum blue
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    price: 168.42,
    change: +5.08,
    pct: +3.11,
    high: 172.30,
    low: 162.10,
    marketCap: 78000000000,
    volume: 3800000000,
    spark: [30, 34, 32, 38, 36, 42, 40, 45, 48, 46, 52, 55],
    color: '#14f195', // Solana green
  },
  {
    symbol: 'BNB',
    name: 'Binance Coin',
    price: 592.10,
    change: +4.82,
    pct: +0.82,
    high: 598.50,
    low: 585.30,
    marketCap: 88000000000,
    volume: 1900000000,
    spark: [42, 44, 43, 46, 45, 48, 47, 50, 49, 52, 51, 54],
    color: '#f0b90b', // Binance yellow
  },
  {
    symbol: 'XRP',
    name: 'Ripple',
    price: 0.6218,
    change: -0.0069,
    pct: -1.10,
    high: 0.6340,
    low: 0.6180,
    marketCap: 34000000000,
    volume: 1500000000,
    spark: [58, 56, 54, 56, 53, 51, 52, 50, 48, 49, 47, 45],
    color: '#23292f', // XRP dark
  },
  {
    symbol: 'DOGE',
    name: 'Dogecoin',
    price: 0.1584,
    change: +0.0078,
    pct: +5.20,
    high: 0.1620,
    low: 0.1500,
    marketCap: 23000000000,
    volume: 890000000,
    spark: [28, 30, 32, 30, 35, 38, 36, 42, 45, 43, 48, 52],
    color: '#c2a633', // Dogecoin gold
  },
];

export default function CryptoPage() {
  const gainers = cryptos.filter((c) => c.change > 0).length;
  const losers = cryptos.filter((c) => c.change < 0).length;
  const totalCap = cryptos.reduce((sum, c) => sum + c.marketCap, 0);
  const totalVolume = cryptos.reduce((sum, c) => sum + c.volume, 0);
  const topGainer = [...cryptos].sort((a, b) => b.pct - a.pct)[0];
  const topLoser = [...cryptos].sort((a, b) => a.pct - b.pct)[0];

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-950 flex items-center justify-center">
            <Bitcoin className="text-orange-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-white">Crypto</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Live cryptocurrency prices
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950 text-xs font-medium text-green-700 dark:text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Live
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Market Cap"
          value={`$${(totalCap / 1e12).toFixed(2)}T`}
          sub="All coins"
          icon={<DollarSign size={18} />}
          color="orange"
        />
        <SummaryCard
          label="24h Volume"
          value={`$${(totalVolume / 1e9).toFixed(1)}B`}
          sub="Global"
          icon={<BarChart3 size={18} />}
          color="blue"
        />
        <SummaryCard
          label="Top Gainer"
          value={topGainer.symbol}
          sub={`+${topGainer.pct.toFixed(2)}%`}
          icon={<TrendingUp size={18} />}
          color="green"
        />
        <SummaryCard
          label="Top Loser"
          value={topLoser.symbol}
          sub={`${topLoser.pct.toFixed(2)}%`}
          icon={<TrendingDown size={18} />}
          color="red"
        />
      </div>

      {/* Filter row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <FilterTab active>All ({cryptos.length})</FilterTab>
          <FilterTab>Gainers ({gainers})</FilterTab>
          <FilterTab>Losers ({losers})</FilterTab>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Updated just now
        </span>
      </div>

      {/* Crypto Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cryptos.map((c) => (
          <CryptoCard key={c.symbol} crypto={c} />
        ))}
      </div>
    </div>
  );
}

/* ===== Summary Card ===== */
const summaryColors = {
  orange: 'bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400',
  blue:   'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  green:  'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  red:    'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400',
} as const;

function SummaryCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  color: keyof typeof summaryColors;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800">
      <div className="flex items-center justify-between mb-3">
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center ${summaryColors[color]}`}
        >
          {icon}
        </div>
        <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
          {sub}
        </span>
      </div>
      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{label}</p>
      <p className="text-xl font-bold dark:text-white">{value}</p>
    </div>
  );
}

/* ===== Filter Tab ===== */
function FilterTab({
  children,
  active,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      className={`px-4 py-2 rounded-xl text-sm font-medium border transition ${
        active
          ? 'bg-[#01245E] text-white border-[#01245E]'
          : 'bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
      }`}
    >
      {children}
    </button>
  );
}