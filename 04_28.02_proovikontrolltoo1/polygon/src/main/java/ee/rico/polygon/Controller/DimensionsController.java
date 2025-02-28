package ee.rico.polygon.Controller;

import ee.rico.polygon.Entity.Dimensions;
import ee.rico.polygon.Repository.DimensionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DimensionsController {

    @Autowired
    private DimensionsRepository dimensionsRepository;

    @GetMapping("dimensions")
    public List<Dimensions> getAllDimensions() {
        return dimensionsRepository.findAll();
    }

    @PostMapping("dimensions")
    public List<Dimensions> addDimensions(@RequestBody Dimensions dimensions) {
        dimensionsRepository.save(dimensions);
        return dimensionsRepository.findAll();
    }
}
