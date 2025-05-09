package ee.rico.dictionary.controller;

import ee.rico.dictionary.model.Word;
import ee.rico.dictionary.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WordController {

    @Autowired
    private WordRepository wordRepository;

    @GetMapping("words")
    public List<Word> findAll() {
        return wordRepository.findAll();
    }

    @GetMapping("words/{id}")
    public Word findById(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow(() -> new RuntimeException("ERROR_ATHLETE_NOT_FOUND"));
    }

    @PostMapping("words")
    public Word save(@RequestBody Word word) {
        wordRepository.save(word);
        return word;
    }

    @PutMapping("words/{id}")
    public Word update(@RequestBody Word word, @PathVariable Long id) {
        word.setId(id);
        return wordRepository.save(word);
    }

    @DeleteMapping("words/{id}")
    public void delete(@PathVariable Long id) {
        wordRepository.deleteById(id);
    }
}
