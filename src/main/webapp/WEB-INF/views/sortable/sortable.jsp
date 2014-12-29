<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>
<!-- <link rel="stylesheet" href="../css/jquery-ui.css"> -->
<script src="../js/jquery-ui.js"></script>
<script src="../js/sortable/sortable.js"></script> 
<script src="../js/jquery.ui.touch-punch.min.js"></script> 

<style>
    #sortable { list-style-type: none; margin: 10px; padding: 0; width: 710px; }
    #sortable span { margin-left: 20px; float: left; width: 200px; height: 200px;}
    #sortable span li { margin: 10px 100px 20px 0; padding: 1px; float: left;
        width: 120px; height: 120px; background-size: 100% 120px;}
</style>
<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">
<input type="hidden" id="sessionDirNum" value="${file.dirNum}">

<div class="container">
<div class="row">
<div class="col-md-2"></div>
<ul class="col-md-6" id="sortable">
    <span>
    	<li id="li1" class="ui-state-default">
    		<img id="img1" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li2" class="ui-state-default">
    		<img id="img2" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li3" class="ui-state-default">
    		<img id="img3" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li4" class="ui-state-default">
    		<img id="img4" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li5" class="ui-state-default">
    		<img id="img5" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li6" class="ui-state-default">
    		<img id="img6" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li7" class="ui-state-default">
    		<img id="img7" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li8" class="ui-state-default">
    		<img id="img8" class="thumbnail">
    	</li>
    </span>
    <span>
    	<li id="li9" class="ui-state-default">
    		<img id="img9" class="thumbnail">
    	</li>
    </span>
</ul>
<div class="col-md-4"></div>
</div>
<br/>

<div class="row">
<form id="sortBack" method="post" action="<%=request.getContextPath()%>/edit"> 
	<!-- <input type="button" value="다음"> -->
		<div class="alert alert-success pull-left">
				<strong>알림:</strong> 다음 페이지로 이동 합니다.
				<div style="display: inline-block;">
					<a class="btn btn-success" id="sortBackBtn" style="width: 108px">
						<span class="glyphicon glyphicon-ok"></span>BACK
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
