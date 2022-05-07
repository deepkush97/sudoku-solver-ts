import React, { FC } from "react";

export const TitleBar: FC<{ highScore: number }> = ({ highScore }) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-xl font-semibold">Sudoku</h1>
      <div className="flex gap-2">
        <span className="font-semibold">Score</span>
        <span className="font-medium text-slate-900">
          {highScore.toString().padStart(4, "0")}
        </span>
      </div>{" "}
    </div>
  );
};
