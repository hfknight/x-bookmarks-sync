import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootEl = document.getElementById('root') as HTMLElement;
createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
