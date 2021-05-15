package com.proj1.alumni;

import com.proj1.alumni.model.Role;
import com.proj1.alumni.model.User;
import com.proj1.alumni.service.IRoleService;
import com.proj1.alumni.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
public class AlumniApplication implements CommandLineRunner {

	@Autowired
	private IUserService userService;

	@Autowired
	private IRoleService roleService;

	public static void main(String[] args) {
		SpringApplication.run(AlumniApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		if (roleService.findAll().isEmpty()) {
			roleService.save(new Role(1, "admin"));
			roleService.save(new Role(2, "user"));
		}
	}
}
