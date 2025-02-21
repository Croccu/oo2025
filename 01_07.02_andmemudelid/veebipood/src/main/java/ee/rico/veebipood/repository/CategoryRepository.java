package ee.rico.veebipood.repository;

import ee.rico.veebipood.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {
}