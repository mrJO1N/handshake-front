import React, { FC, InputHTMLAttributes } from "react";

import "./Input.sass";

export const Input: FC<IInputProps & InputHTMLAttributes<null>> = (props) => {
  const {
    visibilityType = "default",
    className = "",
    onChange,
    value,
    onSearch,
    ...anotherProps
  } = props;

  return (
    <div className={`Input ${className}`}>
      <input
        {...anotherProps}
        onChange={onChange}
        value={value}
        className={`${visibilityType}`}
        style={props.style}
      />
      {visibilityType !== "search" ? (
        ""
      ) : (
        <button className="search-icon" onClick={onSearch}>
          <div className="arrow" />
        </button>
      )}
    </div>
  );
};

interface IInputProps {
  onChange(event: React.ChangeEvent<HTMLInputElement>): any;
  value: string;
  visibilityType?: "default" | "search";
  onSearch?: () => any;
}
