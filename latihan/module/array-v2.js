class ArrayV2 extends Array {
  doOperation(callbackFunc, array, depth) {
    if (this.flat(depth).length != array.flat(depth).length) return null;
    if (depth > 0) return this.map((subArray, index) => this.doOperation.apply(subArray, [callbackFunc, array[index], depth - 1]));
    return this.map((item, index) => callbackFunc(item, array[index]));
  }
  matrixOperation(operation, otherMatrix) {
    return this.doOperation(operation, otherMatrix, 1);
  }
  mulMatrix = matrix => this.matrixOperation((num1, num2) => num1 * num2, matrix)
  divMatrix = matrix => this.matrixOperation((num1, num2) => num1 / num2, matrix)
  subMatrix = matrix => this.matrixOperation((num1, num2) => num1 - num2, matrix)
  addMatrix = matrix => this.matrixOperation((num1, num2) => num1 + num2, matrix)
  modMatrix = matrix => this.matrixOperation((num1, num2) => num1 % num2, matrix)
  powMatrix = matrix => this.matrixOperation((num1, num2) => num1 ** num2, matrix)
  slice(start, end, step) {
    return [].slice.apply(this, arguments);
    // implementasikan step
  }
}