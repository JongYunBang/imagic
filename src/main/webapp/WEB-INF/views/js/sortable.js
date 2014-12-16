
$(document).ready(function() {
	//edit 창에 쓰일 전역 변수
	var fileList=[];
	
	$( "#sortable" ).sortable();
    $( "#sortable" ).disableSelection();
    
	$.ajax({
		type : "POST",
		url : "/sortThumbLoad",
		cache : false,
		data : {
			
		},
		success : onSuccess,
		error : onError
	});
	function onSuccess(data) {
		
		fileList = data;
		var imgThumbArray =[];   // 썸네일 저장용
		for (var i=0; i<data.length; i++) {
			var id = data[i].m_id;
			var dirName = data[i].dirName;
			var imgOriName = data[i].imgOriName;
			var imgLength=data[i].imgLength;
			var file = data[i].imgThumb;
			var imgNum=data[i].imgNum;
			imgThumbArray[i] = {
					"file" : file,
					"name" : imgOriName,
					"size" : imgLength,
					"imgNum" : imgNum
			}
		}
		// thumbNail에게 썸네일 배열을 넘김
		thumbNail.createFileElement(imgThumbArray);
		
	}
	function onError(data) {
		alert("이미지 불러오기 실패");
	}
	
	
	// view zone 시작
	var thumbNail = function() {

	};
})