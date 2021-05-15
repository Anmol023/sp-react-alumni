package com.proj1.alumni.service;

import com.proj1.alumni.model.Role;
import com.proj1.alumni.repository.IRoleRespository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleServiceImpl implements IRoleService{

    @Autowired
    IRoleRespository repo;

    @Override
    public List<Role> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Role> findById(int id) {
        return repo.findById(id);
    }

    @Override
    public Role save(Role role) {
        return repo.save(role);
    }

    @Override
    public Role findByName(String name) {
        return repo.findByName(name);
    }

    @Override
    public String deleteById(int id) {
        repo.deleteById(id);
        return "Deleted Successfully";
    }
}