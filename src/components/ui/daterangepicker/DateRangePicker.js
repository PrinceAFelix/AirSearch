import React, { useContext, useEffect, useState } from "react";

import IconsContext from "../../../context/icon-context";
import classes from './DateRangePicker.module.css'
import nextId from "react-id-generator";
import DateButton from "../button/DateButton";
import { click } from "@testing-library/user-event/dist/click";

const MONTHS = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];

const DAYS = [
    { id: 'D1', label: 'S' },
    { id: 'D2', label: 'M' },
    { id: 'D3', label: 'T' },
    { id: 'D4', label: 'W' },
    { id: 'D5', label: 'T' },
    { id: 'D6', label: 'F' },
    { id: 'D7', label: 'S' },
]

const DAYNUM = [
    { day: '1' },
    { day: '2' },
    { day: '3' },
    { day: '4' },
    { day: '5' },
    { day: '6' },
    { day: '7' },
    { day: '8' },
    { day: '9' },
    { day: '10' },
    { day: '11' },
    { day: '12' },
    { day: '13' },
    { day: '14' },
    { day: '15' },
    { day: '16' },
    { day: '17' },
    { day: '18' },
    { day: '19' },
    { day: '20' },
    { day: '21' },
    { day: '22' },
    { day: '23' },
    { day: '24' },
    { day: '25' },
    { day: '26' },
    { day: '27' },
    { day: '28' },
    { day: '29' },
    { day: '30' },
    { day: '31' },
]


const DateRangePicker = (props) => {



    const [days, setDays] = useState(
        { currentDays: DAYNUM.slice(), start: 0 }
    )

    let startDay = 0;

    const [date, setDate] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth(),
        day: new Date().getDay(),
    })

    const iconCtx = useContext(IconsContext);


    const getDayofWeek = (year, month) => {
        startDay = new Date(year + "-" + month + "-01").getDay() + 1;
        setDays((prev) => {
            return { ...prev, start: startDay }
        })

    }

    const handlePreviousClick = () => {
        setDays((prev) => {
            return { ...prev, currentDays: DAYNUM.slice() }
        })
        setDate((prev) => {
            if (prev.month === 0) return { ...prev, year: prev.year -= 1, month: 11 };;
            return { ...prev, month: prev.month -= 1 };
        })

    }

    const handleNextClick = () => {
        setDays((prev) => {
            return { ...prev, currentDays: DAYNUM.slice() }
        })
        setDate((prev) => {
            if (prev.month === 11) return { ...prev, year: prev.year += 1, month: 0 };
            return { ...prev, month: prev.month += 1 };
        })


    }





    useEffect(() => {
        getDayofWeek(date.year, MONTHS[date.month]);
        console.log(startDay)

        for (let i = 1; i < startDay; i++) {
            days.currentDays.unshift({ day: null })
        }

        setDays((prev) => {
            return { ...prev }
        })

    }, [date.month, startDay])

    const handleClickDate = (day) => {
        const selectedDate =
        {
            dateFor: props.dateFor,
            month: date.month,
            day: day,
            year: date.year,
        }


        props.onClickDate(selectedDate)

    }



    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.months}>
                    <div className={`${classes.dateBtn} ${classes.prevmonth}`} onClick={handlePreviousClick} >{iconCtx.prev}</div>
                    <label className={classes.label} htmlFor="months">{MONTHS[date.month]}</label>
                    <div className={`${classes.dateBtn} ${classes.nextmonth}`} onClick={handleNextClick}>{iconCtx.next}</div>
                </div>
                <div className={classes.year}>
                    <label htmlFor="year">{date.year}</label>
                </div>
                <div className={classes.datelabel}>
                    {DAYS.map((d) => (
                        <ul className={classes.ul} key={d.id}>
                            <label htmlFor="days">{d.label}</label>
                        </ul>
                    ))}
                </div>
                <hr className={classes.hr}></hr>
                <div className={classes.dayscontainer}>
                    {
                        days.currentDays.map((d, index) => (
                            <ul className={classes.ul} key={nextId()}>

                                {d.day === null ? <label htmlFor="emptyDay">{d.day}</label> :
                                    <DateButton isDisabled={
                                        (d.day <= new Date().getDate() && date.month <= new Date().getMonth() && date.year <= new Date().getFullYear()) ||
                                            (date.month < new Date().getMonth() && date.year <= new Date().getFullYear()) ||
                                            (date.year < new Date().getFullYear()) ? true : false}
                                        onClick={handleClickDate} type={"button"} label={d.day} />}
                            </ul>
                        ))
                    }
                </div>
            </div>
        </div >
    )
}

export default DateRangePicker;