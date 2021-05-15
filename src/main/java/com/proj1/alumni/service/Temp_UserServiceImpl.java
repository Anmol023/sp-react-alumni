package com.proj1.alumni.service;

import java.util.Optional;

import com.proj1.alumni.model.Temp_User;
import com.proj1.alumni.repository.ITemp_User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Temp_UserServiceImpl implements ITemp_UserService {
	
	@Autowired
	ITemp_User repo;

	@Override
	public Optional<Temp_User> findByUserName(String userName) {
		// TODO Auto-generated method stub
		return repo.findByUserName(userName);
	}
}
