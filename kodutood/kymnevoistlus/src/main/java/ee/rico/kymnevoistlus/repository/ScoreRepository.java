package ee.rico.kymnevoistlus.repository;

import ee.rico.kymnevoistlus.model.Score;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScoreRepository extends JpaRepository<Score, Long> {
    List<Score> findByAthleteId(Long athleteId);
}
