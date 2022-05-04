import { useState } from "react";
import { Button } from "../components/Button";
import { EditableCell } from "../components/EditableCell";
import { Sudoku } from "../lib/Sudoku";
const Index = () => {
  const [board, setBoard] = useState<number[]>([]);
  const [initialBoard, setInitialBoard] = useState<number[]>([]);

  const handleSolve = () => {
    const sudoku = new Sudoku();
    const solved = sudoku.solve([...board]);
    setBoard([...solved]);
  };

  const handleReset = () => {
    const sudoku = new Sudoku();
    const newBoard = sudoku.generate(20);
    setBoard([...newBoard]);
    setInitialBoard([...newBoard]);
  };

  const handleCellValue = (rowIndex: number, value: number | "") => {
    const newBoard = [...board];
    newBoard[rowIndex] = value === "" ? 0 : value;
    setBoard([...newBoard]);
  };

  return (
    <div className="flex items-center justify-center h-screen w-screen antialiased">
      <div className="shadow-2xl rounded-lg bg-gray-300 border-gray-900 flex flex-col justify-center border-2 w-96 p-4 space-y-4">
        {board.length > 0 && (
          <div className="grid grid-cols-9 border-2 text-xl border-slate-900 ">
            {board.map((cell, rowIndex) => (
              <EditableCell
                key={rowIndex}
                isReadOnly={initialBoard[rowIndex] !== 0}
                rowIndex={rowIndex}
                value={cell !== 0 ? cell : ""}
                onValueChange={(value) => handleCellValue(rowIndex, value)}
              />
            ))}
          </div>
        )}
        <div className="flex gap-4 justify-center">
          {board.length > 0 && <Button onClick={handleSolve}>Solve</Button>}
          <Button onClick={handleReset}>Reset</Button>
        </div>
      </div>
    </div>
  );
};
export default Index;
