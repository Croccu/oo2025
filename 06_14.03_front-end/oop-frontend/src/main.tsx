import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'; // className="accordion"
import './index.css' // .accordion {width: 500px !important;}
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

// 1. navigeerimiseks (URLi muutmiseks)
// 2. Importida BrowserRouter ja ümbritseda see <App /> tagi ümber
// 3. Teha seosed failide ja URL-ide vahel App.tsx failis
// localhost:5173/cart ---> Cart.tsx etc

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
