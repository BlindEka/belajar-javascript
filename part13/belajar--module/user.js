console.log('halo dari user.js');

export class User {
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

export function sayHi(user) {
  console.log(`Hi, ${user?.username ?? 'Anonymous'}`);
}

// gunakan import pada variable dll yang telah di export di module lain
import { sendMessage, obj} from "./message.js";
// import {privateVariable} from "./message.js"; // error: privateVariable tidak di export
// sekarang bisa digunakan
sendMessage('sarah', 'david', 'good morning!');
// karena module hanya di evaluasi sekali maka module berbagi objek yg sama
setTimeout(() => console.log('umur sebelum diubah oleh message.js:', obj.age), 50);
setTimeout(() => console.log('umur sesudah diubah oleh message.js:', obj.age), 200);

// import.meta
console.log('url ke script ini:', import.meta.url); // url ke file ini
console.log('path ke directory module ini:', import.meta.dirname)
console.log('path ke file module ini:', import.meta.filename)

// module tidak memiliki this yang terdefinisi
console.log('object this:', String(this));