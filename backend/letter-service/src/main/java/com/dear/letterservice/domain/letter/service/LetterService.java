package com.dear.letterservice.domain.letter.service;

import com.dear.letterservice.domain.kafka.dto.res.KafkaLetterNotificationDto;
import com.dear.letterservice.domain.kafka.producer.KafkaNotificationProducer;
import com.dear.letterservice.domain.letter.dto.req.LetterReqDto;
import com.dear.letterservice.domain.letter.dto.req.LetterTemplateReqDto;
import com.dear.letterservice.domain.letter.dto.res.LetterTemplateResDto;
import com.dear.letterservice.domain.letter.entity.Letter;
import com.dear.letterservice.domain.letter.repository.LetterRepository;
import com.dear.letterservice.domain.letterImage.entity.LetterImage;
import com.dear.letterservice.domain.letterImage.repository.LetterImageRepository;
import com.dear.letterservice.domain.openai.service.OpenAiService;
import com.dear.letterservice.domain.s3.repository.ImageRepository;
import com.dear.letterservice.domain.s3.repository.entity.Image;
import com.dear.letterservice.domain.s3.service.S3Service;
import com.dear.letterservice.domain.stamp.entity.Stamp;
import com.dear.letterservice.domain.stamp.repository.StampRepository;
import com.dear.letterservice.domain.stamp.service.StampService;
import jakarta.annotation.Nullable;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class LetterService {

    private final LetterRepository letterRepository;
    private final OpenAiService openAiService;
    private final S3Service s3Service;
    private final LetterImageRepository letterImageRepository;
    private final StampService stampService;
    private final StampRepository stampRepository;
    private final ImageRepository imageRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final KafkaNotificationProducer kafkaNotificationProducer;

    @Value("${url.id-from-nickname}")
    private String url;

    public LetterTemplateResDto generateLetterTemplate(LetterTemplateReqDto letterTemplateReqDto) {

        String prompt = "이 편지는 " + letterTemplateReqDto.getBackground() + "에 대한 편지야. " +
                "내 현재 감정상태는 " + letterTemplateReqDto.getEmotion() + "이야. " +
                "편지를 받는 사람의 특징은 " + letterTemplateReqDto.getCharacteristicsToString() + "이야. " +
                "우리의 추억은 " + letterTemplateReqDto.getMemoriesToString() + "이야. " +
                "추가적인 정보는 " + letterTemplateReqDto.getOptionsToString() + "이야.";

        return LetterTemplateResDto.builder()
                .content(openAiService.generateLetter(prompt))
                .build();

    }

    public void sendLetter(MultipartFile letter, @Nullable MultipartFile stampFile, LetterReqDto letterReqDto, UUID fromUserId) {

        String letterImageUrl = s3Service.uploadFile(letter);
        Image letterImage = Image.builder()
                .url(letterImageUrl)
                .createAt(LocalDateTime.now())
                .build();
        letterImage = imageRepository.save(letterImage);
        LetterImage letterImageEntity = letterImageRepository.save(LetterImage.builder()
                .image(letterImage)
                .build());

        Image stampImage = null;
        if(!letterReqDto.getIsNew()) {
            stampImage = stampService.getImage(letterReqDto.getStampId());
        } else {
            String stampImageUrl = s3Service.uploadFile(stampFile);
            stampImage = Image.builder()
                    .url(stampImageUrl)
                    .createAt(LocalDateTime.now())
                    .build();
            stampImage = imageRepository.save(stampImage);
        }


        Stamp stamp = Stamp.builder()
                .fromUserId(fromUserId)
                .image(stampImage)
                .build();
        if(!letterReqDto.getDearNickname().isEmpty()) {

            // 요청 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // 요청 본문 설정
            String requestJson = "{\"nickname\":\"" + letterReqDto.getDearNickname() + "\"}";
            HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

            UUID dearUserId = restTemplate.exchange(url, HttpMethod.POST, entity, UUID.class).getBody();
            log.info("dearUserId = {}", dearUserId);
            stamp.setToUserId(dearUserId);

        }


        stamp = stampRepository.save(stamp);

        Letter makedLetter = letterRepository.save(Letter.builder()
                .fromUserName(letterReqDto.getFrom())
                .toUserName(letterReqDto.getDear())
                .readFlag(false)
                .letterImage(letterImageEntity)
                .stamp(stamp)
                .createAt(LocalDateTime.now())
                .build());

        if(!letterReqDto.getDearNickname().isEmpty()) {
            kafkaNotificationProducer.sendLetterNotification(KafkaLetterNotificationDto.builder()
                    .userId(stamp.getToUserId())
                            .stamp(stamp.getImage().getUrl())
                            .dear(letterReqDto.getDear())
                            .from(letterReqDto.getFrom())
                            .letterId(makedLetter.getId())
                            .letter(letterImageUrl)
                            .music(null)
                            .musicTitle(null)
                    .build());
        }
    }

}
