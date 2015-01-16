<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>
<script src="../js/edit/caman.edit.full.min.js"></script>
<script src="../js/edit/edit.js"></script>
<script src="../js/edit/jquery.bxslider.min.js"></script>

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

<link rel="stylesheet" href="../css/edit/edit.css">
<link rel="stylesheet" href="../css/edit/jquery.bxslider.css">


<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirNum" value="${file.dirNum}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">

<div class="container" id="editBody">
	<div style="text-align: center">
		<h2 class="heading">
			${file.m_id}<span class="text-muted">님의 </span>${file.dirName} <span class="text-muted"> 앨범</span>
		</h2>
		<p class="lead"></p>
		<p class="lead">동영상에 들어갈 사진을 꾸며보세요.</p>
		<p class="lead">Filter와 Preset Filter를 이용하면 더 멋진 사진으로 만들 수 있습니다.</p>
	</div>
	<hr class="colorgraph divider">

	<div class="row well">

		<!-- Preset 필터 드롭다운 -->
		<div class="col-md-2 btn-group" id="PresetFilters">
			<button type="button" class="btn btn-yellow dropdown-toggle"
				data-toggle="dropdown">Preset Filter <span class="caret"></span>
			</button>
			<ul class="dropdown-menu">
				<li><a data-preset="vintage">Vintage</a></li>
				<li><a data-preset="lomo">Lomo</a></li>
				<li><a data-preset="clarity">Clarity</a></li>
				<li><a data-preset="sinCity">Sin City</a></li>
				<li><a data-preset="sunrise">Sunrise</a></li>
				<li><a data-preset="crossProcess">Cross Process</a></li>
				<li><a data-preset="orangePeel">Orange Peel</a></li>
				<li><a data-preset="love">Love</a></li>
				<li><a data-preset="grungy">Grungy</a></li>
				<li><a data-preset="jarques">Jarques</a></li>
				<li><a data-preset="pinhole">Pinhole</a></li>
				<li><a data-preset="oldBoot">Old Boot</a></li>
				<li><a data-preset="glowingSun">Glowing Sun</a></li>
				<li><a data-preset="hazyDays">Hazy Days</a></li>
				<li><a data-preset="herMajesty">Her Majesty</a></li>
				<li><a data-preset="nostalgia">Nostalgia</a></li>
				<li><a data-preset="hemingway">Hemingway</a></li>
				<li><a data-preset="concentrate">Concentrate</a></li>
			</ul>
		</div>


		<!-- 필터 드롭다운 -->
		<div class="col-md-2" id="Filterdown">
			<div class="Filter btn-group">
				<button type="button" class="btn btn-green" data-toggle="collapse" data-target="#filterList">Filter <span class="caret"></span></button>
			</div>
		</div>

		<!-- 버튼 박스 -->
		<div class="col-md-8" id="tools">
			<button type="button" class="btn btn-default" id="clear" disabled="disabled">
				<span class="glyphicon glyphicon-repeat"></span> Reset
			</button>
			<button type="button" class="btn btn-default" id="undo" disabled="disabled">
				<span class="glyphicon glyphicon-arrow-left"></span> Undo 
			</button>
			<button type="button" class="btn btn-default" id="redo"
				disabled="disabled">
				<span class="glyphicon glyphicon-arrow-right"></span> Redo
			</button>
			
			
			<!--  텍스트 드롭다운  --> 
			<button type="button" class="btn btn-default" id="text_drop" data-toggle="collapse" data-target="#textTool" disabled="disabled">텍스트 추가 <span class="caret"></span></button>
			
			<a type="button" class="btn btn-default pull-right disabled"
				id="saveCanvasDown">
				<span class="glyphicon glyphicon-download-alt"></span>다운로드
			</a>
				
			<button type="button" class="btn btn-default pull-right"
				id="saveCanvas" disabled="disabled">
				<span class="glyphicon glyphicon-import"></span> 변경내용저장
			</button>
		</div>

	</div>

	<!-- 필터 collapse -->
	<div class="collapse row well" id="filterList" style="margin-top: 10px;">
		<div class="row">
			<div class="FilterName col-md-2">
				<p>brightness</p>

				<div class="FilterSetting">
					<input type="range" min="-100" max="100" step="1" value="0"
						data-filter="brightness"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName col-md-2">
				<p>contrast</p>

				<div class="FilterSetting">
					<input type="range" min="-100" max="100" step="1" value="0"
						data-filter="contrast"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName col-md-2">
				<p>saturation</p>

				<div class="FilterSetting">
					<input type="range" min="-100" max="100" step="1" value="0"
						data-filter="saturation"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName col-md-2">
				<p>vibrance</p>

				<div class="FilterSetting">
					<input type="range" min="-100" max="100" step="1" value="0"
						data-filter="vibrance"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName col-md-2">
				<p>exposure</p>

				<div class="FilterSetting">
					<input type="range" min="-100" max="100" step="1" value="0"
						data-filter="exposure"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName col-md-2">
				<p>hue</p>

				<div class="FilterSetting">
					<input type="range" min="0" max="100" step="1" value="0"
						data-filter="hue"> <span class="FilterValue">0</span>
				</div>
			</div>


			<div class="FilterName  col-md-2">
				<p>sepia</p>

				<div class="FilterSetting">
					<input type="range" min="0" max="100" step="1" value="0"
						data-filter="sepia"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName  col-md-2">
				<p>gamma</p>

				<div class="FilterSetting">
					<input type="range" min="0" max="10" step="0.1" value="0"
						data-filter="gamma"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName  col-md-2">
				<p>noise</p>

				<div class="FilterSetting">
					<input type="range" min="0" max="100" step="1" value="0"
						data-filter="noise"> <span class="FilterValue">0</span>
				</div>
			</div>


			<div class="FilterName  col-md-2">
				<p>clip</p>

				<div class="FilterSetting">
					<input type="range" min="0" max="100" step="1" value="0"
						data-filter="clip"> <span class="FilterValue">0</span>
				</div>
			</div>


			<div class="FilterName  col-md-2">
				<p>sharpen</p>

				<div class="FilterSetting">
					<input type="range" min="0" max="100" step="1" value="0"
						data-filter="sharpen"> <span class="FilterValue">0</span>
				</div>
			</div>

			<div class="FilterName  col-md-2">
				<p>stackBlur</p>

				<div class="FilterSetting">
					<input type="range" min="0" max="20" step="1" value="0"
						data-filter="stackBlur"> <span class="FilterValue">0</span>
				</div>
			</div>
		</div>
	</div>
	
	<!-- Text Collapse -->

