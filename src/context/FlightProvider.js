import { useReducer, useState } from "react"
import FlightContext from "./flight-context"



const defaultState = {
    ticketType: '',
    fromAirport: {
        code: '',
        value: ''
    },
    toAirport: {
        code: '',
        value: ''
    },
    passengers: {
        adult: 1,
        child: 0,
        infantsOne: 0,
        infantsTwo: 0
    },
    totalPassenger: 1,
    passengerId: '',
    airport: {},
    flightType: 'Economy',
}

const flightReducer = (state, action) => {



    if (action.actionType === 'TICKETTYPE') {

        let ticket = action.tickets.tickets.roundtrip ? 'roundtrip' : 'oneway';

        return {
            ticketType: ticket,
            passengers: state.passengers,
            totalPassenger: state.totalPassenger,
            flightType: state.flightType,
            fromAirport: state.fromAirport,
            toAirport: state.toAirport,
        }
    }


    if (action.actionType === 'ADD') {
        let updatedPassenger = {
            adult: (action.passengerID.includes('1') ? state.passengers.adult += 1 : state.passengers.adult) >= 9 ? 9 : state.passengers.adult,
            child: (action.passengerID.includes('2') ? state.passengers.child += 1 : state.passengers.child) >= 9 ? 9 : state.passengers.child,
            infantsOne: (action.passengerID.includes('3') ? state.passengers.infantsOne += 1 : state.passengers.infantsOne) >= 9 ? 9 : state.passengers.infantsOne,
            infantsTwo: (action.passengerID.includes('4') ? state.passengers.infantsTwo += 1 : state.passengers.infantsTwo) >= 9 ? 9 : state.passengers.infantsTwo
        }

        let updatedTotalPassenger = (
            updatedPassenger.adult + updatedPassenger.child + updatedPassenger.infantsOne + updatedPassenger.infantsTwo
        )


        return {
            passengers: updatedPassenger,
            totalPassenger: updatedTotalPassenger,
            ticketType: state.ticketType,
            flightType: state.flightType,
            fromAirport: state.fromAirport,
            toAirport: state.toAirport,
        }
    }

    if (action.actionType === 'REMOVE') {
        let updatedPassenger = {
            adult: (action.passengerID.includes('1') ? state.passengers.adult -= 1 : state.passengers.adult) <= 1 ? 1 : state.passengers.adult,
            child: (action.passengerID.includes('2') ? state.passengers.child -= 1 : state.passengers.child) <= 0 ? 0 : state.passengers.child,
            infantsOne: (action.passengerID.includes('3') ? state.passengers.infantsOne -= 1 : state.passengers.infantsOne) <= 0 ? 0 : state.passengers.infantsOne,
            infantsTwo: (action.passengerID.includes('4') ? state.passengers.infantsTwo -= 1 : state.passengers.infantsTwo) <= 0 ? 0 : state.passengers.infantsTwo
        }

        let updatedTotalPassenger = (
            updatedPassenger.adult + updatedPassenger.child + updatedPassenger.infantsOne + updatedPassenger.infantsTwo
        )

        return {
            passengers: updatedPassenger,
            totalPassenger: updatedTotalPassenger,
            flightType: state.flightType,
            fromAirport: state.fromAirport,
            toAirport: state.toAirport,
        }
    }

    if (action.actionType === 'FLIGHTTYPE') {
        let updatedFlightType = '';

        switch (action.passengerID) {
            case 'TT1':
                updatedFlightType = 'Economy'
                break;
            case 'TT2':
                updatedFlightType = 'Premium Economy'
                break;
            case 'TT3':
                updatedFlightType = 'Business'
                break;
            case 'TT4':
                updatedFlightType = 'First'
                break;
            default:
                break;
        }


        return {
            passengers: state.passengers,
            totalPassenger: state.totalPassenger,
            flightType: updatedFlightType,
            fromAirport: state.fromAirport,
            toAirport: state.toAirport,
        }
    }

    if (action.actionType === 'ADDAIRPORT') {

        const airportCode = action.airport.airport.code;
        const airportValue = `${action.airport.airport.code} ${action.airport.airport.searchCity}, ${action.airport.airport.displayProvince}`

        const updatedAirport = {
            code: airportCode,
            value: airportValue
        }
        console.log(updatedAirport)


        if (action.airport.origin === 'from') {
            return {
                fromAirport: updatedAirport,
                toAirport: state.toAirport,
                passengers: state.passengers,
                totalPassenger: state.totalPassenger,
                flightType: state.flightType,
            }
        }

        return {
            toAirport: updatedAirport,
            fromAirport: state.fromAirport,
            passengers: state.passengers,
            totalPassenger: state.totalPassenger,
            flightType: state.flightType,
        }

    }

    return defaultState;
}



const FlightContextProvider = (props) => {


    const [isSubmit, setIsSubmit] = useState({
        submit: false,
    })

    const [dates, setDates] = useState({
        departureDate: null,
        returnDate: null,
    })

    const [flightState, dispatchFlightAction] = useReducer(flightReducer, defaultState)

    // const [passengernum, setPassengerNum] = useState(5);

    const changeTicketType = (list) => {
        dispatchFlightAction({ actionType: 'TICKETTYPE', tickets: list })
    }

    const addAirport = (list) => {
        dispatchFlightAction({ actionType: 'ADDAIRPORT', airport: list })
    }

    const addPassenger = (id) => {
        dispatchFlightAction({ actionType: 'ADD', passengerID: id })
    }

    const removePassenger = (id) => {
        dispatchFlightAction({ actionType: 'REMOVE', passengerID: id })
    }

    const addFlightType = (id) => {
        dispatchFlightAction({ actionType: 'FLIGHTTYPE', passengerID: id })
    }


    const submitForm = () => {
        setIsSubmit((prev) => {
            return { ...prev, submit: true }
        })
    }

    const addDates = (date, dateFor) => {

        console.log(date)

        setDates((prev) => {
            switch (dateFor) {
                case 'D01':
                    return { ...prev, departureDate: date }
                case 'D02':
                    return { ...prev, returnDate: date }
                default:
                    return { ...prev }
            }
        })

    }



    const flightContext = {
        tickettype: {
            roundtrip: false,
            oneway: false
        },
        namedTicketType: flightState.ticketType,
        fromAirport: flightState.fromAirport,
        toAirport: flightState.toAirport,
        departureDate: dates.departureDate,
        returnDate: dates.returnDate,
        passengers: {
            adult: flightState.passengers.adult,
            child: flightState.passengers.child,
            infantsOne: flightState.passengers.infantsOne,
            infantsTwo: flightState.passengers.infantsTwo
        },
        totalPassenger: flightState.totalPassenger,
        flightType: flightState.flightType,
        isSubmitForm: isSubmit.submit,
        onSubmitForm: submitForm,
        onChangeTicketType: changeTicketType,
        onAddAirports: addAirport,
        onAddDates: addDates,
        onAddPassenger: addPassenger,
        onRemovePassenger: removePassenger,
        onAddFlightType: addFlightType,

    }

    return <FlightContext.Provider value={flightContext}>{props.children}</FlightContext.Provider>

}

export default FlightContextProvider;