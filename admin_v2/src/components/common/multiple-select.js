import React from "react";
import PropTypes from "prop-types";
import { FormGroup, Label } from "reactstrap";
import Select from "react-select";

const MultipleSelect = ({
  title,
  placeholder,
  name,
  value,
  options,
  onChange,
  inputClass,
  isSearchable,
  labelField,
  valueField,
  defaultValue
}) => {
  return (
    <FormGroup>
      <Label className="label-input" for={name}>
        <strong>{title}</strong>
      </Label>
      <Select
        onChange={onChange}
        isSearchable={isSearchable}
        options={options}
        className={`${inputClass}`}
        getOptionLabel={option => option[labelField]}
        getOptionValue={option => option[valueField]}
        name={name}
        placeholder={placeholder}
        isMulti={true}
        value={value}
        defaultValue={defaultValue}
      />
    </FormGroup>
  );
};

MultipleSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.array.isRequired,
  name: PropTypes.string,
  placeholder: PropTypes.string
};

MultipleSelect.defaultProps = {
  title: "",
  name: "",
  placeholder: ""
};

export default MultipleSelect;
