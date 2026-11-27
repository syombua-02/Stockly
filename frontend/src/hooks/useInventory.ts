import { useState, useEffect } from 'react'
import type { Product } from '../types/product'
import { initialProducts } from '../data/products'

const STORAGE_KEY = 'stockly_inventory'

export function useInventory() {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY)

      return savedProducts
        ? JSON.parse(savedProducts)
        : initialProducts
    } catch {
      return initialProducts
    }
  })

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(products)
    )
  }, [products])

  function addProduct(product: Product) {
    setProducts(previous => [...previous, product])
  }

  function updateProduct(updatedProduct: Product) {
    setProducts(previous =>
      previous.map(product =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    )
  }

  function removeProduct(id: string) {
    setProducts(previous =>
      previous.filter(product => product.id !== id)
    )
  }

  return {
    products,
    addProduct,
    updateProduct,
    removeProduct,
  }
}