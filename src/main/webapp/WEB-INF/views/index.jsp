<%--
  메인 색상 : #5264ae;
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head>
    <%
        boolean ss = true;
    %>
    <title>iMagic</title>
    <script src="bower_components/webcomponentsjs/webcomponents.js"></script>
    <link rel="import" href="bower_components/font-roboto/roboto.html">
    <%--<link rel="import" href="bower_components/core-scroll-header-panel/core-scroll-header-panel.html">--%>
    <link rel="import" href="bower_components/core-header-panel/core-header-panel.html">
    <link rel="import" href="elements/imagic-header.html">
    <link rel="import" href="elements/imagic-footer.html">
    <link rel="import" href="elements/section-main.html">

    <!-- 모바일과 PC 해상도가 다르기 때문에 그 비율에 맞게 화면을 조정해주겠다고 선언하는 것이다.-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0" charset="UTF-8">
    <link rel="stylesheet" href="css/common.css">
</head>
<body fullbleed vertical layout unresolved>
<core-header-panel condenses>
    <imagic-header>
    </imagic-header>
    <section-main SESSION=<%=ss%>>
		<a>Lorem Ipsum is simply dummy text of the printing and typesetting
			industry. Lorem Ipsum has been the industry's standard dummy text ever
			since the 1500s, when an unknown printer took a galley of type and
			scrambled it to make a type specimen book. It has survived not only
			five centuries, but also the leap into electronic typesetting, a type
			specimen book. It has survived not only five centuries, but also the
			leap into electronic typesetting, a type specimen book. It has
			survived not only five centuries, but also the leap into electronic
			typesetting,</a>
	</section-main>
    <imagic-footer>
    </imagic-footer>
    <button>Import</button>
</core-header-panel>
	<script>
    var button = document.querySelector('button');
    button.addEventListener('click', function() {
    		/*  폴리머 커스텀 엘리먼트의 images라는 attributes 값에 데이터를 넣어줄 때 사용할 수 있다.! 굿굿  */
      Polymer.import(['WEB-INF/views/element/section-main.html'], function() {
        document.querySelector('section-main').images = 'http://placehold.it/100x150';
      });
    });
	</script>
</body>
</html>
