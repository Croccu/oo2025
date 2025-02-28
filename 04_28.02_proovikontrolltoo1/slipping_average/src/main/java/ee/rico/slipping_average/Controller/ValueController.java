package ee.rico.slipping_average.Controller;


import ee.rico.slipping_average.Entity.ValueEntity;
import ee.rico.slipping_average.Repository.ValueRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ValueController {

    @Autowired
    private ValueRepository valueRepository;

    @GetMapping("values")
    public List<ValueEntity> getValues() {
        return valueRepository.findAll();
    }

    @PostMapping("values")
    public List<ValueEntity> addValue(@RequestBody ValueEntity valueEntity) {
        valueRepository.save(valueEntity);
        return valueRepository.findAll();
    }

}