</div>

	<div class="drawArea">
		<div class="text-center" style="margin-top: 10px; display: table-cell; margin : 0 auto;">
				<!-- 캔버스 -->
				<div id="drawzone"> 
					<canvas id="draw"></canvas>
					<div class="collapse well" id="textTool">
						<div class="row">
							<a href="#" id="titleDialogUp"><span class="glyphicon glyphicon-circle-arrow-up"></span></a><br/>
							<a href="#" id="titleDialogLeft"><span class="glyphicon glyphicon-circle-arrow-left"></span></a>
							<a href="#" id="titleDialogBtn"><span class="glyphicon glyphicon-plus-sign"></span></a>
							<a href="#" id="titleDialogRight"><span class="glyphicon glyphicon-circle-arrow-right"></span></a><br/>
							<a href="#" id="titleDialogDown"><span class="glyphicon glyphicon-circle-arrow-down"></span></a><br/>
							<!-- <button class="btn btn-default" id="text" disabled="disabled">텍스트</button> -->
						</div>
						<br/>
<!-- 						<div class="row">
							<div class="dropdown">
								<button class="btn btn-default dropdown-toggle" type="button" id="textFontBtn" data-toggle="dropdown" aria-expanded="true">
								  	<span id="fontTitle">폰트색상변경</span>
								    <span class="caret"></span>
								</button>
							</div>
						</div> -->
<!-- 						<br/> -->
						<div class="row">
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
							<br/>
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
						</div>
					</div>
				</div>
		</div>
	</div>
	<div id="thumbnailzone">
		<!-- 이미지 미리보기(썸네일) 바 -->
<!-- 			<div class="thumbnailLeft"><a href="#" class="glyphicon glyphicon-chevron-left"></a></div> -->
<!-- <a href="#" class="glyphicon glyphicon-chevron-left"></a> -->
			<ul id="thumbNail" class="dropzone" data-folder></ul>
<!-- 			<a href="#" class="glyphicon glyphicon-chevron-right"></a> -->
<!-- 			<div id="thumbNail" class="dropzone" data-folder></div> -->
			
<!-- 			<div class="thumbnailRight"><a href="#" class="glyphicon glyphicon-chevron-right"></a></div> -->
	</div>


<div class="container">
	<hr class="colorgraph divider">
	<!-- BACK 버튼 -->
	<div>
		<div class="alert alert-warning pull-left">
			<form id="editBack" method="post" action="<%=request.getContextPath()%>/fileupload">
				<strong>알림:</strong> 이전 페이지로 이동 합니다.
				<div style="display: inline-block;">
					<a class="btn btn-warning" id="editBackBtn" style="width: 108px">
						<span class="glyphicon glyphicon-arrow-left  pull-left"></span>BACK
					</a>
				</div>
				<input type="hidden" name="m_id" id="eidt_m_id" value=""> 
			</form>
		</div>
	</div>

	<!-- NEXT 버튼 -->
	<div>
		<div class="alert alert-success pull-right">
			<form id="sortable" method="post" action="<%=request.getContextPath()%>/sortable">
				<strong>알림:</strong> 다음 페이지로 이동 합니다.
				<div style="display: inline-block;">
					<a class="btn btn-success" id="sortable" style="width: 108px">
						<span class="glyphicon glyphicon-ok  pull-left"></span>NEXT
					</a>
				</div>
				<input type="hidden" name="m_id" id="hidden_m_id" value=""> 
				<input type="hidden" name="dirNum" id="hidden_dirNum" value=""> 
				<input type="hidden" name="dirName" id="hidden_dirName" value="">
			</form>
		</div>
	</div>
</div>



<%@ include file="../common/footer.jsp"%>