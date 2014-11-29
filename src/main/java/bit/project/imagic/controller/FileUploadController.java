package bit.project.imagic.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import bit.project.imagic.vo.FileVO;

@Controller
@RequestMapping
public class FileUploadController {
	
	
	FileVO file;
	
	public FileUploadController() {
		System.out.println("init FileUploadController");
		file = new FileVO();
	}
	
	
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
	@RequestMapping(value="/upload", method=RequestMethod.POST)
	// Multipart 파일을 바아오기 위한 MultipartHttpServletRequest 인자 사용
	public String upload(MultipartHttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("controller 접속");
		List<MultipartFile> itr = request.getFiles("files");
		
		System.out.println(itr.size());
		
		MultipartFile mpf = null;
//		
//		while (itr.hasNext()){
//			String fileName = itr.next();
//			System.out.println("iterator : " + fileName);
//			mpf = request.getFile(fileName);
//			System.out.println(mpf.getOriginalFilename() +" uploaded!");
//	        try {
//				file.setLength(mpf.getBytes().length);
//				file.setBytes(mpf.getBytes());
//				file.setType(mpf.getContentType());
//				file.setName(mpf.getOriginalFilename());
//				FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("/Users/ProgrammingPearls/Documents/Upload/" + mpf.getOriginalFilename()));
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//		}
		return null;
		
	}
}
		

