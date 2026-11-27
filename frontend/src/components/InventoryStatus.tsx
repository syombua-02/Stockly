import {
  PackageCheck,
  TriangleAlert,
  PackageX,
} from 'lucide-react'

import { Link } from 'react-router-dom'

const inventoryData = [
  {
    label: 'In Stock',
    count: 230,
    icon: PackageCheck,
    color: 'text-emerald-600',
    background: 'bg-emerald-50',
    bar: 'bg-emerald-500',
  },
  {
    label: 'Low Stock',
    count: 12,
    icon: TriangleAlert,
    color: 'text-amber-600',
    background: 'bg-amber-50',
    bar: 'bg-amber-500',
  },
  {
    label: 'Out of Stock',
    count: 6,
    icon: PackageX,
    color: 'text-red-600',
    background: 'bg-red-50',
    bar: 'bg-red-500',
  },
]

const totalProducts = inventoryData.reduce(
  (total, item) => total + item.count,
  0
)

export default function InventoryStatus() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="text-lg font-semibold text-slate-900">
        Inventory Status
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Overview of available stock
      </p>

      <div className="my-6">
        <p className="text-4xl font-bold text-slate-900">
          {totalProducts}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          Total products
        </p>
      </div>

      <div className="space-y-6">

        {inventoryData.map(item => {
          const Icon = item.icon
          const percentage = (item.count / totalProducts) * 100

          return (
            <div key={item.label}>

              <div className="mb-3 flex items-center justify-between gap-2">

                <div className="flex items-center gap-3">

                  <div
                    className={`rounded-lg p-2 ${item.background} ${item.color}`}
                  >
                    <Icon size={20} />
                  </div>

                  <span className="text-sm font-medium text-slate-600">
                    {item.label}
                  </span>

                </div>

                <span className="font-semibold text-slate-900">
                  {item.count}
                </span>

              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100">

                <div
                  className={`h-full rounded-full ${item.bar}`}
                  style={{ width: `${percentage}%` }}
                />

              </div>

            </div>
          )
        })}

      </div>

      <Link
        to="/inventory"
        className="mt-8 block w-full rounded-xl border border-emerald-200 py-3 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
      >
        Manage Inventory
      </Link>

    </section>
  )
}