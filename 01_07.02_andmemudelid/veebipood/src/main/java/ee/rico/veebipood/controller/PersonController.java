package ee.rico.veebipood.controller;

import ee.rico.veebipood.model.Person;
import ee.rico.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PersonController {

    @Autowired
    PersonRepository personRepository;

    // front-end peab saatma ID ja parooli
    // TODO: peab saatma emaili ja parooli, muid väljasid ei küsi
    // TODO: tagastada korralik mudel front-endile, mitte boolean
    @PostMapping("login")
    public boolean login(@RequestBody Person person) {
        if (person.getId() == null ) {
            throw new RuntimeException("ERROR_ID_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("ERROR_PASSWORD_MISSING");
        }
        Person dbPerson = personRepository.findById(person.getId()).orElseThrow();
        if (dbPerson.getPassword().equals(person.getPassword())) {
            return true;
        } else {
            return false;
        }
    }

    // TODO: Ei tagasta pärast signupi listi inimestest
    @PostMapping("signup")
    public List<Person> signup(@RequestBody Person person) {
        // viga on: {} <- email == null ||
        if (person.getEmail() == null || person.getEmail().isBlank()) {
            throw new RuntimeException("EMAIL_IS_MISSING");
        }
        if (person.getPassword() == null || person.getPassword().isBlank()) {
            throw new RuntimeException("PASSWORD_IS_MISSING");
        }
        personRepository.save(person);
        return personRepository.findAll();
    }
}
