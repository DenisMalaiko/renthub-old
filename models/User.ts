export class User {
  name: string;
  login: string;
  email: string;
  country: string;
  city: string;
  password: string;

  constructor() {
    this.name = "";
    this.login = "";
    this.email = "";
    this.country = "";
    this.city = "";
    this.password = "";
  }
}