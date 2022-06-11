import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./Dropdown.module.css";

/**
 * A simple dropdown component supporting single and multiple selections.
 */
function Dropdown(props) {
  const { placeholder, value, options, onChange, multiple } = props;
  const [expanded, setExpanded] = useState(false);

  const selectedValues = useMemo(() => {
    return new Set(value);
  }, [value]);

  const isAllSelected = value?.length === options.length;
  const isNoneSelected = value === undefined || value.length === 0;
  const selectedLabel = multiple ? value.join(", ") : value;
  const dropdownLabel = isNoneSelected ? placeholder : selectedLabel;

  const optionsClassName = classNames(styles.dropdownOptions, {
    [styles.expanded]: expanded,
  });
  const selectAllClassName = classNames(styles.dropdownOption, {
    [styles.selected]: isAllSelected,
  });
  const selectNoneClassName = classNames(styles.dropdownOption, {
    [styles.selected]: isNoneSelected,
  });

  const dropdownClickHandler = () => setExpanded(!expanded);

  const optionAllHandler = () => {
    onChange(isAllSelected ? [] : options.map(option => option?.value ?? option));
  };

  const optionNoneHandler = () => {
    setExpanded(false);
    onChange(undefined);
  };

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
    <div className={styles.dropdown}>
      <button className={styles.dropdownButton} onClick={dropdownClickHandler}>
        {dropdownLabel} {expanded ? "▴" : "▾"}
      </button>
      {expanded && (
        <div className={optionsClassName}>
          {multiple ? (
            <button className={selectAllClassName} onClick={optionAllHandler}>
              Select All
            </button>
          ) : (
            <button className={selectNoneClassName} onClick={optionNoneHandler}>
              None
            </button>
          )}
          {options.map((option) => {
            let { value, label } = option;

            if (typeof option === "string") {
              value = option;
              label = option;
            }

            const selected = selectedValues.has(value);

            let optionClassName = classNames(styles.dropdownOption, {
              [styles.selected]: selected,
            });

            return (
              <button
                className={optionClassName}
                key={value}
                onClick={() => optionClickHandler(value)}
              >
                {label}
              </button>
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
