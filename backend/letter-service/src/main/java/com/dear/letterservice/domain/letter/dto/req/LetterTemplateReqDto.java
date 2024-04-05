package com.dear.letterservice.domain.letter.dto.req;

import lombok.Getter;

import java.util.List;

@Getter
public class LetterTemplateReqDto {

    private String background;
    private String emotion;
    private List<String> characteristics;
    private List<String> memories;
    private List<String> options;

    public String getCharacteristicsToString() {
        return String.join(", ", this.characteristics);
    }

    public String getMemoriesToString() {
        return String.join(", ", this.memories);
    }

    public String getOptionsToString() {
        return String.join(", ", this.options);
    }
}
