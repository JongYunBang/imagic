<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- 회원가입 modal -->
<div class="modal fade bs-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="container">
                        <div  style="margin-top:10px;">
                            <form role="form" class="form-signin" id="signup_form" method="post" action="<%=request.getContextPath()%>/signup">
                                <fieldset>
                                    <h3 style="color:dimgray;">Register now to create movie - iMagic</h3>
                                    <hr class="modalColorgraph">

                                    <input class="form-control" placeholder="Your ID" name="m_id" type="text" required autofocus>
                                    <input class="form-control middle" placeholder="UserName" name="m_name" type="text" required>
                                    <input class="form-control middle" placeholder="E-mail" name="m_email" type="email" required>
                                    <input class="form-control bottom" placeholder="Password" name="m_pw" type="password" value="" required>
                                    <input class="btn btn-lg btn-primary btn-block" type="submit" value="Register">
                                    <p class="text-center" style="margin-top:10px;"><a href="#">Already have an account?</a></p>
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

