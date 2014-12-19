CREATE TABLE `member` (
  `m_id` varchar(45) NOT NULL DEFAULT '',
  `m_pw` char(41) NOT NULL,
  `m_name` varchar(45) NOT NULL,
  `m_email` varchar(100) NOT NULL,
  `m_regDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`m_id`),
  UNIQUE KEY `m_id_UNIQUE` (`m_id`),
  UNIQUE KEY `m_email_UNIQUE` (`m_email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
