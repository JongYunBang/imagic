<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>

<script src="../js/make/whammy.js"></script>
<script src="../js/make/make.js"></script>
<link rel="stylesheet" href="../css/make/make.css">


<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">
<input type="hidden" id="sessionDirNum" value="${file.dirNum}">


<div class="container">
	<div class="row" style="margin-top:50px;"></div>
	
		<div class="row text-center">
	    	<div>
		   		<button class="btn btn-jusang" id="userSetBn" ><span class="glyphicon glyphicon-cog"></span> 사용자 임의 지정</button>
		   	</div>
		   	<br/>
		   	<div id="userSet" style="display: none;" class="row">
		   		<div class="custom_page">주상이가 쓰지말래</div>
		    	<div class="well col-md-4"><label>너비</label><input id="width" type="number" step="1" value="500" class="form-control"></div>
		        <div class="well col-md-4"><label>높이</label><input id="height" type="number" step="1" value="300" class="form-control"></div>
		        <div class="well col-md-4"><label>프레임(초)</label><input id="framerate" type="number" step="1" value="15" class="form-control"></div>
		   	</div>
		   	<div>
		   		<button class="btn btn-jusang" id="userSetClose" style="display: none;">창 닫기</button>
		   	</div>
    	</div>
    
    	<div class="row" id="preset">
	    	<div class="well col-md-3" id="step1">
	    		<span>영상의 가로와 세로 방향을 정해주세요</span><br/>
	    		<span id="step1Str"></span>
	    		<div class="direction_radio_group">
	    		<input type="radio" name="imgDirection" value="가로방향" class="css-checkbox" id="radio_horizontal"/>
                <label for="radio_horizontal" class="css-label radGroup1">가로방향</label>
                <span style="margin-left:10px"></span>
	    		<input type="radio" name="imgDirection" value="세로방향" class="css-checkbox" id="radio_vertical"/>
                <label for="radio_vertical" class="css-label radGroup1">세로방향</label>
                </div>
	    	</div>
	    	<div class="well col-md-3" id="step2">
	    		<span>영상의 비율을 정해주세요</span><br/>
	    		<div class="ratio_radio_group">
	    		<input type="radio" name="imgRatio" id="ratio4x3" value="4x3" class="css-checkbox" checked/>
                <label for="ratio4x3" class="css-label radGroup1"><span id="ratio4x3span">4X3</span></label>
                <span style="margin-left:10px"></span>
	    		<input type="radio" name="imgRatio" id="ratio16x9" value="16x9" class="css-checkbox"/>
                <label for="ratio16x9" class="css-label radGroup1"><span id="ratio16x9span">16X9</span></label>
                </div>
	    	</div>
	    	<div class="well col-md-3" id="step3">
	    		<span>영상의 Quality를 선택해 주세요</span><br/>
	    		<div class="quality_radio_group">
		    		<div>
		    		<input type="radio" id="imgLow" name="imgQuality" value="" class="css-checkbox" checked/>
	                <label for="imgLow" class="css-label radGroup1"><span id="imgLowSpan"></span></label>
	                </div>
	                <div>
		    		<input type="radio" id="imgMiddle" name="imgQuality" value="" class="css-checkbox" />
	                <label for="imgMiddle" class="css-label radGroup1"><span id="imgMiddleSpan"></span></label>
	                </div>
	                <div>
		    		<input type="radio" id="imgHi" name="imgQuality"value="" class="css-checkbox" />
	                <label for="imgHi" class="css-label radGroup1"><span id="imgHiSpan"></span></label>
	                </div>
	    		</div>
	    	</div>
	    	<div class="well col-md-3" id="step4">
	    		<span> 제작할 영상의 시간을 선택해 주세요</span><br/>
	    		<div class="runtime_radio_group">
	    		<input type="radio" id="imgRT15" name="imgRunTime" value="16" class="css-checkbox" checked/>
                <label for="imgRT15" class="css-label radGroup1"><span id="imgRT15">15초</span></label>
	    		<input type="radio" id="imgRT30" name="imgRunTime" value="9" class="css-checkbox" />
                <label for="imgRT30" class="css-label radGroup1"><span id="imgRT30">30초</span></label>
	    		<input type="radio" id="imgRT60" name="imgRunTime" value="6" class="css-checkbox" />
                <label for="imgRT60" class="css-label radGroup1"><span id="imgRT60">60초</span></label>
	    		<input type="radio" id="imgRT90" name="imgRunTime" value="5" class="css-checkbox" />
                <label for="imgRT90" class="css-label radGroup1"><span id="imgRT90">90초</span></label>
	    		</div>
	    	</div>
    	</div>
    
    
    <!-- 영상의 시작,끝에 멘트 넣는 부분 (추가) -->
    <div class="row text-center">
    	<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#inputText" id="inputTextBtn"><span class="glyphicon glyphicon-comment"></span>오프닝 · 엔딩 삽입</button><br/><br/>
		<div class="collapse" id="inputText">
			<div class="well col-md-3 col-md-offset-3">
				<form>
					<label>오프닝 멘트<br/></label>
					<textarea rows="4" cols="25" id="startText" placeholder="문장을 입력하세요"></textarea>
				</form>
				<br/><button class="btn btn-sm btn-info" type="submit" id="startText">적용하기</button> 
			</div>
			<div class="well col-md-3">
				<form>
					<label>엔딩 멘트<br/></label>
					<textarea rows="4" cols="25" id="endText" placeholder="문장을 입력하세요"></textarea>
				</form>
				<br/><button class="btn btn-sm btn-info" type="submit" id="endText">적용하기</button> 
			</div>
		</div>
   	</div>
   	<hr class="colorgraph">
</div>
    
    <div class="row text-center">
		<span class="" id="status">설정을 완료하셨으면 제작버튼을 클릭해주세요</span><br/><br/>
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
							<span class="glyphicon glyphicon-arrow-left"></span>BACK
						</a>
					</div>
				</div>
			<input type="hidden" name="m_id" id="back_m_id" value="${file.m_id}">
			<input type="hidden" name="dirNum" id="back_dirNum" value="${file.dirNum}">
			<input type="hidden" name="dirName" id="back_dirName" value="${file.dirName}">
		</form>

		<!-- 내려받기 버튼 (12/30 수정)-->
		<div class="alert alert-success pull-right">
			<strong>알림:</strong> 동영상 제작 후 다운로드 받을 수 있습니다.
			<div style="display: inline-block;">
				<a class="btn btn-success" style="width: 108px; display: none;" id="download" download="video.webm"> <span
					class="glyphicon glyphicon-download-alt"></span> 내려받기
				</a>
			</div>
		</div>
	</div>
</div>

<%@ include file="../common/footer.jsp"%>