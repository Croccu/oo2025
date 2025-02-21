package ee.rico.veebipood.model;

//Hibernate
//automaatselt tekib andmebaasi tabel, mis on klassi nimega

//File -> Settings -> Plugins -> JPA Buddy -> Install

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private double price;
    private String image; //.jpg
    private boolean active;

    @ManyToOne
    private Category category;
}
