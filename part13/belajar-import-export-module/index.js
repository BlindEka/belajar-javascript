// export ulang
export * from "./say.js";
// export semua (*) tidak termasuk default
export * from "./time.js";
// export default secara khusus
export {default} from "./time.js"; // sekarang default module ini adalah class Time
// tidak bisa export ulang class User menjadi default karena sudah didefinisikan oleh class Time
// export {default} from "./user.js";
export {default as User} from "./user.js";
// export bisa dilakukan dimana saja
export {myConfig};
let myConfig = {defaultUsername: 'admin'};