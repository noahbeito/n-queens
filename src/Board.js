// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // I : Chessboard idx
      // O : boolean

      // new var to hold pieceCount
      var pieceCount = 0;
      // for each item in the given row
      for (var i = 0; i < this.attributes.n; i++) {
        // if this item is 1
        if (this.attributes[rowIndex][i] === 1) {
          // if piece count is at 1
          if (pieceCount === 1) {
            // return true
            return true;
            // else
          } else {
            // piece count ++
            pieceCount++;
          }
        }
      }
      // If piece count never goes over 1 return false
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // I : Chessboard
      // O : boolean
      // for Each item in chessboard
      for (var i = 0; i < this.attributes.n; i++) {
        // invoke hasRowConflictAt current index
        // if true, return true
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      // If nothing returned by end of loop
      // Return false
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    // I: index (col)
    // O: true or false

    hasColConflictAt: function(colIndex) {
      // create piece count
      var pieceCount = 0;
      // iterate over array matrix
      for (var i = 0; i < this.attributes.n; i++) {
        // if current array at column index is a rook, increment rook count
        if (this.attributes[i][colIndex] === 1) {
          pieceCount++;
        }
        // if rook count is greater than 1
        if (pieceCount > 1) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // I: matrix
      // O: true / false
      // E: matrix length 1, length 2

      // if length of matrix is 1 or 2
      // return true;



      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      // if we iterate the board without any conflicts, return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // Starting at row 0 increment over all the rows
      // For i = 0; i < this.changed.n; i++
      for (i = 0; i < this.attributes.n; i++) {
        // if this.attributes[i][startingColumn] = 1
        if (this.attributes[i][majorDiagonalColumnIndexAtFirstRow] === 1) {
          // Look at the currentRow[index]
          if (this.majorDiagonalIterator(i, majorDiagonalColumnIndexAtFirstRow)) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // for every column
      for (var i = 0; i < this.attributes.n; i++) {
        // pass into hasMajorConflictAt
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    majorDiagonalIterator: function(startingRow, startingColumn) {
      // Forloop i = startingRow + 1; iterate until n; i++
      for (var i = startingRow + 1; i < this.attributes.n; i++) {
        // startingColumn ++
        if (startingColumn < this.attributes.n) {
          startingColumn++;
          // if this.attributes[i][startingColumn] = 1
          if (this.attributes[i][startingColumn] === 1) {
            return true;
          }
        }
      }
      // return false
      return false;
    },




    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
    // Starting at row 0 increment over all the rows
      // For i = 0; i < this.changed.n; i++
      for (i = 0; i < this.attributes.n; i++) {
        // if this.attributes[i][startingColumn] = 1
        if (this.attributes[i][minorDiagonalColumnIndexAtFirstRow] === 1) {
          // Look at the currentRow[index]
          if (this.minorDiagonalIterator(i, minorDiagonalColumnIndexAtFirstRow)) {
            return true;
          }
        }
      }
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // for every column
      for (var i = 0; i < this.attributes.n; i++) {
        // pass into hasMinorConflictAt
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false;
    },

    minorDiagonalIterator: function(startingRow, startingColumn) {
      // Forloop i = startingRow + 1; iterate until n; i++
      for (var i = startingRow + 1; i < this.attributes.n; i++) {
        // startingColumn --
        if (startingColumn > -1) {
          startingColumn--;
          // if this.attributes[i][startingColumn] = 1
          if (this.attributes[i][startingColumn] === 1) {
            return true;
          }
        }
      }
      // return false
      return false;
    },


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
