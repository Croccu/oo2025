package ee.rico.user.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@Table(name = "users") // User is reserved in PostgreSQL
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String username;
    private String email;

    @Embedded
    private Address address;

    private String phone;
    private String website;

    @Embedded
    @AttributeOverrides({
            @AttributeOverride(name = "name", column = @Column(name = "company_name")),
            @AttributeOverride(name = "catchPhrase", column = @Column(name = "company_catch_phrase")),
            @AttributeOverride(name = "bs", column = @Column(name = "company_bs"))
    })
    private Company company;

    private String password;
}

