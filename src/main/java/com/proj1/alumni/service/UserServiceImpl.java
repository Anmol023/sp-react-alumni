package com.proj1.alumni.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.proj1.alumni.model.User;
import com.proj1.alumni.model.Temp_User;
import com.proj1.alumni.repository.IUserRepository;

@Service
public class UserServiceImpl implements IUserService {
		
	@Autowired
	IUserRepository repo;

	@Autowired
	IRoleService role;

	@Autowired
	public List<User> findAll(){return repo.findAll(); }
	
	@Override
	public List<User> findByRole_Id(int id) {
		return repo.findByRole_Id(2);
	}

	@Override
	public User save(Temp_User a)  {
		User Userex = new User();
		Userex.setName(a.getName());
		Userex.setCourse(a.getCourse());
		Userex.setDept(a.getDept());
		Userex.setRole(role.findById(2).get());
		Userex.setEmail(a.getEmail());
		Userex.setEnrl(a.getEnrl());
		Userex.setPass(a.getPass());
		Userex.setUserName(a.getUserName());
		Userex.setYear(a.getYear());
		return repo.save(Userex);
	}

	@Override
	public Optional<User> findById(int the_id) {
		return repo.findById(the_id);
	}

	@Override
	public User findByUserName(String userName) {
		return repo.findByUserName(userName);
	}

	@Override
	public List<User> findByYear(int year) {
		return repo.findByYear(year);
	}

	@Override
	public List<User> findByDept(String department) {
		return repo.findByDept(department);
	}

	@Override
	public List<User> findByCourse(String course) {
		return repo.findByCourse(course);
	}

	@Override
	public User findByEmail(String email) {
		return repo.findByEmail(email);
	}

	@Override
	public void delete(User a) {
		repo.delete(a);
	}

	@Override
	public User save1(User a) {
		return repo.save(a);
	}	
	
}
