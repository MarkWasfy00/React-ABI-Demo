import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import Header from './components/Header/Header.tsx'
import { ThemeProvider } from '@mui/material'
import theme from './theme/index.ts'

import "./styles/normalize.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}> 
        <Header />
        <App />
    </ThemeProvider>,
  </StrictMode>,
)
