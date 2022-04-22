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
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
