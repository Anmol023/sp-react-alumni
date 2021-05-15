package com.proj1.alumni.config;

import java.util.Collections;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;



@Configuration
public class SwaggerConfig {
	
	@Bean
	public Docket swaggerConfiguration() {
		return new Docket(DocumentationType.SWAGGER_2)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.proj1.alumni"))
				.build()
				.apiInfo(apiDetails());
	}
	
	private ApiInfo apiDetails() {
		return new ApiInfo(
				"Alumni Management Api",
				"Sample Api for AMS",
				"1.0",
				"Free to Use",
				new springfox.documentation.service.Contact("Anmol Gupta","xyz.com", "anmolgupta023@gmail.com"),
				"Api License",
				"anmolgupta023@gmail.com",
				Collections.emptyList());
	}
}
