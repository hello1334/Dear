package com.dear.apigatewayservice;

import com.dear.apigatewayservice.auth.JwtFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.ServerResponse;

import static org.springframework.cloud.gateway.server.mvc.filter.BeforeFilterFunctions.rewritePath;
import static org.springframework.cloud.gateway.server.mvc.handler.GatewayRouterFunctions.route;
import static org.springframework.cloud.gateway.server.mvc.handler.HandlerFunctions.http;
import static org.springframework.cloud.gateway.server.mvc.predicate.GatewayRequestPredicates.path;

@Slf4j
@SpringBootApplication
@RequiredArgsConstructor
public class ApiGatewayServiceApplication {

	@Value("${domain.auth-service}")
	private String authServiceUrl;

	@Value("${domain.user-service}")
	private String userServiceUrl;

	@Value("${domain.letter-service}")
	private String letterServiceUrl;

	@Value("${domain.ai-service}")
	private String aiServiceUrl;

	private final JwtFilter jwtFilter;

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayServiceApplication.class, args);
	}

	@Bean
	public RouterFunction<ServerResponse> getAuthServiceRoute() {
		return route("AUTH-SERVICE")
				.route(path("/auth/**"), http(authServiceUrl))
				.before(rewritePath("/auth/(?<segment>.*)", "/${segment}"))
				.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getUserServiceRoute() {
		return route("USER-SERVICE")
				.route(path("/user/**"), http(userServiceUrl))
				.before(rewritePath("/user/(?<segment>.*)", "/${segment}"))
				.filter(jwtFilter.instrument())
				.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getLetterServiceRoute() {
		return route("LETTER-SERVICE")
				.route(path("/letter/**"), http(letterServiceUrl))
				.before(rewritePath("/letter/(?<segment>.*)", "/${segment}"))
				.filter(jwtFilter.instrument())
				.build();
	}

	@Bean
	public RouterFunction<ServerResponse> getAIServiceRoute() {
		return route("AI-SERVICE")
				.route(path("/ai/**"), http(aiServiceUrl))
				.before(rewritePath("/ai/(?<segment>.*)", "/${segment}"))
				.build();
	}
}
