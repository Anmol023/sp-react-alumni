package com.proj1.alumni.controller;

import java.util.List;
import java.util.Map;

import com.proj1.alumni.request.UserFriendsListRequest;
import com.proj1.alumni.request.UserFriendsRequest;
import com.proj1.alumni.service.IUserService;
import com.proj1.alumni.service.TempUserFriendsServiceImpl;
import com.proj1.alumni.service.UserFriendsServiceImpl;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.proj1.alumni.exception.ResourceNotFoundException;
import com.proj1.alumni.model.User;

@RestController
@RequestMapping("/user")
@PreAuthorize(("hasRole('ROLE_USER')"))
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
	
	@Autowired
	IUserService service;

	@Autowired
	UserFriendsServiceImpl userFriendsService;

	@Autowired
	TempUserFriendsServiceImpl tempUserFriendsService;

	@GetMapping("/")
	public List<User> all(){
		return service.findByRole_Id(2);
	}

	@PostMapping("/friendRequest")
	public ResponseEntity<Map<String, Object>> addFriendRequest(@RequestBody UserFriendsRequest userFriendsRequest) {
		return tempUserFriendsService.addFriendRequest(userFriendsRequest);
	}

	@PostMapping(value = "/getFriendRequestList")
	public List<User> getFriendRequestList(@RequestBody UserFriendsListRequest userFriendsListRequest) {
		return this.tempUserFriendsService.getFriendRequestList(userFriendsListRequest);
	}

	@PostMapping(value = "/acceptFriendRequest")
	public ResponseEntity<String> confirmFriendRequest(@RequestBody UserFriendsRequest userFriendsRequest){
		return this.userFriendsService.addUserFriends(userFriendsRequest);
	}
	@PostMapping(value = "/getFriendsList")
	public List<User> getConfirmedFriendList(@RequestBody UserFriendsListRequest userFriendsListRequest) {
		return this.userFriendsService.getUserFriendsList(userFriendsListRequest);
	}


	@PostMapping(value = "/getCommonFriends")
	public ResponseEntity<Map<String, Object>> getCommonUserFriends(@RequestBody UserFriendsRequest userFriendsRequest) {
		return this.userFriendsService.getCommonUserFriends(userFriendsRequest);
	}

	@PutMapping("/{uName}")
	public ResponseEntity<User> updateUser(@PathVariable(value = "uName") String uName, @RequestBody User UserDetails)throws ResourceNotFoundException{
		User user = service.findByUserName(uName);
		user.setName(UserDetails.getName());
		user.setUserName(UserDetails.getUserName());
		user.setEmail(UserDetails.getEmail());
		user.setCourse(UserDetails.getCourse());
		user.setDept(UserDetails.getDept());
		user.setEnrl(UserDetails.getEnrl());
		user.setYear(UserDetails.getYear());
		
		service.save1(user);
		return ResponseEntity.ok(user);
	}

	@GetMapping("/{uName}")
	public ResponseEntity<User> getAlumniById(@ApiParam(value = "Id for the Alumni you want to retrieve",required = true)
											  @PathVariable(value = "uName")String uName)throws ResourceNotFoundException{
		User alumni = service.findByUserName(uName);
		return ResponseEntity.ok(alumni);
	}
}
