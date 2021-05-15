package com.proj1.alumni.service;

import java.util.List;
import java.util.Optional;

import com.proj1.alumni.model.Role;
import com.proj1.alumni.model.Temp_User;
import com.proj1.alumni.model.User;

public interface  IUserService {
	List<User> findAll();
	List<User> findByRole_Id(int id);
	User save(Temp_User a);
	User save1(User a);
	void delete(User a);
	Optional<User> findById(int alumniId);
	User findByUserName(String userName);
	List<User> findByYear(int year);
	List<User> findByDept(String department);
	List<User> findByCourse(String course);
	User findByEmail(String email);
	
}
