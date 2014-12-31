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
				간편한 방법으로 사진을 올리세요. <span class="text-muted">언제
					어디서나!</span>
			</h2>
			<p class="lead">Travie는 PC와 TabletPC, 스마트폰 
			모든 기기에서의 사진 업로드를 지원합니다. 스마트폰에 보관된 사진들, 
			PC연결이 어려우시다면 스마트폰에서 바로 올리세요.</p>
		</div>

		<%-- <a href="<%= request.getContextPath() %>/member/mypage">마이페이지</a><br/> --%>
		<div class="col-md-5">
			<img class="img-responsive" src="./img/img1.jpg" />
		</div>
	</div>

	<hr class="colorgraph">

	<div class="row">
		<div class="col-md-5">
			<img class="img-responsive" src="img/img2.jpg" />
		</div>
		<div class="col-md-7">
			<h2 class="heading">
				올린 사진들을 편집하세요. <span class="text-muted">적은 click으로
					많은 변화를!</span>
			</h2>
			<p class="lead">CamenJS에서 지원하는 강력한 Filter 기능으로
			원하는 광원 효과를 직접 넣어 보세요. 하나하나 조절하기 귀찮으시다면
			Filter의 기능이 복합적으로 담겨 있는 PresetFilter를 추천합니다. </p>
		</div>
	</div>

	<hr class="colorgraph">

	<div class="row">
		<div class="col-md-7">
			<h2 class="heading">
				마지막으로 동영상을 제작하세요. <span class="text-muted">추억이 몇 배가 됩니다!</span>
			</h2>
			<p class="lead">업로드한 사진에 따라 비율과 품질, 재생시간 등을 직접 조절 하실 수 있습니다.
			부끄러움이 심하시다면 할 말을 미리 동영상 안에 넣는 것도 가능하지요.
			제작한 동영상은 내려받기를 통해 간직하거나 원하는 곳에 활용하세요.</p>
		</div>
		<div class="col-md-5">
			<img class="img-responsive" src="/img/img3.jpg">
		</div>
	</div>

	<hr class="colorgraph">
</div>
<%@ include file="./common/footer.jsp"%>
