"use strict";
// script dengan atribut defer tidak akan dijalankan langsung
// script ini akan dijalankan setelah html selesai dimuat namun sebelum event DOMContentLoaded
let list = document.getElementById('list-makanan');
list.insertAdjacentHTML("beforeend", `<li id="item1">batagor</li>`);
console.log('script.js telah selesai dijalankan!')
console.log(`current document.readyState: ${document.readyState}`); // interactive