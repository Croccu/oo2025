import { useEffect, useState } from 'react'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Category } from './models/Category'
import { Product } from './models/Product'

function App() {
  const [count, setCount] = useState(0)
  const sonad = ["See", "suvaline", "lause"]
  const autod =[
    {mark: "Audi", aasta: 2020},
    {mark: "BMW", aasta: 2019},
    {mark: "Mercedes", aasta: 2018},
    {mark: "Toyota", aasta: 2017},
  ]

  // muutuja - HTML, muudab muutujat + HTMLi, sulgude sees - algväärtus
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  //uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories")// API otspunkt, kuhu läheb päring
      .then(res => res.json())  // kogu tagastus: headers, status code
      .then(json => setKategooriad(json)) // body: sisu mida tagastab meile back-end
  }, [])

  useEffect(() => {
    fetch("http://localhost:8080/products") // API otspunkt, kuhu läheb päring
      .then(res => res.json())  // kogu tagastus: headers, status code
      .then(json => setProducts(json)) // body: sisu mida tagastab meile back-end
  }, [])

  return (
    <>
      <img src={reactLogo} alt="React Logo" />
      <img src={viteLogo} alt="Vite Logo" />
      <div>{count}</div>
      <button onClick={() => setCount((count) => count + 1)}>Add one to counter</button>
      <br/>
      {sonad.map(sona => <div key={sona}>{sona}</div>)}
      <br/>
      {/* Presenteeri nii */}
      {autod.map((auto, index) => (
        <div key={index}>
          <div>{auto.mark}, {auto.aasta}</div>
        </div>
      ))}
      <br />
      {/* Või nii */}
      {autod.map(auto =>
      <div key={auto.mark}>
        {auto.mark} - {auto.aasta}
      </div>)}
      <br />
      {kategooriad.map(kategooria =>
      <div key={kategooria.id}>
        {kategooria.name} {kategooria.active}
      </div>)}
      <br />
      {products.map(product =>
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category.name}</div>
      </div>)}
    </>
  )
}

// key={}
// React soovib koodi mällu jätta, et kui midagi muutub, siis React ei peaks kogu listi uuesti renderdama v.a. tsüklis sisud
export default App
