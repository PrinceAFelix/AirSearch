import React, { useContext, useState } from "react";
import Button from "../ui/button/Button";
import Card from "../ui/Card/Card";
import Input from "../ui/input/Input";
import classes from './FlightTicketForm.module.css'
import IconsContext from "../../context/icon-context";
import FlightContext from "../../context/flight-context";
import DropDown from "../ui/dropdown/dropdown";
import DateButton from "../ui/button/DateButton";
import DateRangePicker from "../ui/daterangepicker/DateRangePicker";
const FligthTicketForm = () => {

    const flightCtx = useContext(FlightContext)
    const iconCtx = useContext(IconsContext);
    const [isDefault, setIsDefault] = useState(
        {
            roundtrip: true,
            oneway: false,
            passengernum: false,
            tickettype: false,
            isDropDownVisible: {
                passNum: false,
                passTicket: false
            },
            datePicker: {
                isPickDate: false,
                dateFor: "",
            },
        }
    );


    const submitHandler = (e) => {
        e.preventDefault();

    }

    const toggleDatePicker = (dateSelected) => {
        setIsDefault((prev) => {
            return {
                ...prev, datePicker: {
                    isPickDate: !prev.datePicker.isPickDate,
                    dateFor: dateSelected,
                }
            }
        })
    }



    const onChangeTicketType = (ticket) => {
        setIsDefault((prev) => {

            switch (ticket) {
                case 'R':
                    return { ...prev, roundtrip: true, oneway: false }
                case 'O':
                    return { ...prev, roundtrip: false, oneway: true }
                case 'PN':
                    console.log('PN')
                    return {
                        ...prev, passengernum: !prev.passengernum, isDropDownVisible: {
                            passNum: !prev.isDropDownVisible.passNum,
                            passTicket: false
                        },
                    }
                case 'TT':
                    console.log('TT')
                    return {
                        ...prev, tickettype: !prev.tickettype, isDropDownVisible: {
                            passNum: false,
                            passTicket: !prev.isDropDownVisible.passTicket
                        },
                    }
                default:
                    break;
            }
            if (ticket === 'R') {
                console.log("roundtrip")
                return { ...prev, roundtrip: true, oneway: false }
            }

            console.log("oneway")

        })

    }

    const handleAddDate = (selectedDate) => {


        const { year, month, day, dateFor } = selectedDate
        const date = `${year}-${month}-${day}`


        flightCtx.onAddDates(date, dateFor)

    }



    const DatePicker = <div className={classes.datePicker}>
        <DateRangePicker onClickDate={handleAddDate} dateFor={isDefault.datePicker.dateFor} />
    </div>



    return (
        <form onSubmit={submitHandler}>

            <Card label="Flights">
                <div className={classes.form}>
                    <div className={classes.flight_type}>
                        <Button onClick={onChangeTicketType} btnType='R' type="button" className={`${classes.roundtrip} ${isDefault.roundtrip ? classes.selected : ''}`} label="Round-Trip" />
                        <Button onClick={onChangeTicketType} btnType='O' type="button" className={`${classes.oneway} ${isDefault.oneway ? classes.selected : ''}`} label="One Way" />
                    </div>

                    <div className={classes.input}>
                        <Input label="From" type="text" name="frominput" />
                        <Input label="To" type="text" name="toinput" />
                        <div>
                            <Input label="DEPARTURE" textHolder={flightCtx.departureDate} className={classes.dates} onClick={toggleDatePicker} type="button" name="departuredate" />
                            {
                                isDefault.datePicker.isPickDate && isDefault.datePicker.dateFor === 'D01' &&
                                DatePicker
                            }
                        </div>
                        <div>
                            <Input label="Return" type="button" textHolder={flightCtx.returnDate} className={classes.dates} onClick={toggleDatePicker} name="returndate" />
                            {
                                isDefault.datePicker.isPickDate && isDefault.datePicker.dateFor === 'D02' &&
                                DatePicker
                            }
                        </div>

                    </div>


                    <div className={classes.passengerinfo}>
                        <div className={classes.passengernum}>
                            <Button onClick={onChangeTicketType} btnType='PN' icon={iconCtx.down} type="button" className={classes.passenger_select} label={`${flightCtx.totalPassenger} Passenger`} />
                            <DropDown for={'passengernum'} numOfPass={flightCtx.passengers} isVisible={isDefault.isDropDownVisible.passNum} />
                        </div>
                        <div className={classes.flighttype}>
                            <Button onClick={onChangeTicketType} btnType='TT' icon={iconCtx.down} type="button" className={classes.flighttype_select} label={flightCtx.flightType} />
                            <DropDown for={'flighttype'} isVisible={isDefault.isDropDownVisible.passTicket} />
                        </div>

                    </div>
                </div>

            </Card >
            <Button type="submit" className={classes.submit} label="Search Flights" />
        </form>


    )
}

export default FligthTicketForm;