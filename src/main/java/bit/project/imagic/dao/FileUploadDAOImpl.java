package bit.project.imagic.dao;

import java.util.List;

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
	public List<String> selectDir(FileVO file) throws Exception {
		return sqlSession.selectList("selectDir", file);
	}
	
	
	@Override
	public int create(FileVO file) throws Exception {
		return sqlSession.insert("dirCeate", file);
	}

	@Override
	public int rename(FileVO file) throws Exception {
		return sqlSession.update("renameDir", file);
	}
	
	@Override
	public int update(String m_id, String dirName) throws Exception {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int deleteDir(FileVO file) throws Exception {
		return sqlSession.delete("deleteDir", file);
	}

	@Override
	public List<FileVO> fileList(FileVO file) throws Exception {
		return sqlSession.selectList("fileList", file);
	}

	@Override
	public int fileUpload(FileVO file) throws Exception {
		return sqlSession.insert("fileUpload", file);
	}

	@Override
	public String isFile(FileVO file) throws Exception {
		return sqlSession.selectOne("isFile", file);
	}
	
	@Override
	public int removeFile(FileVO file) throws Exception {
		return sqlSession.delete("removeFile", file);
	}

	@Override
	public int imgNumGet(FileVO file) throws Exception {
		return sqlSession.selectOne("selectImgNum", file);
	}

	@Override
	public FileVO fileDown(FileVO file) throws Exception {
		return sqlSession.selectOne("fileDown", file);
	}

}
