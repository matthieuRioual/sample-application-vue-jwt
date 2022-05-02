package com.mycompany.myapp.technical.infrastructure.primary.springdoc;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import java.util.Arrays;
import org.springdoc.core.GroupedOpenApi;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringdocConfiguration {

  @Value("${application.version:undefined}")
  private String version;

  @Bean
  public OpenAPI jhipsterOpenAPI() {
    return new OpenAPI()
      .components(
        new Components()
          .addSecuritySchemes(
            "bearer-jwt",
            new SecurityScheme()
              .type(SecurityScheme.Type.HTTP)
              .scheme("Bearer")
              .bearerFormat("JWT")
              .in(SecurityScheme.In.HEADER)
              .name("bearerAuth")
          )
      )
      .addSecurityItem(new SecurityRequirement().addList("bearer-jwt", Arrays.asList("read", "write")))
      .info(
        new Info()
          .title("Project API")
          .description("Project description API")
          .version(version)
          .license(new License().name("No license").url(""))
      )
      .externalDocs(new ExternalDocumentation().description("Project Documentation").url(""));
  }

  @Bean
  public GroupedOpenApi jhipsterAllOpenAPI() {
    // prettier-ignore
    return GroupedOpenApi.builder()
      .group("all")
      .pathsToMatch("/api/**")
      .build();
  }
}
