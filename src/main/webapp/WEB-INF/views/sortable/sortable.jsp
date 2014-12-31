<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>
<!-- <link rel="stylesheet" href="../css/jquery-ui.css"> -->
<script src="../js/jquery-ui.js"></script>
<script src="../js/sortable/sortable.js"></script> 
<script src="../js/sortable/jquery.ui.touch-punch.min.js"></script> 
<link rel="stylesheet" href="../css/sortable/sortable.css">
<style>

</style>
<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">
<input type="hidden" id="sessionDirNum" value="${file.dirNum}">

<div class="container">
	<div style="text-align: center">
		<h2 class="heading">
			${file.dirName} <span class="text-muted">앨범</span>
		</h2>
		<p class="lead"></p>
		<p class="lead">동영상에 들어갈 사진의 순서를 정해주세요.</p>
		<p class="lead">우선순위는 좌측 상단부터 우측으로 진행됩니다.</p>
	</div>
	<hr class="colorgraph">
</div>


	<div class="row text-center">
		<div class="col-md-offset-4">
			<ul id="sortable">
				<li id="li1" class="ui-state-default"><img id="img1" class="thumbnail"></li>
				<li id="li2" class="ui-state-default"><img id="img2" class="thumbnail"></li>
				<li id="li3" class="ui-state-default"><img id="img3" class="thumbnail"></li>
				<li id="li4" class="ui-state-default"><img id="img4" class="thumbnail"></li>
				<li id="li5" class="ui-state-default"><img id="img5" class="thumbnail"></li>
				<li id="li6" class="ui-state-default"><img id="img6" class="thumbnail"></li>
				<li id="li7" class="ui-state-default"><img id="img7" class="thumbnail"></li>
				<li id="li8" class="ui-state-default"><img id="img8" class="thumbnail"></li>
				<li id="li9" class="ui-state-default"><img id="img9" class="thumbnail"></li>
			</ul>
		</div>	
	</div>
	<br/>
	
<div class="container">	
	<div class="row">
		<form id="sortBack" method="post" action="<%=request.getContextPath()%>/edit"> 
			<!-- <input type="button" value="다음"> -->
				<div class="alert alert-warning pull-left">
						<strong>알림:</strong> 이전 페이지로 이동 합니다.
						<div style="display: inline-block;">
							<a class="btn btn-warning" id="sortBackBtn" style="width: 108px">
								<span class="glyphicon glyphicon-arrow-left"></span>BACK
							</a>
						</div>
				</div>
			<input type="hidden" name="m_id" id="m_id" value="${file.m_id}">
			<input type="hidden" name="dirName" id="dirName" value="${file.dirName}">
		</form>
		<form id="sortResult" method="post" action="<%=request.getContextPath()%>/make"> 
			<!-- <input type="button" value="다음"> -->
				<div class="alert alert-success pull-right">
						<strong>알림:</strong> 다음 페이지로 이동 합니다.
						<div style="display: inline-block;">
							<a class="btn btn-success" style="width: 108px">
								<span class="glyphicon glyphicon-ok"></span>NEXT
							</a>
						</div>
				</div>
			<input type="hidden" name="m_id" id="m_id" value="${file.m_id}">
			<input type="hidden" name="dirName" id="dirName" value="${file.dirName}">
			<input type="hidden" name="dirNum" id="dirNum" value="${file.dirNum}">
		</form>
	</div>


</div>

<%@ include file="../common/footer.jsp"%>
