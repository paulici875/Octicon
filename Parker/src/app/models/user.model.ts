export class User {
  public id: number;
  public type: string;
  public lastName: string;
  public firstName: string;
  public email: string;
  public phone: string;
  public password: string;
  public avatar: string;

  constructor(
    id?: number,
    type?: string,
    lastName?: string,
    firstName?: string,
    email?: string,
    phone?: string,
    password?: string,
    avatar?: string
  ) {
    this.id = id || this.id;
    this.type = type || this.type;
    this.lastName = lastName || this.lastName;
    this.firstName = firstName || this.firstName;
    this.email = email || this.email;
    this.phone = phone || this.phone;
    this.password = password || this.password;
    this.avatar = avatar || this.avatar;

  }
}
