import { createContext } from 'react'
import type { Product } from '../types/product'

export interface InventoryContextType {
  products: Product[]
  addProduct: (product: Product) => void
  updateProduct: (product: Product) => void
  removeProduct: (id: string) => void
}

export const InventoryContext =
  createContext<InventoryContextType | undefined>(undefined)