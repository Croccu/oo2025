package ee.rico.dictionary.controller;

import ee.rico.dictionary.model.Word;
import ee.rico.dictionary.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WordController {

    @Autowired
    private WordRepository wordRepository;

    @GetMapping("words")
    public Page<Word> findAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "asc") String sort) {
        Pageable pageable = PageRequest.of(page, size);
        if ("desc".equals(sort)) {
            return wordRepository.findAllByOrderByNameDesc(pageable);
        } else {
            return wordRepository.findAllByOrderByNameAsc(pageable);
        }
    }

    @GetMapping("words/{id}")
    public Word findById(@PathVariable Long id) {
        return wordRepository.findById(id).orElseThrow(() -> new RuntimeException("ERROR_WORD_NOT_FOUND"));
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
