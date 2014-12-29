<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="./common/header.jsp"%>
<link href="../css/main/main.css" rel="stylesheet">
<script src="../js/main/main.js"></script>
<style>
</style>
<!-- **************************바디****************************** -->
<div class="TravieMain">
	<br/>
		<h1 class="title heading">Travie에 오신것을 환영합니다.</h1>
		<p class="title lead">
			사진들을 모아 동영상으로 간직하세요!<br /> 간단한 과정과 작은 시간으로 당신의 소중한 추억을 간직할 수 있습니다.
		</p>

		<c:choose>
			<c:when test="${empty member.m_id }">
				<p>
					<a class="btn btn-lg btn-primary" data-toggle="modal"
						data-target=".bs-modal-sm">시작해볼까요?</a>
				</p>
			</c:when>
			<c:otherwise>
				<form id="upload_form" method="post"
					action="<%=request.getContextPath()%>/fileupload">
					<p>
						<a class="btn btn-lg btn-primary" id="btn_start">시작해볼까요?</a>
					</p>
				</form>
			</c:otherwise>
		</c:choose>

	</div>
<div class="container">
	
	<hr class="colorgraph">

	<div class="row">
		<div class="col-md-7">
			<h2 class="heading">
				First featurette heading. <span class="text-muted">It'll blow
					your mind.</span>
			</h2>
			<p class="lead">Donec ullamcorper nulla non metus auctor
				fringilla. Vestibulum id ligula porta felis euismod semper. Praesent
				commodo cursus magna, vel scelerisque nisl consectetur. Fusce
				dapibus, tellus ac cursus commodo.</p>
		</div>

		<%-- <a href="<%= request.getContextPath() %>/member/mypage">마이페이지</a><br/> --%>
		<div class="col-md-5">
			<img class="img-responsive" src="./img/F1-1.jpg" />
		</div>
	</div>

	<hr class="colorgraph">

	<div class="row">
		<div class="col-md-5">
			<img class="img-responsive" src="img/F1-2.jpg" />
		</div>
		<div class="col-md-7">
			<h2 class="heading">
				Oh yeah, it's that good. <span class="text-muted">See for
					yourself.</span>
			</h2>
			<p class="lead">Donec ullamcorper nulla non metus auctor
				fringilla. Vestibulum id ligula porta felis euismod semper. Praesent
				commodo cursus magna, vel scelerisque nisl consectetur. Fusce
				dapibus, tellus ac cursus commodo.</p>
		</div>
	</div>

	<hr class="colorgraph">

	<div class="row">
		<div class="col-md-7">
			<h2 class="heading">
				And lastly, this one. <span class="text-muted">Checkmate.</span>
			</h2>
			<p class="lead">Donec ullamcorper nulla non metus auctor
				fringilla. Vestibulum id ligula porta felis euismod semper. Praesent
				commodo cursus magna, vel scelerisque nisl consectetur. Fusce
				dapibus, tellus ac cursus commodo.</p>
		</div>
		<div class="col-md-5">
			<img class="img-responsive" src="/img/F1-3.jpg">
		</div>
	</div>

	<hr class="colorgraph">
</div>
<%@ include file="./common/footer.jsp"%>
