<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>

<script src="../js/newdropzone.js"></script>
<script src="../js/fileupload.js"></script>
<link rel="stylesheet" href="../css/fileupload.css">
<link rel="stylesheet" href="../css/newdropzone.css">

<input type="hidden" id="m_id" value="${member.m_id }">
<div id="file_main">

	<div id="file_main_aside" >
	
		<!-- session 로 부터 아이디 얻어오기  -->
		<div id="file_user_id">${member.m_id}님의 폴더</div> <br/>    
		<!-- 폴더 생성 -->		
		<div id="file_dir_create">폴더 생성</div>
		<!-- 아이디로 부터 디렉토리 받아오기  -->
		<ul id="file_user_dir">
			<c:forEach var="result" items="${dir_result}" varStatus="status">
				<li id="${result}">
					<span id="${result}" class='folder'>${result}
						<button id="${result}" class="rename">이름변경</button>
						<button id="${result}" class="delete">삭제</button>
					</span>
				</li>
			</c:forEach>
		</ul>
	</div>
	
	<div id="file_main_bside" >
		<input type="file" id="files" name="files []" style="display: none;" multiple/>
		<div id="drop_zone" class="dropzone" data-folder>
			<div class="dz-default dz-message"><span>Drop files here to upload</span></div>
			
		</div>	
		<div id="progress_bar">
    		<div class="percent"></div>
		</div>
		<button id="upload_dropzone">Upload File</button>
		<br/>
		<br/>
		<br/>
		<div>
			<form id="edit" method="post" action="<%=request.getContextPath()%>/edit"> 
				<input type="button" value="편집하러가기">
				<input type="hidden" name="m_id" id="m_id" value="${member.m_id }">
				<input type="hidden" name="dirName" id="dirName" value="">
			</form>
		</div>	
		
	</div>
</div>
<img id="testimg"/>
<!-- footer 부분 -->
<%@ include file="../common/footer.jsp"%>