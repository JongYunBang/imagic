package bit.project.imagic.vo;

import java.io.Serializable;
import java.sql.Date;

public class MemberVO implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String m_id;
	private String m_pw;
	private String m_email;
	private String m_name;
	private Date m_regDate;
	
	
	public String getM_id() {
		return m_id;
	}
	public void setM_id(String m_id) {
		this.m_id = m_id;
	}
	public String getM_pw() {
		return m_pw;
	}
	public void setM_pw(String m_pw) {
		this.m_pw = m_pw;
	}
	public String getM_email() {
		return m_email;
	}
	public void setM_email(String m_email) {
		this.m_email = m_email;
	}
	public String getM_name() {
		return m_name;
	}
	public void setM_name(String m_name) {
		this.m_name = m_name;
	}
	public Date getM_regDate() {
		return m_regDate;
	}
	public void setM_regDate(Date m_regDate) {
		this.m_regDate = m_regDate;
	}



}
