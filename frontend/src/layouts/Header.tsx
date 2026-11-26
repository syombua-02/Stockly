import { Search, Bell, ChevronDown } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 md:px-8">

      <div className="relative w-full max-w-md">
        <Search
          size={20}
          className="absolute left-3 top-3 text-slate-400"
        />

        <input
          type="search"
          aria-label="Search workspace"
          placeholder="Search anything..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex items-center gap-4">

        <button
          aria-label="Notifications"
          className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
        >
          <Bell size={23} />

          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="h-9 w-px bg-slate-200" />

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-semibold text-emerald-700">
            AD
          </div>

          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800">
              Admin
            </p>

            <p className="text-xs text-slate-400">
              Store Manager
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 md:block"
          />
        </div>
      </div>
    </header>
  )
} 