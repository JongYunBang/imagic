package bit.project.imagic.dao;

import java.util.List;

import bit.project.imagic.vo.FileVO;

public interface FileUploadDAO {
	
	int select(FileVO file) throws Exception;
	List<String> selectDir(FileVO file) throws Exception;
	int create(FileVO file) throws Exception;
	int rename(FileVO file) throws Exception;
	int update(String m_id, String dirName) throws Exception;
	int deleteDir(FileVO file) throws Exception;
	List<FileVO> fileList(FileVO fiel) throws Exception;
	int fileUpload(FileVO file)throws Exception;
	int removeFile(FileVO file)throws Exception;
	String isFile(FileVO file) throws Exception;
}
