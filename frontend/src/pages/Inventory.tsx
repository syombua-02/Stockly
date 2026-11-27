import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import ProductTable from '../components/ProductTable'
import StatCard from '../components/StatCard'
import { initialProducts } from '../data/products'
import { getStockStatus } from '../types/product'
import { formatCurrency } from '../utils/formatCurrency'

export default function Inventory() {
  const [products, setProducts] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')

  const categories = [
    'All',
    ...new Set(products.map(product => product.category)),
  ]

  const filteredProducts = products.filter(product => {
    const query = search.toLowerCase()

    const matchesSearch =
      product.name.toLowerCase().includes(query) ||
      product.sku.toLowerCase().includes(query) ||
      product.supplier.toLowerCase().includes(query)

    const matchesCategory =
      category === 'All' ||
      product.category === category

    return matchesSearch && matchesCategory
  })

  const inventoryValue = products.reduce(
    (total, product) =>
      total + product.costPrice * product.quantity,
    0
  )

  const lowStock = products.filter(
    product => getStockStatus(product) === 'Low Stock'
  ).length

  const outOfStock = products.filter(
    product => getStockStatus(product) === 'Out of Stock'
  ).length

  function deleteProduct(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this product?'
    )

    if (confirmed) {
      setProducts(previous =>
        previous.filter(product => product.id !== id)
      )
    }
  }

  return (
    <div>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>
          <p className="text-sm font-medium text-emerald-600">
            Stock management
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            Inventory
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your products and monitor stock levels.
          </p>
        </div>

        <button
          onClick={() => alert('Product form coming next')}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-700"
        >
          <Plus size={20} />
          Add Product
        </button>

      </div>

      <section className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Products"
          value={String(products.length)}
          description="Product catalogue"
        />

        <StatCard
          title="Inventory Value"
          value={formatCurrency(inventoryValue)}
          description="Total acquisition cost"
        />

        <StatCard
          title="Low Stock"
          value={String(lowStock)}
          description="Requires restocking"
        />

        <StatCard
          title="Out of Stock"
          value={String(outOfStock)}
          description="Unavailable products"
        />

      </section>

      <section className="mb-5 flex flex-wrap gap-4">

        <div className="relative min-w-0 flex-1">

          <Search
            size={20}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search products..."
            aria-label="Search products"
            value={search}
            onChange={event => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500"
          />

        </div>

        <select
          aria-label="Filter by category"
          value={category}
          onChange={event => setCategory(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-emerald-500"
        >
          {categories.map(item => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>

      </section>

      <ProductTable
        products={filteredProducts}
        onEdit={product =>
          alert(`Editing ${product.name} — coming next`)
        }
        onDelete={deleteProduct}
      />

      <p className="mt-4 text-sm text-slate-500">
        Showing {filteredProducts.length} of {products.length} products
      </p>

    </div>
  )
}