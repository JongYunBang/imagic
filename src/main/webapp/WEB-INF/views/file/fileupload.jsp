<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<script src="../js/newdropzone.js"></script>
<script src="../js/fileupload.js"></script>

<link rel="stylesheet" href="../css/newdropzone.css">
<link rel="stylesheet" href="../css/fileupload.css">

<title>iMagic 파일 업로드</title>
</head>
<body>

<!-- header 부분 -->
<input type="hidden" id="m_id" value="${member.m_id }">
<div id="file_main">

	<div id="file_main_aside" >
	
		<!-- session 로 부터 아이디 얻어오기  -->
		<div id="file_user_id">${member.m_id}님의 폴더</div>     
		<!-- 폴더 생성 -->		
		<div id="file_dir_create">폴더 생성</div>
		<!-- 아이디로 부터 디렉토리 받아오기  -->
		<ul id="file_user_dir">
			<c:forEach var="result" items="${dir_result}" varStatus="status">
				<li id="${result}">
					<c:out value="${result}"/>   <!-- 파일 목록 출력  -->
					<button id="${result}" class="rename">이름변경</button>
					<button id="${result}" class="delete">삭제</button>
				</li>
			</c:forEach>
		</ul>
	</div>
	
	<div id="file_main_bside" >
		<input type="file" id="files" name="files []" style="display: none;"	multiple/>
		<div id="drop_zone" class="dropzone">
			<div class="dz-default dz-message"><span>Drop files here to upload</span></div>
			
		</div>	
		<div id="progress_bar">
    		<div class="percent"></div>
		</div>
		<button id="upload_dropzone">Upload File</button>
	</div>
	
</div>

<!-- footer 부분 -->
<footer></footer>

</body>
</html>