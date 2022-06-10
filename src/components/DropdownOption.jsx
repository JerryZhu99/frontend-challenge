import React from "react";
import PropTypes from 'prop-types';

function DropdownOption (props) {
    const { value, label, onClick } = props;
    return (
        <div onClick={event => onClick(value)}>
            {label}
        </div>
    )
}

DropdownOption.propTypes = {
    value: PropTypes.any,
}

export default DropdownOption;