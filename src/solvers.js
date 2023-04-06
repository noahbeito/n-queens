/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  if (n === 1) {
    return [[1]];
  }
  // inner function (row)
  var solver = function(currRow) {
    // Base Case
    // if row = n
    if (currRow === n) {
      // return
      return;
    }

    // for var i = 0; i < n; i++
    for (var col = 0; col < n; col++) {
      // toggle piece
      solution.togglePiece(currRow, col);
      // If there is not conflict at all
      if (!solution.hasAnyRooksConflicts()) {
        // call innerFunction on next row
        return solver(currRow + 1);
      }
      // untoggle piece
      solution.togglePiece(currRow, col);
    }
  };

  // innerfunction(0)
  solver(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solution = new Board({n: n});
  var solutionCount = 0;

  var solver = function(currRow) {
    if (currRow === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++) {
      solution.togglePiece(currRow, col);

      if (!solution.hasAnyRooksConflicts()) {
        solver(currRow + 1);
      }
      solution.togglePiece(currRow, col);
    }
  };

  solver(0);


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});
  var pieceCount = 0;
  var solver = function(currRow) {
    if (currRow === n) {
      return;
    }

    for (var col = 0; col < n; col++) {
      solution.togglePiece(currRow, col);
      pieceCount++;
      if (!solution.hasAnyQueensConflicts()) {
        solver(currRow + 1);
        if (pieceCount === n) {
          return;
        }
      }
      solution.togglePiece(currRow, col);
      pieceCount--;
    }
  };

  solver(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n: n});
  var solutionCount = 0;

  if (n === 2 || n === 3) {
    return solutionCount;
  }

  var solver = function(currRow) {
    if (currRow === n) {
      solutionCount++;
      return;
    }
    for (var col = 0; col < n; col++) {
      solution.togglePiece(currRow, col);
      if (!solution.hasAnyQueensConflicts()) {
        solver(currRow + 1);
      }
      solution.togglePiece(currRow, col);
    }
  };
  solver(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
