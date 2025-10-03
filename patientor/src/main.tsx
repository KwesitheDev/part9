import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { StateProvider } from './state.tsx';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <StateProvider>
    <App />
  </StateProvider>,
);
