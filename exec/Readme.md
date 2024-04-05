# 포팅메뉴얼

### 환경

- Java 17 JDK
- SpringBoot 3.2.3
- 서비스 포트번호
    - api-gateway-service (8000)
    - auth-service (8010)
    - user-service (8020)
    - letter-service (8030)

### 배포 시 사용되는 환경 변수

1. .env
2. application.yml
3. application-prod.yml

### 배포 및 실행 시 특이사항

1. backend/src/main/resources 위치에 application.yml, application-prod.yml 파일 저장
2. frontend 위치에 .env 파일 저장
3. docker-compose 혹은 docker 명령어를 통해 서비스 실행

### 프로퍼티가 정의된 파일 목록

- application.yml
    - application-dev.yml
        - open ai API key
        - aws credentials
    - application-prod.yml
        - open ai API key
        - aws credentials
- .env
    - oauth 환경변수
- Dockerfile
    - frontend/Dockerfile
    - backend/api-gateway-service/Dockerfile
    - backend/auth-service/Dockerfile
    - backend/letter-service/Dockerfile
    - backend/user-service/Dockerfile

### 배포 및 실행

실행을 위해서는 Jenkins 생략 가능합니다.

- jenkins 설치

```bash
# Jenkins 이미지 Pull
docker pull jenkins/jenkins:jdk17

# Jenkins Start
docker run -d --restart always --env JENKINS_OPTS=--httpPort=8080 -v /etc/localtime:/etc/localtime:ro -e TZ=Asia/Seoul -p 8080:8080 -v /jenkins:/var/jenkins_home -v /var/run/docker.sock:/var/run/docker.sock -v /usr/local/bin/docker-compose:/usr/local/bin/docker-compose --name jenkins -u root jenkins/jenkins:jdk17
```

- RDB 연결
    - Schema name: dear