import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <MantineProvider defaultColorScheme="dark">
    <Notifications />
      <App />
    </MantineProvider>
  </StrictMode>,
)
