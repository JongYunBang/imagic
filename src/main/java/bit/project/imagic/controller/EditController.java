package bit.project.imagic.controller;

import java.io.File;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.codec.binary.Base64;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import bit.project.imagic.service.EditService;
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
	
	@RequestMapping(value="/fileDown", method=RequestMethod.POST)
	public @ResponseBody String fileDown(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception{
		File files = new File(path+file.getM_id()+"/"+file.getDirName()+"/"+file.getImgName());
		byte[] bytes = ImagicUtil.loadFile(files);
		byte[] encoded = Base64.encodeBase64(bytes);
		
		String encodedString = new String(encoded);
		
		String result = "data:image/" + file.getImgFormat() + ";base64," + encodedString;
		
		return result;
	}
	
	@RequestMapping(value="/fileUpdate", method=RequestMethod.POST)
	public int fileUpdate(@ModelAttribute("file") FileVO file, HttpServletRequest request, HttpServletResponse response) throws Exception {

//		"m_id" : currentFile.m_id,
//		"dirName" : currentFile.dirName,
//		"imgName" : currentFile.imgName,
//		"imgOrinName" : currentFile.imgOriName,
//		"imgNum" : currentFile.imgNum,
//		"imgFormat" : currentFile.imgFormat,
//		"imgThumb" : dataURL,
//		"imgBase64" : imgBase64
		System.out.println(file.getImgBase64());
		System.out.println(file.getDirName());
		System.out.println(file.getImgFormat());
		System.out.println(file.getImgName());
		System.out.println(file.getImgNum());
		System.out.println(file.getImgOriName());
		System.out.println(file.getM_id());
		System.out.println(file.getImgThumb());
		
//		 BufferedImage image = null;
//	        byte[] imageByte;
//	        try {
//	            BASE64Decoder decoder = new BASE64Decoder();
//	            imageByte = decoder.decodeBuffer(file.getImgBase64());
//	            ByteArrayInputStream bis = new ByteArrayInputStream(imageByte);
//	            image = ImageIO.read(bis);
//	            bis.close();
//	        } catch (Exception e) {
//	            e.printStackTrace();
//	        }
//	        System.out.println("image :"+image.toString());
//	        ImageIO.write(image, file.getImgFormat(), new File(path+file.getM_id()+"/"+file.getDirName()+"/"+file.getImgName()));
		/* sourceforge에서 배포하는 Base64 클래스를 사용하면 가장 간단하게 디코딩과 이미지 파일에 저장을 동시에 처리한다*/
		Base64.decodeToFile(file.getImgBase64(), "d:/test/decodedImg.png"); //jpg,png ok

		
		/* sourceforge에서 배포하는 Base64 클래스를 사용하면 가장 간단하게 디코딩과 이미지 파일에 저장을 동시에 처리한다*/
		Base64.decodeToFile(base64Str, "d:/test/decodedImg.png"); //jpg,png ok

		
		//java.util.Base64 클래스를 사용하여 디코딩한 후에 ImageIO를 이용하여 이미지 파일에 저장한다
		byte[] decodedBytes = Base64.getDecoder().decode(base64Str); //java.util.Base64
		try {
	            BufferedImage bm = ImageIO.read(new ByteArrayInputStream(decodedBytes));
	       	    ImageIO.write(bm, "png", new File("d:/test/decodedImg.png"));
	    	} catch (IOException e) {
	        	e.printStackTrace();
	    	}
		
		
		// Apache Base64 클래스를 이용하여 디코딩한 후에 ImageIO를 이용하여 이미지 파일에 저장한다
		byte[] decodedBytes = Base64.decodeBase64(base64Str); //apache Base64
		try {
	            BufferedImage bm = ImageIO.read(new ByteArrayInputStream(decodedBytes));
	            ImageIO.write(bm, "png", new File("d:/test/decodedImg.png"));
	    	} catch (IOException e) {
	        	e.printStackTrace();
        
        return 1;
	}
	
	

}
