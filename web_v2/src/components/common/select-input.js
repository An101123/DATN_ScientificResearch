import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label, Input } from "reactstrap";

const SelectInput = ({
  title,
  placeholder,
  name,
  value,
  options,
  onChange,
  inputClass,
  required,
  valueField,
  nameField
}) => {
  return (
    <FormGroup>
      <Label className="label-input" for={name}>
        {title}
      </Label>
      <Input
        onChange={onChange}
        className={`custom-form-coltrol ${inputClass}`}
        type="select"
        name={name}
        required={required}
        value={value}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o, i) => {
          return (
            <option key={i} value={o[valueField]}>
              {o[nameField]}
            </option>
          );
        })}
      </Input>
    </FormGroup>
  );
};

SelectInput.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string
};

SelectInput.defaultProps = {
  title: "",
  name: "",
  placeholder: ""
};

export default SelectInput;
