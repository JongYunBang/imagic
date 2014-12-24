<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="../common/header.jsp"%>
<script src="../js/edit/caman.edit.full.min.js"></script>
<script src="../js/edit/edit.js"></script>
<style>
body {
	width: 100%;
	margin: 0;
	padding: 0;
}

#container {
	width: 100%;
}

#header {
	width: 100%;
	height: 70px; /* 나중에 크기 조절하면 됨  */
	border: 1px solid black;
}

#content {
	display: flex;
	display: -webkit-flex;
	height: 100%;
	border: 1px solid black;
	width: 100%;
}

#tools {
	display: block;
	height: 70px;
	border: 1px solid black;
}

#Filters{
	float : right;
	width : 85%;
	display: block;
	border: 1px solid black;
}

#Filters .FilterSetting {
	display: inline-block;
	width: 170px;
}

#Filters .FilterName {
	display: inline-block;
	width: 75px;
}

#PresetFilters {
    display: block;
    float: left;
    width : 14%;
    border : 1px solid black;
}

#PresetFilters a {
	display: block;
}


#cavaszone {
	position: relative;
	width: 80%;
	text-align: center;
}

#drawzone {
	display: inline-block;
}

#draw {
	border: 1px solid black;
}

#sidebar {
	width: 20%;
	float: right;
	height: 750px;
	padding-left: 5px;
	overflow: hidden;
	border: 1px solid black;
}

#footer {
	width: 100%;
	clear: both;
	height: 100px;
	border: 1px solid black;
}
</style>

<input type="hidden" id="sessionID" value="${file.m_id}">
<input type="hidden" id="sessionDirName" value="${file.dirName}">

	<div id="container">
		<!-- header 영역 -->
		<div id="header">편집 페이지</div>
		<div id="content">
			<!-- canvas 영역 -->
			<div id="cavaszone">
				<!-- tools 영역 -->
				<div id="tools">
					    <button id="clear" disabled="disabled">Reset</button>
    						<button id="undo" disabled="disabled">Undo</button>
    						<button id="redo" disabled="disabled">Redo</button>
				</div>
				<!-- filters 영역(display:none)  -->
				<div id="Filters">
					<div class="Filter">
						<div class="FilterName">
							<p>brightness</p>
						</div>
						<div class="FilterSetting">
							<input type="range" min="-100" max="100" step="1" value="0"
								data-filter="brightness"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>contrast</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="-100" max="100" step="1" value="0"
								data-filter="contrast"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>saturation</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="-100" max="100" step="1" value="0"
								data-filter="saturation"> <span class="FilterValue">0</span>
						</div>
						<br />

						<div class="FilterName">
							<p>vibrance</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="-100" max="100" step="1" value="0"
								data-filter="vibrance"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>exposure</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="-100" max="100" step="1" value="0"
								data-filter="exposure"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>hue</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="0" max="100" step="1" value="0"
								data-filter="hue"> <span class="FilterValue">0</span>
						</div>
						<br />

						<div class="FilterName">
							<p>sepia</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="0" max="100" step="1" value="0"
								data-filter="sepia"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>gamma</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="0" max="10" step="0.1" value="0"
								data-filter="gamma"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>noise</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="0" max="100" step="1" value="0"
								data-filter="noise"> <span class="FilterValue">0</span>
						</div>
						<br />

						<div class="FilterName">
							<p>clip</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="0" max="100" step="1" value="0"
								data-filter="clip"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>sharpen</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="0" max="100" step="1" value="0"
								data-filter="sharpen"> <span class="FilterValue">0</span>
						</div>
						<div class="FilterName">
							<p>stackBlur</p>
						</div>

						<div class="FilterSetting">
							<input type="range" min="0" max="20" step="1" value="0"
								data-filter="stackBlur"> <span class="FilterValue">0</span>
						</div>
					</div>
				</div>

				<!-- PresetFilters 영역(display:none) -->
			    <div id="PresetFilters">
			        <a data-preset="vintage">Vintage</a>
			        <a data-preset="lomo">Lomo</a>
			        <a data-preset="clarity">Clarity</a>
			        <a data-preset="sinCity">Sin City</a>
			        <a data-preset="sunrise">Sunrise</a>
			        <a data-preset="crossProcess">Cross Process</a>
			        <a data-preset="orangePeel">Orange Peel</a>
			        <a data-preset="love">Love</a>
			        <a data-preset="grungy">Grungy</a>
			        <a data-preset="jarques">Jarques</a>
			        <a data-preset="pinhole">Pinhole</a>
			        <a data-preset="oldBoot">Old Boot</a>
			        <a data-preset="glowingSun">Glowing Sun</a>
			        <a data-preset="hazyDays">Hazy Days</a>
			        <a data-preset="herMajesty">Her Majesty</a>
			        <a data-preset="nostalgia">Nostalgia</a>
			        <a data-preset="hemingway">Hemingway</a>
			        <a data-preset="concentrate">Concentrate</a>
			    </div>

				<!-- drawzone -->
				<div id="drawzone">
					<canvas id="draw" width="800px" height="500px"></canvas>
				<br />
				<button id="saveCanvas" disabled="disabled">이미지저장</button>
				<br />
				<form id="sortable" method="post"
					action="<%=request.getContextPath()%>/sortable">
					<input type="button" value="사진순서 정하기"> 
					<input type="hidden" name="m_id" id="hidden_m_id" value=""> 
					<input type="hidden" name="dirNum" id="hidden_dirNum" value=""> 
					<input type="hidden" name="dirName" id="hidden_dirName" value="">
				</form>
				</div>
			</div>
			<div id="sidebar">
				<!-- 이미지 미리보기(썸네일) 바 -->
				<div id="imageList">
					<div id="thumbNail" class="dropzone" data-folder>
						<div class="tv-default tv-message"></div>

					</div>
				</div>
			</div>
		</div>
		<div id="footer">
			<!-- 푸터 -->
		</div>
	</div>
<%@ include file="../common/footer.jsp"%>