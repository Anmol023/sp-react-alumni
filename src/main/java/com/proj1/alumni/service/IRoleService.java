package com.proj1.alumni.service;

import com.proj1.alumni.model.Role;
import java.util.List;
import java.util.Optional;

public interface IRoleService {

    List<Role> findAll();
    Optional<Role> findById(int id);
    Role save(Role role);
    Role findByName(String name);
    String deleteById(int id);
}
