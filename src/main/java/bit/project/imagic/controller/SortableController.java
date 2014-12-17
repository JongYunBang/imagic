package bit.project.imagic.controller;

import java.io.IOException;
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

import bit.project.imagic.service.SortService;
import bit.project.imagic.vo.FileVO;

@Controller
@SessionAttributes("file")
public class SortableController {
	
	@Inject
	private SortService sortService;
	FileVO file;
	
	public SortableController() {
		file = new FileVO();
	}
	
	// 파일 저장 기본 경로
	//	String path = "/Users/ProgrammingPearls/Documents/Upload/";
	String path = "d:/down/upload/";
	
	@RequestMapping(value="/sortable", method=RequestMethod.GET)
	public String showIndexPage(HttpServletRequest request, HttpServletResponse response) {
		return "sortable/sortable";
	}
	
	@RequestMapping(value="/sortable", method=RequestMethod.POST)
	public String showSortPage(@RequestParam("m_id") String m_id,
								 @RequestParam("dirNum") int dirNum,
								 @RequestParam("dirName") String dirName,
								 HttpServletRequest request, HttpServletResponse response) throws IOException{
		// json 으로 가져와서 json으로 출력
//		BufferedReader httpBody = request.getReader();
//		StringBuffer sb = new StringBuffer();
//		String line = null;
//		while ((line = httpBody.readLine()) != null) {
//			sb.append(line).append('\n');
//		}
//		String json = sb.toString();
//		System.out.println(json);
		
//		String id = m_id;
//		String dir = dirNum;
		file.setM_id(m_id);
		file.setDirNum(dirNum);
		file.setDirName(dirName);
		
		HttpSession session = request.getSession(false);
		session.setAttribute("file", file);
		
		// JSON String -> Java Bean
		
		
//		Map<String, Object> modelMap = model.asMap();
//		System.out.println(modelMap);
//		FileVO file = (FileVO)modelMap.get("file");
//		System.out.println(file);
		
//		saveFileList = new ArrayList<FileVO>();
//		
//		System.out.println("sortable 페이지 get 날라옴");
////		System.out.println(saveFileList.get(0).getDirName());
//		PrintWriter pw = response.getWriter();
//		pw.write(0);
		
		return "sortable/sortable";
	}
	
	@RequestMapping(value="/sortThumbLoad", method=RequestMethod.POST)
	public @ResponseBody List<FileVO> sortThumbLoad(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		file.setDirNum(this.file.getDirNum());
		
		
		List<FileVO> fileList=sortService.fileList(file);
		for(int i=0; i<fileList.size(); i++){
			fileList.get(i).setDirName(this.file.getDirName());
		}
		
		
		return fileList;
		
	}
	
	@RequestMapping(value="/sortImgOrder", method=RequestMethod.POST)
	public @ResponseBody int sortImgOrder(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception {
		int result = sortService.imgOrderInsert(file);
		
		return result;
		
	}
	
}
