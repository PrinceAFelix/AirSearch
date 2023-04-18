import React, { useContext } from 'react';
import classes from './AirportItem.module.css'
import IconsContext from '../../../context/icon-context';
import FlightContext from '../../../context/flight-context';
const AirportItem = (props) => {

    const iconsCtx = useContext(IconsContext)
    const flightCtx = useContext(FlightContext);

    const handleClick = () => {
        flightCtx.onAddAirports(
            {
                origin: props.origin,
                airport: props.airport,
            }
        );

        props.onSelect(props.airport.displayName);
    }

    return (
        <button onClick={handleClick} type="button" className={classes.button}>
            <span className={classes.icon}>{iconsCtx.loc}</span>
            <div className={classes.info}>
                <label className={classes.name} >
                    {props.displayName}
                </label>
                <label className={classes.country}>
                    {props.displayCountry}
                </label>
            </div>
        </button>
    )
}

export default AirportItem;
