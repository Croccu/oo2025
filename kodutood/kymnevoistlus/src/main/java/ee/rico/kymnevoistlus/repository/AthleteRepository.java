package ee.rico.kymnevoistlus.repository;

import ee.rico.kymnevoistlus.model.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {
    Page<Athlete> findByCountry(String country, Pageable pageable);
}

