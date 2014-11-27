package bit.project.imagic.service;

import bit.project.imagic.vo.MemberVO;


public interface MemberService {
	
	MemberVO checkLogin(MemberVO member) throws Exception;
	
	MemberVO getMember(String m_id) throws Exception;
	
	int registerMember(MemberVO member) throws Exception;
	
	MemberVO modifyMember(MemberVO member) throws Exception;

}
