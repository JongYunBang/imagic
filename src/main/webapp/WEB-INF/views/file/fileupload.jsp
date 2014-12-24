<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>


<script src="../js/file/newdropzone.js"></script>
<script src="../js/file/fileupload.js"></script>
<link rel="stylesheet" href="../css/file/fileupload.css">
<link rel="stylesheet" href="../css/file/newdropzone.css">


<input type="hidden" id="m_id" value="${member.m_id}">
<div class="container">
		<div style="text-align: center">
	     <h2 class="heading">And lastly, this one. <span class="text-muted">Checkmate.</span></h2>
            <p class="lead">Donec ullamcorper nulla non metus auctor fringilla. Vestibulum id ligula porta felis euismod semper.
                Praesent commodo cursus magna, vel scelerisque nisl consectetur. Fusce dapibus, tellus ac cursus commodo.</p>
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
			<div id="file_dir_create">
				<span class="glyphicon glyphicon-folder-open"></span>폴더 만들기
			</div>

			<hr class="nav-divider">
			<!-- 아이디로 부터 디렉토리 받아오기  -->
			<ul class="list-group" id="file_user_dir">
				<c:forEach var="result" items="${dir_result}" varStatus="status">
					<li class="list-group-item" id="${result}">
					<div id="${result}" class='folder ellipsis'>${result}</div>
					<span><a class='glyphicon glyphicon-trash delete pull-right' id="${result}" style="text-decoration: none"></a></span> 
					<span><a class='glyphicon glyphicon-pencil rename pull-right' id="${result}" style="text-decoration: none"></a></span>
					</li>
				</c:forEach>
			</ul>
		</div>


		<div class="col-md-6" id="file_main_bside">
			<input type="file" id="files" name="files []" style="display: none;"
				multiple />
			<div id="drop_zone" class="dropzone" data-folder>
				<div class="dz-default dz-message">
					<span>Drop files here to upload</span>
				</div>

			</div>
			<div id="progress_bar">
				<div class="percent"></div>
			</div>
		</div>

		<div class="col-md-4">
			<div class="alert alert-warning">
				<strong>주의:</strong>업로드 버튼 입니다. 
				<div style="display: inline-block;">
					<a class="btn btn-warning pull-right" id="upload_dropzone" style="width: 108px"> <span
						class="glyphicon glyphicon-cloud-upload pull-left"></span> UPLOAD
					</a>
				</div>
			</div>

			<form id="edit_form" method="post" action="<%=request.getContextPath()%>/edit">
				<div class="alert alert-success">
					<strong>알림:</strong> 다음 페이지로 이동 합니다.
					<div style="display: inline-block;">
						<a class="btn btn-success pull-right" id="edit" style="width: 108px"> <span
							class="glyphicon glyphicon-ok"></span>NEXT
						</a>
					</div>
				</div>
				 
				<input type="hidden" name="m_id" id="m_id" value="${member.m_id }"> 
				<input type="hidden" name="dirName" id="dirName" value="">
			</form>
		</div>
	</div>
</div>


	<%@ include file="../common/footer.jsp"%>