package bit.project.imagic.controller;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import bit.project.imagic.vo.FileVO;

@Controller
@RequestMapping
public class FileUploadController {
	
	// 파일 받아오기위한 List 형태의 FileVO 객체 생성
	LinkedList<FileVO> files = new LinkedList<FileVO>();
	FileVO fileVO = null;
	
	
	
	// 파일 업로드 창을 띄우기 위한 맵핑
	@RequestMapping(value="/dropzone", method=RequestMethod.GET)
	public String showFlieUpload_______Page() {
		return "file/fileup_dropzone";
	}
	
	
	// 파일 업로드 창을 띄우기 위한 맵핑
	@RequestMapping(value="/fileupload", method=RequestMethod.GET)
	public String showFlieUploadPage() {
		return "file/fileup";
	}
	
	// 파일 업로드 처리위한 맵핑
	@RequestMapping(value="upload", method=RequestMethod.POST)
	// Multipart 파일을 바아오기 위한 MultipartHttpServletRequest 인자 사용
	public LinkedList<FileVO> upload(MultipartHttpServletRequest request, HttpServletResponse response) {
		
		// 1. iterator 생성하여 파일 이름 저장
		Iterator<String> itr = request.getFileNames();
		MultipartFile mpf = null;    // 멀티파트 파일 받기위해서 스피링에서 지원하는 것
		
		// 2. get each file
		while (itr.hasNext()) {
			
			// 2.1 get next MultipartFile
			mpf = request.getFile(itr.next());
			System.out.println(mpf.getOriginalFilename() + "uploaded" + files.size());  // 로그 찍기
			
			// 2.2 리스트가 9보다 크다면 pop로 하나씩 제거
			// 업로드 페이지에서 이미 처리하기는 함
			if(files.size()>=9) { 
				files.pop(); 
				}
			
			// 2.3 파일 하나씩 받아서 이름, 사이즈, 타입 저장
			fileVO = new FileVO();
			fileVO.setFileName(mpf.getOriginalFilename());
			fileVO.setFileSize(mpf.getSize()/1024+ "kb");
			fileVO.setFileType(mpf.getContentType());
			
			//  파일 출력부분이지만 파일 다 받은 다음 입력하는 것이 아닌 파일 하나하나를 파일 서버에 저장하기 위한 소스
			try {
				fileVO.setBytes(mpf.getBytes());
				FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("/Users/ProgrammingPearls/Documents/Upload/" + mpf.getOriginalFilename()));
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			// 2.4 add to files
			files.add(fileVO);
			
		}
		
		
		return null;
	}
	
	
	
//	@RequestMapping(value="get/{value}", method=RequestMethod.GET)
//	public void get(HttpServletResponse response, @PathVariable String value) {
//		FileVO getFile = files.get(Integer.parseInt(value));
//		try {
//			response.setContentType(getFile.getFileType());
//			response.setHeader("Content-disposition", "attachment; filename=\""+getFile.getFileName()+"\"" );
//			FileCopyUtils.copy(getFile.getBytes(), response.getOutputStream());
//		} catch (IOException e) {
//			e.printStackTrace();
//		}
//	}
}
		

