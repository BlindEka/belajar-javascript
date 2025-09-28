// gunakan import(moduleName) untuk melakukan import secara dinamis
if (true) await import('./hello-world.js'); // import mengembalikan promise

let moduleMapping = {
  windows: './windows.js',
  linux: './linux.js',
};

function getOS() {
  // simulasi mendapatkan operating system
  return (Math.random() > 0.5) ? 'windows' : 'linux';
}

let os = getOS();
const myModule = await import(moduleMapping[os]);
console.log(myModule);
console.log(myModule.joinLines); // [Function: joinLines]
// import beberapa
const {default: sayPhrase, ...say} = await import('./say.js');
console.log(sayPhrase); // no indent  [Function: sayPhrase]
console.log(say.phrase === sayPhrase); // true