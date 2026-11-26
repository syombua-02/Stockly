import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Header'

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(
    () => window.innerWidth < 768
  )

  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(previous => !previous)}
      />

      <div className="flex min-w-0 flex-1 flex-col">

        <Header />

        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>

      </div>
    </div>
  )
}