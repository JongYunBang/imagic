<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>
<script src="../js/edit/caman.edit.full.min.js"></script>
<script src="../js/edit/edit.js"></script>
<script src="../js/edit/jquery.bxslider.min.js"></script>

<link rel="stylesheet" href="../css/edit/edit.css">
<link rel="stylesheet" href="../css/edit/jquery.bxslider.css">


<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirNum" value="${file.dirNum}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">

<div class="container" id="editBody">

	<div class="row well">

		<!-- Preset 필터 드롭다운 -->
		<div class="col-md-2 btn-group" id="PresetFilters">
			<button type="button" class="btn btn-info dropdown-toggle"
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
				<button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#filterList">Filter <span class="caret"></span></button>
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
	<div class="collapse row well" id="filterList"
		style="margin-top: 10px;">
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
</div>

	<div class="drawArea">
		<div class="text-center" style="margin-top: 10px; display: table-cell; margin : 0 auto;">
				<!-- 캔버스 -->
				<div id="drawzone"> 
					<canvas id="draw"></canvas>
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