package ee.rico.kymnevoistlus.repository;

import ee.rico.kymnevoistlus.model.Athlete;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AthleteRepository extends JpaRepository<Athlete, Long> {
}
