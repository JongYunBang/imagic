package bit.project.imagic;

import static org.junit.Assert.assertEquals;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import bit.project.imagic.vo.FileVO;
import bit.project.imagic.vo.MemberVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:mybatis/mybatis-config.xml"})
public class MybatisTest {
	
	@Inject
	SqlSession sqlSession;
	
	@Test
	public void testConnection() {

		MemberVO member = null;
		member = sqlSession.selectOne("selectMember", "aa");
		
		assertEquals(member.getM_id(), "aa");
	}
	

	/*
	 *  열우 2014. 12. 6 일(0:59) : DB에 폴더 등록이 잘 되는지 테스팅
	 */
	@Test
	public void insertDBTest() throws Exception{
		FileVO fileVO = new FileVO();
		fileVO.setM_id("qq");
		fileVO.setDirName("asd");
		
		System.out.println(sqlSession.insert("dirCreate", fileVO));
		sqlSession.close();
	}
		
}
