import { Pencil, Trash2 } from 'lucide-react'
import type { Product } from '../types/product'
import { getStockStatus } from '../types/product'
import { formatCurrency } from '../utils/formatCurrency'

interface ProductTableProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
}

const statusStyles = {
  'In Stock': 'bg-emerald-50 text-emerald-700',
  'Low Stock': 'bg-amber-50 text-amber-700',
  'Out of Stock': 'bg-red-50 text-red-700',
}

export default function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

      <div className="overflow-x-auto">

        <table className="w-full min-w-[950px] text-left text-sm">

          <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
            <tr>
              {[
                'Product',
                'SKU',
                'Category',
                'Cost Price',
                'Selling Price',
                'Quantity',
                'Status',
                'Actions',
              ].map(heading => (
                <th
                  key={heading}
                  className="p-4 font-medium"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {products.map(product => {
              const status = getStockStatus(product)

              return (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  <td className="p-4">
                    <p className="font-semibold text-slate-900">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {product.supplier}
                    </p>
                  </td>

                  <td className="p-4 text-slate-500">
                    {product.sku}
                  </td>

                  <td className="p-4 text-slate-600">
                    {product.category}
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    {formatCurrency(product.costPrice)}
                  </td>

                  <td className="p-4 font-semibold whitespace-nowrap">
                    {formatCurrency(product.sellingPrice)}
                  </td>

                  <td className="p-4">
                    {product.quantity}
                  </td>

                  <td className="p-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium whitespace-nowrap ${statusStyles[status]}`}
                    >
                      {status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">

                      <button
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-emerald-50 hover:text-emerald-600"
                      >
                        <Pencil size={17} />
                      </button>

                      <button
                        onClick={() => onDelete(product.id)}
                        aria-label={`Delete ${product.name}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>

                    </div>
                  </td>

                </tr>
              )
            })}

            {products.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="p-12 text-center text-slate-500"
                >
                  No products found.
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>
    </div>
  )
}