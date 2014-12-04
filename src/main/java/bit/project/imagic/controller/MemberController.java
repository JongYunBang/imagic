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
import org.springframework.web.servlet.ModelAndView;

import bit.project.imagic.service.MemberService;
import bit.project.imagic.vo.MemberVO;

@Controller
@SessionAttributes("storedMember")
public class MemberController {
	
	@Inject
	private MemberService service;

	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public String register(HttpServletRequest req, HttpServletResponse res, MemberVO member) throws Exception {
				
		try {
//			System.out.println("컨트롤단member" + member.getM_id());
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
	public ModelAndView login(HttpServletRequest req, HttpServletResponse res, 
			 @ModelAttribute MemberVO member) throws Exception {
		MemberVO storedMember = null;
		// 로그인 처리후 로그인된 회원 정보를 가져와서 MemberVO 객체의 인스턴스인 storedMember에 저장
		if (member != null) {
			storedMember = service.login(member);
		}
//		}else {
//			return new ModelAndView("index", "memeber", "loginFail");
//		}
		HttpSession login_session = req.getSession();
//		
		// 세션에 MemberVO객체를 통째로 넘기는 방법
		login_session.setAttribute("member", storedMember);
		
		return new ModelAndView("index", "member", storedMember);
		
	}
	
	// 로그아웃 처리부분
	@RequestMapping("/logout")
	public void logout(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		
		HttpSession session = request.getSession(false);
		if (session != null) {
			session.invalidate();
		}
		
		response.sendRedirect(request.getContextPath() + "/");
		
	}
	

}
