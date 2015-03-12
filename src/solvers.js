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

  var matrix = new Board({'n':n});
  var n = matrix.get('n');
  var test = false;
  var recurse = function(row, obj){
    for (var i = 0; i<n; i++){
      obj.togglePiece(row, i);
      test = obj.hasRowConflictAt(row)|| obj.hasColConflictAt(i);
       if (!test){
        if ((row + 1) < n){
         // console.log(matrix);

          recurse(row+1, obj);
          if(test){
           obj.togglePiece(row, i); 
           }
           if(!test){break;}
        } 
       }
      else{
        obj.togglePiece(row, i);
      }
    }
  };
  recurse(0 , matrix);
 // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(matrix._currentAttributes));
  var result = matrix.rows();

  return result;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board({'n':n});
  var n = matrix.get('n');
  var test = false;
  var  halfLife = 1;
  if (n>1){
    halfLife = n-1;
  }

  var recurse = function(row, obj){
    for (var i = 0; i<n; i++){
      if ( row===0 && i >= halfLife){
        break
      }      
      obj.togglePiece(row, i);
      test = obj.hasRowConflictAt(row)|| obj.hasColConflictAt(i);
       if (!test){
        if ((row + 1) < n){
          recurse(row+1, obj);
          }
        } 
          if(!test){
            solutionCount = solutionCount + 1;
       }
        obj.togglePiece(row, i);
    }
  }
  recurse(0 , matrix);
  //console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var matrix = new Board ({'n':n});
  var n = matrix.get('n');
  var test = false;

  var recurse = function(row){
    for (var i = 0; i<n; i++){
      matrix.togglePiece(row, i)
      test = matrix.hasAnyQueenConflictsOn(row, i);
      if(!test){
        if(row+1 < n){
          recurse(row+1);
        }
      }
      if (!test){
        break
      }
      matrix.togglePiece(row, i)
    }
  }
  recurse(0)  
  solution = matrix.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board({'n':n});
  var n = matrix.get('n');
  var test = false;
  var  halfLife = 1;
  if (n>1){
    halfLife = n-1;
  }

  var recurse = function(row, obj){
    for (var i = 0; i<n; i++){
      if ( row===0 && i >= halfLife){
        break
      }      
      obj.togglePiece(row, i);
      test = obj.hasAnyQueenConflictsOn(row, i)|| obj.hasRowConflictAt(row)||obj.hasColConflictAt(i);
       if (!test){
        if ((row + 1) < n){
          recurse(row+1, obj);
          }
        } 
          if(!test){
            solutionCount = solutionCount + 1;
       }
        obj.togglePiece(row, i);
    }
  }
  recurse(0 , matrix);
  if (n === 0){
    solutionCount++
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
