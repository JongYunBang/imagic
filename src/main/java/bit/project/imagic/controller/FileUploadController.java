package bit.project.imagic.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Iterator;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import bit.project.imagic.service.FileUploadService;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.FileVO;
import bit.project.imagic.vo.MemberVO;

@Controller
//@SessionAttributes("member")
public class FileUploadController {
	
	@Inject
	private FileUploadService fileService;
	
	FileVO file;		
	// 파일 저장 기본 경로
//	String path = "/Users/ProgrammingPearls/Documents/Upload/";
	String path = "d:/down/upload/";
	public FileUploadController() {
		System.out.println("init FileUploadController");
		file = new FileVO();
	}
	
	//  폴더 생성 체크
	
	public boolean makeDirCheck(String m_id , String dirName){
		try {
			File userDir = new File(path, m_id);
			File userCreateDir = new File(path+ m_id, dirName);
			// user id 와 같은 이름의 폴더 생성 체크
			if (!userDir.exists()) {
				userDir.mkdir();
			}
			// user가 생성하려는 폴더에 대한체크
			if (!userCreateDir.exists()) {
				userCreateDir.mkdir();
			}
			file.setDirSrc(path+m_id+"/"+dirName);
		} catch (Exception e) {
			return false;	
		}
		return true;
	}
	
	// 파일 업로드 창을 띄우기 위한 맵핑
	@RequestMapping(value="/fileupload", method=RequestMethod.GET)
	public void showFlieUploadPage(HttpServletRequest request, HttpServletResponse response) throws IOException {
			// 세션 검사를 통해서 접근 제어!
//			if (!ImagicUtil.checkSession(request)) {
				response.sendRedirect(request.getContextPath() + "/");
//				return null;
//			}
//			return "file/fileupload";
	}
	
	// 파일 업로드 창을 띄우기 위한 맵핑
	@RequestMapping(value="/fileupload", method=RequestMethod.POST)
	public String showFlieUploadPage_2(HttpServletRequest request, HttpServletResponse response) throws Exception {
//		System.out.println("/파일업로드페이지  "+member.getM_id());
		
		// 세션 검사를 통해서 접근 제어!
		if (!ImagicUtil.checkSession(request)) {
			response.sendRedirect(request.getContextPath() + "/");
			return null;
		}
		HttpSession session = request.getSession();
		MemberVO member = (MemberVO) session.getAttribute("member");
		String m_id = member.getM_id();
		
		// 로그인 되어있는 아이디의 폴더가 존재하는지 여부를 찾기 시작!!!!!!!!!
		// 존재하는 아이디에 맞는 폴더가 존재하는지 여부를 확인하기 위한 파일
		File userDir = new File(path, m_id);
		
		// 로그인 되어있는 아이디의 폴더가 존재한다면 그것은 폴더가 존재할 수 도 있다는 뜻이므로 어떤 폴더가 있는지 찾는다.
		if (userDir.exists()) {
			List<String> listDirs = ImagicUtil.getDirList(userDir);
				// 전송할 세션을 만들어 준다.
	
				// 로그인 되어있는 폴더의 목록 검사를 마치면 세션에 담아준다. 
				session.setAttribute("dir_result", listDirs);
		}
		// 로그인 되어있는 아이디의 폴더가 존재하지 않는다면 그것은 생성한 폴더가 없다는 뜻이므로 아무것도 세션에 담지 않는다.
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
			} else {
				pw.print("dirExist");
				pw.flush();
			}
		} catch (Exception e) {
			pw.print("dirDBInsertFail"); // DB 삽입 실패를 ajax에게 전달
			pw.flush();
		}
	}
	
	// 파일 이름 변경 처리를 위한 컨트롤러
	@RequestMapping(value="/renamedir", method=RequestMethod.POST)
	public void renameDir(@RequestParam(value="oldDirName") String oldDirName, 
							  				@RequestParam(value="newDirName") String newDirName, 
											@RequestParam(value="m_id") String m_id, 
											HttpServletRequest request, HttpServletResponse response) throws Exception {
		// ajax에게 값을 넘겨주기 위해서
		PrintWriter pw = response.getWriter();
		System.out.println("oldDirName : " + oldDirName);
		System.out.println("newDirName : " + newDirName);
		boolean result = ImagicUtil.renameDir(path+m_id, oldDirName, newDirName);
		System.out.println(result);
		pw.print(result);
		pw.flush();
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
				FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream(path + mpf.getOriginalFilename()));
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();								
			}
		}
		return null;
		
	}
}
		

