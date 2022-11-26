import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.scss';
import './styles/index.css';
import { PlatosProvider } from "./context/platosProvider";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
   <StrictMode>
      <PlatosProvider>
         <App />
      </PlatosProvider>
   </StrictMode>
);