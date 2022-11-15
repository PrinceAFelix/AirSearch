import React, { Children } from 'react';
import classes from './Button.module.css'

const Button = (props) => {

    const ticket = props.btnType;

    const handleClick = () => {
        props.onClick(ticket);
    }

    return (
        <button onClick={handleClick} className={`${classes.Button} ${props.className}`} type={props.type}>
            {props.label}
            {props.icon}
        </button>
    )
}

export default Button;