package bit.project.imagic.service;

import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import bit.project.imagic.dao.EditDAO;
import bit.project.imagic.vo.FileVO;

@Service
public class EditServiceImpl implements EditService {
	
	@Inject
	EditDAO dao;

	@Override
	public List<FileVO> fileList(FileVO file) throws Exception {
		return dao.fileList(file);
	}

	@Override
	public int thumbnailUpload(FileVO file) throws Exception {
		return dao.thumbnailUpload(file);
	}

}
