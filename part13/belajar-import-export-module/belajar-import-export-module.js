// import module dan evaluasi tanpa menyimpannya kedalam variabel
import "./hello-world.js";
import "./hello-world.js"; // tetap hanya di evaluasi sekali sehingga pesan tidak muncul
// import / export hanya dapat dilakukan di top-level script
// if (true) import "./hello-world.js"; // error
// if (true) export {myConfig}; // error
// import / export  bisa ditempatkan dimana saja selama berada di top-level script
console.log(myConfig);
import { myConfig } from "./index.js";;
// import semuanya dengan * sebagai decorators
import * as decorators from "../decorators.js";
// import default
import User from "./user.js";
// import salah satu atau semuanya
import saySomething from "./say.js"; // import default sebagai saySomething
import * as say from "./say.js";
// import default secara langsung
import {default as Time} from "./time.js";
import * as time from "./time.js";

console.log(decorators.debounce); // [function debounce]
console.log(saySomething); // [Function: sayPhrase]
console.log(saySomething === say.phrase); // true
console.log(Time === time.default); // true

import * as index from "./index.js";
console.log(index.bye); // sayBye dari say.js
console.log(index.default); // default dari time.js = kelas Time
console.log(index.User); // default dengan alias dari user.js