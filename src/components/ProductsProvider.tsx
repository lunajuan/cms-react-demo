import React, { createContext, useContext, ReactNode } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useUndo from '../data/useUndo'
import sampleData from '../sample-data'
import { useNotifications } from './NoficationsContext'

type ProductsValue = {
  products: any[]
  addProduct: (newProduct: any) => void
  removeProduct: (product: any) => void
}

const ProductsContext = createContext<ProductsValue>({
  products: [],
  addProduct: () => undefined,
  removeProduct: () => undefined,
})
ProductsContext.displayName = 'ProductsContext'

function ProductsProvider({ children }: { children: ReactNode }) {
  const {
    undoHistory: products,
    undo,
    addEntry,
    removeEntry,
    updateEntry,
  } = useUndo<any>(sampleData)
  const { addNotification } = useNotifications()

  const addProduct = (product: any) => {
    addEntry(product)
    addNotification({ id: uuidv4(), title: 'Product Added!', action: undo })
  }

  const removeProduct = (product: any) => {
    removeEntry(product)
    addNotification({ id: uuidv4(), title: 'Removed Product!' })
  }

  const updateProduct = (product: any) => {
    updateEntry(product)
    addNotification({ id: uuidv4(), title: 'Updated Prodcut!' })
  }

  const value = { products, addProduct, removeProduct, updateProduct }
  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider

export function useProducts() {
  const context = useContext(ProductsContext)
  if (!context)
    throw new Error('useProducts must be within a <ProductsProvider />')
  return context
}
