package bit.project.imagic.service;

import java.util.List;

import bit.project.imagic.vo.FileVO;

public interface EditService {
	List<FileVO> fileList(FileVO file) throws Exception;

}
