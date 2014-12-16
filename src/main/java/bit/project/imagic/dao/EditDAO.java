package bit.project.imagic.dao;

import java.util.List;

import bit.project.imagic.vo.FileVO;

public interface EditDAO {
	List<FileVO> fileList(FileVO fiel) throws Exception;
	int thumbnailUpload(FileVO fiel) throws Exception;

}
