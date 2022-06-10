import React, { useMemo, useState } from "react";
import PropTypes from 'prop-types';
import DropdownOption from "./DropdownOption";

import "./Dropdown.css"

function Dropdown (props) {
    const [expanded, setExpanded] = useState(false);
    const { placeholder, value, options, onChange, multiple } = props;

    const selectedValues = useMemo(() => {
        return new Set(value);
    }, [value])

    const selectionEmpty = !value || value.length === 0;
    const selectedLabel = multiple ? value.join(", ") : value;
    const dropdownLabel = selectionEmpty ? placeholder : selectedLabel;

    let optionsClassName = "dropdown-options";
    if (expanded) optionsClassName += " expanded";

    const optionClickHandler = (value) => {
        if (!multiple) {
            return onChange(value);
        }

        const newValues = new Set(selectedValues);
        if (selectedValues.has(value)) {
            newValues.delete(value);
        } else {
            newValues.add(value);
        }
        return onChange([...newValues]);
    }

    return (
        <div className="dropdown">
            <button className="dropdown-button" onClick={() => setExpanded(!expanded)}>
                {dropdownLabel} {expanded ? "▴" : "▾"}
            </button>
            {expanded && <div className={optionsClassName}>
                {options.map(option => {
                    let {value, label} = option;

                    const selected = selectedValues.has(value);
                    if (typeof option === "string") {
                        value = option;
                        label = option;
                    }

                    return (
                        <DropdownOption key={value} value={value} selected={selected} label={label} onClick={optionClickHandler}/>
                    );
                })}
            </div>}
        </div>
    )
}

Dropdown.propTypes = {
    placeholder: PropTypes.string,
    options: PropTypes.array,
    onChange: PropTypes.func,
    multiple: PropTypes.bool,
}

export default Dropdown;