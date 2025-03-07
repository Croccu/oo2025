package ee.rico.kontrolltoo.Controller;

import ee.rico.kontrolltoo.Entity.Digit;
import ee.rico.kontrolltoo.Repository.DigitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DigitController {

    @Autowired
    private DigitRepository digitRepository;

    @GetMapping("digits")
    public List<Digit> getAllDigits() {
        return digitRepository.findAll();
    }

    @PostMapping("digits")
    public List<Digit> addDigit(@RequestBody Digit digit) {
        digitRepository.save(digit);
        return digitRepository.findAll();
    }
}
