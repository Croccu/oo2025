import './App.css'
import { Route, Routes } from 'react-router-dom'
import MainPage from './pages/MainPage'
import ManageProducts from './pages/ManageProducts'
import Arrayd from './pages/Arrayd'
import Menu from './components/menu'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Orders from './pages/Orders'
import ManageCategories from './pages/ManageCategories'

function App() {

  return (
    <>
      <Menu/>

      {/* ROUTES ÜLEVAL MENÜÜ */}

      <Routes>
        {/* localhost:5173/ ---> <div>MainPage</div> */}
        <Route path="/" element={<MainPage/>} />
        {/* localhost:5173/admin/products ---> <div>ManageProducts</div> */}
        <Route path="/admin/products" element={<ManageProducts/>} />
        <Route path="/admin/categories" element={<ManageCategories/>} />
        <Route path="/arrays" element={<Arrayd/>} />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/signup" element={ <Signup /> } />
        <Route path="/orders" element={ <Orders /> } />
      </Routes>

      {/* ROUTES ALL FOOTER */}
    </>
  )
}

// key={}
// React soovib koodi mällu jätta, et kui midagi muutub, siis React ei peaks kogu listi uuesti renderdama v.a. tsüklis sisud
export default App
