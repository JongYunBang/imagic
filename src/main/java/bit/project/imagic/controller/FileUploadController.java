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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;

import bit.project.imagic.service.FileUploadService;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.FileVO;
import bit.project.imagic.vo.MemberVO;

@Controller
@SessionAttributes("member")
public class FileUploadController {

	@Inject
	private FileUploadService fileService;

	//  폴더 생성 체크
	public boolean makeDirCheck(String m_id , String dirName){
		try {
			File userDir = new File(ImagicUtil.path, m_id);
			File userCreateDir = new File(ImagicUtil.path+ m_id, dirName);
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
	public ModelAndView showFlieUploadPage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		FileVO file = new FileVO();
		HttpSession session = request.getSession(false);
		MemberVO member=(MemberVO) session.getAttribute("member");
		String m_id=member.getM_id();
		file.setM_id(m_id);
		List<String> listDirs = new ArrayList<String>();
		listDirs = fileService.selectDir(file);

		return new ModelAndView("/file/fileupload", "dir_result", listDirs);
	}

	// 파일 업로드 창을 띄우기 위한 맵핑
	@RequestMapping(value="/fileupload", method=RequestMethod.POST)
	public ModelAndView showFlieUploadPage_2(@ModelAttribute("member") MemberVO member, HttpServletRequest request, HttpServletResponse response) throws Exception {
		FileVO file = new FileVO();

		String m_id=member.getM_id();
		file.setM_id(m_id);
		List<String> listDirs = new ArrayList<String>();
		listDirs = fileService.selectDir(file);

		// DB에서 넘어온 dirList session 에 넘기기
		//session.setAttribute("dir_result", listDirs);
		return new ModelAndView("/file/fileupload", "dir_result", listDirs);
	}

	@RequestMapping(value="/dircreate", method=RequestMethod.POST)
	public void dirCreate(@RequestParam(value="createName") String dirName, @RequestParam(value="m_id") String m_id, HttpServletRequest request, HttpServletResponse response) throws Exception {
		FileVO file = new FileVO();
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
		FileVO file = new FileVO();
		file.setM_id(m_id);
		file.setDirName(newDirName);
		PrintWriter pw = response.getWriter();

		try {
			// 새로만들 디렉토리가 있는지부터 검사
			if (fileService.isDir(file) == 0) { // DB 에 해당폴더 없으면 0 반환
				file.setDirName(null);
				file.setDirName(oldDirName);
				file.setDirRename(newDirName);

				if (fileService.renameDir(file) == 1) {  // DB에 이름 변경하면 1 반환
					// ajax에게 값을 넘겨주기 위해서
					boolean result = ImagicUtil.renameDir(ImagicUtil.path + m_id, oldDirName, newDirName);
					pw.print(result);
					pw.flush();
				}
			} else {
			pw.print("false");
			pw.flush();
			}
		} catch (NullPointerException e) {
			pw.print("SessionNullEx"); // // session 검사실패 세션없음
			pw.flush();
			e.printStackTrace();
		}
		pw.close();
	}

	// 폴더 삭제를 처리를 위한 컨트롤러
	@RequestMapping(value="/deleteDir", method=RequestMethod.POST)
	public void deleteDir(@RequestParam(value="m_id") String m_id,
			@RequestParam(value="dirName") String dirName,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		FileVO file = new FileVO();
		PrintWriter pw = response.getWriter();
		try {
			file.setDirName(null);
			file.setM_id(m_id);
			file.setDirName(dirName);

			// DB에서 폴더명을 삭제하고 그에 해당하는 Image table 파일들을 삭제했다면
			if (fileService.deleteDir(file)==1) {   
				if (ImagicUtil.deleteDir(ImagicUtil.path+m_id+"/"+file.getDirName())){
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
			pw.print("deleteFileEx"); // Exception 발생하고 삭제 실패
			e.printStackTrace();

		}
	}

	// 파일 업로드 처리위한 맵핑
	@RequestMapping(value="/upload", method=RequestMethod.POST)
	// Multipart 파일을 바아오기 위한 MultipartHttpServletRequest 인자 사용
	public @ResponseBody List<FileVO> upload(@ModelAttribute("member") MemberVO member,MultipartHttpServletRequest request, HttpServletResponse response) throws Exception {

//		try {
//			HttpSession session = request.getSession(false);
//			if (session.isNew()){
//			}
//		} catch (NullPointerException e) {
//			response.sendRedirect("/upload");
//		}
		

		Iterator<String> itr = request.getFileNames();
		String userID=member.getM_id();
		int fileCount = request.getFileMap().size();
		
		// 모바일에서 접속한 환경인지 아닌지 확인하는 부분(만약 모바일 페이지를 따로 만든다면 이런식으로 구분하면 좋을 듯)
		//		boolean envMobile = false;
		//		 String userAgent = request.getHeader("user-agent");
		//		 if (userAgent.toLowerCase().indexOf("mobile") != -1) {
		//			 envMobile = true;
		//		 }
		int cnt=0;

		List<FileVO> uploadList = new ArrayList<FileVO>();
		MultipartFile mpf = null;
		while (itr.hasNext()){
			FileVO tempFile = new FileVO(); 
			// 2014.12.06(11:13) : 실제 파일 시스템에 저장될 유일한 이름을 위한 id 생성
			String genId = UUID.randomUUID().toString();
			String fileName = itr.next();
			System.out.println(fileName);
			mpf = request.getFile(fileName);
			
			// 각 파일에 대한 정보 가져와서 임시로 저장
			try {
				if((fileCount/2) > cnt) {
					tempFile.setM_id(userID);
					tempFile.setDirName(member.getDirName());
					tempFile.setImgName(genId+mpf.getOriginalFilename());
					tempFile.setImgOriName(mpf.getOriginalFilename());
					tempFile.setImgLength(mpf.getBytes().length);
					tempFile.setImgFormat(ImagicUtil.getMediaType(mpf.getOriginalFilename()));
					FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream(ImagicUtil.path + userID + "/" +member.getDirName()  +"/"+ genId +mpf.getOriginalFilename() ));
					uploadList.add(tempFile);
				} else {
					uploadList.get(cnt-(fileCount/2)).setImgThumb(mpf.getBytes());
				}
			} catch (IOException e) {
				e.printStackTrace();								
			}
			cnt++;

		}
		
		// 저장했던 각 파일에 대한 정보를 DB에 등록
		for (int i = 0;i < uploadList.size(); i++){
			fileService.fileUpload(uploadList.get(i));
			// image 테이블에서 해당파일에 대한 primary key인 이미지 넘버를 가져와 저장
			uploadList.get(i).setImgNum(fileService.imgNumGet(uploadList.get(i)));
		}
		return uploadList;
	}
	
	// 해당 유저가 선태한 폴더에 대한 파일 리스트 DB에서 가져 옴
	@RequestMapping(value="/filelist", method=RequestMethod.POST)
	public @ResponseBody List<FileVO> fileList(@ModelAttribute("member") MemberVO member, HttpServletRequest request, HttpServletResponse response) throws Exception {
		FileVO file = new FileVO();
		file.setM_id(member.getM_id());
		file.setDirName(member.getDirName());
		response.setContentType("image/*");
		List<FileVO> filesList = fileService.fileList(file);
		return filesList;
	}
	
	// DB와 파일시스템에 저장되어있는 파일에 대해서 삭제 수행
	@RequestMapping(value="/removeFile" , method=RequestMethod.POST)
	public void removeFile (@RequestParam(value="m_id") String m_id, 
			@RequestParam(value="dirName") String dirName, 
			@RequestParam(value="imgName") String imgName,
			@RequestParam(value="imgNum") int imgNum,
			HttpServletRequest request, 
			HttpServletResponse response) throws IOException {

		// DB에서 폴더명을 삭제하고 그에 해당하는 Image table 파일들을 삭제했다면
		PrintWriter pw = response.getWriter();
		try {
			FileVO file = new FileVO();
			file.setM_id(m_id);
			file.setDirName(dirName);
			file.setImgName(imgName);
			file.setImgNum(imgNum);

			String retrunImgSaveName = fileService.isFile(file);
			// DB파일 정보 삭제
			if (fileService.removeFile(file)==1) { 
				// 파일시스템에서 파일 삭제
				if (ImagicUtil.removeFile(ImagicUtil.path+m_id+"/"+file.getDirName()+"/"+retrunImgSaveName)){
					pw.print("deleteFileSuccess");  // DB, FileSystem 동시에 삭제 성공
					pw.flush();
				} else {
					pw.print("deleteFileFail"); // DB는 삭제 했으나 FileSystem 존재 
					pw.flush();
				}
			} else {
				pw.print("deleteFileDBFail"); // DB 에서의 File 삭제 실패
				pw.flush();
			}
		} catch (Exception e) {
			pw.print("deleteFileEx"); // Exception 발생하고 삭제 실패
			e.printStackTrace();

		}


	}

}


