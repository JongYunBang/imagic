<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>


<script src="../js/file/newdropzone.js"></script>
<script src="../js/file/fileupload.js"></script>
<script src="../js/jquery.ui.touch-punch.min.js"></script>
<link rel="stylesheet" href="../css/file/fileupload.css">
<link rel="stylesheet" href="../css/file/newdropzone.css">


<input type="hidden" id="m_id" value="${member.m_id}">
<div class="container">
		<div style="text-align: center">
	     <h2 class="heading">추억을 간직할 수 있는 <span class="text-muted">앨범</span></h2>
	     	<p class="lead"></p>	
            <p class="lead">연인과 함께! 동료와 함께! 사랑하는 사람들과 함께!</p>	 
            <p class="lead">사진을 모바일과 PC에서 자유롭게 올리세요!</p>
         </div>
	<hr class="colorgraph">

	<div class="row">
		<div class="col-md-2 nav" id="file_main_aside">

			<!-- session 로 부터 아이디 얻어오기  -->
			<div style="text-align: center" class="well" id="file_user_id">
				<span class="glyphicon glyphicon-user"></span> ${member.m_id} 님의 폴더
			</div>
			<br />
			<!-- 폴더 생성 -->
			<div id="file_dir_create" class="makeFolder" align="center">
				<span class="glyphicon glyphicon-folder-open"></span>폴더 만들기
			</div>

			<hr class="nav-divider">
			<!-- 아이디로 부터 디렉토리 받아오기  -->
			<ul class="list-group" id="file_user_dir">
				<c:forEach var="result" items="${dir_result}" varStatus="status">
					<li class="list-group-item" id="${result}">
					<div id="${result}" class='folder ellipsis'>${result}</div>
					<span class='glyphicon glyphicon-trash delete pull-right' id="${result}" title="삭제"></span> 
					<span class='glyphicon glyphicon-pencil rename pull-right' id="${result}" title="수정"></span>
					</li>
				</c:forEach>
			</ul>
		</div>

		<!--  드랍존 -->
		<div class="col-md-6" id="file_main_bside">
			<input type="file" id="files" name="files []" style="display: none;"
				multiple />
			<div id="drop_zone" class="dropzone" data-folder>
			</div>
			<div id="progress_bar">
				<div class="percent"></div>
			</div>
		</div>
		
		<!--  업로드 버튼 -->
		<div class="col-md-4 alert">
<!-- 			<!-- ******* 뒤로가기 버튼 수정 해야함 ******* --> 
<!-- 			<div class="alert alert-info"> -->
<!-- 				<div style="display: inline-block;"> -->
<%-- 					<a ^class="btn btn-success pull-right" style="width: 108px" href="<%=request.getContextPath()%>/"> --%>
<!-- 					<span class="glyphicon glyphicon-ok pull-left"></span>BACK</a> -->
<!-- 				</div> -->
<!-- 			</div> -->
			<div class="alert alert-warning">
				<strong>주의:</strong>업로드 버튼을 누르셔야 저장이 됩니다.<br/>
				<div style="display: inline-block;">
					<a class="btn btn-warning pull-right" id="upload_dropzone" style="width: 108px"> 
						<span class="glyphicon glyphicon-cloud-upload pull-left"></span> UPLOAD
					</a>
				</div>
			</div>
			
			<form id="edit_form" method="post" action="<%=request.getContextPath()%>/edit">
			    <!-- PC접속일 경우 보여지는 edit페이지로 가는 버튼 -->
				<div id="nextBtnOn" class="alert alert-success">
					<strong>알림:</strong> 다음 페이지로 이동 합니다.
					<div style="display: inline-block;">
						<a class="btn btn-success pull-right" id="edit" style="width: 108px"> <span
							class="glyphicon glyphicon-ok"></span>NEXT
						</a>
					</div>
				</div>
				<!-- 모바일 기기에서 접속하면 보여지는 안내문 -->
				<div id="nextBtnOff" class="alert alert-success">
					<strong>알림:</strong> 모바일 기기에서는 파일 업로드까지만 지원합니다.<br/> PC에서 접속해 주시기 바랍니다.
				</div>
				 
				<input type="hidden" name="m_id" id="m_id" value="${member.m_id }"> 
				<input type="hidden" name="dirName" id="dirName" value="">
			</form>
		</div>
	</div>
</div>


	<%@ include file="../common/footer.jsp"%>