package com.mycompany.myapp;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatCode;
import static org.mockito.Mockito.when;
import static com.mycompany.myapp.JhipsterApp.LF;

import java.net.InetAddress;
import java.net.UnknownHostException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.Mockito;
import org.springframework.boot.SpringApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@UnitTest
@ExtendWith(SpringExtension.class)
class JhipsterAppTest {

  @Mock
  ConfigurableApplicationContext applicationContext;

  @Mock
  ConfigurableEnvironment environment;

  @Test
  void shouldConstruct() {
    assertThatCode(() -> new JhipsterApp()).doesNotThrowAnyException();
  }

  @Test
  void shouldMain() {
    try (MockedStatic<SpringApplication> springApplication = Mockito.mockStatic(SpringApplication.class)) {
      when(applicationContext.getEnvironment()).thenReturn(environment);
      springApplication.when(() -> SpringApplication.run(JhipsterApp.class, new String[] {})).thenReturn(applicationContext);

      assertThatCode(() -> JhipsterApp.main(new String[] {})).doesNotThrowAnyException();
    }
  }

  @Test
  void shouldApplicationRunning() {
    String result = JhipsterApp.applicationRunning("jhlite");
    assertThat(result).isEqualTo("  Application 'jhlite' is running!" + LF);
  }

  @Test
  void shouldAccessUrlLocalWithoutServerPort() {
    String result = JhipsterApp.accessUrlLocal(null, null, null);
    assertThat(result).isEmpty();
  }

  @Test
  void shouldAccessUrlLocalWithoutContextPath() {
    String result = JhipsterApp.accessUrlLocal("http", "8080", "/");
    assertThat(result).isEqualTo("  Local: \thttp://localhost:8080/" + LF);
  }

  @Test
  void shouldAccessUrlLocalWithContextPath() {
    String result = JhipsterApp.accessUrlLocal("http", "8080", "/lite/");
    assertThat(result).isEqualTo("  Local: \thttp://localhost:8080/lite/" + LF);
  }

  @Test
  void shouldAccessUrlExternalWithoutServerPort() {
    String result = JhipsterApp.accessUrlExternal(null, null, null, null);
    assertThat(result).isEmpty();
  }

  @Test
  void shouldAccessUrlExternalWithoutContextPath() {
    String result = JhipsterApp.accessUrlExternal("http", "127.0.1.1", "8080", "/");
    assertThat(result).isEqualTo("  External: \thttp://127.0.1.1:8080/" + LF);
  }

  @Test
  void shouldAccessUrlExternalWithContextPath() {
    String result = JhipsterApp.accessUrlExternal("http", "127.0.1.1", "8080", "/lite/");
    assertThat(result).isEqualTo("  External: \thttp://127.0.1.1:8080/lite/" + LF);
  }

  @Test
  void shouldConfigServerWithoutConfigServerStatus() {
    String result = JhipsterApp.configServer(null);
    assertThat(result).isEmpty();
  }

  @Test
  void shouldConfigServer() {
    String result = JhipsterApp.configServer("Connected to the JHipster Registry running in Docker");
    assertThat(result).contains("Config Server: Connected to the JHipster Registry running in Docker");
  }

  @Test
  void shouldGetProtocol() {
    assertThat(JhipsterApp.getProtocol(null)).isEqualTo("http");
  }

  @Test
  void shouldGetProtocolForBlank() {
    assertThat(JhipsterApp.getProtocol(" ")).isEqualTo("https");
  }

  @Test
  void shouldGetProtocolForValue() {
    assertThat(JhipsterApp.getProtocol("https")).isEqualTo("https");
  }

  @Test
  void shouldGetContextPath() {
    assertThat(JhipsterApp.getContextPath("/chips")).isEqualTo("/chips");
  }

  @Test
  void shouldGetContextPathForNull() {
    assertThat(JhipsterApp.getContextPath(null)).isEqualTo("/");
  }

  @Test
  void shouldGetContextPathForBlank() {
    assertThat(JhipsterApp.getContextPath(" ")).isEqualTo("/");
  }

  @Test
  void shouldGetHost() {
    assertThatCode(JhipsterApp::getHostAddress).doesNotThrowAnyException();
  }

  @Test
  void shouldGetHostWithoutHostAddress() {
    try (MockedStatic<InetAddress> inetAddress = Mockito.mockStatic(InetAddress.class)) {
      inetAddress.when(InetAddress::getLocalHost).thenThrow(new UnknownHostException());

      String result = JhipsterApp.getHostAddress();

      assertThat(result).isEqualTo("localhost");
    }
  }
}
