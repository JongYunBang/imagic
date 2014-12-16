
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
			
		},
		success : onSuccess,
		error : onError
	});
	function onSuccess(data) {
		
		fileList = data;
		// sort페이지의 'li'태그의 리스트를 구하고
		var liList= $('.ui-state-default');
		// liList의 자식노드를 추가
		liList.append("<span style=\"display:none\"></span>");
		for (var i=0; i<data.length; i++) {
			// 각 사진에 해당하는 imgNum 을 가지고 와서
			var imgNum=data[i].imgNum;
			// 해당 img태그 안에 썸네일을 넣어주고
			liList[i].childNodes[1].src=atob(data[i].imgThumb);
			// 추가한 자식 노드에 
			liList[i].childNodes[3].innerHTML=data[i].imgNum;
		}
		
		
	}
	function onError(data) {
		alert("이미지 불러오기 실패");
	}
	
	
	// view zone 시작
	var thumbNail = function() {

	};
})