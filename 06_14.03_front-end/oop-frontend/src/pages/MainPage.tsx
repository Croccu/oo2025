import { useEffect, useState } from 'react'
import { Category } from '../models/Category';
import { Product } from '../models/Product';

function MainPage() {
  // Järgmine kord:
  // Leheküljed ---> Pageable (Hibernate)
  // Kategooria alusel filtreerimine (custom päring Repository's - Hibernate)

  // muutuja - HTML   muudab muutujat + HTMLi    sulgude sees - algväärtus
  const [kategooriad, setKategooriad] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers, status code
        .then(json=> setKategooriad(json)) // body: sisu mida tagastab meile back-end
  }, []);

  useEffect(() => {
    fetch("http://localhost:8080/products") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers, status code
        .then(json=> setProducts(json)) // body: sisu mida tagastab meile back-end
  }, []);

  function showByCategory(categoryId: number) {
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId)
      .then(res=>res.json())
      .then(json=> setProducts(json)) // mida set'in see muutub HTML'is
  }

  return (
    <div>
      <button onClick={() => showByCategory(-1)}>Kõik kategooriad</button>
      {kategooriad.map(kategooria =>
      <button key={kategooria.id} onClick={() => showByCategory(kategooria.id)}>
        {kategooria.name}
      </button> )}
      <br />
      <br />
      {products.map(product =>
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>
        {/* <div>{product.active}</div> */}
      </div> )}
    </div>
  )
}

export default MainPage
