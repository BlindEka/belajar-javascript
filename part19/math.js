// fungsi hitung

function sum(...numbers) {
  return numbers.reduce((n1, n2) => n1 + n2, 0);
}

function mul(...numbers) {
  return numbers.reduce((n1, n2) => n1 * n2, 1);
}