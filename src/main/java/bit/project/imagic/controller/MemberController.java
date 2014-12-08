package bit.project.imagic.controller;

import java.io.IOException;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.support.SessionStatus;

import bit.project.imagic.service.FileUploadService;
import bit.project.imagic.service.MemberService;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.MemberVO;

@Controller
@SessionAttributes("member")
public class MemberController {
	
	MemberVO storedMember;
	
//	String path = "/Users/ProgrammingPearls/Documents/Upload/";
	String path = "d:/down/upload/";
	
	@Inject
	private FileUploadService fileService;
	
	@Inject
	private MemberService service;

	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public String register(HttpServletRequest req, HttpServletResponse res, MemberVO member) throws Exception {
				
		try {
			int result = service.registerMember(member);
			if (result==1) {
				
				System.out.println("가입성공");
				return "index";
			} else {
				req.setAttribute("failMessage", "DB에 값 넣기 실패");
				return null ;
			}
			
		} catch (Exception e) {
			req.setAttribute("failMessage", e.getMessage());
			return null;
		}
	}
	
	// 로그인 처리부분
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public String login(HttpServletRequest request, HttpServletResponse response, 
			 @ModelAttribute MemberVO member) throws Exception {
		MemberVO storedMember = null;
		if (member != null) {
			storedMember = service.login(member);
		}
		// 종윤 2014.12.8(10:00) : getSession으로 변경(Session 한개 관리를 위해서)
		HttpSession session = request.getSession();
		session.setAttribute("member", storedMember);
		return "index";
	}
	
	// 로그아웃 처리부분
	@RequestMapping(value="/logout", method=RequestMethod.POST)
	public void logout(@ModelAttribute MemberVO member, SessionStatus session, HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		session.setComplete();
		response.sendRedirect(request.getContextPath() + "/");
	}
	
	// 회원 탈퇴
	@RequestMapping(value="/withdraw", method=RequestMethod.POST)
	public void withdraw(@ModelAttribute MemberVO member, 
						    SessionStatus session, 
							HttpServletRequest request, 
							HttpServletResponse response) throws Exception {
		String m_id=(String) request.getParameter("m_id");
		member.setM_id(m_id);
		if(service.withdrawMember(member)==1) {  // db에서 파일 삭제
			if (ImagicUtil.deleteDir(path+m_id)){  // 파일시스템에서 파일 삭제
				
				session.setComplete();
				response.sendRedirect(request.getContextPath() + "/");
			}
		}
	}
	

}
