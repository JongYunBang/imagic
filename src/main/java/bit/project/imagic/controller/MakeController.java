package bit.project.imagic.controller;

import java.io.File;
import java.util.ArrayList;
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
import org.springframework.web.servlet.ModelAndView;

import bit.project.imagic.service.MakeService;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.FileVO;

@Controller
@SessionAttributes("member")
public class MakeController {
	
	@Inject
	MakeService makeService;
	
	
	//테스트를 위해서 GET 방식 일시적으러 풀어놓음 
	// 나중에 index로 바꿀것
	@RequestMapping(value="/make", method=RequestMethod.GET)
	public String showIndexPage(HttpServletRequest request, HttpServletResponse response) {
		return "make/make";
	}
	
	// make페이지 로딩
	@RequestMapping(value="/make", method=RequestMethod.POST)
	public ModelAndView showMakePage(@RequestParam(value="m_id") String m_id,
								 @RequestParam(value="dirName")String dirName,
			 					 @RequestParam(value="dirNum")int dirNum,
			 					 HttpServletRequest request, 
			 					 HttpServletResponse response){
		FileVO file =new FileVO();
		System.out.println(dirName);
		file.setM_id(m_id);
		file.setDirName(dirName);
		file.setDirNum(dirNum);
		
		return new ModelAndView("make/make", "file", file);
	}
	
	// 페이지 로딩후 ajax통해서 실제 파일리스트 다운로드 해주는곳
	@RequestMapping(value="/makeFileList", method=RequestMethod.POST)
	public @ResponseBody List<FileVO> makeFileList(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		List<FileVO> makeFileList = new ArrayList<FileVO>();
		
		makeFileList = makeService.makeFileList(file);
		// makeFileList에 들어있는 파일정보로 실제 저장된 파일 블러와서 base64로 변환해 FileVO 에 담는 과정
		for(int i=0; i<makeFileList.size(); i++){

			File files = new File(ImagicUtil.path+file.getM_id()+"/"+file.getDirName()+"/"+makeFileList.get(i).getImgName());
			byte[] bytes = ImagicUtil.loadFile(files);
			byte[] encoded = org.apache.commons.codec.binary.Base64.encodeBase64(bytes);

			String encodedString = new String(encoded);

			String result = "data:image/" + makeFileList.get(i).getImgFormat() + ";base64," + encodedString;
			makeFileList.get(i).setImgBase64(result);
		}
		
		return makeFileList;
		
	}

}
