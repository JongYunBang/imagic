<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
<title>Imagic 사진순서 정하기</title>
<script src="http://code.jquery.com/jquery-2.1.1.js"></script>
<link rel="stylesheet" href="//code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<script src="//code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<script src="../js/sortable.js"></script>
<style>
    #sortable { list-style-type: decimal; margin: 0; padding: 0; width: 710px; }
    #sortable span { margin-left: 20px; float: left; width: 200px; height: 200px;}
    #sortable span li { margin: 10px 100px 20px 0; padding: 1px; float: left;
        width: 120px; height: 120px; background-size: 100% 120px;}
</style>
</head>
<body>

<ul id="sortable">
    <span>
    	<li id="li1" class="ui-state-default">
    		<img >z
    	</li>
    </span>
    <span>
    	<li id="li2" class="ui-state-default"></li>
    </span>
    <span>
    	<li id="li3" class="ui-state-default"></li>
    </span>
    <span>
    	<li id="li4" class="ui-state-default"></li>
    </span>
    <span>
    	<li id="li5" class="ui-state-default"></li>
    </span>
    <span>
   		<li id="li6" class="ui-state-default"></li>
    </span>
    <span>
    	<li id="li7" class="ui-state-default"></li>
    </span>
    <span>
    	<li id="li8" class="ui-state-default"></li>
    </span>
    <span>
    	<li id="li9" class="ui-state-default"></li>
    </span>
</ul>

</body>
</html>