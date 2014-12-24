package bit.project.imagic.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import bit.project.imagic.dao.MakeDAO;
import bit.project.imagic.vo.FileVO;

@Service
public class MakeServiceImpl implements MakeService {
	
	@Inject
	MakeDAO dao;

	@Override
	public List<FileVO> makeFileList(FileVO file) throws Exception {
		return dao.makeFileList(file);
	}
}
