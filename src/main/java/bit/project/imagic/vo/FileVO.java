package bit.project.imagic.vo;

import java.io.Serializable;

public class FileVO implements Serializable {

	private static final long serialVersionUID = 1L;
	private String m_id;
	private int dirNum;
	private String dirName;
	private String dirRename;
	private int imgNum;
	private String imgName;
	private String imgOriName;
	private int imgLength;
	private byte[] imgThumb;
	

	public String getM_id() {
		return m_id;
	}

	public void setM_id(String m_id) {
		this.m_id = m_id;
	}

	public int getDirNum() {
		return dirNum;
	}

	public void setDirNum(int dirNum) {
		this.dirNum = dirNum;
	}

	public String getDirName() {
		return dirName;
	}

	public void setDirName(String dirName) {
		this.dirName = dirName;
	}
	
	public String getDirRename() {
		return dirRename;
	}

	public void setDirRename(String dirRename) {
		this.dirRename = dirRename;
	}

	public int getImgNum() {
		return imgNum;
	}

	public void setImgNum(int imgNum) {
		this.imgNum = imgNum;
	}

	public String getImgName() {
		return imgName;
	}

	public void setImgName(String imgName) {
		this.imgName = imgName;
	}
	
	public String getImgOriName() {
		return imgOriName;
	}

	public void setImgOriName(String imgOriName) {
		this.imgOriName = imgOriName;
	}

	public int getImgLength() {
		return imgLength;
	}

	public void setImgLength(int imgLength) {
		this.imgLength = imgLength;
	}

	public byte[] getImgThumb() {
		return imgThumb;
	}

	public void setImgThumb(byte[] imgThumb) {
		this.imgThumb = imgThumb;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

	
	

}
