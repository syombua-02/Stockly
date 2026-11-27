import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import InventoryProvider from './context/InventoryProvider'
import SalesProvider from './context/SalesProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <InventoryProvider>
      <SalesProvider>
        <App />
      </SalesProvider>
    </InventoryProvider>
  </StrictMode>,
)