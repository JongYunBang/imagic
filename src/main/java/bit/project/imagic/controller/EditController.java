package bit.project.imagic.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import bit.project.imagic.service.EditService;
import bit.project.imagic.util.Base64;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.FileVO;

@Controller
@SessionAttributes("file")
public class EditController {
	
	@Inject
	private EditService editService;
	
	FileVO file;
	
	public EditController() {
		file = new FileVO();
	}
	//
	//테스트를 위해서 GET 방식 일시적으러 풀어놓음 
	// 나중에 index로 바꿀것
	@RequestMapping(value="/edit", method=RequestMethod.GET)
	public String showIndexPage(HttpServletRequest request, HttpServletResponse response) {
		return "edit/edit";
	}
	
	// 에디트 페이지 로딩하면서 세션어트리뷰트에 m_id값과 현재 작업중인 폴더를 저장함
	@RequestMapping(value="/edit", method=RequestMethod.POST)
	public String showEditPage(@RequestParam(value="m_id") String m_id,
								 @RequestParam(value="dirName")String dirName,
								 HttpServletRequest request, 
								 HttpServletResponse response) {
		file.setM_id(m_id);
		file.setDirName(dirName);
		HttpSession session = request.getSession(false);
		session.setAttribute("file", file);
		return "edit/edit";
	}
	
	// 편집 페이지에 썸네일 이미지와 파일 정보 뿌려주기위한 
	@RequestMapping(value="/imgLoad", method=RequestMethod.POST)
	public @ResponseBody List<FileVO> imgLoad(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dirName = file.getDirName();
		List<FileVO> fileList = editService.fileList(file);
		for(int i=0; i<fileList.size();i++){
			fileList.get(i).setDirName(dirName);
		}
		return fileList;
	}
	
	// 선택한 썸네일에 대한 원본 파일 다운
	@RequestMapping(value="/fileDown", method=RequestMethod.POST)
	public @ResponseBody String fileDown(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception{
		File files = new File(ImagicUtil.path+file.getM_id()+"/"+file.getDirName()+"/"+file.getImgName());
		byte[] bytes = ImagicUtil.loadFile(files);
		byte[] encoded = org.apache.commons.codec.binary.Base64.encodeBase64(bytes);
		
		String encodedString = new String(encoded);
		
		String result = "data:image/" + file.getImgFormat() + ";base64," + encodedString;
		
		return result;
	}
	
	// 편집완료된 파일저장
	@RequestMapping(value="/fileUpdate", method=RequestMethod.POST)
	public @ResponseBody int fileUpdate(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		this.file.setDirName(file.getDirName());
		this.file.setImgName(file.getImgName());
		this.file.setM_id(file.getM_id());
		System.out.println(this.file.getDirName());
		
		// 넘어오는 base64파일 저장하기 위해서
		try {
			String savePath = ImagicUtil.path+file.getM_id()+"/"+file.getDirName()+"/"+file.getImgName();
			/* sourceforge에서 배포하는 Base64 클래스를 사용하면 가장 간단하게 디코딩과 이미지 파일에 저장을 동시에 처리한다*/
//			String base64Str = file.getImgBase64();
//			Base64.decodeToFile(base64Str, savePath);
		} catch (Exception e) {
			e.printStackTrace();
			return 1;  // 파일시스템에 파일 저장하기 실패 
		}
		
		try {
			// 썸네일 이미지를 DB에 저장하기 위해서
			int result = editService.thumbnailUpload(file);
			if (result!=1){
				return 2;   // DB에 저장실패 
			}
		} catch (Exception e) {
			e.printStackTrace();
			return 3;  // DB에 저장하다 에러
		}
        
        return 4;  // 파일저장및 썸네일 DB 저장 완료 
	}
	
	@RequestMapping(value="/imgFile", method=RequestMethod.POST)
	public @ResponseBody int imgFile(MultipartHttpServletRequest request, HttpServletResponse response) throws FileNotFoundException, IOException {

		// 모바일에서 접속한 환경인지 아닌지 확인하는 부분(만약 모바일 페이지를 따로 만든다면 이런식으로 구분하면 좋을 듯)
		//		boolean envMobile = false;
		//		 String userAgent = request.getHeader("user-agent");
		//		 if (userAgent.toLowerCase().indexOf("mobile") != -1) {
		//			 envMobile = true;
		//		 }
		Iterator<String> itr = request.getFileNames();
		int fileCount = request.getFileMap().size();
		System.out.println("fileCount : " + fileCount);
		
		System.out.println(file.getDirName());

		MultipartFile mpf = null;
		while (itr.hasNext()){
			String fileName = itr.next();
			mpf = request.getFile(fileName);
		}
		byte[] base64byte = Base64.decode(mpf.getBytes());
		
		String base64Str = new String(mpf.getBytes());
		String savePath = ImagicUtil.path + file.getM_id() + "/" +file.getDirName()  +"/"+ file.getImgName();
//		Base64.decodeToFile(base64Str, savePath);
//		FileCopyUtils.copy(mpf.getBytes(), new FileOutputStream();
		FileCopyUtils.copy(base64byte, new FileOutputStream(savePath));
		
		
//
			
			
			
		

		
//		// 저장했던 각 파일에 대한 정보를 DB에 등록
//			fileService.fileUpload(uploadList.get(i));
//		}
		return 4;  // 파일저장및 썸네일 DB 저장 완료
	}

}
