package ee.rico.slipping_average.Controller;


import ee.rico.slipping_average.Entity.ValueEntity;
import ee.rico.slipping_average.Repository.ValueRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
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

    @GetMapping("values/sum")
    public int sum() {
        return valueRepository.findAll().stream().mapToInt(ValueEntity::getValue).sum();
    }

    @GetMapping("values/average")
    public double average() {
        return valueRepository.findAll().stream().mapToInt(ValueEntity::getValue).average().orElse(0);
    }

    @GetMapping("values/max")
    public int max() {
        return valueRepository.findAll().stream().mapToInt(ValueEntity::getValue).max().orElse(0);
    }

    @GetMapping("values/sliding_average")
    public List<Double> getSlidingAverage() {
        List<ValueEntity> valueEntities = valueRepository.findAll();
        List<Double> slidingAverage = new ArrayList<>();

        if (valueEntities.size() < 3) {
            return slidingAverage;
        }

        for (int i = 0; i < valueEntities.size() -2; i++) {
            double value = (valueEntities.get(i).getValue() +
                    valueEntities.get(i + 1).getValue() +
                    valueEntities.get(i + 1).getValue() / 3.0);
            slidingAverage.add(value);
        }
        return slidingAverage;
    }

}
