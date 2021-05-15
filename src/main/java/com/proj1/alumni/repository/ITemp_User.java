package com.proj1.alumni.repository;

import java.util.List;
import java.util.Optional;

import com.proj1.alumni.model.Temp_User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITemp_User extends JpaRepository<Temp_User, Integer>{
	
	Optional<Temp_User> findByUserName(String userName);
}
