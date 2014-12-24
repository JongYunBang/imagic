package bit.project.imagic.service;

import java.util.List;

import bit.project.imagic.vo.FileVO;

public interface MakeService {
	List<FileVO> makeFileList(FileVO file) throws Exception; 
	
}
