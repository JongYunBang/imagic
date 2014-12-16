
$(document).ready(function() {
	// edit창에서 쓰일 전역변수
	var fileList=[];
	// 현재 선택된 개체에 대한 FileVO의 정보저장
	var currentFile=null;
	// 현재 선택된 개체의 썸네일 주소저장위해
	var thumbnailSrc=null;
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
		// 현재 타겟의 src 저장위해 
		thumbnailSrc = e.target;
		// 이미지 넘버 페이지에서 가져오기
		var imgNum = e.target.parentElement.nextSibling.nextSibling.firstChild.innerHTML;
		var file=null;
		currentFile=null;
		for (var i=0; i<fileList.length; i++) {
			if(imgNum == fileList[i].imgNum){
				file = fileList[i];
			}
		}
		currentFile=file;
		
		$.ajax({
			type : "POST",
			url : "/fileDown",
			cache : false,
			data : {
				"dirName" : file.dirName,
				"dirNum" : file.dirNum,
				"imgName" : file.imgName,
				"imgNum" : file.imgNum,
				"imgFormat" : file.imgFormat,
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

	$(document).on('click', '#saveCanvas', function(e) {
		// 캔버스 이미지를 base64 형태로 받아옴
		var imgData = document.getElementById("draw").toDataURL("image/png");
		// 썸네일을 만들어줄 canvas를 생성한다.
		var canvas = document.createElement('canvas');
		var ctx = canvas.getContext('2d');
		canvas.width = 100;
		canvas.height = 100;

		// 썸네일 만들 캔버스에 넘겨줄 원본파일 불러오기 위해서 image생성
		var img = new Image();
		img.src= imgData; // img에 원본파일 blob 형태의 데이터 전달 
		
		// base64형태의 앞부분 제거
		imgData = imgData.replace(/^data:image\/(png|jpg);base64,/, "")
		// 캔버스로 이미지 그린다(원본 파일을 썸네일로 바꾸기 위해)
		ctx.drawImage(img, 0, 0, 100, 100);

		// 캔버스에 올려진 썸네일 이미지를 dataURL형태로 변환
		dataURL = canvas.toDataURL('image/*');
		// dataURL을 blob 형태로 저장하기 위한 배열 
		var thumbURL = [];
		thumbURL[0] = dataURL;
		// Blob 안에는 파일과 배열만이 들어갈수 있다 
		var imgThumb = new Blob(thumbURL, { 'type': 'image/png' });
		
		// 변경된 썸네일을 파일리스트에 저장하기 위해서
		currentFile.imgThumb=dataURL;
		var imgBase64 = imgData;
		
		$.ajax({
			type : "POST",
			url : "/fileUpdate",
			cache : false,
			data : {
				"m_id" : currentFile.m_id,
				"dirName" : currentFile.dirName,
				"imgName" : currentFile.imgName,
				"imgOrinName" : currentFile.imgOriName,
				"imgNum" : currentFile.imgNum,
				"imgFormat" : currentFile.imgFormat,
				"imgThumb" : dataURL,
				"imgBase64" : imgBase64
			},
			success : onSuccess,
			error : onError
		});
		
		/**
		 * 리턴값 정리
		 * return 1 : 파일시스템에 파일 저장하기 실패
		 * return 2 : DB에 저장실패 
		 * return 3 : DB에 저장하다 에러
		 * return 4 : 파일저장및 썸네일 DB 저장 완료
		 */

		function onSuccess(data) {
			if(data==4){
				thumbnailSrc.src = thumbURL[0];		// dropzone에 썸네일 집어넣기 위해서
				alert("파일 저장에 성공하였습니다")
			} else if (data==3) {
				alert("DB에 저장하다 에러");
			} else if (data==2) {
				alert("DB에 저장실패");
			} else if (data==1) {
				alert("파일시스템에 파일 저장하기 실패");
			}
		}
		function onError(data) {
			alert("파일 저장 실패하였습니다");
		}
	});
	
	// 이미지 차례지정하는 페이지(sortable)로 가기
	$('#sortable').click(function(){
		console.log(value=fileList[0].m_id);
		console.log(value=fileList[0].imgNum);
		document.getElementById('m_id').value=fileList[0].m_id;
		document.getElementById('dirNum').value=fileList[0].dirNum;
		document.getElementById('dirName').value=fileList[0].dirName;
		document.getElementById("sortable").submit();
	}); 
	
	
	/*// 이미지 차례지정하는 페이지(sortable)로 가기
	$(document).on('click', '#sortPage', function(e) {
		
		$.ajax({
			type : "POST",
			url : "/sortable",
			cache : false,
//			contentType: "text/plain",
//			data : JSON.stringify(fileList),
			data : {
				"m_id" : fileList[0].m_id,
				"imgNum" : fileList[0].dirNum
			},
			success : onSuccess,
			error : onError
		});
		function onSuccess(data) {
//			alert("get 갔다옴");
		}
		function onError(data) {
			alert("오류발생");
		}
		
	});
*/
	
})