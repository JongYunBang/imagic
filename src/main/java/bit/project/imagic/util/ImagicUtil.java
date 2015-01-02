package bit.project.imagic.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import bit.project.imagic.vo.MemberVO;

/**
 * 
 * @author ProgrammingPearls
 *
 */
public class ImagicUtil {
//	public static String path = "/Users/ProgrammingPearls/Documents/Upload/";
	public static String path = "d:/down/upload/";
//	public static String path = "/home/imagic/imagic/";
	
	public static boolean renameDir(String userDirName, String oldDirName, String newDirName){
		//File userDir = new File(userDirName);
		File currentDir = new File(userDirName, oldDirName);
		File newDir = new File(userDirName, newDirName);
		
		if(!currentDir.renameTo(newDir)){
			return false;	
		}
		return true;
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
					//System.out.println("Filelist : "  + tempFile.getName());
					listDirs.add(tempFile);
				}
			}
		}
		return listDirs;
	}

	public static boolean checkMemberId(MemberVO member) {
		if (member.getM_id()!= null){
			return true;
		}
		return false;
	}
	

	// 파일을 byte 로 변환
	public static byte[] loadFile(File files) throws IOException {
	    InputStream is = new FileInputStream(files);
 
	    long length = files.length();
	    if (length > Integer.MAX_VALUE) {
	        // File is too large
	    }
	    byte[] bytes = new byte[(int)length];
	    
	    int offset = 0;
	    int numRead = 0;
	    while (offset < bytes.length && (numRead=is.read(bytes, offset, bytes.length-offset)) >= 0) {
	        offset += numRead;
	    }
 
	    if (offset < bytes.length) {
	        throw new IOException("Could not completely read file "+files.getName());
	    }
 
	    is.close();
	    return bytes;
	}
	
	// 이미지파일의 타입 체크
	public static String getMediaType(String dirName) {
		String res = null;
		String type = dirName.substring(dirName.lastIndexOf(".")+1);
		
		if(type.equals("gif")) {
			res = "gif";
		}else if(type.equals("jpg")){
			res = "jpeg";
		}else if(type.equals("png")) {
			res = "png";
		}else if(type.equals("svg") || type.equals("xml")) {
			res = "svg+xml";
		}else if(type.equals("tiff")) {
			res = "tiff";			
		}
		return res;
	}
	
}
