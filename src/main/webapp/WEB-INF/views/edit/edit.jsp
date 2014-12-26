<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>
<script src="../js/edit/caman.edit.full.min.js"></script>
<script src="../js/edit/edit.js"></script>
<link rel="stylesheet" href="../css/edit/edit.css">
<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">

<div class="container">

	<div class="row">

		<!-- Preset 필터 드롭다운 -->
		<div class="col-xs-2 btn-group" id="PresetFilters">
			<button type="button" class="btn btn-info dropdown-toggle"
				data-toggle="dropdown">Preset Filter</button>
			<button type="button" class="btn btn-info dropdown-toggle"
				data-toggle="dropdown">
				<span class="caret"></span>
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
		<div class="col-xs-2" id="Filterdown">
			<div class="Filter btn-group">
				<button type="button" class="btn btn-primary" data-toggle="collapse"
					data-target="#filterList">Filter</button>
			</div>
		</div>

		<!-- 버튼 박스 -->
		<div class="col-xs-8" id="tools">
			<button type="button" class="btn btn-default" id="clear"
				disabled="disabled">
				<span class="glyphicon glyphicon-repeat"></span> Reset
			</button>
			<button type="button" class="btn btn-default" id="undo"
				disabled="disabled">
				<span class="glyphicon glyphicon-arrow-left"></span> Undo
			</button>
			<button type="button" class="btn btn-default" id="redo"
				disabled="disabled">
				<span class="glyphicon glyphicon-arrow-right"></span> Redo
			</button>
			<button type="button" class="btn btn-default pull-right"
				id="saveCanvas" disabled="disabled">
				<span class="glyphicon glyphicon-save"></span> 이미지저장
			</button>
		</div>

	</div>


	<!-- 필터 collapse -->
	<div class=" collapse row" id="filterList"
		style="background-color: #d0d0d0; margin-top: 10px;">
		<div class="col-md-12">
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


	<div class="row display" style="margin-top: 10px;">
		<div class="col-md-2"></div>
		<div class="col-md-8">
			<!-- 캔버스 -->
			<div id="drawzone">
				<canvas id="draw" width="800px" height="500px"></canvas>
			</div>
		</div>
	</div>
	<div id="thumbnailzone" style="background-color: #C0C0C0">
		<!-- 이미지 미리보기(썸네일) 바 -->
		<div id="imageList">
			<span><a class="glyphicon glyphicon-chevron-left"></a></span>
			<div id="thumbNail" class="dropzone" data-folder></div>
			<span><a class="glyphicon glyphicon-chevron-right"></a></span>
		</div>
	</div>




	<!-- NEXT 버튼 -->
	<div>
		<form id="sortable" method="post"
			action="<%=request.getContextPath()%>/sortable">
			<div class="alert alert-success pull-right">
				<strong>알림:</strong> 다음 페이지로 이동 합니다.
				<div style="display: inline-block;">
					<a class="btn btn-success" id="sortable" style="width: 108px">
						<span class="glyphicon glyphicon-ok"></span>NEXT
					</a>
				</div>
			</div>
			<input type="hidden" name="m_id" id="hidden_m_id" value=""> <input
				type="hidden" name="dirNum" id="hidden_dirNum" value=""> <input
				type="hidden" name="dirName" id="hidden_dirName" value="">
		</form>
	</div>


</div>



<%@ include file="../common/footer.jsp"%>