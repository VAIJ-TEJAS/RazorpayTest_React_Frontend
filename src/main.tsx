import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

declare global {
  interface Window {
    global: any;
  }
}

window.global ||= window;

createRoot(document.getElementById('root')!).render(
  <>
    <App />
  </>,
)
