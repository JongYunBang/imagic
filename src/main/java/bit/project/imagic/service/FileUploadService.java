package bit.project.imagic.service;

import bit.project.imagic.vo.FileVO;

public interface FileUploadService {
	
	int isDir(FileVO file) throws Exception;
	int createDir(FileVO file) throws Exception;
	int deleteDir(String m_id, FileVO file) throws Exception;
	int updatedir(String m_id, FileVO file) throws Exception;

}
