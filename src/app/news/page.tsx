import { Newspaper, Clock, ArrowUpRight, TrendingUp, TrendingDown } from 'lucide-react';

const news = [
  {
    id: 1,
    title: 'Apple reports record Q4 earnings, beats expectations',
    source: 'Bloomberg',
    time: '15 min ago',
    sentiment: 'positive',
    ticker: 'AAPL',
  },
  {
    id: 2,
    title: 'NVIDIA announces new AI chip architecture',
    source: 'Reuters',
    time: '1 hour ago',
    sentiment: 'positive',
    ticker: 'NVDA',
  },
  {
    id: 3,
    title: 'Tesla faces production delays in Berlin factory',
    source: 'CNBC',
    time: '3 hours ago',
    sentiment: 'negative',
    ticker: 'TSLA',
  },
  {
    id: 4,
    title: 'Bitcoin ETF inflows hit new monthly high',
    source: 'CoinDesk',
    time: '5 hours ago',
    sentiment: 'positive',
    ticker: 'BTC',
  },
  {
    id: 5,
    title: 'Fed signals potential rate cut in coming months',
    source: 'WSJ',
    time: '8 hours ago',
    sentiment: 'neutral',
    ticker: 'MKT',
  },
  {
    id: 6,
    title: 'Amazon expands logistics network in Europe',
    source: 'FT',
    time: '12 hours ago',
    sentiment: 'positive',
    ticker: 'AMZN',
  },
];

export default function NewsPage() {
  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
          <Newspaper className="text-purple-600" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">News</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Latest market headlines
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {news.map((n) => {
          const isPositive = n.sentiment === 'positive';
          const isNegative = n.sentiment === 'negative';

          return (
            <article
              key={n.id}
              className="group bg-white dark:bg-zinc-900 rounded-2xl p-5 shadow border border-gray-100 dark:border-zinc-800 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-400">
                      {n.ticker}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {n.source}
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition mb-2">
                    {n.title}
                  </h3>

                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock size={12} />
                      {n.time}
                    </span>
                    {isPositive && (
                      <span className="flex items-center gap-1 text-green-600 font-medium">
                        <TrendingUp size={12} />
                        Bullish
                      </span>
                    )}
                    {isNegative && (
                      <span className="flex items-center gap-1 text-red-600 font-medium">
                        <TrendingDown size={12} />
                        Bearish
                      </span>
                    )}
                  </div>
                </div>

                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-zinc-800 flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition shrink-0">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}