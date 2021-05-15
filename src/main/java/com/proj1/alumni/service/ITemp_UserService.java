package com.proj1.alumni.service;

import java.util.Optional;

import com.proj1.alumni.model.Temp_User;

public interface ITemp_UserService {
	Optional<Temp_User> findByUserName(String userName);
}
