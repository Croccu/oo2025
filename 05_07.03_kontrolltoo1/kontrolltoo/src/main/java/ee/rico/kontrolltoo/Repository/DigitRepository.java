package ee.rico.kontrolltoo.Repository;

import ee.rico.kontrolltoo.Entity.Digit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DigitRepository extends JpaRepository<Digit, Long> {
}
