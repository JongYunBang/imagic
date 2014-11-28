package bit.project.imagic.vo;

import java.io.Serializable;

public class FileVO  implements Serializable{

	private static final long serialVersionUID = 1L;
	private int length;
	private byte[] bytes;
	private String name;
	private String type;

	public int getLength() {
		return length;
	}

	public void setLength(int length) {
		this.length = length;
	}

	public byte[] getBytes() {
		return bytes;
	}

	public void setBytes(byte[] bytes) {
		this.bytes = bytes;
	}

	
	public String getName() {
		return name;
	}

	
	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}


}
