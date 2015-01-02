package bit.project.imagic.controller;

import java.io.IOException;
import java.io.PrintWriter;

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

import bit.project.imagic.service.MemberService;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.MemberVO;

@Controller
@SessionAttributes("member")
public class MemberController {
	
	@Inject
	private MemberService service;
	
	// 회원 가입 처리
	@RequestMapping(value="/signup", method=RequestMethod.POST)
	public void register(@ModelAttribute MemberVO member, HttpServletRequest req, HttpServletResponse res) throws Exception {
		PrintWriter pw = res.getWriter();
		int memberCheck = service.regMemCheck(member);
		if (memberCheck==0){    // DB에 해당 아이디 있는지 확인 없으면 0이 반환
			int result = service.registerMember(member);  
			if (result==1) {   // DB에 해당 유저 데이터 입력하면서 회원가입 성공
				pw.write("1");
				pw.flush();
			} else {
				pw.write("2");    // DB에 회원 입력 오류  회원가입실패
				pw.flush();
			}
		}else{
			pw.write("3");	// DB에 해당 아이디 존재 다시입력유도
			pw.flush();
		}
		pw.close();
	}
	
	// 로그인 처리부분
	@RequestMapping(value="/login", method=RequestMethod.POST)
	public void login(HttpServletRequest request, HttpServletResponse response, 
			 @ModelAttribute MemberVO member) throws Exception {
		PrintWriter pw = response.getWriter();
		MemberVO storedMember = new MemberVO();
			try {
				storedMember = service.login(member);
				if (storedMember!=null){
					// 종윤 2014.12.8(10:00) : getSession으로 변경(Session 한개 관리를 위해서)
					HttpSession session = request.getSession(false);
					session.setAttribute("member", storedMember);
					pw.write("loginSuccess");
					pw.flush();
				} else {
					pw.write("loginError");
					pw.flush();
				}
			} catch (Exception e) {
				e.printStackTrace();
				pw.write("loginError");
				pw.flush();
			}
		pw.close();
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
	public String withdraw(@ModelAttribute MemberVO member, 
						    SessionStatus session, 
							HttpServletRequest request, 
							HttpServletResponse response) throws Exception {
		String m_id=request.getParameter("m_id");
		member.setM_id(m_id);
		if(service.withdrawMember(member)==1) {  // db에서 파일 삭제
			if (ImagicUtil.deleteDir(ImagicUtil.path+m_id)){  // 파일시스템에서 파일 삭제
				
				session.setComplete();
			}
		}
		return "index";
	}
	

}
