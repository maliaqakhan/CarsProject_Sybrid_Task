import { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, value, ...inputProps } = props;

  const handleBlur = () => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label htmlFor={id}>{label}</label>

      <div className="group">
        <input
          className="input"
          id={id}
          {...inputProps}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={() => setFocused(true)}
          aria-invalid={focused && errorMessage ? "true" : "false"}
          value={value}
          placeholder={props.placeholder}
        />
      </div>

      {errorMessage && <span className="error">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;
