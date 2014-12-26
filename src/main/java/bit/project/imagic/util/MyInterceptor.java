package bit.project.imagic.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import bit.project.imagic.vo.MemberVO;

public class MyInterceptor implements HandlerInterceptor {

	@Override
	public boolean preHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler) throws Exception {
//		String requestURI = request.getContextPath();
//		System.out.println(requestURI);
//		if (requestURI.indexOf("/") > -1) { // 세션체크 예외페이지
//			return true;
//		} else if (requestURI.indexOf("/login") > -1) {
//			return true;
//		} else if (requestURI.indexOf("/signup") > -1) {
//			return true;
//		} else {// 위의 예외페이지 외에는 세션값을 체크해서 있으면 그냥 페이지표시
//
//			
//			}
//		}
		
		HttpSession session = request.getSession();
		MemberVO member = (MemberVO) session.getAttribute("member");
		if (member!= null && !member.getM_id().isEmpty()) {
			return true;
			// 정상적인 세션정보가 없으면 로그인페이지로 이동
		}
		response.sendRedirect("/");
		return false;
	}

	@Override
	public void postHandle(HttpServletRequest request,
			HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void afterCompletion(HttpServletRequest request,
			HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		// TODO Auto-generated method stub

	}

}
