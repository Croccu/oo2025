package ee.rico.polygon.Controller;

import ee.rico.polygon.Entity.Dimensions;
import ee.rico.polygon.Repository.DimensionsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PatchMapping("dimensions/adjust_x")
    public List<Dimensions> adjustXCoordinates(@RequestParam Double value) {
        List<Dimensions> dimensionsList = dimensionsRepository.findAll();
        for (Dimensions dimensions : dimensionsList) {
            dimensions.setX(dimensions.getX() + value);
        }
        dimensionsRepository.saveAll(dimensionsList);
        return dimensionsList;
    }

    @PatchMapping("dimensions/adjust_y")
    public List<Dimensions> adjustYCoordinates(@RequestParam Double value) {
        List<Dimensions> dimensionsList = dimensionsRepository.findAll();
        for (Dimensions dimensions : dimensionsList) {
            dimensions.setY(dimensions.getY() + value);
        }
        dimensionsRepository.saveAll(dimensionsList);
        return dimensionsList;
    }


    @GetMapping("dimensions/perimeter")
    public ResponseEntity<String> getPerimeter() {
        List<Dimensions> dimensionsList = dimensionsRepository.findAll();

        if (dimensionsList.size() < 3) {
            throw new RuntimeException("ERROR_NOT_ENOUGH_POINTS_FOR_PERIMETER");
        }

        double perimeter = calculatePerimeter(dimensionsList);
        return new ResponseEntity<>(perimeter + "", HttpStatus.OK);
    }

    private double calculateDistance(Dimensions first, Dimensions second) {
        double xDiff = second.getX() - first.getX();
        double yDiff = second.getY() - first.getY();
        return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }

    private double calculatePerimeter (List<Dimensions> dimensionsList) {
        double perimeter = 0;
        int size = dimensionsList.size();
        for (int i = 0; i < dimensionsList.size(); i++) {
            Dimensions current = dimensionsList.get(i);
            Dimensions next = dimensionsList.get((i + 1) % size);

            double distance = calculateDistance(current, next);
            perimeter += distance;
        }
        return perimeter;
    }

}
