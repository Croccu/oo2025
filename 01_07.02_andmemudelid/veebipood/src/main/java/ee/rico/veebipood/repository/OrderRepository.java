package ee.rico.veebipood.repository;

import ee.rico.veebipood.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
