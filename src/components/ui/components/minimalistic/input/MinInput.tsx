import React, { FC, InputHTMLAttributes } from "react";

import "./MinInput.sass";

export const MinInput: FC<IMinInputProps & InputHTMLAttributes<null>> = (
  props
) => {
  const {
    visibilityType = "row",
    className = "",
    onChange,
    value,
    onSearch,
    ...anotherProps
  } = props;

  return (
    <div className="MinInput">
      {visibilityType === "row" ? (
        <input
          {...anotherProps}
          onChange={onChange}
          value={value}
          className={`${className} ${visibilityType}`}
        />
      ) : (
        <textarea
          {...anotherProps}
          onChange={onChange}
          value={value}
          className={`${className} ${visibilityType}`}
        ></textarea>
      )}
    </div>
  );
};

interface IMinInputProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): any;
  value: string;
  visibilityType?: "row" | "many-rows";
  onSearch?: () => any;
}
