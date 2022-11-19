import React from "react";

import classes from './Input.module.css'

const Input = (props) => {

    const id = props.name === 'departuredate' ? 'D01' : 'D02'
    const handleDatePicker = () => {
        props.onClick(id);
    }


    const inputVal = props.textHolder === null ?
        props.name === 'departuredate' ? 'Departure Date' : 'Return Date' : props.textHolder;

    return (
        <div className={classes.container}>
            <label className={classes.label} htmlFor={props.label}>{props.label}</label>
            <input onClick={handleDatePicker} className={`${classes.Input} ${props.className} ${props.textHolder === null && classes.empty} `} type={props.type} name={props.name} value={inputVal} />
        </div>
    )
}


export default Input;