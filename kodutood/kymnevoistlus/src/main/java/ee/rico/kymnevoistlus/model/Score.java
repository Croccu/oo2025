package ee.rico.kymnevoistlus.model;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("event")
    private String eventName;
    @JsonProperty("score")
    private Double result;
    private int points;

    @ManyToOne
    @JoinColumn(name = "athlete_id")
    private Athlete athlete;
}
