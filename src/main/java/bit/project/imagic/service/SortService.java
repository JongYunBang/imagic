package bit.project.imagic.service;

import java.util.List;

import bit.project.imagic.vo.FileVO;


public interface SortService {
	
	List<FileVO> fileList(FileVO file) throws Exception;
	int imgOrderInsert(FileVO file) throws Exception;
}
