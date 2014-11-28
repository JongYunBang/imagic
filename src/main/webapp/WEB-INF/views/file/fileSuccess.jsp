<%@page import="bit.project.imagic.vo.FileUploadVO"%>
<%@page import="org.springframework.web.multipart.MultipartFile"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
</head>
<body>

<h1>Spring Multiple File Upload example</h1>
    <p>Following files are uploaded successfully.</p>
    ${uploadVO}
 <%
 FileUploadVO uploadVO = (FileUploadVO) request.getAttribute("uploadFile");
  List<MultipartFile> files = uploadVO.getFiles();
	int a=0;
	if (null !=files && files.size()>0) {
		for (MultipartFile multipartFile : files) {
			
			// 파일 이름앞에 붙일 random ID
			String genID = UUID.randomUUID().toString();
			String originalFilename = genID + multipartFile.getOriginalFilename();
%>
		<br><hr><%=++a %>. <%= multipartFile.getOriginalFilename() %>	<br>
<%
			// 업로드한 파일을 저장하기 위한 path 설정
			String savePath = "d:/down/upload/" + originalFilename;
			long filesize = multipartFile.getSize();
			try {
				multipartFile.transferTo(new File(savePath));
			} catch (IllegalStateException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}
 
 %>   
   <%--  <ol>
        <c:forEach items="${uploadVO}" var="file">
            <li>${file}</li>
        </c:forEach>
    </ol> --%>
    
    
    
    

</body>
</html>