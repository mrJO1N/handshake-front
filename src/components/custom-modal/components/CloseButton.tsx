import React, { FC, HTMLAttributes } from "react";

import "./CloseButton.sass";
const CloseButton: FC<ICloseButtonProps & HTMLAttributes<null>> = (props) => {
  const { onClick, className = "", ...anotherProps } = props;

  return (
    <button
      {...anotherProps}
      className={`CloseButton ${className}`}
      onClick={onClick}
    >
      <div className="line turn-right" />
      <div className="line turn-left" />
    </button>
  );
};

interface ICloseButtonProps {
  onClick: () => void;
}

export default CloseButton;
