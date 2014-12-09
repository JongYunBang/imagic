package bit.project.imagic.controller;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.UUID;

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
@SessionAttributes("member")
public class FileUploadController {
	
	@Inject
	private FileUploadService fileService;
	
	FileVO file;		
	// 파일 저장 기본 경로
//	String path = "/Users/ProgrammingPearls/Documents/Upload/";
	String path = "d:/down/upload/";
	public FileUploadController() {
		//System.out.println("init FileUploadController");
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
		} catch (Exception e) {
			return false;	
		}
		return true;
	}
	
	// 파일 업로드창을 주소를 쳐서 들어온 경우 처리
	@RequestMapping(value="/fileupload", method=RequestMethod.GET)
	public String showFlieUploadPage(@ModelAttribute("member") MemberVO member, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		// 세션 검사를 통해서 접근 제어!
		if (!ImagicUtil.checkSession(member)) {
			response.sendRedirect(request.getContextPath() + "/");
			return null;
		}	
		return "file/fileupload";
	}
	
	// 파일 업로드 창을 띄우기 위한 맵핑
	@RequestMapping(value="/fileupload", method=RequestMethod.POST)
	public String showFlieUploadPage_2(@ModelAttribute("member") MemberVO member, HttpServletRequest request, HttpServletResponse response) throws Exception {
//		System.out.println("/파일업로드페이지  "+member.getM_id());
		
		// 세션 검사를 통해서 접근 제어!
		if (!ImagicUtil.checkSession(member)) {
			response.sendRedirect(request.getContextPath() + "/");
			return null;
		}
		HttpSession session = request.getSession();
//		MemberVO member = (MemberVO) session.getAttribute("member");
		String m_id=member.getM_id();
		file.setM_id(m_id);
		List<String> listDirs = new ArrayList<String>();
		listDirs = fileService.selectDir(file);
		
		// DB에서 넘어온 dirList session 에 넘기기
		session.setAttribute("dir_result", listDirs);
		
		 
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
	
	// 폴더 이름 변경 처리를 위한 컨트롤러
	@RequestMapping(value="/renamedir", method=RequestMethod.POST)
	public void renameDir(@RequestParam(value="oldDirName") String oldDirName, 
							@RequestParam(value="newDirName") String newDirName, 
							@RequestParam(value="m_id") String m_id, 
							HttpServletRequest request, HttpServletResponse response) throws Exception {
		// FileVO 객체를 새로 만들어서 값 입력
		file.setM_id(m_id);
		file.setDirName(newDirName);
		
		// 새로만들 디렉토리가 있는지부터 검사
		if (fileService.isDir(file) == 0) { // DB 에 해당폴더 없으면 0 반환
			file.setDirName(null);
			file.setDirName(oldDirName);
			file.setDirRename(newDirName);

			if (fileService.renameDir(file) == 1) {  // DB에 이름 변경하면 1 반환
				// ajax에게 값을 넘겨주기 위해서
				PrintWriter pw = response.getWriter();
				
				boolean result = ImagicUtil.renameDir(path + m_id, oldDirName,
						newDirName);
				pw.print(result);
				pw.flush();

			}
		}
	}
	
	// 폴더 삭제를 처리를 위한 컨트롤러
	@RequestMapping(value="/deleteDir", method=RequestMethod.POST)
	public void deleteDir(@RequestParam(value="m_id") String m_id,
						   @RequestParam(value="dirName") String dirName,
						   HttpServletRequest request, HttpServletResponse response) throws IOException {
		file.setDirName(null);
		file.setM_id(m_id);
		file.setDirName(dirName);
		
		PrintWriter pw = response.getWriter();
		// DB에서 폴더명을 삭제하고 그에 해당하는 Image table 파일들을 삭제했다면
		try {
			if (fileService.deleteDir(file)==1) {   
				if (ImagicUtil.deleteDir(path+m_id+"/"+file.getDirName())){
					pw.print("deleteDirSuccess");  // DB, FileSystem 동시에 삭제 성공
					pw.flush();
				} else {
					pw.print("deleteDirFail"); // DB는 삭제 했으나 FileSystem 존재 
					pw.flush();
				}
			} else {
				pw.print("deleteDirDBFail"); // DB 에서의 dirName 삭제 실패
				pw.flush();
			}
		} catch (Exception e) {
			pw.print("deleteDirEx"); // Exception 발생하고 삭제 실패
			e.printStackTrace();
		}
	}
	
	
	
	// 파일 업로드 처리위한 맵핑
	@RequestMapping(value="/upload", method=RequestMethod.POST)
	// Multipart 파일을 바아오기 위한 MultipartHttpServletRequest 인자 사용
	public String upload(@ModelAttribute("member") MemberVO member,MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {
		
		Iterator<String> itr = request.getFileNames();
		String userID=member.getM_id();
		
		
		// 모바일에서 접속한 환경인지 아닌지 확인하는 부분(만약 모바일 페이지를 따로 만든다면 이런식으로 구분하면 좋을 듯)
//		boolean envMobile = false;
//		 String userAgent = request.getHeader("user-agent");
//		 if (userAgent.toLowerCase().indexOf("mobile") != -1) {
//			 envMobile = true;
//		 }
		
		MultipartFile mpf = null;
//		
		while (itr.hasNext()){
			// 2014.12.06(11:13) : 실제 파일 시스템에 저장될 유일한 이름을 위한 id 생성
			String genId = UUID.randomUUID().toString();
			String fileName = itr.next();
			System.out.println("iterator : " + fileName);
			mpf = request.getFile(fileName);
			System.out.println("아이디: "+ userID + "파일 네임:" +genId+mpf.getOriginalFilename() +" uploaded!");
	        System.out.println("컨트롤의 dirname : " + member.getDirName());
	        
	        try {
				int fileNameCut = Integer.parseInt(fileName.substring(5));
				if((fileNameCut%2)==0) {
					file.setM_id(userID);
					file.setDirName(member.getDirName());
					file.setImgName(genId+mpf.getOriginalFilename());
					file.setImgOriName(mpf.getOriginalFilename());
		        	file.setImgLength(mpf.getBytes().length);
					FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream(path + userID + "/" +member.getDirName()  +"/"+ genId +mpf.getOriginalFilename() ));
				} else {
					file.setImgThumb(mpf.getBytes());
					int a=(int)fileService.fileUpload(file);
					System.out.println("파일 업로드 종료값  : " + a);
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();								
			}
		}
		return null;
		
	}
	
	@RequestMapping(value="/filelist")
	public void fileList(@ModelAttribute("member") MemberVO member, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		List<FileVO> filesList = new ArrayList<FileVO>();
		file.setM_id(member.getM_id());
		file.setDirName(member.getDirName());
		filesList = fileService.fileList(file);
		System.out.println("파일리스트 사이즈:" + filesList.size());
	}
	
}
		

