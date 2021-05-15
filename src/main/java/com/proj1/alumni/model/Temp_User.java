package com.proj1.alumni.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Temp_User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "name")
	private String name;
		
	@Column(name = "enrollment_no")
	private String enrl;
	
	@Column(name = "start_year")
	private int year;
	
	@Column(name = "course")
	private String course;
	
	@Column(name = "department")
	private String dept;
	
	@Column(name = "userName")
	private String userName;
	@Column(name = "email_id")
	private String email;
	
	@Column(name = "password")
	private String pass;
	
	public Temp_User() {
		// TODO Auto-generated constructor stub		
	}

	public Temp_User(int id, String name, String enrl, int year, String course, String dept, String userName, String email,
			String pass) {
		super();
		this.id = id;
		this.name = name;
		this.enrl = enrl;
		this.year = year;
		this.course = course;
		this.dept = dept;
		this.userName = userName;
		this.email = email;
		this.pass = pass;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEnrl() {
		return enrl;
	}

	public void setEnrl(String enrl) {
		this.enrl = enrl;
	}

	public int getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPass() {
		return pass;
	}

	public void setPass(String pass) {
		this.pass = pass;
	}

	
}

