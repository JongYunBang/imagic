package bit.project.imagic.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import bit.project.imagic.service.FileUploadService;
import bit.project.imagic.vo.FileVO;

@Controller
@RequestMapping
public class FileUploadController {
	
	@Inject
	private FileUploadService fileService;
	
	FileVO file;		
	
	public FileUploadController() {
		System.out.println("init FileUploadController");
		file = new FileVO();
	}
	
	//  폴더 생성 체크 
	public boolean makeDirCheck(String m_id , String dirName){
		try {
			File userDir = new File("d:/down/upload/", m_id);
			File userCreateDir = new File("d:/down/upload/"+m_id, dirName);
			// user id 와 같은 이름의 폴더 생성 체크
			if (!userDir.exists()) {
				userDir.mkdir();
			}
			// user가 생성하려는 폴더에 대한체크
			if (!userCreateDir.exists()) {
				userCreateDir.mkdir();
			}
			file.setDirSrc("d:/down/upload/"+m_id+"/"+dirName);
		} catch (Exception e) {
			return false;	
		}
		return true;
	}
	
	// 파일 업로드 창을 띄우기 위한 맵핑
	@RequestMapping(value="/fileupload", method=RequestMethod.GET)
	public String showFlieUploadPage() {
		
		return "file/fileupload";
	}
	
	@RequestMapping(value="/dircreate", method=RequestMethod.POST)
	public void dirCreate(@RequestParam(value="createName") String dirName, @RequestParam(value="m_id") String m_id, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		file.setM_id(m_id);   //user id를 FileVO 에 저장하기
		file.setDirName(dirName);  // user 가 생성하고자 하는 폴더네임을 FileVO 에 저장하기
		
		// ajax에게 값을 넘겨주기 위해서
		PrintWriter pw = response.getWriter();
		
		// 디렉토리 네임중 같은것이 있는지 확인
		try {
			if (fileService.isDir(file)==0) { // DB에 해당 폴더가 존재하지 않으면 0을 반환

				// 폴더 생성이 성공하면
				if(makeDirCheck(m_id, dirName)) {
					// db에 디렉토리 내용 넣기
					int result=fileService.createDir(file);
					if(result>0){
						System.out.println("db에 dir 입력완료");
						pw.print("dirDBInsert");  // DB 삽입 성공을 ajax 에게 전달 
						pw.flush();
					}
				}else{
					pw.print("dirFail");  // 폴더 생성 실패를 ajax에게 전달 
					pw.flush();
				}
			}
		} catch (Exception e) {
			pw.print("dirDBInsertFail"); // DB 삽입 실패를 ajax에게 전달
			pw.flush();
		}
	}
	
	
	// 파일 업로드 처리위한 맵핑
	@RequestMapping(value="/upload", method=RequestMethod.POST)
	// Multipart 파일을 바아오기 위한 MultipartHttpServletRequest 인자 사용
	public String upload(MultipartHttpServletRequest request, HttpServletResponse response) {
		
		System.out.println("controller 접속");
		Iterator<String> itr = request.getFileNames();
		System.out.println(itr.hasNext());
		
		MultipartFile mpf = null;
//		
		while (itr.hasNext()){
			String fileName = itr.next();
			System.out.println("iterator : " + fileName);
			mpf = request.getFile(fileName);
			System.out.println(mpf.getOriginalFilename() +" uploaded!");
	        try {
				file.setImgLength(mpf.getBytes().length);
				file.setImgBytes(mpf.getBytes());
				file.setImgName(mpf.getOriginalFilename());
				FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream("d:/down/upload/" + mpf.getOriginalFilename()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();								
			}
		}
		return null;
		
	}
}
		

