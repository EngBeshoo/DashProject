import {
  Globe,
  TrendingUp,
  TrendingDown,
  Activity,
  Award,
  BarChart3,
} from 'lucide-react';
import MarketCard from '../components/markets/MarketCard';

const markets = [
  {
    name: 'S&P 500',
    value: 5234.18,
    change: 42.55,
    pct: 0.82,
    high: 5250.30,
    low: 5180.10,
    volume: 2340000000,
    region: 'US',
    flag: '🇺🇸',
    currency: 'USD',
    open: true,
    spark: [48, 50, 49, 52, 51, 53, 55, 54, 56, 58, 57, 60],
  },
  {
    name: 'NASDAQ',
    value: 16428.82,
    change: 201.45,
    pct: 1.24,
    high: 16520.00,
    low: 16280.50,
    volume: 3180000000,
    region: 'US',
    flag: '🇺🇸',
    currency: 'USD',
    open: true,
    spark: [42, 45, 43, 48, 50, 49, 52, 55, 53, 58, 60, 63],
  },
  {
    name: 'Dow Jones',
    value: 39118.86,
    change: -58.72,
    pct: -0.15,
    high: 39250.10,
    low: 39010.40,
    volume: 1450000000,
    region: 'US',
    flag: '🇺🇸',
    currency: 'USD',
    open: true,
    spark: [58, 57, 60, 58, 56, 57, 55, 56, 54, 55, 53, 54],
  },
  {
    name: 'FTSE 100',
    value: 8142.30,
    change: 27.80,
    pct: 0.34,
    high: 8160.00,
    low: 8105.50,
    volume: 890000000,
    region: 'UK',
    flag: '🇬🇧',
    currency: 'GBP',
    open: false,
    spark: [45, 47, 46, 49, 48, 50, 51, 49, 52, 53, 52, 54],
  },
  {
    name: 'DAX',
    value: 18234.55,
    change: -76.42,
    pct: -0.42,
    high: 18380.00,
    low: 18180.20,
    volume: 720000000,
    region: 'DE',
    flag: '🇩🇪',
    currency: 'EUR',
    open: true,
    spark: [60, 58, 61, 59, 57, 58, 56, 55, 57, 54, 53, 52],
  },
  {
    name: 'Nikkei 225',
    value: 39821.20,
    change: 432.15,
    pct: 1.10,
    high: 39920.50,
    low: 39400.10,
    volume: 1180000000,
    region: 'JP',
    flag: '🇯🇵',
    currency: 'JPY',
    open: false,
    spark: [38, 42, 40, 46, 48, 47, 52, 55, 53, 58, 60, 62],
  },
  {
    name: 'Hang Seng',
    value: 17201.55,
    change: -117.85,
    pct: -0.68,
    high: 17380.20,
    low: 17150.40,
    volume: 950000000,
    region: 'HK',
    flag: '🇭🇰',
    currency: 'HKD',
    open: false,
    spark: [62, 60, 58, 61, 57, 55, 53, 55, 52, 50, 51, 48],
  },
  {
    name: 'CAC 40',
    value: 7982.40,
    change: 17.60,
    pct: 0.22,
    high: 8005.80,
    low: 7950.30,
    volume: 580000000,
    region: 'FR',
    flag: '🇫🇷',
    currency: 'EUR',
    open: true,
    spark: [46, 48, 47, 50, 49, 51, 53, 52, 54, 55, 54, 56],
  },
];

export default function MarketsPage() {
  const gainers = markets.filter((m) => m.change > 0).length;
  const losers = markets.filter((m) => m.change < 0).length;
  const openMarkets = markets.filter((m) => m.open).length;
  const topPerformer = [...markets].sort((a, b) => b.pct - a.pct)[0];
  const worstPerformer = [...markets].sort((a, b) => a.pct - b.pct)[0];

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center">
            <Globe className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold dark:text-white">Markets</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Global market indices
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950 text-xs font-medium text-green-700 dark:text-green-400">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          {openMarkets} markets open
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard
          label="Total Indices"
          value={markets.length.toString()}
          sub={`${openMarkets} open`}
          icon={<Activity size={18} />}
          color="blue"
        />
        <SummaryCard
          label="Gainers"
          value={gainers.toString()}
          sub={`${((gainers / markets.length) * 100).toFixed(0)}%`}
          icon={<TrendingUp size={18} />}
          color="green"
        />
        <SummaryCard
          label="Top Performer"
          value={topPerformer.name.split(' ')[0]}
          sub={`+${topPerformer.pct.toFixed(2)}%`}
          icon={<Award size={18} />}
          color="yellow"
        />
        <SummaryCard
          label="Worst Performer"
          value={worstPerformer.name.split(' ')[0]}
          sub={`${worstPerformer.pct.toFixed(2)}%`}
          icon={<TrendingDown size={18} />}
          color="red"
        />
      </div>

      {/* Filter Row */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <FilterTab active>All ({markets.length})</FilterTab>
          <FilterTab>Americas</FilterTab>
          <FilterTab>Europe</FilterTab>
          <FilterTab>Asia</FilterTab>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {losers} declining
        </span>
      </div>

      {/* Market Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {markets.map((m) => (
          <MarketCard key={m.name} market={m} />
        ))}
      </div>
    </div>
  );
}

/* ===== Summary Card ===== */
const summaryColors = {
  blue:   'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400',
  green:  'bg-green-50 dark:bg-green-950/40 text-green-600 dark:text-green-400',
  yellow: 'bg-yellow-50 dark:bg-yellow-950/40 text-yellow-600 dark:text-yellow-400',
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
      <p className="text-xl font-bold dark:text-white truncate">{value}</p>
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