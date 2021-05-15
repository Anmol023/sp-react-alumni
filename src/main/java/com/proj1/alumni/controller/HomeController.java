package com.proj1.alumni.controller;
import com.proj1.alumni.config.JwtTokenProvider;
import com.proj1.alumni.model.Role;
import com.proj1.alumni.repository.IRoleRespository;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import com.proj1.alumni.model.User;
import com.proj1.alumni.repository.ITemp_User;
import com.proj1.alumni.repository.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.proj1.alumni.model.Temp_User;


@RestController
@RequestMapping("/home")
@CrossOrigin(origins="http://localhost:3000")
public class HomeController {

	@Autowired
	ITemp_User service;

	@Autowired
	IUserRepository repo;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenProvider jwtTokenProvider;

	@Autowired
	IRoleRespository repo1;

	@PostMapping("/admin-signup")
	public ResponseEntity adminSignup(@RequestBody User admin) {
		User adminex = new User();
		adminex.setName(admin.getName());
		adminex.setUserName(admin.getUserName());
		adminex.setEmail(admin.getEmail());
		adminex.setRole(repo1.findById(1).get());
		adminex.setPass(new BCryptPasswordEncoder().encode(admin.getPass()));
		if (repo.findByUserName(admin.getUserName()) != null) {
			return ResponseEntity.badRequest().body("Username already exist");
		} else {
			repo.save(adminex);
			return ResponseEntity.ok("Created Successfully");
		}
	}

	@PostMapping("/alumni-signup")
	public ResponseEntity alumniSignup(@RequestBody Temp_User a) {
		Temp_User alumniex = new Temp_User();
		alumniex.setName(a.getName());
		alumniex.setCourse(a.getCourse());
		alumniex.setDept(a.getDept());
		alumniex.setEmail(a.getEmail());
		alumniex.setEnrl(a.getEnrl());
		alumniex.setPass(new BCryptPasswordEncoder().encode(a.getPass()));
		alumniex.setUserName(a.getUserName());
		alumniex.setYear(a.getYear());
		if (service.findByUserName(a.getUserName()) == null)  {
			return ResponseEntity.badRequest().body("Username Already Exist");
		}
		if (repo.findByUserName(a.getUserName()) != null){
			User u = repo.findByUserName(a.getUserName());
			if (u.equals(alumniex)){
				return ResponseEntity.ok("Username Already Exist");}
		}
		service.save(alumniex);
		return ResponseEntity.ok("Waiting for Verification");
	}

	@PostMapping(value = ("/login"), produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<String> authenticate(@RequestBody User user){
		JSONObject jsonObject = new JSONObject();
		try {
			Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUserName(),user.getPass()));
			if(authentication.isAuthenticated()){
				String userName = user.getUserName();
				int id = user.getId();
				jsonObject.put("name", authentication.getName());
				jsonObject.put("authorities", authentication.getAuthorities());
				jsonObject.put("id", id);
				jsonObject.put("token", jwtTokenProvider.createToken(userName, repo.findByUserName(userName).getRole()));
				return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
			}
		}catch (JSONException e){
			try{
				jsonObject.put("exception", e.getMessage());
			}catch (JSONException e1){
				e.printStackTrace();
			}
			return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
		}
		return null;
	}
}
