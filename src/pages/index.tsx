import { useState } from "react";
import { Button } from "../components/Button";
import { SudokuBoard } from "../components/SudokuBoard";

const SukoduPage = () => {
  const [selectValue, setSelectValue] = useState(60);
  const [numberOfRemainingValues, setNumberOfRemainingValues] = useState(0);
  const handleNewGameClick = () => {
    setNumberOfRemainingValues(selectValue);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen antialiased gap-2">
      <div className="shadow-2xl rounded-lg bg-gray-300 border-gray-900 flex items-center justify-start border-2 w-96 p-4 gap-4">
        <label htmlFor="game-level" className="font-semibold">
          Level
        </label>
        <select
          value={selectValue}
          onChange={(e) => setSelectValue(parseInt(e.target.value))}
          id="game-level"
          className="flex-1 py-1  relative w-full bg-white border border-gray-300 rounded-md pl-2 pr-10 text-left focus:outline-none focus:ring-1 hover:ring-blue-600 focus:border-blue-600 sm:text-sm"
        >
          <option value="60">Easy</option>
          <option value="40">Medium</option>
          <option value="20">Hard</option>
        </select>
        <button
          className="px-2 py-1 border-0 outline-none ring disabled:ring-0 hover:ring-blue-600 font-bold disabled:hover:bg-gray-400 bg-gray-400 hover:bg-gray-600 hover:text-white duration-300  disabled:text-gray-600"
          onClick={handleNewGameClick}
        >
          New
        </button>
      </div>
      {numberOfRemainingValues !== 0 ? (
        <SudokuBoard levelCount={numberOfRemainingValues} />
      ) : null}
    </div>
  );
};
export default SukoduPage;
