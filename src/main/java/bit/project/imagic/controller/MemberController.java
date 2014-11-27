package bit.project.imagic.controller;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import bit.project.imagic.service.MemberService;
import bit.project.imagic.vo.MemberVO;

@Controller
public class MemberController {
	
	@Inject
	private MemberService service;
	
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public String register(HttpServletRequest req, HttpServletResponse res, @ModelAttribute MemberVO member) throws Exception {
				
		try {
			int result = service.registerMember(member);
			
				return "/member/registerSuccess";
			
		} catch (Exception e) {
			req.setAttribute("failMessage", e.getMessage());
			return "/member/registerFail";
		}
	}
	

}
