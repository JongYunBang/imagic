CREATE TABLE image (
  img_fnum int(11) unsigned NOT NULL AUTO_INCREMENT,
  img_id varchar(45) NOT NULL,
  img_pname varchar(100) NOT NULL,
  img_fsrc varchar(100) NOT NULL,
  img_fname varchar(100) NOT NULL,
  img_fsize bigint(20) unsigned NOT NULL,
  PRIMARY KEY (img_fnum),
  UNIQUE KEY img_fnum_UNIQUE (img_fnum),
  KEY img_id_idx (img_id),
  CONSTRAINT img_id_m_id_FK FOREIGN KEY (img_id) REFERENCES member (m_id) ON DELETE CASCADE 
) ENGINE=InnoDB DEFAULT charset=utf8;

