"use strict";

class Table {
  _columns = [];
  /**
   * Represent entries in rows and columns format.
   * 
   * @param {entries} columnName-columnData entries (column data should be array)
   */
  constructor(data) {
    for (let [columnName, columnData] of data) {
      let counter = 1,
      columnName2 = columnName;
      while (this.hasColumn(columnName)) {
        counter ++;
        columnName = `${columnName2}(${counter})`;
      };
      this._columns.push(new Table.Column(columnName, columnData))
    };
    this.rowLength = this.rowLength; // set all columns to the same row length
    // for special feature
    return new Proxy(this, {
      get(table, prop) {
        if (table.hasOwnProperty(prop) || table.__proto__.hasOwnProperty(prop)) return table[prop];
        if (isFinite(prop)) return (prop.split('.').length > 1) ? table.getField(prop.split('.')[0], prop.split('.')[1]) : table.getRow(+prop);
        return table.getColumn(prop);
      }
    });
  }
  [Symbol.iterator]() {
    return this.toArray().values();
  }
  toString() {
    let columns = this._columns.map(column => column.toString().split('\n'));
    let lines = [];
    for (let rowNumm = 0; rowNumm <= this.rowLength; rowNumm ++) {
      let row = [];
      for (let columnNum = 0; columnNum < this.columnLength; columnNum ++) {
        row.push(columns[columnNum][rowNumm])
      };
      lines.push(`|${row.join('|')}|`);
    };
    // decorating table
    const tableDelimiter = '+' + this._columns.map(column => '-'.repeat(column._maxStrLength + 2)).join('+') + '+';
    lines.splice(1,0, tableDelimiter);
    lines.unshift(tableDelimiter);
    lines.push(tableDelimiter);
    if (lines.length == 4) lines.splice(3,0, 'No Data'.padStart(Math.floor(lines[0].length / 2)).padEnd(lines[0].length)); // show message if no data
    return lines.join('\n');
  }
  toArray() {
    const fields = this._columns.map(column => column._data).flat(1),
    rows = [this._columns.map(column => column.name)],
    rowLength = this.rowLength,
    columnLength = this.columnLength;
    for (let columnNum = 0; columnNum < columnLength; columnNum ++) {
      let row = [];
      for (let rowNum = 0; rowNum < fields.length; rowNum += columnLength) {
        row.push(fields[rowNum + columnNum]);
      };
      rows.push(row);
    };
    return rows;
  }
  toSeparatedValue = (separator) => this.toArray().map(row => row.join(separator)).join('\n')
  toCsv = () => this.toSeparatedValue(',')
  toTsv = () => this.toSeparatedValue('\t')
  toEntries = () => this._columns.map(column => [column.name, column.data])
  toObject = () => Object.fromEntries(this.toEntries)
  toJSON = () => JSON.stringify(this.toObject)
  static fromArray(array) {
    array = array.slice();
    let columnLength = array.reduce((prevLength, row) => (row.length > prevLength) ? row.length : prevLength, 0),
    columns = array.shift().map(column => [column, []]),
    rowLength = array.length;
    for (let rowNum = 0; rowNum < rowLength; rowNum ++) {
      for (let columnNum = 0; columnNum < columnLength; columnNum ++) {
        if (! columns[columnNum]) columns[columnNum] = [`column ${columnNum}`, []];
        columns[columnNum][1][rowNum] = array[rowNum][columnNum] ?? NaN;
      };
    };
    return new this(columns);
  }
  static fromSeparatedValue = (separatedString, separator=',') => this.fromArray(separatedString.split('\n').map(row => row.split(separator)))
  static fromCsv = (csvString) => this.fromSeparatedValue(csvString, ',')
  static fromTsv = (tsvString) => this.fromSeparatedValue(tsvString, '\t')
  static fromJSON = (json) => new this(Object.entries(JSON.parse(json)))
  _fillEmptyFields() {
    this._columns.forEach(column => column._fillEmptyFields());
  }
  get rowLength() {
    return this._columns.reduce((prevLength, column) => (column.length > prevLength) ? column.length : prevLength, 0);
  }
  set rowLength(value) {
    if (isFinite(value) && value > 0) this._columns.forEach(column => column.length = value);
  }
  get columnLength() {
    return this._columns.length;
  }
  removeColumns(columnName) {
    this._columns = this._columns.filter(column => column.name != columnName);
  }
  getColumn(columnName) {
    for (let column of this._columns) {
      if (column.name == columnName) return new Table.Column(column.name, column.data);
    }
  }
  hasColumn(columnName) {
    return this._columns.map(column => column.name).includes(columnName);
  }
  getRow(rowNum) {
    if (isFinite(rowNum)) return this._columns.reduce((row, column) => row.concat(column._data[rowNum]), []);
  }
  /**
   * Get field value by row and column number.
   * Same as table[rowNum.colNum]
   * 
   * @param {number} rowNum 
   * @param {number} columnNum Column position, starting from 0.
   * @returns Any value at specified position.
   * @example myTb.getField(1,2) || myTb[1.2] // returns field value at row 1 and column 2.
   */
  getField(rowNum, columnNum) {
    return this._columns[columnNum]?.[rowNum];
  }
  slice(start, end) {
    return new Table(this._columns.map(column => [column.name, column._data.slice(start, end)]));
  }
}

