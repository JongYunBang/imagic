package bit.project.imagic.controller;

import java.io.File;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import bit.project.imagic.service.EditService;
import bit.project.imagic.util.Base64;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.FileVO;

@Controller
@SessionAttributes("file")
public class EditController {
	
	@Inject
	private EditService editService;
	
	// 파일 저장 기본 경로
	//	String path = "/Users/ProgrammingPearls/Documents/Upload/";
	String path = "d:/down/upload/";

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
		File files = new File(path+file.getM_id()+"/"+file.getDirName()+"/"+file.getImgName());
		byte[] bytes = ImagicUtil.loadFile(files);
		byte[] encoded = org.apache.commons.codec.binary.Base64.encodeBase64(bytes);
		
		String encodedString = new String(encoded);
		
		String result = "data:image/" + file.getImgFormat() + ";base64," + encodedString;
		
		return result;
	}
	
	// 편집완료된 파일저장
	@RequestMapping(value="/fileUpdate", method=RequestMethod.POST)
	public @ResponseBody int fileUpdate(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception {

//		System.out.println(file.getImgBase64());
//		System.out.println(file.getDirName());
//		System.out.println(file.getImgFormat());
//		System.out.println(file.getImgName());
//		System.out.println(file.getImgNum());
//		System.out.println(file.getImgOriName());
//		System.out.println(file.getM_id());
//		System.out.println(file.getImgThumb());
//		
		// 넘어오는 base64파일 저장하기 위해서
		try {
			String savePath = path+file.getM_id()+"/"+file.getDirName()+"/"+file.getImgName();
			/* sourceforge에서 배포하는 Base64 클래스를 사용하면 가장 간단하게 디코딩과 이미지 파일에 저장을 동시에 처리한다*/
			String base64Str = file.getImgBase64();
			Base64.decodeToFile(base64Str, savePath);
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
	
	

}
