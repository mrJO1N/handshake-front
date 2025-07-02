import React, { FC, HTMLAttributes } from "react";

import "./Title.sass";

export const Title: FC<ITitleProps & HTMLAttributes<null>> = (props) => {
  const { children, className = "", ...anotherProps } = props;

  return (
    <div {...anotherProps} className={`Title ${className}`}>
      {children}
    </div>
  );
};

interface ITitleProps {
  children: React.ReactNode;
}
