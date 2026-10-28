import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Global protection against Vite HMR WebSocket errors in iframe environments
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    if (
      event.reason &&
      (String(event.reason.message || event.reason).includes('WebSocket') ||
        String(event.reason.message || event.reason).includes('websocket'))
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
