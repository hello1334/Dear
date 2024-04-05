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
-- Table structure for table `letter`
--

DROP TABLE IF EXISTS `letter`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `letter` (
  `letter_id` bigint NOT NULL AUTO_INCREMENT,
  `create_at` datetime(6) NOT NULL,
  `from_user_name` varchar(255) NOT NULL,
  `read_flag` bit(1) NOT NULL,
  `to_user_name` varchar(255) NOT NULL,
  `letter_image_id` bigint DEFAULT NULL,
  `letter_music_id` bigint DEFAULT NULL,
  `stamp_id` bigint DEFAULT NULL,
  PRIMARY KEY (`letter_id`),
  UNIQUE KEY `UK_t1t18n6ox53l1u751bl31hcrf` (`letter_image_id`),
  UNIQUE KEY `UK_j18ay724q4l27htac9m86rirv` (`letter_music_id`),
  UNIQUE KEY `UK_6ruxdovk31do61e1d0sf55a74` (`stamp_id`),
  CONSTRAINT `FK5vk2y47kymxsbq6m2vxssg43v` FOREIGN KEY (`stamp_id`) REFERENCES `stamp` (`stamp_id`),
  CONSTRAINT `FKdfm4oakwpb6blxg4ylbqjc5oj` FOREIGN KEY (`letter_image_id`) REFERENCES `letter_image` (`letter_image_id`),
  CONSTRAINT `FKrnaw2ohbafflq5a7u2elxeevp` FOREIGN KEY (`letter_music_id`) REFERENCES `letter_music` (`letter_music_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `letter`
--

LOCK TABLES `letter` WRITE;
/*!40000 ALTER TABLE `letter` DISABLE KEYS */;
INSERT INTO `letter` VALUES (21,'2024-04-02 15:35:55.627398','fromUserName',_binary '','toUserName',1,1,21),(22,'2024-04-02 15:35:55.639399','fromUserName',_binary '\0','toUserName',2,2,22),(23,'2024-04-02 15:35:55.640391','fromUserName',_binary '\0','toUserName',3,3,23),(24,'2024-04-02 15:35:55.641391','fromUserName',_binary '\0','toUserName',4,4,24),(25,'2024-04-02 15:35:55.642398','fromUserName',_binary '\0','toUserName',5,5,25),(26,'2024-04-02 15:35:55.642398','fromUserName',_binary '\0','toUserName',6,6,26),(27,'2024-04-02 15:35:55.643392','fromUserName',_binary '\0','toUserName',7,7,27),(28,'2024-04-02 15:35:55.643392','fromUserName',_binary '\0','toUserName',8,8,28),(29,'2024-04-02 15:35:55.644392','fromUserName',_binary '\0','toUserName',9,9,29),(30,'2024-04-02 15:35:55.645392','fromUserName',_binary '','toUserName',10,10,30);
/*!40000 ALTER TABLE `letter` ENABLE KEYS */;
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
