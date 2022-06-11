import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";

import "./Dropdown.css";

function Dropdown(props) {
  const [expanded, setExpanded] = useState(false);
  const { placeholder, value, options, onChange, multiple } = props;

  const selectedValues = useMemo(() => {
    return new Set(value);
  }, [value]);

  const selectionEmpty = !value || value.length === 0;
  const selectedLabel = multiple ? value.join(", ") : value;
  const dropdownLabel = selectionEmpty ? placeholder : selectedLabel;

  let optionsClassName = "dropdown-options";
  if (expanded) optionsClassName += " expanded";

  const dropdownClickHandler = () => setExpanded(!expanded);

  const optionAllHandler = () => {
    onChange(selectedValues.size === options.length ? [] : options);
  }
  
  const optionNoneHandler = () => {
    setExpanded(false);
    onChange();
  }

  const optionClickHandler = (value) => {
    if (!multiple) {
      setExpanded(false);
      return onChange(value);
    }

    const newValues = new Set(selectedValues);
    if (selectedValues.has(value)) {
      newValues.delete(value);
    } else {
      newValues.add(value);
    }
    return onChange([...newValues]);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={dropdownClickHandler}>
        {dropdownLabel} {expanded ? "▴" : "▾"}
      </button>
      {expanded && (
        <div className={optionsClassName}>
          {multiple ? (
            <div className="dropdown-option" onClick={optionAllHandler}>
              Select All
            </div>
          ) : (
            <div className="dropdown-option" onClick={optionNoneHandler}>
              None
            </div>
          )}
          {options.map((option) => {
            let { value, label } = option;

            if (typeof option === "string") {
                value = option;
                label = option;
            }

            const selected = selectedValues.has(value);

            let optionClassName = "dropdown-option";
            if (selected) optionClassName += " selected";

            return (
              <div
                className={optionClassName}
                key={value}
                onClick={() => optionClickHandler(value)}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.any,
  options: PropTypes.array,
  onChange: PropTypes.func,
  multiple: PropTypes.bool,
};

export default Dropdown;
