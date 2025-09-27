// pendekatan satu module 1 benda

export default class User {
  constructor(username, birthday) {
    this.username = username;
    this.birthday = birthday;
  }
  get age() {
    return new Date().getFullYear() - this.birthday?.getFullYear();
  }
  get firstName() {
    return this.username?.split(' ')?.[0];
  }
  get middleName() {
    return (this.username?.split(' ')?.length > 2) ? this.username?.split(' ')?.[1] : '';
  }
  get lastName() {
    return (this.username?.split(' ')?.length > 2) ? this.username?.split(' ')?.slice(2)?.join(' ') : this.username?.split(' ')?.[1];
  }
}