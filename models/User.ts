export class User {
  name: string;
  login: string;
  email: string;
  city: string;
  password: string;
  repeatPassword?: string;

  constructor() {
    this.name = "";
    this.login = "";
    this.email = "";
    this.city = "";
    this.password = "";
    this.repeatPassword = "";
  }
}