Table.Column = class Column {
  #name
  /**
   * represent single column of a table.
   * 
   * @param {string} name Column name, must be string.
   * @param {Iterable} data Data that will be represented in every fields.
   */
  constructor(name, data) {
    this.name = name;
    this._data = Array.from(data);
    for (let key in Object.keys(this)) {
      if (key.startsWith('_')) Object.defineProperty(this, key, {enumerable: false, configurable: false, writable: true});
    }
    return new Proxy(this, {
      get(column, prop) {
        if (typeof prop == 'symbol') return column[prop];
        if (isFinite(prop)) return column._data[prop];
        return column[prop];
      }
    })
  }
  get name() {
    return this.#name;
  }
  set name(value) {
    this.#name = String(value);
  }
  get data() {
    return this._data.slice();
  }
  get length() {
    return this._data.length;
  }
  set length(value) {
    if (isFinite(value) && value > 0) {
      this._data.length = +value;
      this._fillEmptyFields();
    }
  }
  get _maxStrLength() {
    return [this.name].concat(this._data).reduce((prevLength, field) => (String(field).length > prevLength) ? String(field).length : prevLength, 0);
  }
  [Symbol.iterator] = () => this._data.values();
  toString() {
    let lines = [];
    for (let field of [this.name].concat(this._data)) {
      let fieldStr = String(field);
      let padLength = this._maxStrLength - fieldStr.length + 2;
      lines.push(fieldStr.padStart(Math.floor(padLength / 2) + fieldStr.length).padEnd(padLength + fieldStr.length));
    };
    return lines.join('\n');
  }
  _fillEmptyFields() {
    for (let rowNum = 0; rowNum < this._data.length; rowNum ++) {
      if (! this._data.hasOwnProperty(rowNum)) this._data[rowNum] = NaN;
    }
  }
  isNA() {
    return new Column(this.name, this._data.map(field => isNaN(field) || field === null));
  }
  dropNA() {
    return new Column(this.name, this._data.filter(field => ! isNaN(field) || ! (field === null)));
  }
  /**
   * Calls a defined callback function on each field of a column, and returns Column object that contains the results.
   * @param {CallableFunction} callbackFunc A function that accepts up to three arguments. The map method calls the callbackfn function one time for each field in the column.
   * @param {*} thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   * @returns {Table.Column} Column object.
   */
  map(callbackFunc, thisArg) {
    return new Column(this.name, this._data.map(callbackFunc, thisArg));
  }
  /**
   * Returns the field of a column object that meet the condition specified in a callback function.
   * @param {CallableFunction} predicate A function that accepts up to three arguments. The filter method calls the predicate function one time for each field in column.
   * @param {*} thisArg An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
   * @returns {Table.Column} Column object.
   */
  filter(predicate, thisArg) {
    return new Column(this.name, this._data.filter(predicate, thisArg));
  }
  slice(start, end) {
    return new Table.Column(this._data.slice(start, end));
  }
  toSeparatedValue = (separator) => this._data.map((field, index) => `${index}${separator}${field}`).join('\n')
  toCsv = () => this.toSeparatedValue(',')
  toTsv = () => this.toSeparatedValue('\t')
  toArray = () => [this.#name, this.data]
}