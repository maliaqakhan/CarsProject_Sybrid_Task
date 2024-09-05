import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import CarsContextProvider from './context/CarsContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider
       theme={{
        colors: {
          customColor: ['#00ECE5'],
        },
      }}
    >
      <CarsContextProvider>
        <App />
      </CarsContextProvider>
    </MantineProvider>
  </StrictMode>
)
