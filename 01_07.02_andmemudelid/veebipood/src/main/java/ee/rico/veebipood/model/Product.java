package ee.rico.veebipood.model;

//Hibernate
//automaatselt tekib andmebaasi tabel, mis on klassi nimega

//File -> Settings -> Plugins -> JPA Buddy -> Install

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity

public class Product {
    @Id;
    @GeneratedValue(strategy = GenerationType.IDENTITY);
    private Long id;
    private String name;
    private double price;
    private String image; //.jpg
    private boolean active;
}
