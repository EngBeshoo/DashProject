export type Aggregate = {
  c: number; // close
  o: number; // open
  h: number; // high
  l: number; // low
  t: number; // timestamp
  v: number; // volume
};

export type PrevResponse = {
  ticker: string;
  status: string;
  results?: Aggregate[];
};

/**
 * بيجيب آخر إغلاق لأي ticker (مش AAPL بس)
 */
export async function getTicker(ticker: string): Promise<PrevResponse> {
  const apiKey = "1_XngRzYqejABmROPdKsTDhYLHTpTQRt";

  if (!apiKey) {
    throw new Error('MASSIVE_API_KEY is not set in .env.local');
  }

  const res = await fetch(
    `https://api.massive.com/v2/aggs/ticker/${ticker}/prev?apiKey=${apiKey}`,
    { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`Massive API error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

/**
 * alias للصفحة الرئيسية (Dashboard) — بتجيب AAPL
 */
export async function getDash(): Promise<PrevResponse> {
  return getTicker('AAPL');
}