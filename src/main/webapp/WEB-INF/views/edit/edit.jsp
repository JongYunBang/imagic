<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<title>Imagic 편집 페이지</title>
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<script src="../js/edit.js"></script>
<style>
	body {
		width : 100%;
		margin : 0;
		padding : 0;
	}
	
	#container {
		width: 100%;
	}
	
	#header {
		width : 100%;
		height : 70px;		/* 나중에 크기 조절하면 됨  */
		border : 1px solid black;
	}
	
	#content {
		width : 78%;
		height : 750px;
		float : left;
		border : 1px solid black;
		
	}
	
	#cavaszone {
		position: relative;
		width:100%;
		height:100%;
		text-align: center;

	}
	
	#draw {
		width: 70%; 
		height : 70%; 
		border : 1px solid black;
	}
	
	#sidebar {
		width : 18%;
		float :right;
		height : 750px;
		border : 1px solid black;
		padding-left:5px;
		overflow: hidden;
	}
	
	#footer {
		width :100%;
		clear : both;
		height: 100px;
		border : 1px solid black;
	}
</style>
</head>
<body>
	<div id="container">
		<!-- header 영역 -->
		<div id="header">
			편집 페이지
		</div>
		<div id="content">
			<!-- canvas 영역 -->
			<div id="cavaszone">
				<canvas id="draw">
				</canvas>							
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

		<div id="footer">
			<!-- 푸터 -->
		</div>

<img data-f />
	




	</div>

</body>
</html>