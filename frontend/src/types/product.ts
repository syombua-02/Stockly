export interface Product {
  id: string
  name: string
  sku: string
  category: string
  costPrice: number
  sellingPrice: number
  quantity: number
  reorderLevel: number
  supplier: string
  createdAt: string
}

export type StockStatus =
  | 'In Stock'
  | 'Low Stock'
  | 'Out of Stock'

export function getStockStatus(
  product: Product
): StockStatus {
  if (product.quantity === 0) {
    return 'Out of Stock'
  }

  if (product.quantity <= product.reorderLevel) {
    return 'Low Stock'
  }

  return 'In Stock'
}