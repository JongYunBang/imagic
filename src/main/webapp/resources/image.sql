CREATE TABLE `image` (
  `img_num` int(11) NOT NULL AUTO_INCREMENT,
  `img_m_id` varchar(45) NOT NULL,
  `img_dir_num` int(11) NOT NULL,
  `img_s_name` varchar(150) NOT NULL,
  `img_o_name` varchar(150) NOT NULL,
  `img_size` bigint(20) NOT NULL,
  `img_thumb` mediumblob NOT NULL,
  PRIMARY KEY (`img_num`),
  UNIQUE KEY `img_num_UNIQUE` (`img_num`),
  KEY `m_id_img_m_id_idx` (`img_m_id`),
  KEY `dir_num_img_dir_num_idx` (`img_dir_num`),
  CONSTRAINT `dir_num_img_dir_num` FOREIGN KEY (`img_dir_num`) REFERENCES `dir` (`dir_num`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `m_id_img_m_id` FOREIGN KEY (`img_m_id`) REFERENCES `member` (`m_id`) ON DELETE CASCADE ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
