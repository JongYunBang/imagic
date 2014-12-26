<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!-- 회원가입 modal -->
<script type="text/javascript">
	$(function(){
		var validate_id=false;
		var validate_pw=false;
		var validate_repw=false;
		var validate_name=false;
		var validate_email=false;

		//	회원가입 버튼 클릭시 ajax 회원가입 처리
		$('#signup').click(function(event) {
			event.preventDefault();
			if(validate_id == true && validate_pw == true && validate_repw == true && validate_name == true && validate_email == true){
				var formData = $('#signup_form').serialize();
				$.ajax({
					type : "POST",
					url : "/signup",
					data : formData,
					success : onSuccess,
					error : onError
				});
				
				/**
				 * 반환값 정리 
				 *  1 : 회원가입 성공 
				 *  2 : 회원가입 DB입력중 오류발생
				 *  3 : 아이디 중복
				 */
				function onSuccess(data) {
					console.log(data);
					if (data==1){
						alert("회원가입이 완료되었습니다.");
	 					window.location.href="/";
					} else if (data==2) {
						alert("회원가입중 오류가 발생하였습니다. 다시 시도해 주세요");
					} else if (data==3) {
						alert("이미 존재하는 아이디 입니다.")
					}
			}
			function onError(data) {
				alert("error");
			}
			}else{
				
			}
		});

		
		
		$('.signup-id').on('blur', function(event){
			var user_id = $('.signup-id').val();
			var id_regist = /^\w{4,12}$/;
			var kor_check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
			if (kor_check.test(user_id)){
				$('#signup_id_check_message')[0].style.display="none";
				$('#signup_id_check_message_2')[0].style.display="inline";
				return validate_id = false;
			}else{
				if((user_id.length < 4) || (user_id.length > 12)){
					$('#signup_id_check_message')[0].style.display="inline";
					$('#signup_id_check_message_2')[0].style.display="none";
					return validate_id = false;
				}else{
					$('#signup_id_check_message')[0].style.display="none";
					$('#signup_id_check_message_2')[0].style.display="none";
					return validate_id = true;
				}
			}

		});
		 $('.signup-pw').on('blur', function (event) {// 회원가입 비밀번호 설정 4자에서 10자 이내
                var user_pw = $('.signup-pw').val();
                var pw_regist=/^\w{4,15}$/;
                if (user_pw.search(pw_regist)==-1) {// 입력된 값과 유효성검사 변수와 비교
                    $('#signup_pw_check_message')[0].style.display="inline";
                    return validate_pw = false;
                } else {
                	$('#signup_pw_check_message')[0].style.display="none";
                    return validate_pw = true;
                }
            });
		 $('.signup-repw').on('blur', function (event) {// 회원가입 비밀번호 설정 4자에서 10자 이내
             var user_repw = $('.signup-repw').val();
             if (user_repw !=$('.signup-pw').val()) {// 입력된 값과 유효성검사 변수와 비교
                 $('#signup_repw_check_message')[0].style.display="inline";
                 return validate_repw = false;
             } else {
            	 $('#signup_repw_check_message')[0].style.display="none";
                 return validate_repw = true;
             }
         });
		 $('.signup-name').on('blur', function (event) {// 이름 등록
			 
             var user_name = $('.signup-name').val();
		 		console.log(wordCheck(user_name));
		 		console.log(wordCheckSpace(user_name));
		 		console.log(user_name.trim() != "");
             if (user_name.trim() == "" || !wordCheck(user_name) || !wordCheckSpace(user_name)) {// 입력된 값과 유효성검사 변수와 비교
                 $('#signup_name_check_message')[0].style.display="inline";
                 return validate_name = false;
             } else {
           		 $('#signup_name_check_message')[0].style.display="none";
                 return validate_name = true;
             }
         });
		 $('.signup-email').on('blur', function (event) {//이메일 등록 DB와 연동
             var user_email = $('.signup-email').val();
             var email_regist = /^\w{1,20}@[a-zA-Z]{1,7}[\.][a-z]{2,3}?[a-z]{0,2}$/;
             if (user_email.search(email_regist) == -1) {// 입력된 값과 유효성검사 변수와 비교
                 $('#signup_email_check_message')[0].style.display="inline";
                 return validate_email = false;
             } else {
                     $('#signup_email_check_message')[0].style.display="none";
                     return validate_email = true;
             }
         });
	});
	
</script>
<div class="modal fade bs-modal-lg" id="signupModal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-body">
                <div class="container">
                        <div  style="margin-top:10px;">
                            <form role="form" class="form-signin" id="signup_form" method="post" action="<%=request.getContextPath()%>/signup">
                                <fieldset>
                                    <h3 style="color:dimgray;">iMagic에 가입하세요.</h3>
                                    <hr class="modalColorgraph">
									<div class="signCover">
                                    <input class="form-control top signup-id" placeholder="Your ID" name="m_id" type="text" required maxlength="12">
                                    <span id='signup_id_check_message' style="display:none">4자 이상 12자 이하로 입력 해주세요.</span>
                                    <span id='signup_id_check_message_2' style="display:none">영문, 숫자만 입력 가능합니다..</span>
                                   	</div>
                                   	<div class="signCover">
                                    <input class="form-control middle signup-pw" placeholder="Password" name="m_pw" type="password" value="" required maxlength="15">
                                    <span id='signup_pw_check_message' style="display:none">4자 이상 15자 이하로 입력 해주세요.</span>
                                    </div>
                                    <div class="signCover">
                                    <input class="form-control middle signup-repw" placeholder="Re-Password" name="m_rePw" type="password" value="" required maxlength="15">
                                    <span id='signup_repw_check_message' style="display:none">비밀번호를 똑같이 입력해주세요.</span>
                                    </div>
                                    <div class="signCover">
                                    <input class="form-control middle signup-name" placeholder="UserName" name="m_name" type="text" required maxlength="10">
                                    <span id='signup_name_check_message' style="display:none">잘못된 값입니다.</span>
                                    </div>
                                    <div class="signCover">
                                    <input class="form-control bottom signup-email" placeholder="E-mail" name="m_email" type="email" required>
                                    <span id='signup_email_check_message' style="display:none">E-mail 형식에 맞게 입력 해주세요.</span>
                                    </div>
                                    <div class="signCover">
                                    <input class="btn btn-lg btn-primary btn-block" type="submit" id="signup" value="Register" style="margin-top:20px;">
                                    </div>
                                </fieldset>
                            </form>
                        </div>
	                    <div class="modal-footer" style="margin-top:50px">
							<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
    	                </div>
                </div>
            </div>
        </div>
    </div>
</div>

