class ArrayV2 extends Array {
  doOperation(callbackFunc, array, depth) {
    if (this.flat(depth).length != array.flat(depth).length) return null;
    if (depth > 0) return this.map((subArray, index) => this.doOperation.apply(subArray, [callbackFunc, array[index], depth - 1]));
    return this.map((item, index) => callbackFunc(item, array[index]));
  }
  matrixOperation(operation, otherMatrix) {
    return this.doOperation(operation, otherMatrix, 1);
  }
  mulMatrix() {this.matrixOperation((num1, num2) => num1 * num2, matrix)}
  divMatrix() {this.matrixOperation((num1, num2) => num1 / num2, matrix)}
  subMatrix() {this.matrixOperation((num1, num2) => num1 - num2, matrix)}
  addMatrix() {this.matrixOperation((num1, num2) => num1 + num2, matrix)}
  modMatrix() {this.matrixOperation((num1, num2) => num1 % num2, matrix)}
  powMatrix() {this.matrixOperation((num1, num2) => num1 ** num2, matrix)}
  slice(start, end, step) {
    // return [].slice.apply(this, arguments);
    // implementasikan step
    start = start ?? 0;
    // end = end ?? this.length;
    step = step || 1;
    let thisArray = [].slice.call(this);
    if (start < 0) start = thisArray.length + start;
    if (end < 0) end = thisArray.length + end;
    if (start < 0 || start >= thisArray.length || end < 0 || end >= thisArray.length) throw RangeError(`${(start < 0 || start >= this.length) ? 'Start' : 'End'} index out of range`);
    if (step < 0) {
      [start, end] = [end, start];
      thisArray.reverse();
      step = Math.abs(step);
    }
    let newArray = new this.constructor();
    for (let index = start; index < end ?? thisArray.length; index += step) {
      if (thisArray.hasOwnProperty(index)) newArray.push(thisArray[index]);
    };
    return newArray;
  }
}
