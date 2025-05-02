package ee.rico.kymnevoistlus.repository;

import ee.rico.kymnevoistlus.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByAthleteId(Long athleteId);
    List<Score> findByAthlete_Country(String country);
}
