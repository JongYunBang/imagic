<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="./common/header.jsp"%>


<script >
function loginCheck() {
	if ("${member.m_id}"=="") {
		alert("로그인을 해주세요!");
	} else {
		/* window.location.href="/fileupload"; */
		document.getElementById("upload_form").submit();
	};
};
</script>

<!--  버튼 클릭시 로그인 여부 검사 -->
	<form id="upload_form" method="post" action="<%=request.getContextPath()%>/fileupload">
		<input type="button" onclick="loginCheck();" value="다음"/>
	</form>




<%@ include file="./common/footer.jsp"%>
