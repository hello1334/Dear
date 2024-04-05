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
-- Table structure for table `stamp`
--

DROP TABLE IF EXISTS `stamp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stamp` (
  `stamp_id` bigint NOT NULL AUTO_INCREMENT,
  `from_user_id` binary(16) NOT NULL,
  `to_user_id` binary(16) DEFAULT NULL,
  `image_id` bigint DEFAULT NULL,
  PRIMARY KEY (`stamp_id`),
  KEY `FK928w0nq355tgjpgk3829h708o` (`image_id`),
  CONSTRAINT `FK928w0nq355tgjpgk3829h708o` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stamp`
--

LOCK TABLES `stamp` WRITE;
/*!40000 ALTER TABLE `stamp` DISABLE KEYS */;
INSERT INTO `stamp` VALUES (21,_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',_binary 'pÚé\’\ÊKwø7\Ô§aP\‚\Ô',3),(22,_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',_binary 'KØ\‡(˜@b•6´\„Kª\‡h',4),(23,_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',_binary 'Tl´ˆLıMéΩ\ÿ©\ÌAπı',5),(24,_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',_binary '˜ã\Œ¡Cb≥ï=§\‰C\r',6),(25,_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',_binary 'WÖ$±\ÔJñ)]\‘\Î?Åò',7),(26,_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',_binary '_à\–1úLM≠J\ÿe\Í/\“',8),(27,_binary '#∫\›1%G˘ë°\Óô\‡I',_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',8),(28,_binary '\È∂\Í\ÎIíØu\›uÙKQ',_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',9),(29,_binary '_!&c\\\’G–é∂Ω≥çH[\ÿ',_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',10),(30,_binary 'ÜLRGvC˝ä\ÀO{\“\€)',_binary '^òª≠ØFZ∂\ƒ\"≠≥\Óï',11);
/*!40000 ALTER TABLE `stamp` ENABLE KEYS */;
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
