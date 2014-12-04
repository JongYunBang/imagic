package bit.project.imagic.dao;

import bit.project.imagic.vo.FileVO;

public interface FileUploadDAO {
	
	int select(FileVO file) throws Exception;
	int create(FileVO file) throws Exception;
	int update(String m_id, String dirName) throws Exception;
	int delete(String m_id, String dirName) throws Exception;

}
