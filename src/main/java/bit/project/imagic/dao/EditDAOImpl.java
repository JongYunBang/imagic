package bit.project.imagic.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import bit.project.imagic.vo.FileVO;

@Repository
public class EditDAOImpl implements EditDAO {
	
	@Inject
	SqlSession sqlSession;

	@Override
	public List<FileVO> fileList(FileVO file) throws Exception {
		return sqlSession.selectList("editFileList", file);
	}

	@Override
	public int thumbnailUpload(FileVO file) throws Exception {
		return sqlSession.update("thumbnailUpload", file);
	}

}
