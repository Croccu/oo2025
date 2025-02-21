package ee.rico.veebipood.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity

public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date created; // Date importida --> java.util.Date

    @ManyToOne
    private Person person; // Personil võib olla mitu tellimust

    @ManyToMany
    private List<Product> products; // List importida -> java.util.List

    private double totalSum;
}
