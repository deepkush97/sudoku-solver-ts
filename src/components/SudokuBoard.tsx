import { FC, useEffect, useState } from "react";
import { Button } from "./Button";
import { EditableCell } from "./EditableCell";
import { Sudoku } from "../lib/Sudoku";
import { SUDOKU_STATE } from "../lib/SudokuState";

export const SudokuBoard: FC<{
  levelCount: number;
  hintRequired: boolean;
  updateScore: (score: number) => void;
}> = ({ levelCount, hintRequired, updateScore }) => {
  const [board, setBoard] = useState<number[]>([]);
  const [initialBoard, setInitialBoard] = useState<number[]>([]);
  const [solvedBoard, setSolvedBoard] = useState<number[]>([]);
  const [message, setMessage] = useState<string>("");
  const [endOfGame, setEndOfGame] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      handleReset();
    }
  }, [levelCount, hintRequired]);

  useEffect(() => {
    if (
      board &&
      solvedBoard &&
      board.length === 81 &&
      solvedBoard.length === 81
    ) {
      handleBoardChange();
    }
  }, [board, solvedBoard]);

  const handleBoardChange = () => {
    let isSolved: SUDOKU_STATE = SUDOKU_STATE.CORRECT;
    let allFilled = true;
    for (let index = 0; index < solvedBoard.length; index++) {
      const currentCell = board[index];
      const solvedCell = solvedBoard[index];
      if (currentCell !== 0) {
      } else {
        allFilled = false;
      }
      if (currentCell !== 0 && currentCell !== solvedCell) {
        isSolved = SUDOKU_STATE.INCORRECT;
        break;
      }
    }

    if (allFilled && isSolved === SUDOKU_STATE.CORRECT) {
      isSolved = SUDOKU_STATE.SOLVED;
    }

    switch (isSolved) {
      case SUDOKU_STATE.CORRECT:
        setMessage("Keep going, you are in right path.");
        break;

      case SUDOKU_STATE.SOLVED:
        setMessage("Congratulations, you're awesome, you solved the sudoku.");
        updateScore(
          levelCount === 60
            ? 50
            : levelCount === 40
            ? 100
            : levelCount === 20
            ? 200
            : 0
        );
        setEndOfGame(true);
        break;

      case SUDOKU_STATE.INCORRECT:
        setMessage("You're going in wrong path.");
      default:
        break;
    }
  };

  const handleSolve = () => {
    setBoard([...solvedBoard]);
    setEndOfGame(true);
  };

  const handleReset = () => {
    const sudoku = new Sudoku();
    const { initial, solved } = sudoku.generate(levelCount);
    setSolvedBoard([...solved]);
    setBoard([...initial]);
    setInitialBoard([...initial]);
    setMessage("");
    setEndOfGame(false);
  };

  const handleCellValue = (rowIndex: number, value: number | "") => {
    const newBoard = [...board];
    newBoard[rowIndex] = value === "" ? 0 : value;
    setBoard([...newBoard]);
  };

  return (
    <div className="flex flex-col justify-center md:w-96 gap-4">
      {board.length > 0 && (
        <div className="grid grid-cols-9 border-2 md:text-lg border-slate-900 ">
          {board.map((cell, rowIndex) => (
            <EditableCell
              key={rowIndex}
              isWrong={cell !== 0 && cell !== solvedBoard[rowIndex]}
              isReadOnly={initialBoard[rowIndex] !== 0}
              rowIndex={rowIndex}
              value={cell !== 0 ? cell : ""}
              onValueChange={(value) => handleCellValue(rowIndex, value)}
            />
          ))}
        </div>
      )}
      <div className="flex gap-4 justify-center pt-2">
        {board.length > 0 && (
          <Button onClick={handleSolve} disabled={endOfGame}>
            Solve
          </Button>
        )}
        <Button onClick={handleReset}>Next</Button>
      </div>

      {(hintRequired || endOfGame) && (
        <div className="flex justify-center">
          <span className="font-semibold text-xs text-center">{message}</span>
        </div>
      )}
    </div>
  );
};
