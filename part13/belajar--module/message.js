console.log('ini merupakan pesan dari message.js');
// gunakan export agar kode di luar module dapat mengimport
export let obj = {
  name: 'chris',
  age: 20
};
export function sendMessage(from, to, text) {
  console.log(`${from} has send message to ${to}:\n${text}`);
}
export let publicVariable = 'public-value';
let privateVariable = 'private-value';

setTimeout(() => obj.age ++, 100);
