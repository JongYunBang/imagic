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
@SessionAttributes("member")
public class MemberController {
	
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
	public ModelAndView login(HttpServletRequest req, HttpServletResponse res, 
			 @ModelAttribute MemberVO member) throws Exception {
		MemberVO storedMember = null;
		if (member != null) {
			storedMember = service.login(member);
		}
		
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
