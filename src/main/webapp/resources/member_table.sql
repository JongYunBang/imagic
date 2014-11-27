CREATE TABLE member (
  m_id varchar(45),
  m_pw char(41) NOT NULL,
  m_name varchar(45) NOT NULL,
  m_email varchar(100) NOT NULL,
  m_regDate datetime NOT NULL default NOW(),
  PRIMARY KEY (m_id),
  UNIQUE KEY m_id_UNIQUE (m_id),
  UNIQUE KEY m_email_UNIQUE (m_email)
) ENGINE=InnoDB DEFAULT charset=utf8;