package bit.project.imagic.dao;

import bit.project.imagic.vo.MemberVO;


public interface MemberDAO {

	int create(MemberVO member) throws Exception;
	
	MemberVO read(String m_id) throws Exception;
	MemberVO read(MemberVO member) throws Exception;
	
	int update(MemberVO member) throws Exception;
	
	int delete(MemberVO member) throws Exception;
	int deleteByMemberId(String m_id) throws Exception;
	
}
