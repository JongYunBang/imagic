package bit.project.imagic.service;

import javax.inject.Inject;

import org.springframework.stereotype.Service;

import bit.project.imagic.dao.MemberDAO;
import bit.project.imagic.vo.MemberVO;

@Service
public class MemberServiceImpl implements MemberService {
	
	@Inject
	private MemberDAO dao;

	@Override
	public MemberVO login(MemberVO member) throws Exception {
		return dao.read(member);
	}

	@Override
	public MemberVO checkLogin(MemberVO member) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public int registerMember(MemberVO member) throws Exception {
		int insertResult =0;
//		System.out.println("service member " + member.getM_id());
		insertResult = dao.create(member);
//		System.out.println("memberserviceimp에서의 리턴값 "+insertResult);
		return insertResult;
	}

	@Override
	public MemberVO modifyMember(MemberVO member) throws Exception {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MemberVO getMember(String m_id) throws Exception {
		return dao.read(m_id);
	}

	@Override
	public int withdrawMember(MemberVO member) throws Exception {
		return dao.delete(member);
	}

	
	
}
