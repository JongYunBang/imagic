package bit.project.imagic.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import bit.project.imagic.vo.MemberVO;

/**
 * 
 * @author ProgrammingPearls
 *
 */
public class ImagicUtil {
	// 그냥 생성된 session이 아닌 member정보가 들어있는지 확인해주는 메서드	
	public static boolean checkSession(HttpServletRequest request) {
		HttpSession session = null;
		MemberVO member = null;
		
		session = request.getSession(false);

		if (session == null) {
			// 세션이 존재하지 않는 경우
			return false;
		} else {
			// 세션이 존재하지만 로그인 값은 없는 경우
			member = (MemberVO) session.getAttribute("member");
			if (member.getM_id()!= null){
				return true;
			}
		}
		return false;
	}
	
	public static boolean renameDir(String userDirName, String oldDirName, String newDirName){
		File userDir = new File(userDirName);
		File currentDir = new File(userDirName, oldDirName);
		File newDir = new File(userDirName, newDirName);
		
		// DB로 검사해버림
		/*if(isDirName(userDir, newDirName)){
			return false;
		}*/
		
		//
		if(!currentDir.renameTo(newDir)){
			return false;	
		}
		return true;
	}
	
	// DB로 구현됨 (controller 에 있음)
	// 디렉토리 존재 여부 java로 구현한 부분 
	/*public static boolean isDirName(File userDir, String compareDirName){
		List<String> listDirs  = getDirList(userDir);
		boolean result  = false;
		for(int i = 0; i<listDirs.size(); i++){
			System.out.println("isDirName : " + listDirs.get(i));
			System.out.println("compareDirName : " + compareDirName);
			if (listDirs.get(i).equals(compareDirName)){
				result = true;
				break;
			}
		}
		System.out.println("isDirNameResult : " + result);
		return result;
	}*/
	
	
	// DB로 구현함
	/*// userDir에 있는 목록에서 디렉토리 목록만을 가져오는 메서드
	public static List<String> getDirList(File userDir) {
		// 폴더 안에 있는 파일과 디렉토리 목록을 저장할 변수
		String[] fileList = userDir.list();
		List<String> listDirs = null;
		// 목록이 존재한다면
		if (fileList.length  > 0) {
			
			// 세션에 전달할 디렉토리 목록들
			listDirs = new ArrayList<String>();
			for(int i = 0; i<fileList.length;i++){
				
				// 검색할 파일및 폴더명을 이름에 맞게 생성한다.
				File tempFile = new File(userDir.getPath(), fileList[i]);
				
				// 디렉토리라면 리스트에 추가 해준다.
				if(tempFile.isDirectory()){
					System.out.println("dirlist : "  + fileList[i]);
					listDirs.add(fileList[i]);
				}
			}
		}
		return listDirs;
	}*/
	// userDir에 있는 파일을 가져오는 메서드
	public static List<File> getFileList(File userDir){
		// 폴더 안에 있는 파일과 디렉토리 목록을 저장할 변수
		String[] fileList = userDir.list();
		List<File> listDirs = null;
		// 목록이 존재한다면
		if (fileList.length  > 0) {
			
			// 세션에 전달할 디렉토리 목록들
			listDirs = new ArrayList<File>();
			for(int i = 0; i<fileList.length;i++){
				
				// 검색할 파일및 폴더명을 이름에 맞게 생성한다.
				File tempFile = new File(userDir.getPath(), fileList[i]);
				
				// 파일이라면 리스트에 추가 해준다.
				if(tempFile.isFile()){
					System.out.println("Filelist : "  + tempFile.getName());
					listDirs.add(tempFile);
				}
			}
		}
		return listDirs;
	}
}
