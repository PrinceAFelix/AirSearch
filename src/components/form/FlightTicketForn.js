import React, { useContext, useState, useRef, useEffect } from "react";
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

    const fromAirportRef = useRef();
    const toAirportRef = useRef();
    const departureRef = useRef();
    const returnRef = useRef();

    const flightCtx = useContext(FlightContext)
    const iconCtx = useContext(IconsContext);

    const [isDefault, setIsDefault] = useState(
        {
            tickettype: {
                roundtrip: true,
                oneway: false,
            },
            passengernum: false,

            isDropDownVisible: {
                passNum: false,
                passTicket: false
            },
            datePicker: {
                isPickDate: false,
                dateFor: "",
            },
            // isSubmit: false,
        }
    );

    const [isValid, setIsValid] = useState({
        formIsValid: false,
        fromIsValid: false,
        toIsvAlid: false,
        departureIsValid: false,
        returnIsValid: false,
    })

    // useEffect(() => {
    //     fromAirportRef.current.focus();
    // }, []);


    const submitHandler = (e) => {
        e.preventDefault();
        // setIsDefault((prev) => {
        //     return {
        //         ...prev, isSubmit: true
        //     }
        // })

        flightCtx.onSubmitForm();

        console.log(`https://www.flighthub.com/flight/search?num_adults=${flightCtx.passengers.adult}&num_children=${flightCtx.passengers.child}&num_infants=${flightCtx.passengers.infantsOne}&num_infants_lap=${flightCtx.passengers.infantsTwo}&seat_class=${flightCtx.flightType}&seg0_date=${flightCtx.departureDate}&seg0_from=${flightCtx.fromAirport.code}&seg0_to=${flightCtx.toAirport.code}&seg1_date=${flightCtx.returnDate}&seg1_from=${flightCtx.fromAirport.code}&seg1_to=${flightCtx.toAirport.code}&type=${flightCtx.namedTicketType}`)


        // if (isValid.formIsValid) {
        //     console.log("Valid")
        // } else if (!isValid.fromIsValid) {
        //     fromAirportRef.current.focus();
        // } else if (!isValid.toIsvAlid) {
        //     toAirportRef.current.focus();
        // }
        // } else if (!isValid.departureIsValid) {
        //     departureRef.current.focus();
        // } else if (!isValid.returnIsValid) {
        //     returnRef.current.focus();
        // }

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
                    return {
                        ...prev, tickettype: {
                            roundtrip: true,
                            oneway: false
                        }
                    }
                case 'O':

                    return {
                        ...prev, tickettype: {
                            roundtrip: false,
                            oneway: true
                        }
                    }
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
                return {
                    ...prev, tickettype: {
                        roundtrip: true,
                        oneway: false
                    }
                }
            }

        })

    }

    useEffect(() => {
        flightCtx.onChangeTicketType({
            tickets: isDefault.tickettype
        })
    }, [isDefault.tickettype])

    const handleAddDate = (selectedDate) => {


        const { year, month, day, dateFor } = selectedDate
        const date = `${year}-${month + 1}-${day}`


        flightCtx.onAddDates(date, dateFor)

        toggleDatePicker();

    }



    const DatePicker = <div className={classes.datePicker}>
        <DateRangePicker onClickDate={handleAddDate} dateFor={isDefault.datePicker.dateFor} />
    </div>


    return (
        <form onSubmit={submitHandler}>
            <Card label="Flights">
                <div className={classes.form}>
                    <div className={classes.flight_type}>
                        <Button onClick={onChangeTicketType} btnType='R' type="button" className={`${classes.roundtrip} ${isDefault.tickettype.roundtrip ? classes.selected : ''}`} label="Round-Trip" />
                        <Button onClick={onChangeTicketType} btnType='O' type="button" className={`${classes.oneway} ${isDefault.tickettype.oneway ? classes.selected : ''}`} label="One Way" />
                    </div>

                    <div className={classes.input}>
                        <Input inputRef={fromAirportRef} value={flightCtx.fromAirport.value} isAirport={true} forAirport={'from'} placeHolder={'Leaving from'} label="From" type="text" name="frominput" />
                        <Input inputRef={toAirportRef} value={flightCtx.toAirport.value} isAirport={true} forAirport={'to'} placeHolder={'Going to'} label="To" type="text" name="toinput" />
                        <div>
                            <Input ref={departureRef} label="DEPARTURE" textHolder={flightCtx.departureDate} className={`${classes.dates} ${isDefault.oneway && classes.onewayinput}`} onClick={toggleDatePicker} type="button" name="departuredate" />
                            {
                                isDefault.datePicker.isPickDate && isDefault.datePicker.dateFor === 'D01' &&
                                DatePicker
                            }
                        </div>
                        {
                            !isDefault.tickettype.oneway &&
                            <div>
                                <Input ref={returnRef} label="Return" type="button" textHolder={flightCtx.returnDate} className={`${classes.dates}`} onClick={toggleDatePicker} name="returndate" />
                                {
                                    isDefault.datePicker.isPickDate && isDefault.datePicker.dateFor === 'D02' &&
                                    DatePicker
                                }
                            </div>
                        }


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
            <Button onClick={() => { }} type="submit" className={classes.submit} label="Search Flights" />
        </form>


    )
}

export default FligthTicketForm;