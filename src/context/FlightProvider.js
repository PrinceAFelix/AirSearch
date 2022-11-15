import { useReducer, useState } from "react"
import FlightContext from "./flight-context"



const defaultState = {
    // tickettype: { roundtrip: false, oneway: false },
    // fromAirport: '',
    // toAirport: '',
    // departureDate: new Date(),
    // returnDate: new Date,
    passengers: {
        adult: 1,
        child: 0,
        infantsOne: 0,
        infantsTwo: 0
    },
    totalPassenger: 1,
    passengerId: '',
    flightType: 'Economy',
}

const flightReducer = (state, action) => {


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
            flightType: state.flightType,
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
        }
    }

    if (action.actionType === 'TICKETTYPE') {
        let updatedFlightType = '';
        console.log('click')

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
        }
    }

    return defaultState;
}



const FlightContextProvider = (props) => {

    const [flightState, dispatchFlightAction] = useReducer(flightReducer, defaultState)

    // const [passengernum, setPassengerNum] = useState(5);

    const addPassenger = (id) => {
        dispatchFlightAction({ actionType: 'ADD', passengerID: id })
    }

    const removePassenger = (id) => {
        dispatchFlightAction({ actionType: 'REMOVE', passengerID: id })
    }

    const addTicketType = (id) => {
        dispatchFlightAction({ actionType: 'TICKETTYPE', passengerID: id })
    }


    const flightContext = {
        tickettype: {
            roundtrip: false,
            oneway: false
        },
        fromAirport: '',
        toAirport: '',
        departureDate: new Date(),
        returnDate: new Date,
        passengers: {
            adult: flightState.passengers.adult,
            child: flightState.passengers.child,
            infantsOne: flightState.passengers.infantsOne,
            infantsTwo: flightState.passengers.infantsTwo
        },
        totalPassenger: flightState.totalPassenger,
        flightType: flightState.flightType,
        onAddPassenger: addPassenger,
        onRemovePassenger: removePassenger,
        onAddTicketType: addTicketType,
    }

    return <FlightContext.Provider value={flightContext}>{props.children}</FlightContext.Provider>

}

export default FlightContextProvider;