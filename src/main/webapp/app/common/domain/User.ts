export class User {
  username?: string;
  id?: string;
  token?: string;
  constructor(username?: string, id?: string, token?: string) {
    this.username = username;
    this.id = id;
    this.token = token;
  }
}

export class UserCredentialsDTO {
  username: string;
  password: string;
  rememberMe: boolean;
  constructor(username: string, password: string, rememberMe: boolean) {
    this.username = username;
    this.password = password;
    this.rememberMe = rememberMe;
  }
}
