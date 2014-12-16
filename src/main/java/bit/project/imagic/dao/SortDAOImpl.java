package bit.project.imagic.dao;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import bit.project.imagic.vo.FileVO;

@Repository
public class SortDAOImpl implements SortDAO {
	
	@Inject
	SqlSession sqlSession;
	
	@Override
	public List<FileVO> fileList(FileVO file) throws Exception {
		return sqlSession.selectList("sortFileList", file);
	}

}
