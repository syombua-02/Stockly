import { useState } from 'react'
import type { FormEvent } from 'react'
import { X } from 'lucide-react'
import type { Product } from '../types/product'

interface ProductFormProps {
  product: Product | null
  products: Product[]
  onSave: (product: Product) => void
  onClose: () => void
}

export default function ProductForm({
  product,
  products,
  onSave,
  onClose,
}: ProductFormProps) {
  const [form, setForm] = useState({
    name: product?.name ?? '',
    sku: product?.sku ?? '',
    category: product?.category ?? '',
    costPrice: String(product?.costPrice ?? ''),
    sellingPrice: String(product?.sellingPrice ?? ''),
    quantity: String(product?.quantity ?? ''),
    reorderLevel: String(product?.reorderLevel ?? 5),
    supplier: product?.supplier ?? '',
  })

  const [error, setError] = useState('')

  const fields = [
    { name: 'name', label: 'Product Name', type: 'text' },
    { name: 'sku', label: 'SKU', type: 'text' },
    { name: 'category', label: 'Category', type: 'text' },
    { name: 'supplier', label: 'Supplier', type: 'text' },
    { name: 'costPrice', label: 'Cost Price (KES)', type: 'number' },
    { name: 'sellingPrice', label: 'Selling Price (KES)', type: 'number' },
    { name: 'quantity', label: 'Stock Quantity', type: 'number' },
    { name: 'reorderLevel', label: 'Reorder Level', type: 'number' },
  ] as const

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const hasEmptyFields = Object.values(form).some(
      value => value.trim() === ''
    )

    if (hasEmptyFields) {
      setError('Please complete all fields.')
      return
    }

    const duplicateSku = products.some(
      item =>
        item.sku.toLowerCase() === form.sku.trim().toLowerCase() &&
        item.id !== product?.id
    )

    if (duplicateSku) {
      setError('A product with this SKU already exists.')
      return
    }

    const costPrice = Number(form.costPrice)
    const sellingPrice = Number(form.sellingPrice)
    const quantity = Number(form.quantity)
    const reorderLevel = Number(form.reorderLevel)

    if (
      [costPrice, sellingPrice, quantity, reorderLevel].some(
        value => !Number.isFinite(value) || value < 0
      )
    ) {
      setError('Please enter valid, non-negative numbers.')
      return
    }

    if (
      !Number.isInteger(quantity) ||
      !Number.isInteger(reorderLevel)
    ) {
      setError('Stock quantity and reorder level must be whole numbers.')
      return
    }

    onSave({
      id: product?.id ?? crypto.randomUUID(),
      name: form.name.trim(),
      sku: form.sku.trim().toUpperCase(),
      category: form.category.trim(),
      supplier: form.supplier.trim(),
      costPrice,
      sellingPrice,
      quantity,
      reorderLevel,
      createdAt: product?.createdAt ?? new Date().toISOString(),
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-form-title"
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-xl"
      >

        <div className="flex items-center justify-between border-b border-slate-200 p-6">

          <div>
            <h2
              id="product-form-title"
              className="text-xl font-bold text-slate-900"
            >
              {product ? 'Edit Product' : 'Add Product'}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the product information below.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close form"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
          >
            <X size={22} />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="p-6">

          {error && (
            <div
              role="alert"
              className="mb-5 rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

            {fields.map(field => (
              <div key={field.name}>

                <label
                  htmlFor={field.name}
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  {field.label}
                </label>

                <input
                  id={field.name}
                  type={field.type}
                  value={form[field.name]}
                  required
                  min={field.type === 'number' ? 0 : undefined}
                  step={
                    field.name === 'costPrice' ||
                    field.name === 'sellingPrice'
                      ? '0.01'
                      : field.type === 'number'
                        ? '1'
                        : undefined
                  }
                  onChange={event =>
                    setForm(previous => ({
                      ...previous,
                      [field.name]: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                />

              </div>
            ))}

          </div>

          <div className="mt-8 flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
            >
              {product ? 'Save Changes' : 'Add Product'}
            </button>

          </div>

        </form>

      </div>

    </div>
  )
}