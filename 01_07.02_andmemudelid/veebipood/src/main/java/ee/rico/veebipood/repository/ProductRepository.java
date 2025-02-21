package ee.rico.veebipood.repository;

import ee.rico.veebipood.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
