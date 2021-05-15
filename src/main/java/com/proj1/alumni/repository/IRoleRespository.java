package com.proj1.alumni.repository;


import com.proj1.alumni.model.Role;
import com.proj1.alumni.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IRoleRespository extends JpaRepository<Role, Integer> {
    Role findByName(String name);
    Optional<Role> findById(int id);
}
