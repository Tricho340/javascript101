define(["jquery", "matrixoperation"], function($, MatrixOperations) {
  function MatrixUI() {

  }

  function getMatrixInputHtml() { // this one will stay private
    return '<input type="number">';
  }

  MatrixUI.prototype.drawMatrix = function(m) {
    var matrixHtml = [];
    for (var i = 0, numRows = m.getN(); i < numRows; i++) {
      for (var j = 0, numColumns = m.getM(); j < numColumns; j++) {
        matrixHtml.push(getMatrixInputHtml);
      }
      matrixHtml.push('\n');
    }
    return matrixHtml.join('');
  };

  return MatrixUI;
});
