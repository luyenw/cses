package com.cses.apigateway.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthFilter extends AbstractGatewayFilterFactory<AuthFilter.Config> {


    public AuthFilter() {
        super(Config.class);
    }

    @Override
    public GatewayFilter apply(Config config) {
        return (((exchange, chain) -> {
//            if (!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
//                System.out.println("missing auth header");
//            }else {
//                String authHeader = exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
//                if (authHeader != null && authHeader.startsWith("Bearer ")) {
//                    authHeader = authHeader.substring(7);
//                    System.out.println(authHeader);
//                }
//            }
            if (!exchange.getRequest().getCookies().containsKey("access_token")){
                System.out.println("missing access cookie");
            }else {
                String access_token = exchange.getRequest().getCookies().get("access_token").get(0).toString();
                System.out.println(access_token.substring(13));
                // access_token=(...)
                HttpHeaders httpHeaders = new HttpHeaders();
                httpHeaders.set(HttpHeaders.AUTHORIZATION, "Bearer " + access_token.substring(13));
                HttpEntity<String> entity = new HttpEntity<String>("parameters", httpHeaders);
                RestTemplate restTemplate = new RestTemplate();
                try {
                    ResponseEntity<String> response = restTemplate.exchange("http://localhost:3004/verify", HttpMethod.POST, entity, String.class);
                    System.out.println(response);
                    return chain.filter(exchange);
                }catch(HttpClientErrorException e){
                    System.out.println(e.getMessage());
                }
            }
            ServerHttpResponse response = exchange.getResponse();
            response.setStatusCode(HttpStatus.UNAUTHORIZED);
            return response.setComplete();
        }));
    }

    public static class Config {

    }
}
