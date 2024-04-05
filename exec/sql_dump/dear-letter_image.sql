-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: dear-letter
-- ------------------------------------------------------
-- Server version	8.2.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `image`
--

DROP TABLE IF EXISTS `image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `image` (
  `image_id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `image`
--

LOCK TABLES `image` WRITE;
/*!40000 ALTER TABLE `image` DISABLE KEYS */;
INSERT INTO `image` VALUES (3,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/97bf84c7-7a75-43bb-97a3-d07747ffef42.PNG'),(4,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/84db1cbc-b560-43bf-b47c-57ba657e6cc6.PNG'),(5,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/34969bdd-8aa1-4ed7-b72a-860f91bab35b.PNG'),(6,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/2ee766ba-f905-4ce3-aa44-a308079af84d.PNG'),(7,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/f9d06250-a517-496f-84f9-ba10d44fa06d.PNG'),(8,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/0a4c8837-81a5-40a8-93e4-c5906485af45.PNG'),(9,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/26461a05-7e38-4667-a001-ac43066b4944.PNG'),(10,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/8ca0c33f-3ef3-4d11-ad6b-07d86d3463de.PNG'),(11,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/8d68af02-ade4-462e-8b86-1c5d94091368.PNG'),(12,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/84320c98-0faf-4af2-b4e9-2b19f8211932.PNG'),(13,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/cc1ce8d3-fb90-4462-bb6c-97a36cb24497.PNG'),(14,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/91e1326a-6cea-4437-817b-b9418b89da20.PNG'),(15,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/ca8347c9-1c65-4b61-b0cd-29ca0345afe0.PNG'),(16,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/c4db2b79-b806-4799-a87e-84a3fae47a8d.PNG'),(17,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/55c2d952-ef8c-4eb1-a9cc-75d06f865460.PNG'),(18,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/12bd7cf5-393c-41eb-a8ac-0cd9fb339cc8.PNG'),(19,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/c9eac7fb-6692-4473-ac84-b98b358a2fbd.PNG'),(20,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/6f7401ab-5073-42a4-a58b-973254092c58.PNG'),(21,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/571b8f0a-17b7-457f-8e23-d22c96ea1a02.PNG'),(22,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/0b3a714c-6301-4940-93fe-3dca0b766a31.PNG'),(23,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/50d71e66-04a3-4f7c-b5fb-5e4ebbb2e644.mp3'),(24,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/bd38e7f8-161d-4983-8a7f-6be66c85947a.mp3'),(25,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/aae05388-c017-41c0-8511-700690a36f1f.mp3'),(26,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/d32f5e56-f4da-4311-a45e-3c846c1d92e0.mp3'),(27,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/586648b4-2db9-4e2f-ab45-f9a63b176c37.mp3'),(28,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/fe828ff5-ea8a-4511-8f02-0b8ceb2d1fbf.mp3'),(29,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/5e0c2333-723b-45d2-82cc-4cf183451436.mp3'),(30,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/356e7367-8caf-42d9-811f-29966b0fafd7.mp3'),(31,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/4019fdba-fc32-49ae-9251-3c335da2d303.mp3'),(32,'2024-04-02 12:17:12.000000','https://dear103.s3.ap-northeast-2.amazonaws.com/d584d1cc-ca6e-4e4a-9919-90dbf3a1d6e9.mp3');
/*!40000 ALTER TABLE `image` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-03 11:21:49
