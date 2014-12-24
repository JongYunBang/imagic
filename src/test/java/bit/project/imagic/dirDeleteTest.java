package bit.project.imagic;

import java.io.File;


public class dirDeleteTest {
	public static void main(String[] args) {
//			String dirName = "aasd.asda.asd..asd.jpg";
//			String res = null;
//			
//			String type = dirName.substring(dirName.lastIndexOf(".")+1);
//			System.out.println(type);
//			if(type =="gif") {
//				res = "gif";
//			}else if(type=="jpg"){
//				res = "jpeg";
//			}else if(type=="png") {
//				res = "png";
//			}else if(type=="svg" || type=="xml") {
//				res = "svg+xml";
//			}else if(type=="tiff") {
//				res = "tiff";			
//			}
		String path = "d:/down/upload/";
		File dirFile=new File(path+"a"+"/"+"fdsafdsfsa"+"/");
		File []dirFileList=dirFile.listFiles();
		for(File tempFile : dirFileList) {
		  if(tempFile.isFile()) {
		    String tempPath=tempFile.getParent();
		    String tempFileName=tempFile.getName();
		    System.out.println("Path="+tempPath);
		    System.out.println("FileName="+tempFileName);
		    /*** Do something withd tempPath and temp FileName ^^; ***/
		  }
		}
		
		System.out.println(dirFileList[0]);
		
		
		
	}
}
