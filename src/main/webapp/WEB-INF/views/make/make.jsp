<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>

<script src="../js/make/whammy.js"></script>
<script src="../js/make/make.js"></script>
<link rel="stylesheet" href="../css/make/make.css">
 <script>
 WebFont.load({

            // For google fonts
            google: {
                families: ['Titillium Web', 'Droid Serif', 'Roboto Condensed', 'Lobster', 'Sigmar One']
            },
            // For early access or custom font
            custom: {
                families: ['Nanum Gothic', 'Hanna', 'Jeju Gothic', 'Jeju Myeongjo', 'Jeju Hallasan', 'KoPub Batang', 'Nanum Gothic Coding', 'Nanum Myeongjo', 'Nanum Brush Script', 'Nanum Pen Script'],
                urls: ['http://fonts.googleapis.com/earlyaccess/nanumgothic.css', 'http://fonts.googleapis.com/earlyaccess/hanna.css', 'http://fonts.googleapis.com/earlyaccess/jejugothic.css',
                        'http://fonts.googleapis.com/earlyaccess/jejumyeongjo.css', 'http://fonts.googleapis.com/earlyaccess/jejuhallasan.css', 'http://fonts.googleapis.com/earlyaccess/kopubbatang.css',
                        'http://fonts.googleapis.com/earlyaccess/nanumgothiccoding.css', 'http://fonts.googleapis.com/earlyaccess/nanummyeongjo.css', 'http://fonts.googleapis.com/earlyaccess/nanumbrushscript.css',
                        'http://fonts.googleapis.com/earlyaccess/nanumpenscript.css'
                ]
            }

        });
 </script>

<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">
<input type="hidden" id="sessionDirNum" value="${file.dirNum}">


<div class="container">
	<div class="row" style="margin-top:50px;"></div>
	
		<div class="row text-center">
	    	<div>
		   		<button class="btn btn-blue" id="userSetBn" ><span class="glyphicon glyphicon-cog"></span> 사용자 임의 지정</button>
		   	</div>
		   	<br/>
		   	<div id="userSet" style="display: none;" class="row">
