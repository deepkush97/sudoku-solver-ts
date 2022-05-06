import { useState } from "react";
import { SudokuBoard } from "../components/SudokuBoard";
import { Button } from "../components/Button";

const SukoduPage = () => {
  const [selectValue, setSelectValue] = useState(60);
  const [hintRequired, setHintRequired] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [numberOfRemainingValues, setNumberOfRemainingValues] = useState(0);
  const handleNewGameClick = () => {
    setNumberOfRemainingValues(selectValue);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen antialiased gap-2">
      <div className="shadow-2xl rounded-lg bg-gray-300 border-gray-900 flex items-center justify-start border-2 w-96 px-4 py-2 gap-4">
        <h1 className="text-xl font-semibold flex-1">Sudoku</h1>
        <span className="font-semibold">Score</span>
        <span className="font-medium text-slate-900">
          {highScore.toString().padStart(4, "0")}
        </span>
      </div>
      <div className="shadow-2xl rounded-lg bg-gray-300 border-gray-900 flex items-center justify-start border-2 w-96 p-4 gap-4">
        <label htmlFor="game-level" className="font-semibold">
          Level
        </label>
        <select
          value={selectValue}
          onChange={(e) => setSelectValue(parseInt(e.target.value))}
          id="game-level"
          className="flex-1 py-1  relative w-full ring bg-gray-400  rounded-md pl-2 pr-10 text-left  hover:ring-blue-600 outline-none sm:text-sm duration-300 font-semibold hover:bg-gray-600 hover:text-white"
        >
          <option value="60">Easy</option>
          <option value="40">Medium</option>
          <option value="20">Hard</option>
        </select>
        <div className="flex flex-col items-center">
          <input
            type="checkbox"
            name="hint"
            id="hint"
            checked={hintRequired}
            onChange={(e) => setHintRequired(e.target.checked)}
          />
          <label htmlFor="hint" className="font-semibold text-xs">
            Hint?
          </label>
        </div>
        <Button onClick={handleNewGameClick}>New</Button>
      </div>
      {numberOfRemainingValues !== 0 ? (
        <SudokuBoard
          levelCount={numberOfRemainingValues}
          hintRequired={hintRequired}
          updateScore={(score: number) => setHighScore((prev) => prev + score)}
        />
      ) : null}
    </div>
  );
};
export default SukoduPage;
