<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- Setting modal -->
<div class="modal fade" id="settingModal">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h4 class="modal-title">Setting</h4>
      </div>
      <div class="modal-body">
        <p>자세한 메뉴는 다음에…</p>
      </div>
      <div class="modal-footer">
		<form method="post" action="<%=request.getContextPath()%>/withdraw" id="withdraw_form">
			<input type="hidden" name="m_id" value="${member.m_id}">
			<button type="button" class="btn btn-danger" id="withdraw">회원 탈퇴</button>
		</form>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->