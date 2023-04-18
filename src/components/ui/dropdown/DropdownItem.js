import React, { useContext } from 'react';

import classes from './DropdownItem.module.css'
import IconsContext from '../../../context/icon-context'
import FlightContext from '../../../context/flight-context';
import Button from '../button/Button';

const DropdownItem = (props) => {
    const iconCtx = useContext(IconsContext);
    const flightCtx = useContext(FlightContext);

    const handleAdd = () => {
        flightCtx.onAddPassenger(props.id)
        props.onChangeType();
    }

    const handleMinus = () => {
        flightCtx.onRemovePassenger(props.id)
        props.onChangeType();
    }

    const handleTicketType = () => {
        flightCtx.onAddFlightType(props.id)
        props.onChangeType();
    }


    const addButton = props.for === 'passengernum' ? <div className={`${classes.minusbtn} ${classes.btn}`}>
        <Button onClick={handleAdd} btnType='A' icon={iconCtx.plus} type="button" className={classes.button} />
    </div> : null

    const minusButton = props.for == 'passengernum' ? <div className={`${classes.addbtn} ${classes.btn}`}>
        <Button onClick={handleMinus} btnType='M' icon={iconCtx.minus} type="button" className={classes.button} />
    </div> : null

    const textHolder = props.for === 'passengernum' ? <div className={classes.textholder}>
        <label className={classes.amount} htmlFor="amount">{props.amount}</label>
        {`${props.optionTitle}`}
    </div> : <div className={classes.typeBtn}>
        {<Button className={classes.button} onClick={handleTicketType} btnType={props.id} type="button" label={props.optionTitle} />}
    </div>

    return (
        <div className={classes.options}>
            {minusButton}
            {textHolder}
            {addButton}
        </div>
    )
}

export default DropdownItem; 