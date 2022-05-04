export {};
export class Sudoku {
  constructor() {}

  returnRow = (cell: number) => Math.floor(cell / 9);
  returnCol = (cell: number) => cell % 9;
  returnBlock = (cell: number) =>
    Math.floor(this.returnRow(cell) / 3) * 3 +
    Math.floor(this.returnCol(cell) / 3);

  isPossibleRow = (num: number, row: number, sudoku: number[]) => {
    for (let i = 0; i <= 8; i++) {
      if (sudoku[row * 9 + i] === num) {
        return false;
      }
    }
    return true;
  };

  isPossibleCol = (num: number, col: number, sudoku: number[]) => {
    for (let i = 0; i <= 8; i++) {
      if (sudoku[col + 9 * i] == num) {
        return false;
      }
    }
    return true;
  };

  isPossibleBlock = (num: number, block: number, sudoku: number[]) => {
    for (let i = 0; i <= 8; i++) {
      if (
        sudoku[
          Math.floor(block / 3) * 27 +
            (i % 3) +
            9 * Math.floor(i / 3) +
            3 * (block % 3)
        ] == num
      ) {
        return false;
      }
    }
    return true;
  };

  isPossibleNumber = (cell: number, num: number, sudoku: number[]) => {
    let row = this.returnRow(cell);
    let col = this.returnCol(cell);
    let block = this.returnBlock(cell);
    return (
      this.isPossibleRow(num, row, sudoku) &&
      this.isPossibleCol(num, col, sudoku) &&
      this.isPossibleBlock(num, block, sudoku)
    );
  };

  isCorrectRow = (row: number, sudoku: number[]) => {
    let rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    let rowTemp = new Array();
    for (let i = 0; i <= 8; i++) {
      rowTemp[i] = sudoku[row * 9 + i];
    }
    rowTemp.sort();
    return rowTemp.join() == rightSequence.join();
  };

  isCorrectCol = (col: number, sudoku: number[]) => {
    let rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    let colTemp = new Array();
    for (let i = 0; i <= 8; i++) {
      colTemp[i] = sudoku[col + i * 9];
    }
    colTemp.sort();
    return colTemp.join() == rightSequence.join();
  };

  isCorrectBlock = (block: number, sudoku: number[]) => {
    let rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
    let blockTemp = new Array();
    for (let i = 0; i <= 8; i++) {
      blockTemp[i] =
        sudoku[
          Math.floor(block / 3) * 27 +
            (i % 3) +
            9 * Math.floor(i / 3) +
            3 * (block % 3)
        ];
    }
    blockTemp.sort();
    return blockTemp.join() == rightSequence.join();
  };

  isSolvedSudoku = (sudoku: number[]) => {
    for (let i = 0; i <= 8; i++) {
      if (
        !this.isCorrectBlock(i, sudoku) ||
        !this.isCorrectRow(i, sudoku) ||
        !this.isCorrectCol(i, sudoku)
      ) {
        return false;
      }
    }
    return true;
  };

  determinePossibleValues = (cell: number, sudoku: number[]) => {
    let possible = new Array();
    for (let i = 1; i <= 9; i++) {
      if (this.isPossibleNumber(cell, i, sudoku)) {
        possible.unshift(i);
      }
    }
    return possible;
  };

  determineRandomPossibleValue = (possible, cell) => {
    let randomPicked = Math.floor(Math.random() * possible[cell].length);
    return possible[cell][randomPicked];
  };

  scanSudokuForUnique = (sudoku: number[]) => {
    let possible = new Array();
    for (let i = 0; i <= 80; i++) {
      if (sudoku[i] == 0) {
        possible[i] = new Array();
        possible[i] = this.determinePossibleValues(i, sudoku);
        if (possible[i].length == 0) {
          return false;
        }
      }
    }
    return possible;
  };

  removeAttempt = (attemptArray: [], num: number) => {
    let newArray = new Array();
    for (let i = 0; i < attemptArray.length; i++) {
      if (attemptArray[i] != num) {
        newArray.unshift(attemptArray[i]);
      }
    }
    return newArray;
  };

  nextRandom = (possible: number) => {
    let max = 9;
    let minChoices = 0;
    for (let i = 0; i <= 80; i++) {
      if (possible[i] != undefined) {
        if (possible[i].length <= max && possible[i].length > 0) {
          max = possible[i].length;
          minChoices = i;
        }
      }
    }
    return minChoices;
  };

  showSudoku = (sudoku: number[]) => {
    let sudokuText = "";
    for (let i = 0; i <= 8; i++) {
      for (let j = 0; j <= 8; j++) {
        sudokuText += " ";
        sudokuText += sudoku[i * 9 + j];
        sudokuText += " ";
        if (j != 8) {
          sudokuText += "|";
        }
      }
      if (i != 8) {
        sudokuText += "\n---+---+---+---+---+---+---+---+---\n";
      }
    }
    console.log(sudokuText);
  };

  randomPosition = () => Math.floor(Math.random() * 81);

  generate = (noOfTilesToShow = 20): number[] => {
    let plain = new Array(81).fill(0);
    let rando = this.solve(plain);
    const noOfRequiredBlanks = 81 - noOfTilesToShow;
    let noOfBlanks = 0;
    while (noOfBlanks != noOfRequiredBlanks) {
      const randomPlace = this.randomPosition();
      if (rando[randomPlace] == 0) {
        continue;
      }
      rando[randomPlace] = 0;
      noOfBlanks++;
    }
    return [...rando];
  };

  solve = (sudoku) => {
    let saved = new Array();
    let savedSudoku = new Array();
    let i = 0;
    let nextMove;
    let whatToTry;
    let attempt;
    while (!this.isSolvedSudoku(sudoku)) {
      i++;
      nextMove = this.scanSudokuForUnique(sudoku);
      if (nextMove == false) {
        nextMove = saved.pop();
        sudoku = savedSudoku.pop();
      }
      whatToTry = this.nextRandom(nextMove);
      attempt = this.determineRandomPossibleValue(nextMove, whatToTry);
      if (nextMove[whatToTry].length > 1) {
        nextMove[whatToTry] = this.removeAttempt(nextMove[whatToTry], attempt);
        saved.push(nextMove.slice());
        savedSudoku.push(sudoku.slice());
      }
      sudoku[whatToTry] = attempt;
    }
    return sudoku;
  };
}
