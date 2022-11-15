import React, { useContext } from "react";

import IconsContext from "../../../context/icon-context";
import classes from './DateRangePicker.module.css'


const DAYS = ['S', 'M', 'T', 'W', 'T', 'F', 'S']


const DateRangePicker = () => {

    const iconCtx = useContext(IconsContext);

    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.months}>
                    <div className={classes.prevmonth}>{iconCtx.prev}</div>
                    <label htmlFor="months">November</label>
                    <div className={classes.nextmonth}>{iconCtx.next}</div>
                </div>
                <div className={classes.datelabel}>
                    {DAYS.map((d) => (
                        <ul className={classes.ul}>
                            <label htmlFor="days">{d}</label>
                        </ul>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default DateRangePicker;