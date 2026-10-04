'use client';

import { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Palette,
  Shield,
  Save,
  Check,
} from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const [prefs, setPrefs] = useState({
    emailAlerts: true,
    priceAlerts: true,
    newsAlerts: false,
    weeklyReport: true,
    twoFactor: false,
    publicProfile: true,
  });

  const [currency, setCurrency] = useState('USD');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-6 pt-20 lg:pt-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-zinc-800 flex items-center justify-center">
          <SettingsIcon className="text-gray-700 dark:text-gray-300" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Settings</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your account &amp; preferences
          </p>
        </div>
      </div>

      {/* Profile */}
      <Section icon={<User size={18} />} title="Profile">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#01245E] text-white flex items-center justify-center text-2xl font-bold">
            B
          </div>
          <div className="flex-1">
            <p className="font-semibold dark:text-white">Beshoy</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
Beshoy@gmail.com
            </p>
          </div>
          <button className="rounded-xl border border-gray-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition dark:text-white">
            Edit
          </button>
        </div>
      </Section>

      {/* Notifications */}
      <Section icon={<Bell size={18} />} title="Notifications">
        <Toggle
          label="Email Alerts"
          desc="Receive alerts on your email"
          value={prefs.emailAlerts}
          onChange={() => toggle('emailAlerts')}
        />
        <Toggle
          label="Price Alerts"
          desc="Notify when price hits your target"
          value={prefs.priceAlerts}
          onChange={() => toggle('priceAlerts')}
        />
        <Toggle
          label="News Alerts"
          desc="Breaking market news"
          value={prefs.newsAlerts}
          onChange={() => toggle('newsAlerts')}
        />
        <Toggle
          label="Weekly Report"
          desc="Summary every Monday"
          value={prefs.weeklyReport}
          onChange={() => toggle('weeklyReport')}
        />
      </Section>

      {/* Preferences */}
      <Section icon={<Palette size={18} />} title="Preferences">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SelectField
            label="Currency"
            value={currency}
            onChange={setCurrency}
            options={[
              { value: 'USD', label: 'USD — US Dollar' },
              { value: 'EUR', label: 'EUR — Euro' },
              { value: 'EGP', label: 'EGP — Egyptian Pound' },
              { value: 'GBP', label: 'GBP — British Pound' },
            ]}
          />
          <SelectField
            label="Language"
            value={language}
            onChange={setLanguage}
            options={[
              { value: 'en', label: 'English' },
              { value: 'ar', label: 'العربية' },
              { value: 'fr', label: 'Français' },
            ]}
          />
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium dark:text-white mb-2">Theme</p>
          <div className="flex gap-2">
            {['light', 'dark', 'system'].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition capitalize ${
                  theme === t
                    ? 'bg-[#01245E] text-white border-[#01245E]'
                    : 'border-gray-200 dark:border-zinc-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-zinc-800'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Security */}
      <Section icon={<Shield size={18} />} title="Security">
        <Toggle
          label="Two-Factor Authentication"
          desc="Add an extra layer of security"
          value={prefs.twoFactor}
          onChange={() => toggle('twoFactor')}
        />
        <Toggle
          label="Public Profile"
          desc="Let others see your portfolio"
          value={prefs.publicProfile}
          onChange={() => toggle('publicProfile')}
        />

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-xl border border-gray-200 dark:border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition dark:text-white">
            Change Password
          </button>
          <button className="rounded-xl border border-red-200 dark:border-red-900 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition">
            Delete Account
          </button>
        </div>
      </Section>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className={`inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-md transition ${
            saved ? 'bg-green-600' : 'bg-[#01245E] hover:bg-[#01347D]'
          }`}
        >
          {saved ? <Check size={18} /> : <Save size={18} />}
          {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

/* ===== Reusable Components ===== */

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 shadow border border-gray-100 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-zinc-800">
        <span className="text-gray-700 dark:text-gray-300">{icon}</span>
        <h2 className="font-semibold dark:text-white">{title}</h2>
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Toggle({
  label,
  desc,
  value,
  onChange,
}: {
  label: string;
  desc: string;
  value: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex-1">
        <p className="text-sm font-medium dark:text-white">{label}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{desc}</p>
      </div>
      <button
        onClick={onChange}
        className={`relative w-11 h-6 rounded-full transition-colors shrink-0 ${
          value ? 'bg-[#01245E]' : 'bg-gray-300 dark:bg-zinc-700'
        }`}
        aria-checked={value}
        role="switch"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
            value ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div>
      <label className="text-sm font-medium dark:text-white mb-2 block">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2.5 text-sm dark:text-white outline-none focus:ring-2 focus:ring-[#01245E]/20 focus:border-[#01245E] transition"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}