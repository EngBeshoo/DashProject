"use client";

import React from "react";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-30 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:ml-64">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Logo Space */}
          <div className="w-10 lg:hidden" />

          {/* Search */}
          <div className="hidden sm:block">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search..."
                className="
                  h-10 w-56 rounded-xl
                  border border-slate-200
                  bg-slate-50
                  pl-10 pr-4
                  text-sm text-slate-700
                  outline-none
                  transition
                  placeholder:text-slate-400
                  focus:border-[#01245E]
                  focus:bg-white
                  focus:ring-2
                  focus:ring-[#01245E]/10
                  lg:w-72
                "
              />
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mobile Search */}
          <button
            className="
              flex h-10 w-10 items-center justify-center
              rounded-xl text-slate-600
              transition hover:bg-slate-100
              sm:hidden
            "
          >
            <Search size={20} />
          </button>

          {/* Notification */}
          <button
            className="
              relative flex h-10 w-10 items-center justify-center
              rounded-xl text-slate-600
              transition hover:bg-slate-100
            "
          >
            <Bell size={20} />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Profile */}
          <button
            className="
              flex items-center gap-3 rounded-xl
              p-1.5 pr-2
              transition hover:bg-slate-50
            "
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#01245E] text-sm font-bold text-white">
              B
            </div>

            {/* Name */}
            <div className="hidden text-left sm:block">
              <p className="text-sm font-semibold text-slate-800">
                Beshoy
              </p>

              <p className="text-xs text-slate-500">
                Trader
              </p>
            </div>

            <ChevronDown
              size={17}
              className="hidden text-slate-400 sm:block"
            />
          </button>
        </div>
      </div>
    </nav>
  );
}