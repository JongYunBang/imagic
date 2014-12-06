package bit.project.imagic;

import bit.project.imagic.util.ImagicUtil;

public class dirDeleteTest {
	public static void main(String[] args) {
		String userDirName = "d:/down/upload/as/2";
		
		System.out.println(ImagicUtil.deleteDir(userDirName));
	}

}
