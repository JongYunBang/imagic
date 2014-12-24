package bit.project.imagic.dao;

import java.util.List;

import bit.project.imagic.vo.FileVO;

public interface SortDAO {
	List<FileVO> fileList(FileVO file) throws Exception;
	int imgOrderInsert(FileVO file) throws Exception;

}
