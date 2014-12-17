package bit.project.imagic.dao;

import java.util.List;

import bit.project.imagic.vo.FileVO;

public interface MakeDAO {
	List<FileVO> makeFileList(FileVO file) throws Exception;

}
