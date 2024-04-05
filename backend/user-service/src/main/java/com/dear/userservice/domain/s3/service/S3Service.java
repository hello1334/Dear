package com.dear.userservice.domain.s3.service;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.dear.userservice.domain.s3.config.S3Config;
import com.dear.userservice.domain.s3.repository.ProfileImageRepository;
import com.dear.userservice.domain.s3.repository.entity.ProfileImage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class S3Service {

    private final S3Config s3Config;

    private final AmazonS3 s3Client;

    private final ProfileImageRepository profileImageRepository;

    public String uploadFile(MultipartFile file) {

        if(file == null || file.isEmpty()) {
            log.info("uploadFile file is null or empty");
            return "";
        }
        File fileObj = convertMultiPartFileToFile(file);
        String originalFilename = file.getOriginalFilename();
        String extension = getFileExtension(Objects.requireNonNull(originalFilename));
        String fileName = UUID.randomUUID() + "." + extension;

        log.info("uploadFile fileName: {}", fileName);
        s3Client.putObject(new PutObjectRequest(s3Config.getBucket(), fileName, fileObj));
        fileObj.delete();
        return s3Client.getUrl(s3Config.getBucket(), fileName).toString();
    }

    public String uploadFiles(List<MultipartFile> files) {
        // 다중 업로드 && 리스트 ","을 기준으로 하나의 문자열 반환
        // files 갯수 0 이면 반환 ""
        if(files == null || files.isEmpty())
            return "";

        StringBuilder mergedUrl = new StringBuilder();
        for (int i = 0; i < files.size(); i++) {
            mergedUrl.append(uploadFile(files.get(i)));
            if(i < files.size() - 1) {
                mergedUrl.append(",");
            }
        }

        log.info("uploadFiles mergedUrl: {}", mergedUrl);
        return mergedUrl.toString();
    }

    public String deleteFile(String fileName) {
        s3Client.deleteObject(s3Config.getBucket(), fileName);
        return fileName + " removed ...";
    }


    public File convertMultiPartFileToFile(MultipartFile file) {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)) {
            fos.write(file.getBytes());
        } catch (IOException e) {
            log.error("Error converting multipartFile to file", e);
        }
        return convertedFile;
    }

    public String getFileExtension(String originalFileName) {
        return originalFileName.substring(originalFileName.lastIndexOf(".") + 1);
    }

    public String getLatestProfileImageUrlByUserId(UUID userId) {
//        Optional<ProfileImage> profileImage = profileImageRepository.findByUserId(userId);
        return profileImageRepository.findByUserId(userId)
                .map(ProfileImage::getUrl)
                .orElse("null");
    }
}
