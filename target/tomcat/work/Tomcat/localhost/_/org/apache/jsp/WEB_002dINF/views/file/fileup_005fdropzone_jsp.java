/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.47
 * Generated at: 2014-11-27 01:38:18 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.views.file;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class fileup_005fdropzone_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, false, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("    <meta charset=\"utf-8\">\r\n");
      out.write("    <title>jQuery File Upload Example</title>\r\n");
      out.write("    <script src=\"http://code.jquery.com/jquery-2.1.1.js\"></script>\r\n");
      out.write("    <script src=\"../js/dropzone.js\"></script>\r\n");
      out.write("    <link rel=\"stylesheet\" href=\"../css/dropzone.css\">\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\r\n");
      out.write("<form id=\"my-dropzone\" action=\"/\" class=\"dropzone\"></form>\r\n");
      out.write("\r\n");
      out.write("<button id=\"clear-dropzone\">Clear Dropzone</button>\r\n");
      out.write("\r\n");
      out.write("<script language=\"javascript\">\r\n");
      out.write("\r\n");
      out.write("  // myDropzone is the configuration for the element that has an id attribute\r\n");
      out.write("  // with the value my-dropzone or myDropzone\r\n");
      out.write("  Dropzone.options.myDropzone = {\r\n");
      out.write("    init: function() {\r\n");
      out.write("      this.on(\"sending\", function(file) {\r\n");
      out.write("        \r\n");
      out.write("      });\r\n");
      out.write("\r\n");
      out.write("      // Using a closure.\r\n");
      out.write("      var _this = this;\r\n");
      out.write("\r\n");
      out.write("      // Setup the observer for the button.\r\n");
      out.write("      document.querySelector(\"[data-dz-remove]\").addEventListener(\"click\", function() {\r\n");
      out.write("        // Using \"_this\" here, because \"this\" doesn't point to the dropzone anymore\r\n");
      out.write("        _this.removeAllFiles(true);\r\n");
      out.write("        // If you want to cancel uploads as well, you\r\n");
      out.write("        // could also call _this.removeAllFiles(true);\r\n");
      out.write("      });\r\n");
      out.write("    }\r\n");
      out.write("  };\r\n");
      out.write("\r\n");
      out.write("</script>\r\n");
      out.write("\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
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
