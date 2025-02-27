package ee.rico.kymnevoistlus.controller;

import ee.rico.kymnevoistlus.model.Athlete;
import ee.rico.kymnevoistlus.model.Score;
import ee.rico.kymnevoistlus.repository.AthleteRepository;
import ee.rico.kymnevoistlus.repository.ScoreRepository;
import ee.rico.kymnevoistlus.service.ScoringService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController

public class ScoreController {

    @Autowired
    private ScoreRepository scoreRepository;

    @Autowired
    private ScoringService scoringService;

    private static final Set<String> DECATHLON_EVENTS = Set.of(
            "100m", "long jump", "shot put", "high jump", "400m",
            "110m hurdles", "discus throw", "pole vault", "javelin throw", "1500m"
    );
    @Autowired
    private AthleteRepository athleteRepository;

    @GetMapping("scores")
    public List<Score> getScores() {
        return scoreRepository.findAll();
    }

    @PostMapping("scores")
    public List<Score> addScore(@RequestBody Score score) {
        if (score.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (!DECATHLON_EVENTS.contains(score.getEventName().toLowerCase())) {
            throw new RuntimeException("ERROR_INVALID_EVENT_NAME");
        }
        double result = -1;
        if (score.getResult() == null) {
            throw new RuntimeException("ERROR_RESULT_CANNOT_BE_EMPTY");
        }

        Athlete athlete = athleteRepository.findById(score.getAthleteId())
                .orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));
        score.setAthlete(athlete);

        int calculatedPoints = scoringService.calculateScore(score.getEventName(), score.getResult());
        score.setPoints(calculatedPoints);

        scoreRepository.save(score);
        return scoreRepository.findAll();

        // TODO: Kogu punktisumma arvutamine iga võistleja kohta
    }

    @GetMapping("scores/{athleteId}")
    public List<Score> getScore(@PathVariable Long athleteId) {
        List<Score> scores = scoreRepository.findByAthleteId(athleteId);
        if (scores.isEmpty()) {
            throw new RuntimeException("ERROR_NO_SCORES_FOUND");
        }
        return scores;
    }

    @DeleteMapping("scores/{id}")
    public List<Score> deleteScore(@PathVariable Long id) {
        scoreRepository.deleteById(id);
        return scoreRepository.findAll();
    }
}
