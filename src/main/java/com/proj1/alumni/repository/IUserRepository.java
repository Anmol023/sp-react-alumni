package com.proj1.alumni.repository;

import java.util.List;
import java.util.Optional;

import com.proj1.alumni.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer>{
	List<User> findByRole_Id(int role_id);
	List<User> findByYear(int year);
	List<User> findByDept(String dep);
	List<User> findByCourse(String cour);
	User findByUserName(String userName);
	User findByEmail(String email);

}
