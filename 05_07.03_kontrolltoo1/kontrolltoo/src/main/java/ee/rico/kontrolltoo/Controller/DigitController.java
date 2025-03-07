package ee.rico.kontrolltoo.Controller;

import ee.rico.kontrolltoo.Entity.Digit;
import ee.rico.kontrolltoo.Entity.DigitConversion;
import ee.rico.kontrolltoo.Repository.DigitConversionRepository;
import ee.rico.kontrolltoo.Repository.DigitRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
public class DigitController {

    @Autowired
    private DigitRepository digitRepository;

    @Autowired
    private DigitConversionRepository digitConversionRepository;

    @GetMapping("digits")
    public List<Digit> getAllDigits() {
        return digitRepository.findAll();
    }

    @PostMapping("digits")
    public List<Digit> addDigit(@RequestBody Digit digit) {
        if (digit.getId() != null) {
            throw new RuntimeException("ERROR_CANNOT_ADD_WITH_ID");
        }
        if (digit.getDigit() < 0 ) {
            throw new RuntimeException("ERROR_CANNOT_ADD_NEGATIVE_VALUES_TO_DIGIT");
        }
        digitRepository.save(digit);
        return digitRepository.findAll();
    }

    @PostMapping("digits/convert")
    public List<String> convertDigits(@RequestBody List<Map<String, Object>> requests) {
        List<String> convertedValues = new ArrayList<>();

        for (Map<String, Object> request : requests) {
            if (!request.containsKey("id") || !request.containsKey("type")) {
                throw new RuntimeException("ERROR_ID_AND_OR_TYPE_MISSING");
            }

            Long id = ((Number) request.get("id")).longValue();
            String type = (String) request.get("type");

            Optional<Digit> digit = digitRepository.findById(id);
            if (digit.isEmpty()) {
                throw new RuntimeException("ERROR_CANNOT_CONVERT_DIGIT");
            }

            int digitInt = digit.get().getDigit();
            String convertedValue = "";

            if (type.equalsIgnoreCase("binary")) {
                convertedValue = "Binary: " + Integer.toBinaryString(digitInt);
            } else if (type.equalsIgnoreCase("octal")) {
                convertedValue = "Octal: " + Integer.toOctalString(digitInt);
            } else if (type.equalsIgnoreCase("hex")) {
                convertedValue = "Hex: " + Integer.toHexString(digitInt);
            } else {
                throw new RuntimeException("PLEASE_PICK_CORRECT_DIGIT_TYPE");
            }

            saveConversion(digit.get(), convertedValue, type);
            convertedValues.add(convertedValue);
        }

        return convertedValues;
    }

    private void saveConversion(Digit digit, String convertedValue, String conversionType) {
        DigitConversion digitConversion = new DigitConversion();
        digitConversion.setOriginalDigit(digit.getDigit());
        digitConversion.setConvertedValue(convertedValue);
        digitConversion.setConversionType(conversionType);
        digitConversionRepository.save(digitConversion);
    }

    @GetMapping("digits/conversions")
    public List<DigitConversion> getAllConversions() {
        List<DigitConversion> conversions = digitConversionRepository.findAll();
        System.out.println("Conversions: " + conversions);
        return conversions;
    }
}
