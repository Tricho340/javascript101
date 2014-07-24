define(['matrix'], function(Matrix) {
  function MatrixOperations() {

  }

  MatrixOperations.prototype.createFromArray = function(data) {
    var numRows = data.length || 0;
    var numColumns = numRows > 0 ? data[0].length : 0;
    var matrix = new Matrix(numRows, numColumns);
    data.forEach(function(currentRowData, rowIndex) {
      matrix.setRow(rowIndex, currentRowData);
    });
    return matrix;
  };

  MatrixOperations.prototype.transpose = function(m) {
    var newMatrix = new Matrix(m.getM(), m.getN());
    var matrixData = newMatrix.getData();
    matrixData.forEach(function(currentRowData, rowIndex) {
      newMatrix.setCol(rowIndex, currentRowData);
    });

    return matrixData;
  };

  MatrixOperations.prototype.add = function(m1, m2) {
    var resultMatrix = new Matrix(m1.getN(), m1.getM()),
        currentItemSum = 0; // we assume that m1 and m2 have equal number of rows / columns

    for (var numRows = m1.getN(), i = 0; i < numRows; i++) {
      for (var numColumns = m1.getM(), j = 0; j < numColumns; j++) {
        currentItemSum = m1.getAt(i, j) + m2.getAt(i, j);
        resultMatrix.setAt(i, j, currentItemSum);
      }
    }

    return resultMatrix;
  };

  MatrixOperations.prototype.scalarMult = function(scalar, m1) {
    var resultMatrix = new Matrix(m1.getN(), m1.getM());
    for (var numRows = m1.getN(), i = 0; i < numRows; i++) {
      for (var numColumns = m1.getM(), j = 0; j < numColumns; j++) {
        resultMatrix.setAt(i, j, m1.getAt(i, j) * scalar);
      }
    }

    return resultMatrix;
  };

  MatrixOperations.prototype.multiply = function(m1, m2) {
    var result = [];
    for (var j = 0; j < m2.getN(); j++) {
        result[j] = [];
        for (var k = 0; k < m1.getM(); k++) {
            var sum = 0;
            for(var i = 0; i < m1.getN(); i++) {
                sum += m1.getAt(i, k) * m2.getAt(j, i);
            }
            result[j].push(sum);
        }
    }
    return result;
  };

  return MatrixOperations;
});
