package ee.rico.kymnevoistlus.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "athlete_id", insertable = false, updatable = false)
    private Long athleteId;
    
    private String eventName;
    private Double result;
    private int points;

    @ManyToOne
    @JoinColumn(name = "athlete_id")
    private Athlete athlete;
}
