package ee.rico.veebipood.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController {

    // localhost:8080/products
    @GetMapping("products")
    public String getProducts() {
        return "Hello world";
    }
}
