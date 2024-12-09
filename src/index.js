import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Routers from './Routes'

createRoot(document.getElementById('root')).render(<Routers/>)