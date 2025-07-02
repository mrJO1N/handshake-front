import React, { FC, ButtonHTMLAttributes } from "react";

import "./Button.sass";

export const Button: FC<IButtonProps & ButtonHTMLAttributes<null>> = (
  props
) => {
  const {
    visibilityType = "default",
    children,
    className = "",
    ...anotherProps
  } = props;

  return (
    <button
      {...anotherProps}
      className={`Button ${visibilityType} ${className}`}
      style={props.style}
    >
      {children}
    </button>
  );
};

interface IButtonProps {
  onClick: () => any;
  visibilityType?: "default" | "colored" | "clear";
}
