package ee.rico.kymnevoistlus.service;

import org.springframework.stereotype.Service;

@Service
public class ScoringService {

    public int calculateScore(String eventName, Double score) {
        double A, B, C; // alaspetsiifilised konstandid

        switch (eventName.toLowerCase()) {
            case "100m":
                A = 25.4347;
                B = 18;
                C = 1.81;
                return (int) (A * Math.pow(B - score, C));
            case "long jump":
                A = 0.14354;
                B = 220;
                C = 1.4;
                return (int) (A * Math.pow(score * 100 - B, C));
            case "shot put":
                A = 51.39;
                B = 1.5;
                C = 1.05;
                return (int) (A * Math.pow(score - B, C));
            case "high jump":
                A = 0.8465;
                B = 75;
                C = 1.42;
                return (int) (A * Math.pow(score * 100 - B, C));
            case "400m":
                A = 1.53775;
                B = 82;
                C = 1.81;
                return (int) (A * Math.pow(B - score, C));
            case "110m hurdles":
                A = 5.74352;
                B = 28.5;
                C = 1.92;
                return (int) (A * Math.pow(B - score, C));
            case "discus throw":
                A = 12.91;
                B = 4;
                C = 1.1;
                return (int) (A * Math.pow(score - B, C));
            case "pole vault":
                A = 0.2797;
                B = 100;
                C = 1.35;
                return (int) (A * Math.pow(score * 100 - B, C));
            case "javelin throw":
                A = 10.14;
                B = 7;
                C = 1.08;
                return (int) (A * Math.pow(score - B, C));
            case "1500m":
                A = 0.03768;
                B = 480;
                C = 1.85;
                return (int) (A * Math.pow(B - score, C));
            default:
                return 0;
        }
    }
}
