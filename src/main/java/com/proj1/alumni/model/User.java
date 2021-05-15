package com.proj1.alumni.model;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.util.CollectionUtils;

@Entity
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	@Column(name = "name")
	private String name;
		
	@Column(name = "enrollment_no")
	private String enrl;
	
	@Column(name = "start_year")
	private Integer year;
	
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

	@ManyToOne
	@JoinColumn(name = "role_id")
	private Role role;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "user_friends", joinColumns = @JoinColumn(name = "userId") , inverseJoinColumns = @JoinColumn(name = "friendId") )
	private Set<User> userFriends;

	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "temp_user_friends", joinColumns = @JoinColumn(name = "userId") , inverseJoinColumns = @JoinColumn(name = "friendId") )
	private Set<User> tempUserFriends;
	public User() {
	}

	public User(int id, String name, String enrl, Integer year, String course, String dept, String userName, String email,
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

	public Integer getYear() {
		return year;
	}

	public void setYear(int year) {
		this.year = year;
	}

	public Set<User> getTempUserFriends() {
		return tempUserFriends;
	}

	public void setTempUserFriends(Set<User> tempUserFriends) {
		this.tempUserFriends = tempUserFriends;
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

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}

	public Set<User> getUserFriends() {
		return userFriends;
	}

	public void setUserFriends(Set<User> userFriends) {
		this.userFriends = userFriends;
	}

	public void addUserFriends(User user) {
		if (CollectionUtils.isEmpty(this.userFriends)) {
			this.userFriends = new HashSet<>();
		}
		this.userFriends.add(user);
	}
	public void addTempUserFriends(User user) {
		if (CollectionUtils.isEmpty(this.tempUserFriends)) {
			this.tempUserFriends = new HashSet<>();
		}
		this.tempUserFriends.add(user);
	}
}
