package ee.rico.kymnevoistlus.controller;

import ee.rico.kymnevoistlus.model.Score;
import ee.rico.kymnevoistlus.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController

public class ScoreController {

    @Autowired
    private ScoreRepository scoreRepository;

    private static final Set<String> DECATHLON_EVENTS = Set.of(
            "100m", "long jump", "shot put", "high jump", "400m",
            "110m hurdles", "discus throw", "pole vault", "javelin throw", "1500m"
    );

    @GetMapping
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
        scoreRepository.save(score);
        return scoreRepository.findAll();
    }

    @GetMapping("scores/{athleteId}")
    public List<Score> getScore(@PathVariable Long athleteId) {
        List<Score> scores = scoreRepository.findByAthleteId(athleteId);
        if (scores.isEmpty()) {
            throw new RuntimeException("ERROR_NO_SCORES_FOUND");
        }
        return scores;
    }
}
