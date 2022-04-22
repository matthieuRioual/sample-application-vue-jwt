export class User {
  username?: string;
  id?: string;
  rememberMe?: boolean;
  token?: string;
  constructor(username?: string, id?: string, rememberMe?: boolean, token?: string) {
    this.username = username;
    this.id = id;
    this.rememberMe = rememberMe;
    this.token = token;
  }
}

export class UserCredentialsDTO {
  username: string;
  password: string;
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
