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
  className?: string;
}

export const Button: FunctionComponent<ButtonProps> = ({
  children,
  onClick,
  disabled,
  className,
}) => {
  return (
    <button
      className={`px-2 py-1 border-0 rounded-md outline-none ring disabled:ring-0 hover:ring-blue-600 font-bold disabled:hover:bg-gray-400 bg-gray-400 hover:bg-gray-600 hover:text-white duration-300 disabled:text-gray-600 ${className} `}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
