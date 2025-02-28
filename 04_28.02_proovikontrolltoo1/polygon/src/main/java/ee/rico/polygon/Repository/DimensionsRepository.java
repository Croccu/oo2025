package ee.rico.polygon.Repository;

import ee.rico.polygon.Entity.Dimensions;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DimensionsRepository extends JpaRepository<Dimensions, Long> {
}
