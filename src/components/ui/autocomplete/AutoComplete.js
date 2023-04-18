import React, { useRef, useState, useImperativeHandle } from 'react'
import classes from './AutoComplete.module.css'
import nextId from "react-id-generator";
import AirportItem from './AirportItem';
import airports from "../../../assets/Airports.json"




const AutoComplete = React.forwardRef((props, ref) => {

    const inputRef = useRef();


    const activate = () => {
        inputRef.current.focus();
    };

    useImperativeHandle(ref, () => {
        return {
            focus: activate,
        };
    });

    const airportList = JSON.stringify(airports);

    const airportsJSON = JSON.parse(airportList);

    const [inputState, setInputState] = useState({
        userInput: '',
        isSelect: false
    });

    const onUserInput = (e) => {
        setInputState((prev) => {
            return { ...prev, userInput: e.target.value, isSelect: false }
        });
    }

    const onSelectAirport = (airport) => {
        setInputState((prev) => {
            return { ...prev, userInput: airport, isSelect: true }
        });
    }


    return (
        <div className={classes.autocomplete}>

            <input ref={inputRef} className={classes.Input} type="text" value={inputState.userInput} onChange={e => onUserInput(e)} name="input" placeholder={props.placeHolder} autoComplete="off" />
            {
                inputState.userInput !== '' && inputState.isSelect === false &&
                <div className={classes.suggestions}>
                    {
                        airportsJSON.filter(val =>
                            (val.code === inputState.userInput.toUpperCase()) ||
                            (val.displayName.toLocaleLowerCase().includes(inputState.userInput.toLocaleLowerCase()) ||
                                val.displayCountry.toLocaleLowerCase().includes(inputState.userInput.toLocaleLowerCase()) ||
                                val.displayProvince.toLocaleLowerCase().includes(inputState.userInput.toLocaleLowerCase()) ||
                                val.searchCity.toLocaleLowerCase().includes(inputState.userInput.toLocaleLowerCase()))
                        ).map((v, i) => (
                            i <= 7 && inputState.userInput !== '' &&
                            <ul className={classes.ul} key={`${v.id}$`}>
                                <li className={classes.li}>
                                    {
                                        <AirportItem origin={props.forAirport} onSelect={onSelectAirport} airport={v} displayName={v.displayName} displayCountry={v.displayCountry} />
                                    }
                                </li>
                            </ul>
                        ))
                    }

                </div>
            }
            {/* Make hidden input to get the IATA Code that will be use to identify the Area Code*/}
        </div>
    )
})


export default AutoComplete;