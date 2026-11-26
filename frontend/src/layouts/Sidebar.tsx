import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  ChartNoAxesCombined,
  Truck,
  Settings,
  PanelLeftClose,
  PanelLeftOpen,
  Boxes,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { name: 'Overview', path: '/', icon: LayoutDashboard },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'Sales', path: '/sales', icon: ShoppingCart },
  { name: 'Analytics', path: '/analytics', icon: ChartNoAxesCombined },
  { name: 'Suppliers', path: '/suppliers', icon: Truck },
  { name: 'Settings', path: '/settings', icon: Settings },
]

export default function Sidebar({
  collapsed,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={`sticky top-0 flex h-screen shrink-0 flex-col border-r border-slate-200 bg-white transition-all duration-300 ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      <div className="flex h-20 items-center justify-center gap-3 border-b border-slate-100">
        <div className="rounded-xl bg-emerald-600 p-2 text-white">
          <Boxes size={24} />
        </div>

        {!collapsed && (
          <h1 className="text-2xl font-bold text-slate-900">
            Stockly<span className="text-emerald-600">.</span>
          </h1>
        )}
      </div>

      <nav className="flex-1 space-y-2 p-3">
        {!collapsed && (
          <p className="px-3 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
            Workspace
          </p>
        )}

        {menuItems.map(({ name, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            title={name}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-4 py-3 transition-colors ${
                collapsed ? 'justify-center' : ''
              } ${
                isActive
                  ? 'bg-emerald-50 font-semibold text-emerald-700'
                  : 'text-slate-500 hover:bg-slate-100'
              }`
            }
          >
            <Icon size={21} />

            {!collapsed && <span>{name}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex w-full items-center justify-center gap-3 rounded-xl p-3 text-slate-500 hover:bg-slate-100"
        >
          {collapsed ? (
            <PanelLeftOpen size={21} />
          ) : (
            <>
              <PanelLeftClose size={21} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}