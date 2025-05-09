package ee.rico.dictionary.repository;

import ee.rico.dictionary.model.Manager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ManagerRepository extends JpaRepository<Manager, Long> {
}
