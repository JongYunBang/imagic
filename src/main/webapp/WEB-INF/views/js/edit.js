
$(document).ready(function() {
	// edit창에서 쓰일 전역변수
	var fileList=[];
	// 서버에서 파일 리스트 받아오기 위한 ajax
	$.ajax({
		type : "POST",
		url : "/imgLoad",
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
	
	// preview 생성
	thumbNail.createElement = function(string) {
		var div;
		div = document.createElement("div");
		div.innerHTML = string;
		return div.childNodes[0];
	};
	
	
	
	// 넘겨받은 imgThumbArray(ajax로 넘어온값 정리한것)에서 값을 뺴내 태그와 썸네일을 생성해줌
	thumbNail.createFileElement = function(files) {
		var template, name, size, removeFile, thumbnail, message, blobReturn, imgNum;
		
		// 파일이 파일객체들의 파일리스트로 존재한다.
		for (var i = 0; f = files[i]; i++) {
			// preview Template을 생성
			template = thumbNail.createElement( 
					"<div class=\"tv-preview tv-file-preview\">\n  " +
						"<div class=\"tv-details\">\n    " +
							"<div style=\"display:none\" class=\"tv-filename\">" +
								"<span data-tv-name></span>" +
							"</div>\n    " +
						"<img data-tv-thumbnail />\n  " +
						"</div>\n  " +
						"<div style=\"display:none\" class=\"tv-num\">" +
						"<span data-tv-imgNum></span>" +
						"</div>\n    " +
					"</div><br/>"
					);
			
			template.id = f.name;  // 이미지 이름넣기
			document.getElementById('thumbNail').appendChild(template);
			
			// 태그 선택해서 값 할당
			name = template.querySelector('[data-tv-name]');
			name.textContent = f.name;
			imgNum = template.querySelector('[data-tv-imgNum]');
			imgNum.textContent = f.imgNum;
			thumbnail = template.querySelector('[data-tv-thumbnail]');
			thumbnail.alt = f.name;
			thumbnail.src = atob(f.file);
		}
	}
	
	// 썸네일 클릭시 해당파일 가져오기
	$(document).on('click', '[data-tv-thumbnail]',function(e) {
		// 이미지 넘버 페이지에서 가져오기
		var imgNum = e.target.parentElement.nextSibling.nextSibling.firstChild.innerHTML;
		var file=null;
		for (var i=0; i<fileList.length; i++) {
			if(imgNum == fileList[i].imgNum){
				file = fileList[i];
			}
		}
		$.ajax({
			type : "POST",
			url : "/fileDown",
			cache : false,
			data : {
				"dirName" : file.dirName,
				"dirNum" : file.dirNum,
				"imgName" : file.imgName,
				"imgNum" : file.imgNum,
				"imgOriName" : file.imgOriName,
				"m_id" : file.m_id
			},
		success : onSuccess,
		error : onError
		});
		
		function onSuccess(data) {
			// 받아온 base64 데이터값으로 캔버스에 draw
			var image = new Image();
			image.src = data;
			image.onload = function() {
				ctx.drawImage(image, 0, 0, 700,700);
			};
			var canvas = document.getElementById('draw');
			var ctx = canvas.getContext('2d');
		}
		function onError(data) {
			alert("파일 받아오기 실패 다시 클릭해주세요");
		}
	});

	
})