import React, { ChangeEventHandler, FC, MouseEventHandler } from "react";
import { Button } from "./Button";

interface GameOptionFormProps {
  gameLevel: number;
  onLevelChange: ChangeEventHandler<HTMLSelectElement>;
  isHintRequired: boolean;
  onIsHintRequiredChanged: ChangeEventHandler<HTMLInputElement>;
  handleNewGameClick: MouseEventHandler<HTMLButtonElement>;
}

export const GameOptionForm: FC<GameOptionFormProps> = ({
  isHintRequired,
  onIsHintRequiredChanged,
  onLevelChange,
  gameLevel,
  handleNewGameClick,
}) => {
  return (
    <div className="space-y-2 md:space-y-0 md:flex md:justify-between">
      <div className="flex items-center justify-start gap-4 md:gap-2">
        <label htmlFor="game-level" className="font-semibold">
          Level
        </label>
        <select
          value={gameLevel}
          onChange={onLevelChange}
          id="game-level"
          className="flex-1 py-1  relative w-full ring bg-gray-400  rounded-md pl-2 pr-10 text-left  hover:ring-blue-600 outline-none sm:text-sm duration-300 font-semibold hover:bg-gray-600 hover:text-white"
        >
          <option value="60">Easy</option>
          <option value="40">Medium</option>
          <option value="20">Hard</option>
        </select>
      </div>
      <div className="flex items-center gap-4 md:gap-2">
        <label htmlFor="hint" className="font-semibold">
          Hint?
        </label>
        <input
          type="checkbox"
          name="hint"
          id="hint"
          checked={isHintRequired}
          onChange={onIsHintRequiredChanged}
        />
      </div>
      <Button onClick={handleNewGameClick} className="w-full md:w-auto">
        New
      </Button>
    </div>
  );
};
