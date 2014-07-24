define(function() {
  function Matrix(numRows, numColumns) {
    this.numRows = numRows;
    this.numColumns = numColumns;
    this.rows = []; // array of arrays.......
  }

  Matrix.prototype.getN = function() {
    return this.numRows;
  };

  Matrix.prototype.getM = function() {
    return this.numColumns;
  };

  Matrix.prototype.getRow = function(index) {
    return rows[i];
  };

  Matrix.prototype.getCol = function(index) {
    var columnItems = [];
    this.rows.forEach(function(currentRowData) {
      columnItems.push(currentRowData[index]);
    });

    return columnItems;
  };

  Matrix.prototype.setRow = function(index, row) {
    this.rows[index] = row;
  };

  Matrix.prototype.setCol = function(index, col) {
    this.rows.forEach(function(currentRowData, rowIndex) {
      currentRow[index] = col[rowIndex];
    });
  };

  Matrix.prototype.getAt = function(i, j) {
    return this.rows[i][j];
  };

  Matrix.prototype.setAt = function(i, j, value) {
    this.rows[i][j] = value;
  };

  Matrix.prototype.getData = function() {
    return this.rows;
  };

  Matrix.prototype.toString = function() {
    this.rows.forEach(function(currentRowData) {
      console.log(currentRowData.join(" ") + '\n');
    });
  };

  return Matrix;
});
