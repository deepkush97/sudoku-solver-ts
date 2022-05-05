import React, {
  FC,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
} from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  disabled,
}) => {
  return (
    <button
      className="px-3 py-2 my-2 border-0 outline-none ring disabled:ring-0 hover:ring-blue-600 font-bold disabled:hover:bg-gray-400 bg-gray-400 hover:bg-gray-600 hover:text-white duration-300  disabled:text-gray-600"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
