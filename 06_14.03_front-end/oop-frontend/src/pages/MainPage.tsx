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

  return (
    <div>
      {kategooriad.map(kategooria =>
      <div key={kategooria.id}>
        {kategooria.name}  {kategooria.active}
      </div> )}
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
