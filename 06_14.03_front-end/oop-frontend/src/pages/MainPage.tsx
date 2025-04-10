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
  const [totalProducts, setTotalProducts] = useState(0);
  const productsByPage = 1;
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);

  // uef -> onload
  useEffect(() => {
    fetch("http://localhost:8080/categories") // API otspunkt kuhu läheb päring
        .then(res=>res.json()) // kogu tagastus: headers, status code
        .then(json=> setKategooriad(json)) // body: sisu mida tagastab meile back-end
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:8080/products") // API otspunkt kuhu läheb päring
  //       .then(res=>res.json()) // kogu tagastus: headers, status code
  //       .then(json=> setProducts(json)) // body: sisu mida tagastab meile back-end
  // }, []);

  useEffect(() => {
    showByCategory(-1, 0); // kõik tooted
  }, []);

  function showByCategory(categoryId: number, currentPage: number) {
    setActiveCategory(categoryId);
    setPage(currentPage);
    fetch("http://localhost:8080/category-products?categoryId=" + categoryId
      + "&size=" + productsByPage
      + "&page=" + currentPage
    ) // API otspunkt kuhu läheb päring
      .then(res=>res.json())
      .then(json=> {
        setProducts(json.content);
        setTotalProducts(json.totalElements);
      }) // mida set'in see muutub HTML'is
  }

  function updatePage(newPage: number) {
    showByCategory(activeCategory, newPage); // TODO: Aktiivne kategooria
  }

  return (
    <div>
      <button onClick={() => showByCategory(-1, 0)}>Kõik kategooriad</button>
      {kategooriad.map(kategooria =>
      <button key={kategooria.id} onClick={() => showByCategory(kategooria.id, 0)}>
        {kategooria.name}
      </button> )}
      <br />
      <br />
      <div>Kokku tooteid: {totalProducts}</div>
      {products.map(product =>
      <div key={product.id}>
        <div>{product.id}</div>
        <div>{product.name}</div>
        <div>{product.price}</div>
        <div>{product.image}</div>
        <div>{product.category?.name}</div>
        {/* <div>{product.active}</div> */}
      </div> )}
      <button disabled={page === 0} onClick={() => updatePage(page - 1)}>Eelmine</button>
      <span>{page + 1}</span>
      <button disabled={page === Math.ceil(totalProducts/productsByPage-1)} onClick={() => updatePage(page + 1)}>Järgmine</button>
    </div>
  )
}

export default MainPage
