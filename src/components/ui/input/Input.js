import React, { useRef, useImperativeHandle } from "react";
import AutoComplete from "../autocomplete/AutoComplete";

import classes from './Input.module.css'

const Input = React.forwardRef((props, ref) => {

    const inputRef = useRef();


    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });

    const id = props.name === 'departuredate' ? 'D01' : 'D02'
    const handleDatePicker = () => {
        props.onClick(id);
    }


    const inputVal = props.textHolder === null ?
        props.name === 'departuredate' ? 'Departure Date' : 'Return Date' : props.textHolder;

    return (
        <div className={classes.container}>
            <label className={classes.label} htmlFor={props.label}>{props.label}</label>
            {
                !props.isAirport ?
                    <input
                        ref={inputRef}
                        onClick={handleDatePicker}
                        className={`${classes.Input} ${props.className} ${props.textHolder === null && classes.empty} `}
                        type={props.type}
                        name={props.name}
                        value={inputVal}
                    />
                    : <AutoComplete ref={props.inputRef} value={props.value} forAirport={props.forAirport} placeHolder={props.placeHolder} />
            }
        </div>
    )
})


export default Input;