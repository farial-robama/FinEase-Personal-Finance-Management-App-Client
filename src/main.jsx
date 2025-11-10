import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes.jsx'
import AuthPovider from './contexts/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthPovider><RouterProvider router = {router}></RouterProvider></AuthPovider>
  </StrictMode>,
)
