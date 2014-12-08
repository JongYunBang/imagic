package bit.project.imagic;

import static org.junit.Assert.assertEquals;

import javax.inject.Inject;

import org.apache.ibatis.session.SqlSession;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import bit.project.imagic.vo.MemberVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:mybatis/mybatis-config.xml"})
public class MybatisTest {
	
	@Inject
	SqlSession sqlSession;
	
	@Test
	public void testConnection() {

		MemberVO member = null;
		member = sqlSession.selectOne("selectMember", "freebjy");
		
		assertEquals(member.getM_id(), "freebjy");
	}
}
