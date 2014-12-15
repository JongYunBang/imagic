package bit.project.imagic;

import bit.project.imagic.util.ImagicUtil;

public class dirDeleteTest {
	public static void main(String[] args) {
			String dirName = "aasd.asda.asd..asd.jpg";
			String res = null;
			
			String type = dirName.substring(dirName.lastIndexOf(".")+1);
			System.out.println(type);
			if(type =="gif") {
				res = "gif";
			}else if(type=="jpg"){
				res = "jpeg";
			}else if(type=="png") {
				res = "png";
			}else if(type=="svg" || type=="xml") {
				res = "svg+xml";
			}else if(type=="tiff") {
				res = "tiff";			
			}
	}
}
