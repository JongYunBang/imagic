package bit.project.imagic.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import bit.project.imagic.dao.SortDAO;
import bit.project.imagic.vo.FileVO;

@Service
public class SortServiceImpl implements SortService {
	
	@Inject
	SortDAO dao;
	
	@Override
	public List<FileVO> fileList(FileVO file) throws Exception {
		return dao.fileList(file);
	}

	@Override
	public int imgOrderInsert(FileVO file) throws Exception {
		return dao.imgOrderInsert(file);
	}

}
