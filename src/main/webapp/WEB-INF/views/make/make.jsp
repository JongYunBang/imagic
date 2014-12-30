<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>

<script src="../js/make/whammy.js"></script>
<script src="../js/make/make.js"></script>


<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">
<input type="hidden" id="sessionDirNum" value="${file.dirNum}">


<div class="container">
	<div class="row" style="margin-top:50px;"></div>
	
    <div class="row">
    	<div id="preset">
	    	<div class="well col-md-3" id="step1">
	    		<span>영상의 가로와 세로 방향을 정해주세요</span><br/>
	    		<span id="step1Str" style="color: skyblue;"></span><br/>
	    		<input type="radio" name="imgDirection" value="가로방향" />가로방향&nbsp;&nbsp;&nbsp;
	    		<input type="radio" name="imgDirection" value="세로방향" />세로방향
	    	</div>
	    	<div class="well col-md-3" id="step2">
	    		<span>영상의 비율을 정해주세요</span><br/>
	    		<input type="radio" name="imgRatio" id="ratio4x3" value="4x3" checked /><span id="ratio4x3span">4X3</span><br/>
	    		<input type="radio" name="imgRatio" id="ratio16x9" value="16x9"/><span id="ratio16x9span">16X9</span>
	    	</div>
	    	<div class="well col-md-3" id="step3">
	    		<span>영상의 Quality를 선택해 주세요</span><br/>
	    		<input type="radio" id="imgLow" name="imgQuality" value="" checked /><span id="imgLowSpan"></span>&nbsp;&nbsp;&nbsp;
	    		<input type="radio" id="imgMiddle" name="imgQuality" value=""/><span id="imgMiddleSpan"></span><br/>
	    		<input type="radio" id="imgHi" name="imgQuality"value="" /><span id="imgHiSpan"></span>
	    	</div>
	    	<div class="well col-md-3" id="step4">
	    		<span> 제작할 영상의 시간을 선택해 주세요</span><br/>
	    		<input type="radio" id="imgRT15" name="imgRunTime" value="16" checked /><span id="imgRT15">15초</span>&nbsp;&nbsp;&nbsp;
	    		<input type="radio" id="imgRT30" name="imgRunTime" value="9" /><span id="imgRT30">30초</span><br/>
	    		<input type="radio" id="imgRT60" name="imgRunTime" value="6" /><span id="imgRT60">60초</span>&nbsp;&nbsp;&nbsp;
	    		<input type="radio" id="imgRT90" name="imgRunTime" value="5" /><span id="imgRT90">90초</span>
	    	</div>
    	</div>
    </div>
    
    <div class="row text-center">
    	<div>
	   		<button class="btn btn-default" id="userSetBn" >사용자 임의 지정</button>
	   	</div>
	   	<br/>
	   	<div id="userSet" style="display: none;">
	    	<div class="well col-md-4"><label>Width:</label><input id="width" type="number" step="1" value="500"></div>
	        <div class="well col-md-4"><label>Height:</label><input id="height" type="number" step="1" value="300"></div>
	        <div class="well col-md-4"><label>Video Frame Rate:</label><input id="framerate" type="number" step="1" value="15"></div><br/>
	   	</div>
	   	<div>
	   		<button class="btn btn-default" id="userSetClose" style="display: none;">사용자 지정 창 닫기</button>
	   	</div>
    </div>	
</div>
    
    <div class="row text-center">
		<span class="" id="status">동영상 만들기</span><br/><br/>
		<button class="btn btn-lg btn-primary" id="createvideo"><span class="glyphicon glyphicon-film"></span> 동영상 제작</button>
		<!-- <button class="btn btn-lg btn-warning" disabled="disabled"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> 기다리세요!</button> -->
		<br/><br/><br/><br/>
	</div>	
	<div class="row text-center">
		<video id="awesome" style="margin:0 auto;" controls autoplay></video>
		<br/>
		<canvas id="canvas" style="display:none"></canvas><br/>    	
    </div>
    
<div class="container">    
    <div class="row">
		<!--  뒤로가기 버튼 -->
		<form id="makeBack" method="post" action="<%=request.getContextPath()%>/sortable"> 
			<!-- <input type="button" value="다음"> -->
				<div class="alert alert-warning pull-left">
					<strong>알림:</strong> 이전 페이지로 이동 합니다.
					<div style="display: inline-block;">
						<a class="btn btn-warning" id="makeBackBtn" style="width: 108px">
							<span class="glyphicon glyphicon-ok"></span>BACK
						</a>
					</div>
				</div>
			<input type="hidden" name="m_id" id="back_m_id" value="${file.m_id}">
			<input type="hidden" name="dirNum" id="back_dirNum" value="${file.dirNum}">
			<input type="hidden" name="dirName" id="back_dirName" value="${file.dirName}">
		</form>
		
		<!-- 내려받기 버튼 -->
		<a style="display:none" id="download" download="video.webm"><button class="btn btn-success pull-right"><span class="glyphicon glyphicon-download-alt"></span> 동영상 내려받기</button></a>
	</div>	
</div>






<%@ include file="../common/footer.jsp"%>