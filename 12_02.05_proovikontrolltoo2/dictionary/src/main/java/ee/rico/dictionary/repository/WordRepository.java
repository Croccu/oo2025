package ee.rico.dictionary.repository;

import ee.rico.dictionary.model.Word;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WordRepository extends JpaRepository<Word, Long> {
    Page<Word> findAllByOrderByNameAsc(Word word, Pageable pageable);
    Page<Word> findAllByOrderByNameDesc(Word word, Pageable pageable);
}
