import { useState } from "react";
import { SudokuBoard } from "../components/SudokuBoard";
import { TitleBar } from "../components/TitleBar";
import { GameOptionForm } from "../components/GameOptionForm";
import { backgroundDisco } from "../configs/backgroudDisco";

const SukoduPage = () => {
  const [selectValue, setSelectValue] = useState(60);
  const [hintRequired, setHintRequired] = useState(true);
  const [highScore, setHighScore] = useState(0);
  const [numberOfRemainingValues, setNumberOfRemainingValues] = useState(0);
  const handleNewGameClick = () => {
    setNumberOfRemainingValues(selectValue);
  };

  return (
    <div className="flex flex-col md:items-center justify-center h-screen w-screen antialiased gap-2 relative overflow-hidden ">
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-6 gap-2 transform -skew-y-12 scale-150 -z-10 ">
        {backgroundDisco.map((row, rIndex) =>
          row.map((cell, cIndex) => (
            <div
              key={`${rIndex} ${cIndex}`}
              className={`${cell.colSpan} animate-pulse bg-slate-100  rounded`}
              style={{
                animationDelay: cell.delay,
                animationDuration: cell.duration,
              }}
            ></div>
          ))
        )}
      </div>
      <div className="shadow-2xl rounded-lg bg-gray-300 border-gray-900 border-2 p-4 flex-col flex gap-4 md:min-w-[420px] mx-2">
        <TitleBar highScore={highScore} />
        <GameOptionForm
          onLevelChange={(e) => setSelectValue(parseInt(e.target.value))}
          gameLevel={selectValue}
          onIsHintRequiredChanged={(e) => setHintRequired(e.target.checked)}
          isHintRequired={hintRequired}
          handleNewGameClick={handleNewGameClick}
        />
        {numberOfRemainingValues !== 0 ? (
          <SudokuBoard
            levelCount={numberOfRemainingValues}
            hintRequired={hintRequired}
            updateScore={(score: number) =>
              setHighScore((prev) => prev + score)
            }
          />
        ) : null}
      </div>
    </div>
  );
};
export default SukoduPage;
