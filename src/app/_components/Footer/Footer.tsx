import Link from 'next/link';
import {
  LineChart,
  Mail,
  Heart,
} from 'lucide-react';

const productLinks = [
  { href: '/',          label: 'Dashboard' },
  { href: '/stock',    label: 'Stocks' },
  { href: '/crypto',    label: 'Crypto' },
  { href: '/markets',   label: 'Markets' },
];

const resourcesLinks = [
  { href: '/news',      label: 'News' },
  { href: '/analytics', label: 'Analytics' },
  { href: '/watchlist', label: 'Watchlist' },
  { href: '/alerts',    label: 'Alerts' },
];

const companyLinks = [
  { href: '/about',    label: 'About' },
  { href: '/contact',  label: 'Contact' },
  { href: '/privacy',  label: 'Privacy Policy' },
  { href: '/terms',    label: 'Terms of Service' },
];



export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#01245E] text-white border-t border-white/10 lg:ms-64">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <LineChart size={22} />
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-wide">MarketHub</h2>
                <p className="text-xs text-blue-200">Stocks &amp; Crypto</p>
              </div>
            </Link>

            <p className="text-sm text-blue-100/80 leading-relaxed max-w-sm">
              Track live market data, build your watchlist, and stay updated
              with everything happening in stocks and crypto — all in one place.
            </p>

          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">
              Product
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-100/80 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">
              Resources
            </h3>
            <ul className="space-y-2.5">
              {resourcesLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-100/80 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-300 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-blue-100/80 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-white/10" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-200/70">
            © {year} MarketHub. All rights reserved.
          </p>

          <p className="text-xs text-blue-200/70 flex items-center gap-1.5">
            Made with
            <Heart size={12} className="fill-red-500 text-red-500" />
            using Next.js &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}