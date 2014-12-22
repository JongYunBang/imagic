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
	private String imgBase64;
	private String imgFormat;
	private int imgOrder;
	

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

	public String getImgBase64() {
		return imgBase64;
	}

	public void setImgBase64(String imgBase64) {
		this.imgBase64 = imgBase64;
	}

	public String getImgFormat() {
		return imgFormat;
	}

	public void setImgFormat(String imgFormat) {
		this.imgFormat = imgFormat;
	}

	public int getImgOrder() {
		return imgOrder;
	}

	public void setImgOrder(int imgOrder) {
		this.imgOrder = imgOrder;
	}


	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		sb.append("m_id=").append(m_id).append(", ");
		sb.append("dirNum=").append(dirNum).append(", ");
		sb.append("dirName=").append(dirName).append(", ");
		sb.append("dirRename=").append(dirRename).append(", ");
		sb.append("imgNum=").append(imgNum).append(", ");
		sb.append("imgName=").append(imgName).append(", ");
		sb.append("imgOriName=").append(imgOriName).append(", ");
		sb.append("imgLength=").append(imgLength).append(", ");
		sb.append("imgFormat=").append(imgFormat).append(", ");
		sb.append("imgOrder=").append(imgOrder);
		return sb.toString();
	}
	
}
