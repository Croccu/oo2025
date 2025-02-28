package ee.rico.slipping_average.Repository;

import ee.rico.slipping_average.Entity.ValueEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ValueRepository extends JpaRepository<ValueEntity, Long> {
}
