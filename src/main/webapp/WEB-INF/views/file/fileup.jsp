<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false"%>
<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<title>jQuery File Upload Example</title>
<link rel="stylesheet" href="../css/newdropzone.css">
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<script src="js/newdropzone.js"></script>
<script>
	if (window.File && window.FileReader && window.FileList && window.Blob) {

	} else {
		alert('브라우저 지원 안합니다.');
	}
</script>

</head>
<body>
	<input type="file" id="files" name="files []" style="display: none;"
		multiple/>
	<div id="drop_zone" class="dropzone">
	<div class="dz-default dz-message"><span>Drop files here to upload</span>
	</div>
	</div>
	
	<div id="progress_bar">
    <div class="percent"></div>
</div>
	<button id="upload_dropzone">Upload File</button>
</body>
</html>