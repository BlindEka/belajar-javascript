function sayPhrase(phrase, to, nameFirst=false) {
  console.log(nameFirst ? `${to ?? "everyone"}, ${phrase}` : `${phrase}, ${to ?? "everyone"}.`);
}

function sayHi(to) {
  sayPhrase('Hi', to);
}

function sayBye(to) {
  sayPhrase('Bye', to);
}
// export as
export {sayPhrase as default,sayPhrase as phrase,sayHi as hi, sayBye as bye};