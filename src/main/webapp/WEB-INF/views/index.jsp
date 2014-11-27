<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false"%>
<html>
<head>
<title>Home</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="description" content="">
<meta name="viewport" content="width=device-width, initial-scale=1">

<!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<link rel="stylesheet" href="./css/main.css">
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script src="./js/main.js"></script>
<script>
        $(function() {
            $( "#sortable" ).sortable();
            $( "#sortable" ).disableSelection();
        });
    </script>

</head>
<body>
	
	<form:form method="post" action="filesave"
        modelAttribute="FileUploadVO" enctype="multipart/form-data">
	<div id="sortable">
		<div id="image1" class="image"></div>
		<input type="file" style="position: absolute; left: -999px;" id="fileinput" name="files[0]"/>
	</div><br/>
	
	<input type="submit" value="Upload" />
	</form:form>
	
	
	<%-- <form method="post" action="<%=request.getContextPath()%>/signup">
		ID <input type="text" name="id"></input><br /> pass <input
			type="password" name="password"></input><br /> email <input
			type="text" name="email"></input><br /> <input type="submit"
			value="가입하기"></input><br />
	</form>


	<h3>Choose file(s)</h3>
	<p>
		<input id="files-upload" type="file" multiple>
	</p>
	<p id="drop-area">
		<span class="drop-instructions">or drag and drop files here</span> <span
			class="drop-over">Drop files here!</span>
	</p>

	<ul id="file-list">
		<li class="no-items">(no files uploaded yet)</li>
	</ul>
 --%>

</body>
</html>
