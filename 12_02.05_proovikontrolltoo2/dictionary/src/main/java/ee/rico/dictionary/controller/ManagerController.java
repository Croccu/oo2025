package ee.rico.dictionary.controller;

import ee.rico.dictionary.model.Manager;
import ee.rico.dictionary.model.Word;
import ee.rico.dictionary.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class ManagerController {

    @Autowired
    private ManagerRepository managerRepository;

    @GetMapping("managers")
    public List<Manager> getAllManagers() {
        return managerRepository.findAll();
    }

    @PostMapping("managers")
    public Manager addManager(@RequestBody Manager manager) {
        return managerRepository.save(manager);
    }

    @GetMapping("managers/{id}/words")
    public List<Word> getWordsByManager(@PathVariable Long id) {
        return managerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Manager not found"))
                .getWords();
    }
}
