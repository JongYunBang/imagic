package bit.project.imagic.dao;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import bit.project.imagic.vo.FileVO;

@Repository
public class FileUploadDAOImpl implements FileUploadDAO {

	@Inject
	SqlSession sqlSession;

	@Override
	public int select(FileVO file) throws Exception {
		return sqlSession.selectOne("isDir", file);
	}
	
	@Override
	public int create(FileVO file) throws Exception {
		return sqlSession.insert("dirCeate", file);
	}

	@Override
	public int update(String m_id, String dirName) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int delete(String m_id, String dirName) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	
}
