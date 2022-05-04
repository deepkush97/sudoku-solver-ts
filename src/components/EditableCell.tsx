import React, { ChangeEventHandler, FC } from "react";

interface EditableCellProps {
  isReadOnly: boolean;
  rowIndex: number;
  value: number | "";
  onValueChange: (value: number | "") => void;
}

export const EditableCell: FC<EditableCellProps> = ({
  rowIndex,
  isReadOnly,
  value,
  onValueChange,
}) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.currentTarget.value != "") {
      let currentValue = parseInt(e.currentTarget.value);
      if (currentValue > 0 && currentValue < 10) {
        onValueChange(currentValue);
      }
    } else {
      onValueChange("");
    }
  };
  return (
    <input
      type="number"
      onChange={handleInputChange}
      value={value}
      onKeyDown={(evt) => evt.key === "e" && evt.preventDefault()}
      disabled={isReadOnly}
      className={` text-center border ${
        isReadOnly ? " font-semibold bg-gray-400  select-none" : "bg-gray-100"
      }  border-slate-900 p-1 outline-none ${generateBorderForCell(rowIndex)}`}
    ></input>
  );
};

const generateBorderForCell = (rowIndex: number) => {
  let border = " ";
  const row = Math.floor(rowIndex / 9);
  const col = rowIndex % 9;
  if (col % 3 === 2) {
    border += "border-r-2 ";
  }
  if (col % 3 === 0) {
    border += "border-l-2 ";
  }
  if (row % 3 === 2) {
    border += "border-b-2 ";
  }
  if (row % 3 === 0) {
    border += "border-t-2 ";
  }
  return border;
};
