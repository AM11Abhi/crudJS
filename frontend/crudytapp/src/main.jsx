import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ColorModeProvider } from "./components/ui/color-mode.jsx"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {queryClient} from '../utils/queryClient.js'
import {QueryClientProvider} from '@tanstack/react-query'
import {Toaster} from "react-hot-toast"
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <ColorModeProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster postion="top-center"/>
        <App />
      </QueryClientProvider>
      </ColorModeProvider>
    </ChakraProvider>
  </StrictMode>,
)