<div class="custom_page"><span class="text-muted">원하시는 해상도를 설정해 주세요.</span></div>
		    	<div class="well col-md-4"><label>너비</label><input id="width" type="number" step="1" value="500" class="form-control"></div>
		        <div class="well col-md-4"><label>높이</label><input id="height" type="number" step="1" value="300" class="form-control"></div>
		        <div class="well col-md-4"><label>프레임(초)</label><input id="framerate" type="number" step="1" value="15" class="form-control"></div>
		   	</div>
		   	<div>
		   		<button class="btn btn-blue" id="userSetClose" style="display: none;">창 닫기</button>
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
	    			<input type="radio" name="imgRatio" id="ratio16x9" value="16x9" class="css-checkbox" checked/>
                	<label for="ratio16x9" class="css-label radGroup1"><span id="ratio16x9span">16X9</span></label>
                	<span style="margin-left:10px"></span>
	    			<input type="radio" name="imgRatio" id="ratio4x3" value="4x3" class="css-checkbox" />
                	<label for="ratio4x3" class="css-label radGroup1"><span id="ratio4x3span">4X3</span></label>
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
	    		<span> 제작할 영상의 시간을 선택해 주세요.</span><br/>
	    		<div class="runtime_radio_group">
		    		<div>
			    		<input type="radio" id="imgRT15" name="imgRunTime" value="16" class="css-checkbox" checked/>
		                <label for="imgRT15" class="css-label radGroup1"><span id="imgRT15">20초</span><span style="font-size:12px">  (오프닝 엔딩 추가시 24초)</span></label>
	                </div>
	                <div>
			    		<input type="radio" id="imgRT30" name="imgRunTime" value="9" class="css-checkbox" />
		                <label for="imgRT30" class="css-label radGroup1"><span id="imgRT30">39초</span><span style="font-size:12px">  (오프닝 엔딩 추가시 48초)</span></label>
	                </div>
	                <div>
			    		<input type="radio" id="imgRT60" name="imgRunTime" value="6" class="css-checkbox" />
		                <label for="imgRT60" class="css-label radGroup1"><span id="imgRT60">79초</span><span style="font-size:12px">  (오프닝 엔딩 추가시 96초)</span></label>
	                </div>
	                <div>
		    			<input type="radio" id="imgRT90" name="imgRunTime" value="5" class="css-checkbox" />
	                	<label for="imgRT90" class="css-label radGroup1"><span id="imgRT90">116초</span><span style="font-size:12px">  (오프닝 엔딩 추가시 142초)</span></label>
                	</div>
	    		</div>
	    	</div>
    	</div>
    
    
    <!-- 영상의 시작,끝에 멘트 넣는 부분 (추가) -->
    <div class="row text-center">
    	<button type="button" class="btn btn-info" data-toggle="collapse" data-target="#inputText" id="inputTextBtn"><span class="glyphicon glyphicon-comment"></span> 오프닝 · 엔딩 삽입</button><br/><br/>
		<div class="collapse"  id="inputText">
			<div class="well col-md-8">
				<div role="tabpanel" id="canvasPanel">
					  <!-- Nav tabs -->
					  <ul class="nav nav-tabs nav-justified" role="tablist">
					    <li role="presentation" class="active"><a href="#openingTab" aria-controls="openingTab" role="tab" data-toggle="tab">오프닝</a></li>
					    <li role="presentation"><a href="#endingTab" aria-controls="endingTab" role="tab" data-toggle="tab">엔딩</a></li>
					  </ul>
					  <!-- Tab panes -->
					  <div class="tab-content">
						<div role="tabpanel" class="tab-pane active" id="openingTab">
							<div id="drawzone"> 
								<canvas id="opening"></canvas>
							</div>
						</div>
						<div role="tabpanel" class="tab-pane" id="endingTab">
							<div id="drawzone2"> 
								<canvas id="ending"></canvas>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div class="well col-md-4">
			<ul class="nav nav-tabs nav-justified" role="tablist">
				<li role="presentation">
					<a>텍스트 추가 및 이동 설정</a><br/><br/>
					<!-- <button type="button" value="위"  id="titleDialogUp" class="btn btn-default"/><span class="glyphicon glyphicon-chevron-up"></button><br/>
					<button type="button" value="왼쪽"  id="titleDialogLeft" class="btn btn-default"/><span class="glyphicon glyphicon-chevron-left"></button>
					<button type="button" value="텍스트 추가"  id="titleDialogBtn" class="btn btn-default"/><span class="glyphicon glyphicon-plus"></button>
					<button type="button" value="오른쪽"  id="titleDialogRight" class="btn btn-default"/><span class="glyphicon glyphicon-chevron-right"></button><br/>
					<button type="button" value="아래"  id="titleDialogDown" class="btn btn-default"/><span class="glyphicon glyphicon-chevron-down"></button> -->
					<div class="col-md-7">
						<a href="#" id="titleDialogUp"><span class="glyphicon glyphicon-circle-arrow-up"></span></a><br/>
						<a href="#" id="titleDialogLeft"><span class="glyphicon glyphicon-circle-arrow-left"></span></a>
						<a href="#" id="titleDialogBtn"><span class="glyphicon glyphicon-plus-sign"></span></a>
						<a href="#" id="titleDialogRight"><span class="glyphicon glyphicon-circle-arrow-right"></span></a><br/>
						<a href="#" id="titleDialogDown"><span class="glyphicon glyphicon-circle-arrow-down"></span></a>
					<br/>
					</div>
					<div class="col-md-5">
						<div class="dropdown ">
						  <button class="btn btn-default dropdown-toggle" type="button" id="textFontBtn" data-toggle="dropdown" aria-expanded="true">
						  	<span id="fontTitle">글씨체</span>
						    <span class="caret"></span>
						  </button>
						  <ul class="dropdown-menu dropdown-menu-left" role="menu" aria-labelledby="textFontBtn" id="textFont" >
						  	<li role="presentation" class="dropdown-header">한글 폰트</li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Nanum Myeongjo">나눔 명조</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Nanum Gothic">나눔 고딕</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Nanum Gothic Coding">나눔 고딕 코딩</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Nanum Brush Script">나눔 손 글씨 붓</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Nanum Pen Script">나눔 손 글씨 펜</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Hanna">한나</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Jeju Gothic">제주 고딕</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Jeju Myeongjo">제주 명조</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Jeju Hallasan">제주한라산</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="KoPub Batang">KoPub 바탕</a></li>
						    <li class="divider"></li>
						    <li role="presentation" class="dropdown-header">영문 폰트</li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Titillium Web">Titillium Web</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Roboto Condensed">Roboto Condensed</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Lobster">Lobster</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Droid Serif">Droid Serif</a></li>
						    <li role="presentation"><a role="menuitem " tabindex="-1" href="#" data-text="Sigmar One">Sigmar One</a></li>
						  </ul>
						</div>
						
						<div class="dropdown">
						  <button class="btn btn-default dropdown-toggle" type="button" id="textSizeBtn" data-toggle="dropdown" aria-expanded="true">
						  	<span id="fontSize">사이즈</span>
						    <span class="caret"></span>
						  </button>
						  <ul class="dropdown-menu dropdown-menu-left" role="menu" aria-labelledby="textSizeBtn" id="textSize">
<!-- 						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="7">7포인트</a></li> -->
<!-- 						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="9">9포인트</a></li> -->
<!-- 						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="10">10포인트</a></li> -->
<!-- 						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="11">11포인트</a></li> -->
<!-- 						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="12">12포인트</a></li> -->
<!-- 						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="14">14포인트</a></li> -->
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="16">16포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="18">18포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="24">24포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="32">32포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="40">40포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="48">48포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="56">56포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="64">64포인트</a></li>
						  	<li role="presentation"><a role="menuitem" tabindex="-1" href="#" data-text="72">72포인트</a></li>
						  </ul>
						</div>
<!-- 				    <input type="button" value="저장하기" id="openingSaveBtn"> -->
					</div>
				</li>
			</ul>
				<div id="fontComment">
					<p>
						폰트의 경우 웹 폰트 로딩으로 바로 적용되지 않을 수 있습니다.<br /> 적용되지 않는 경우 위치를 변경하시면
						적용됩니다.
					</p>
				</div>
			</div>

		</div>
   	</div>
   	<hr class="colorgraph divider">
</div>
    
    <div class="row text-center">
		<span id="status">설정을 완료하셨으면 제작버튼을 클릭해주세요</span>
		<button class="btn btn-lg btn-primary" id="createvideo"><span class="glyphicon glyphicon-film"></span> 동영상 제작</button>
		<!-- <button class="btn btn-lg btn-warning" disabled="disabled"><span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span> 기다리세요!</button> -->
		<br/><br/><br/><br/>
	</div>	
	<div class="row text-center">
		<video id="awesome" style="margin:0 auto;" controls autoplay></video>
		<audio id="awesome_audio" style="display:none"></audio>
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
				<a class="btn btn-success" style="width: 108px; display: none;" id="download" download="video.mkv"> 
				<span class="glyphicon glyphicon-download-alt"></span> 내려받기
				</a>
			</div>
		</div>
	</div>
</div>

<%@ include file="../common/footer.jsp"%>