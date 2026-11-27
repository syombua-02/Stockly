import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<DashboardLayout />}>

          <Route index element={<Dashboard />} />

          <Route path="inventory" element={<Inventory />} />

          <Route
            path="sales"
            element={<h1 className="text-3xl font-bold">Sales</h1>}
          />

          <Route
            path="analytics"
            element={<h1 className="text-3xl font-bold">Analytics</h1>}
          />

          <Route
            path="suppliers"
            element={<h1 className="text-3xl font-bold">Suppliers</h1>}
          />

          <Route
            path="settings"
            element={<h1 className="text-3xl font-bold">Settings</h1>}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}