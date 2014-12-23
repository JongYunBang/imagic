<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- 로그인 modal -->
<div class="modal fade bs-modal-sm" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
        <div class="modal-content">
            <div class="modal-body">
                <div class="container">
                    <div style="margin-top:10px;">
                            <form role="form" id="login_form" class="form-signin" method="post" action="<%=request.getContextPath()%>/login">
                                <fieldset>
                                    <h3 class="sign-up-title" style="color:dimgray;">Welcome back! Please sign in</h3>
                                    <hr class="modalColorgraph">
                                    <input class="form-control" placeholder="Your ID" name="m_id" type="text" required autofocus>
                                    <input class="form-control" placeholder="Password" name="m_pw" type="password" required>
                                    <a class="pull-right" href="#">잊어버렸니Forgot password?</a>
                                    <div class="checkbox">
                                        <label><input name="remember" type="checkbox" value="Remember Me"> Remember Me</label>
                                    </div>
                                    <input class="btn btn-lg btn-success btn-block" id="login" type="submit" value="Login">
                                    <p class="text-center" style="margin-top:10px;"><a href="#">Register for an account?</a></p>
                                </fieldset>
                            </form>
                    </div>

                    <div class="modal-footer">
                        <center>
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        </center>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>