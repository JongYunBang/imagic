/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.47
 * Generated at: 2014-12-23 01:33:50 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.views;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private org.apache.jasper.runtime.TagHandlerPool _005fjspx_005ftagPool_005fc_005fif_0026_005ftest;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest = org.apache.jasper.runtime.TagHandlerPool.getTagHandlerPool(getServletConfig());
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
    _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.release();
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<!DOCTYPE html>\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("\r\n");
      out.write("<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\r\n");
      out.write("<meta name=\"description\" content=\"\">\r\n");
      out.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\r\n");
      out.write("\r\n");
      out.write("<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->\r\n");
      out.write("\r\n");
      out.write("<script src=\"../js/jquery2.1.1.js\"></script>\r\n");
      out.write("\r\n");
      out.write("<script type=\"text/javascript\">\r\n");
      out.write("\r\n");
      out.write("// 로그인 버튼 클릭시 Ajax로 로그인 처리 \r\n");
      out.write("\t $(document).ready(function() {\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t$('#login').click(function(event) {\r\n");
      out.write("\t\t\tvar formData = $('#login_form').serialize();\r\n");
      out.write("\t\t\t$.ajax({\r\n");
      out.write("\t\t\t\ttype : \"POST\",\r\n");
      out.write("\t\t\t\turl : \"/login\",\r\n");
      out.write("\t\t\t\tcache : false,\r\n");
      out.write("\t\t\t\tdata : formData,\r\n");
      out.write("\t\t\t\tsuccess : onSuccess,\r\n");
      out.write("\t\t\t\terror : onError\r\n");
      out.write("\t\t\t});\r\n");
      out.write("\t\t\tevent.preventDefault();\r\n");
      out.write("\t\t\tfunction onSuccess(data) {\r\n");
      out.write("\t\t\t\twindow.location.href=\"/\";  // 정상적으로 로그인시 index 페이지 다시로딩\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\t\t\tfunction onError(data, status) {\r\n");
      out.write("\t\t\t\talert(\"error\");   \t\t\t\t// 정상적 처리가 되지 않았을때 에러창 띄움\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\t\t});\r\n");
      out.write("\t\t\r\n");
      out.write("\t\t\r\n");
      out.write("// 회원가입 버튼 클릭시 ajax 회원가입 처리\r\n");
      out.write("\t\t$('#signup').click(function(event) {\r\n");
      out.write("\t\t\t\r\n");
      out.write("\t\t\tvar formData = $('#signup_form').serialize();\r\n");
      out.write("\t\t\t$.ajax({\r\n");
      out.write("\t\t\t\ttype : \"POST\",\r\n");
      out.write("\t\t\t\turl : \"/signup\",\r\n");
      out.write("\t\t\t\tcache : false,\r\n");
      out.write("\t\t\t\tdata : formData,\r\n");
      out.write("\t\t\t\tsuccess : onSuccess,\r\n");
      out.write("\t\t\t\terror : onError\r\n");
      out.write("\t\t\t});\r\n");
      out.write("\t\t\tevent.preventDefault();\r\n");
      out.write("\t\t\tfunction onSuccess(data) {\r\n");
      out.write("\t\t\t\twindow.location.href=\"/\";\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\t\t\tfunction onError(data, status) {\r\n");
      out.write("\t\t\t\talert(\"error\");\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\t\t});\r\n");
      out.write("\t});\r\n");
      out.write("\t\r\n");
      out.write("// 다음 버튼 클릭시 로그인 체크해서 로그인 안되어있으면 로그인 하라는 alert 띄우고 \r\n");
      out.write("// 로그인 되어 있으면 다음 페이지로 넘어가게 해준다\r\n");
      out.write("\tfunction loginCheck() {\r\n");
      out.write("\t\tif (\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${member.m_id}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\"==\"\") {\r\n");
      out.write("\t\t\talert(\"로그인을 해주세요!\");\r\n");
      out.write("\t\t} else {\r\n");
      out.write("\t\t\t/* window.location.href=\"/fileupload\"; */\r\n");
      out.write("\t\t\tdocument.getElementById(\"upload_form\").submit();\r\n");
      out.write("\t\t};\r\n");
      out.write("\t};\r\n");
      out.write("</script>\r\n");
      out.write("\r\n");
      out.write("<title>Imagic</title>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\r\n");
      out.write("\t<!--  세션값 받아오는지 확인 하기 위한 코드 -->\r\n");
      out.write("\tSession_Object : ");
      out.print(session.getAttribute("member"));
      out.write("\r\n");
      out.write("\t<br />Request_Object : ");
      out.print(request.getAttribute("member") );
      out.write("\r\n");
      out.write("\t<br />ModelAndView_Object : ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${member}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\r\n");
      out.write("\t<br />ID :  ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${member.m_id}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\r\n");
      out.write("\t<br />PW :  ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${member.m_pw}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\r\n");
      out.write("\t<br />NAME :  ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${member.m_name}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\r\n");
      out.write("\t<br />E-MAIL: ");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${member.m_email}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\r\n");
      out.write("\t<br />STATE :\r\n");
      out.write("\t\t\t\t\r\n");
      out.write("\t\r\n");
      out.write("\t<!-- 로그인 -->\r\n");
      out.write("\t<form id=\"login_form\" method=\"post\"\r\n");
      out.write("\t\taction=\"");
      out.print(request.getContextPath());
      out.write("/login\">\r\n");
      out.write("\t\t<label  for=\"m_id\">ID</label>\r\n");
      out.write("\t\t<input type=\"text\" name=\"m_id\" id=\"m_id\" value=\"a\" required/><br/>\r\n");
      out.write("\t\t<label  for=\"m_pw\">Password</label>\r\n");
      out.write("\t\t<input type=\"password\" name=\"m_pw\" id=\"m_pw\" value=\"a\" required/><br /> \r\n");
      out.write("\t\t<input type=\"submit\" value=\"로그인\" id=\"login\"/><br />\r\n");
      out.write("\t</form>\r\n");
      out.write("\r\n");
      out.write("\t<!-- 로그아웃 -->\r\n");
      out.write("\t");
      //  c:if
      org.apache.taglibs.standard.tag.rt.core.IfTag _jspx_th_c_005fif_005f0 = (org.apache.taglibs.standard.tag.rt.core.IfTag) _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.get(org.apache.taglibs.standard.tag.rt.core.IfTag.class);
      _jspx_th_c_005fif_005f0.setPageContext(_jspx_page_context);
      _jspx_th_c_005fif_005f0.setParent(null);
      // /WEB-INF/views/index.jsp(103,1) name = test type = boolean reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fif_005f0.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${ not empty member.m_id }", java.lang.Boolean.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false)).booleanValue());
      int _jspx_eval_c_005fif_005f0 = _jspx_th_c_005fif_005f0.doStartTag();
      if (_jspx_eval_c_005fif_005f0 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write("\r\n");
          out.write("\t\t<form method=\"post\" action=\"");
          out.print(request.getContextPath());
          out.write("/logout\">\r\n");
          out.write("\t\t\t<input type=\"submit\" value=\"로그아웃\">\r\n");
          out.write("\t\t</form>\r\n");
          out.write("\t");
          int evalDoAfterBody = _jspx_th_c_005fif_005f0.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_005fif_005f0.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f0);
        return;
      }
      _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f0);
      out.write("\r\n");
      out.write("\t<!-- 회원탈퇴 -->\r\n");
      out.write("\t");
      //  c:if
      org.apache.taglibs.standard.tag.rt.core.IfTag _jspx_th_c_005fif_005f1 = (org.apache.taglibs.standard.tag.rt.core.IfTag) _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.get(org.apache.taglibs.standard.tag.rt.core.IfTag.class);
      _jspx_th_c_005fif_005f1.setPageContext(_jspx_page_context);
      _jspx_th_c_005fif_005f1.setParent(null);
      // /WEB-INF/views/index.jsp(109,1) name = test type = boolean reqTime = true required = true fragment = false deferredValue = false expectedTypeName = null deferredMethod = false methodSignature = null
      _jspx_th_c_005fif_005f1.setTest(((java.lang.Boolean) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${ not empty member.m_id }", java.lang.Boolean.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false)).booleanValue());
      int _jspx_eval_c_005fif_005f1 = _jspx_th_c_005fif_005f1.doStartTag();
      if (_jspx_eval_c_005fif_005f1 != javax.servlet.jsp.tagext.Tag.SKIP_BODY) {
        do {
          out.write("\r\n");
          out.write("\t\t<form method=\"post\" action=\"");
          out.print(request.getContextPath());
          out.write("/withdraw\">\r\n");
          out.write("\t\t\t<input type=\"hidden\" name=\"m_id\" value=\"");
          out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${member.m_id}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
          out.write("\">\r\n");
          out.write("\t\t\t<input type=\"submit\" value=\"회원탈퇴\">\r\n");
          out.write("\t\t</form>\r\n");
          out.write("\t");
          int evalDoAfterBody = _jspx_th_c_005fif_005f1.doAfterBody();
          if (evalDoAfterBody != javax.servlet.jsp.tagext.BodyTag.EVAL_BODY_AGAIN)
            break;
        } while (true);
      }
      if (_jspx_th_c_005fif_005f1.doEndTag() == javax.servlet.jsp.tagext.Tag.SKIP_PAGE) {
        _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f1);
        return;
      }
      _005fjspx_005ftagPool_005fc_005fif_0026_005ftest.reuse(_jspx_th_c_005fif_005f1);
      out.write("\r\n");
      out.write("\t<!-- 회원가입 -->\r\n");
      out.write("\t<form id=\"signup_form\" method=\"post\" action=\"");
      out.print(request.getContextPath());
      out.write("/signup\">\r\n");
      out.write("\t\t<label  for=\"m_id\">ID</label>\r\n");
      out.write("\t\t<input type=\"text\" name=\"m_id\" id=\"m_id\" required/><br/>\r\n");
      out.write("\t\t<label  for=\"m_pw\">Password</label>\r\n");
      out.write("\t\t<input type=\"password\" name=\"m_pw\" id=\"m_pw\" required/><br /> \r\n");
      out.write("\t\t<label  for=\"m_name\">Name</label>\r\n");
      out.write("\t\t<input type=\"text\" name=\"m_name\" id=\"m_name\" required/><br />\r\n");
      out.write("\t\t<label  for=\"m_email\">E-mail</label> \r\n");
      out.write("\t\t<input type=\"email\" name=\"m_email\" id=\"m_email\" placeholder=\"imagic@imagic.kr\" required/><br /> \r\n");
      out.write("\t\t<input type=\"submit\" value=\"가입하기\" id=\"signup\"/><br />\r\n");
      out.write("\t</form>\r\n");
      out.write("\r\n");
      out.write("\t<!--  버튼 클릭시 로그인 여부 검사 -->\r\n");
      out.write("\t<form id=\"upload_form\" method=\"post\" action=\"");
      out.print(request.getContextPath());
      out.write("/fileupload\">\r\n");
      out.write("\t\t<input type=\"button\" onclick=\"loginCheck();\" value=\"다음\"/>\r\n");
      out.write("\t</form>\r\n");
      out.write("\r\n");
      out.write("</body>\r\n");
      out.write("</html>\r\n");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
