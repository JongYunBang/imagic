package bit.project.imagic.service;

import java.util.List;

import bit.project.imagic.vo.FileVO;

public interface FileUploadService {
	
	int isDir(FileVO file) throws Exception;
	List<String> selectDir(FileVO file) throws Exception;
	int createDir(FileVO file) throws Exception;
	int renameDir(FileVO file) throws Exception;
	int deleteDir(FileVO file) throws Exception;
	List<FileVO> fileList(FileVO file) throws Exception;
	int fileUpload(FileVO file) throws Exception;
}
