package bit.project.imagic.controller;

import java.io.File;
import java.io.IOException;
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

import bit.project.imagic.service.FileUploadService;
import bit.project.imagic.service.MakeService;
import bit.project.imagic.util.ImagicUtil;
import bit.project.imagic.vo.FileVO;
import bit.project.imagic.vo.MemberVO;

@Controller
@SessionAttributes("member")
public class MakeController {
	
	@Inject
	private FileUploadService fileService;

	@Inject
	MakeService makeService;


	//테스트를 위해서 GET 방식 일시적으러 풀어놓음 
	// 나중에 index로 바꿀것
	@RequestMapping(value="/make", method=RequestMethod.GET)
	public ModelAndView showIndexPage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		FileVO file = new FileVO();
		HttpSession session = request.getSession(false);
		MemberVO member=(MemberVO) session.getAttribute("member");
		String m_id=member.getM_id();
		file.setM_id(m_id);
		List<String> listDirs = new ArrayList<String>();
		listDirs = fileService.selectDir(file);

		return new ModelAndView("/file/fileupload", "dir_result", listDirs);
	}

	// make페이지 로딩
	@RequestMapping(value="/make", method=RequestMethod.POST)
	public ModelAndView showMakePage(@RequestParam(value="m_id") String m_id,
			@RequestParam(value="dirName")String dirName,
			@RequestParam(value="dirNum")int dirNum,
			HttpServletRequest request, 
			HttpServletResponse response) throws IOException{
		try {
			HttpSession session = request.getSession(false);
			if (session.isNew()){
			}
		} catch (NullPointerException e) {
			response.sendRedirect("/fileupload");
		}
		FileVO file =new FileVO();
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
		for(int i=0; i<makeFileList.size(); i++){
			// 각 파일의 경로값 얻기
			String imgPath = ImagicUtil.path+file.getM_id()+"/"+file.getDirName()+"/"+makeFileList.get(i).getImgName();

			File files = new File(imgPath);
			byte[] bytes = ImagicUtil.loadFile(files);
			byte[] encoded = org.apache.commons.codec.binary.Base64.encodeBase64(bytes);

			String encodedString = new String(encoded);

			String result = "data:image/" + makeFileList.get(i).getImgFormat() + ";base64," + encodedString;
			makeFileList.get(i).setImgBase64(result);
		}

		return makeFileList;

	}



}
