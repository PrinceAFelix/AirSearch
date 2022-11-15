import React from "react";

import classes from './Input.module.css'

const Input = (props) => {
    return (
        <div className={classes.container}>
            <label className={classes.label} htmlFor={props.label}>{props.label}</label>
            <input className={classes.Input} type={props.type} name={props.name} />
        </div>
    )
}


export default Input;