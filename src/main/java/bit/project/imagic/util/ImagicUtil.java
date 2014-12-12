package bit.project.imagic.util;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

import bit.project.imagic.vo.MemberVO;

/**
 * 
 * @author ProgrammingPearls
 *
 */
public class ImagicUtil {

	
	public static boolean renameDir(String userDirName, String oldDirName, String newDirName){
		//File userDir = new File(userDirName);
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
	
	// 파일 삭제 메서드
	public static boolean removeDir(String userDirName, String dirName) {
		
		File path = new File(userDirName, dirName);
		
		// 경로의 파일이 존재하지 않는다면 삭제 실패
		if(!path.exists()){
			return false;
		}
		// 파일 리스트를 가져온다.
		File[] files = path.listFiles();
		for(File file : files){
			// 파일이 디렉토리라면 그 안에 또 파일이 있을 수 있으므로 recursive를 통해 다시 이 메서드를 실행한다.
			if(file.isDirectory()){
				removeDir(userDirName+dirName, file.getName());
			}else{
				file.delete();
			}
		}
		return path.delete();
	}
	
	// 디렉토리와 그안에 있는 파일까지 삭제
	public static boolean deleteDir(String userDirName) {
		deleterDir(new File(userDirName));
		return true;
	}
	
	public static void deleterDir(File file) {
		if (!file.exists())
			return;
		
		File[] files = file.listFiles();
		for(int i=0; i<files.length; i++) {
			if(files[i].isDirectory()) {
				deleterDir(files[i]);
			} else {
				files[i].delete();
			}
		}
		file.delete();
	}
	
	// 파일만 삭제
	 public static boolean removeFile(String imgName) {
	        File file = new File(imgName);
	        
	        if(file.exists() == true){
	            file.delete();
	            return true;
	        }
	        return false;
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

	public static boolean checkSession(MemberVO member) {
		if (member.getM_id()!= null){
			return true;
		}
		return false;
	}
}
