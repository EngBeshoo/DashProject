'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from '../../components/ThemeToggle';
import {
  LayoutDashboard,
  TrendingUp,
  Bitcoin,
  Globe,
  Star,
  Bell,
  Newspaper,
  BarChart3,
  Settings,
  X,
  Menu,
  LogOut,
  LineChart,
} from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: React.ElementType;
};

const mainPaths: NavItem[] = [
  { href: '/',          label: 'Dashboard', icon: LayoutDashboard },
  { href: '/stocks',    label: 'Stocks',    icon: TrendingUp },  // ← stocks مش stock
  { href: '/crypto',    label: 'Crypto',    icon: Bitcoin },
  { href: '/markets',   label: 'Markets',   icon: Globe },
  { href: '/watchlist', label: 'Watchlist', icon: Star },
  { href: '/alerts',    label: 'Alerts',    icon: Bell },
];

const managementPaths: NavItem[] = [
  { href: '/news',      label: 'News',      icon: Newspaper },
  { href: '/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/settings',  label: 'Settings',  icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const renderItem = (item: NavItem) => {
    const Icon = item.icon;
    const active = isActive(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setOpen(false)}
        className={`
          group flex items-center gap-3 rounded-xl px-3 py-3
          text-sm font-medium transition-all duration-200
          ${
            active
              ? 'bg-white text-[#01245E] shadow-sm'
              : 'text-blue-100 hover:bg-white/10 hover:text-white'
          }
        `}
      >
        <Icon
          size={20}
          strokeWidth={active ? 2.5 : 2}
          className={
            active ? 'text-[#01245E]' : 'text-blue-200 group-hover:text-white'
          }
        />
        <span>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(true)}
        type="button"
        aria-label="Open menu"
        className="fixed left-4 top-4 z-50 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#01245E] text-white shadow-md transition hover:bg-[#01347D] lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          bg-[#01245E] text-white shadow-xl
          transition-transform duration-300
          lg:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Logo + Theme Toggle */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                <LineChart size={22} />
              </div>
              <div>
                <h1 className="text-lg font-bold tracking-wide">MarketHub</h1>
                <p className="text-xs text-blue-200">Stocks &amp; Crypto</p>
              </div>
            </Link>

            <div className="flex items-center gap-1">
              <ThemeToggle />

              {/* Close mobile */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-2 text-blue-100 hover:bg-white/10 lg:hidden"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto px-3 py-6">
            <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Main Menu
            </p>
            <nav className="space-y-1.5">{mainPaths.map(renderItem)}</nav>

            <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Management
            </p>
            <nav className="space-y-1.5">
              {managementPaths.map(renderItem)}
            </nav>
          </div>

          {/* Profile */}
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-3 rounded-xl bg-white/5 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-[#01245E]">
                M
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">Beshoy</p>
                <p className="truncate text-xs text-blue-200">Trader</p>
              </div>
              <button
                title="Logout"
                aria-label="Logout"
                className="rounded-lg p-2 text-blue-200 transition hover:bg-white/10 hover:text-white"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}