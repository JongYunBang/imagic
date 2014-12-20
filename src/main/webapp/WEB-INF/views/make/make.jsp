<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<!DOCTYPE html>
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<head>
 <title>Imagic MakeMovie</title>
<script src="../js/jquery2.1.1.js"></script>
<script src="../js/whammy.js"></script>
<script src="../js/make.js"></script>


    <style>
        body {text-align: center;}
        ul {list-style:none;}
        #drag { border: 10px solid black; text-align: center; padding:20px; width: 500px; margin: auto; display: inline-block;}
        #einput {width:400px;}
        #output {margin:20px;}

        #filesinput {
            visibility: collapse;
            width: 0px;
        }
        #output img{
            border: 5px solid #333;
            margin-right: 2px;
        }
        #small label {font-size:14px;}
        #small div {margin:5px 0;}

    </style>
    <script>
        //analytics tag

        var _gaq = _gaq || [];
        _gaq.push(['_setAccount', 'UA-941940-28']);
        _gaq.push(['_trackPageview']);

        (function() {
            var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
            ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
        })();

    </script>
</head>
<body>

<span id="status">잠시만 기다려주세요</span><br><br>


<div id="drag">
    <div id="small">
        <div><label>Width:</label><input id="width" type="number" step="1" value="500"></div>
        <div><label>Height:</label><input id="height" type="number" step="1" value="300"></div>
        <div><label>Video Frame Rate:</label><input id="framerate" type="number" step="1" value="15"></div>
    </div>
    <button id="createvideo">Create Video</button>
</div>

<br>
<video id="awesome" controls autoplay></video>
<br>

<a style="display:none" id="download" download="video.webm">Download WebM</a>

<canvas id="canvas" style="display:none"></canvas>

</body>
</html>