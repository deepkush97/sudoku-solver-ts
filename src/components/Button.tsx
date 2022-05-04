import React, {
  FC,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
}) => {
  return (
    <button
      className="px-3 py-2 my-2 border-0 outline-none ring hover:ring-blue-600 font-bold bg-gray-400 hover:bg-gray-600 hover:text-white duration-300 "
      onClick={onClick}
    >
      {children}
    </button>
  );
};
