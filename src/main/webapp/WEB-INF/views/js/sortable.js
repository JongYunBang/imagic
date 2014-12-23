
$(document).ready(function() {
	//edit 창에 쓰일 전역 변수
	var fileList=[];

	// 썸네일 움직일수 있게 해주는
	$( "#sortable" ).sortable();
	$( "#sortable" ).disableSelection();
	
	$.ajax({
		type : "POST",
		url : "/sortThumbLoad",
		cache : false,
		data : {
			m_id : $('#sessionID').val(),
			dirName : $('#sessionDirName').val(),
			dirNum : $('#sessionDirNum').val()
		},
		success : onSuccess,
		error : onError
	});


	function onSuccess(data) {

		fileList = data;
		// sort페이지의 'li'태그의 리스트를 구하고
		var liList= $('.ui-state-default');
		// liList의 자식노드를 추가
		liList.append("<span style=\"display:\"></span>");
		for (var i=0; i<data.length; i++) {
			// 각 사진에 해당하는 imgNum 을 가지고 와서
			var imgNum=data[i].imgNum;
			// 해당 img태그 안에 썸네일을 넣어주고
			liList[i].childNodes[1].src=atob(data[i].imgThumb);
			// 추가한 자식 노드에 imgNum 넣어주기
			liList[i].childNodes[3].innerHTML=data[i].imgNum;
		}


	}
	function onError(data) {
		alert("이미지 불러오기 실패");
	}

	$(document).on('click', '#sortResult', function(e){
		// sort 된 페이지 상의 리스트를 구해옴
		var thumbnailList = $('.ui-state-default');
		// 구해온 리슨트의 imgNum 에 의해서 imgOrder를 DB에 정하고 결과값으로 동영상 제작
		for(var i=0; i<thumbnailList.length; i++){
			var imgNum = thumbnailList[i].childNodes[3].innerHTML;
			for(var j=0; j<fileList.length; j++){
				if(imgNum==fileList[j].imgNum) {
					fileList[j].imgOrder=i;
					// 정렬순서 값 넣어서 ajax 넘김
					$.ajax({
						type : "POST",
						url : "/sortImgOrder",
						async : false,
						data : {
							"imgNum" : fileList[j].imgNum,
							"imgOrder" : fileList[j].imgOrder
						},
						success : onSuccess,
						error : onError
					});
					function onSuccess(data) {
						
						if(data==1){
							//alert("db 값 넣기성공ㅂ")
						} else {
							console.log("번호저장 실패");
						}
					}
					function onError(data) {
						alert("imgOrder 오류");
					}
				}
			}
		}
		console.log(fileList[0].dirName);
		
		console.log(fileList);
//		document.getElementById('m_id').value=fileList[0].m_id;
//		document.getElementById('dirNum').value=fileList[0].dirNum;
//		document.getElementById('dirName').value=fileList[0].dirName;
		console.log(document.getElementById('dirName').value);
		document.getElementById("sortResult").submit();
	});

});