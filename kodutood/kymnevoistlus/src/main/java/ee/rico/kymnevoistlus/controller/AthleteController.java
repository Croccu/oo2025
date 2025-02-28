package ee.rico.kymnevoistlus.controller;

import ee.rico.kymnevoistlus.model.Athlete;
import ee.rico.kymnevoistlus.model.Score;
import ee.rico.kymnevoistlus.repository.AthleteRepository;
import ee.rico.kymnevoistlus.repository.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class AthleteController {

    @Autowired
    private AthleteRepository athleteRepository;
    @Autowired
    private ScoreRepository scoreRepository;

    @GetMapping("athletes")
    public List<Athlete> getAthletes() {
        List<Athlete> athletes = athleteRepository.findAll();

        //total points iga sportlase kohta
        for (Athlete athlete : athletes) {
            List<Score> scores = scoreRepository.findByAthleteId(athlete.getId());
            int totalPoints = scores.stream().mapToInt(Score::getPoints).sum();
            athlete.setTotalPoints(totalPoints);
        }
        return athletes;
    }

    @GetMapping("athletes/{id}")
    public Athlete getAthlete(@PathVariable Long id) {
        Athlete athlete = athleteRepository.findById(id).orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));

        //total points ühele sportlasele
        List<Score> scores = scoreRepository.findByAthleteId(id);
        int totalPoints = scores.stream().mapToInt(Score::getPoints).sum();
        athlete.setTotalPoints(totalPoints);
        return athlete;
    }

    @PostMapping("athletes")
    public Athlete addAthlete(@RequestBody Athlete athlete) {
        if (athlete.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (athlete.getAge() <= 0 || athlete.getAge() > 100) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_INCORRECT_AGE");
        }
        athleteRepository.save(athlete);
        return athleteRepository.save(athlete);
    }


    @DeleteMapping("athletes/{id}")
    public List<Athlete> deleteAthlete(@PathVariable Long id) {
        athleteRepository.deleteById(id);
        return athleteRepository.findAll();
    }
}
