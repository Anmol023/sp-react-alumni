package com.proj1.alumni.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.proj1.alumni.model.Role;
import com.proj1.alumni.model.Temp_User;
import com.proj1.alumni.model.User;
import com.proj1.alumni.repository.ITemp_User;
import com.proj1.alumni.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.proj1.alumni.exception.ResourceNotFoundException;


import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;

@RestController
@RequestMapping("/admin")
@PreAuthorize("hasRole('ROLE_ADMIN')")
@CrossOrigin(origins="http://localhost:3000")
public class AdminController {
	
	@Autowired
	UserServiceImpl service;
	
	@Autowired
	ITemp_User repo;
	
	@GetMapping("/")
	public List<Temp_User> notVerified(){
		return repo.findAll();
	}
	
	@PostMapping("/{userName}")
	public ResponseEntity<String> verifying(@PathVariable(value = "userName")String username)throws ResourceNotFoundException{
		Temp_User a = repo.findByUserName(username).orElseThrow(() -> new ResourceNotFoundException("Alumni with username not found"));
		service.save(a);
		repo.delete(a);
		return ResponseEntity.ok("Verified");
	}
	@DeleteMapping("/{userName}")
	public ResponseEntity<String> deleting(@PathVariable(value = "userName")String username)throws ResourceNotFoundException{
		Temp_User a = repo.findByUserName(username).orElseThrow(() -> new ResourceNotFoundException("Alumni with username not found"));
		repo.delete(a);
		return ResponseEntity.ok("Delete");
	}
	
	@ApiOperation(value = "Get all alumni", notes = "Return all alumni details in the database")
	@GetMapping("/all_alumni")
	public List<User> viewAll(){
		return service.findByRole_Id(2);
	}
	
	@GetMapping("/alumni/{id}")
	public ResponseEntity<User> getAlumniById(@ApiParam(value = "Id for the Alumni you want to retrieve",required = true)
												@PathVariable(value = "id")int alumniId)throws ResourceNotFoundException{
		User alumni = service.findById(alumniId).orElseThrow(() -> new ResourceNotFoundException("ALumni with id "+ alumniId+" not found"));
		return ResponseEntity.ok(alumni);
	}
		
	@DeleteMapping("/alumni/{id}")
	public Map<String, Boolean> del_alumni(@PathVariable(value="id") int alumniId) throws ResourceNotFoundException {
		User alumni = service.findById(alumniId).orElseThrow(() -> new ResourceNotFoundException("Alumni with id "+ alumniId +" not found"));
		service.delete(alumni);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted ", Boolean.TRUE);
		return response;
	}
	
}
