package ee.rico.veebipood.repository;

import ee.rico.veebipood.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Repo tagastab ainult kas Product, List<Product>
    // on juba sisse kirjutatud:
    // .findAll() --> SELECT * FROM products
    // .save() --> INSERT values() INTO products
    // .deleteById() --> DELETE FROM products WHERE id=
    // .findById() --> SELECT product FROM products

    //JPA Buddy(JPA designer (plugin)
    List<Product> findByCategory_Id(Long id);
}
