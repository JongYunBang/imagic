CREATE TABLE `dir` (
  `dir_num` int(11) NOT NULL AUTO_INCREMENT,
  `dir_m_id` varchar(45) NOT NULL,
  `dir_name` varchar(45) NOT NULL,
  PRIMARY KEY (`dir_num`),
  UNIQUE KEY `dir_num_UNIQUE` (`dir_num`),
  KEY `m_id_dir_m_id_idx` (`dir_m_id`),
  CONSTRAINT `m_id_dir_m_id` FOREIGN KEY (`dir_m_id`) REFERENCES `member` (`m_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=utf8;
