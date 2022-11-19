import React from "react"

const FlightContext = React.createContext({
    tickettype: { roundtrip: false, oneway: false },
    fromAirport: '',
    toAirport: '',
    departureDate: new Date(),
    returnDate: new Date,
    passengers: {
        adult: 0,
        child: 0,
        infantsOne: 0,
        infantsTwo: 0
    },
    totalPassenger: 1,
    flightType: 'Economy',
    onAddDates: () => { },
    onAddPassenger: () => { },
    onRemovePassenger: () => { },
    onAddFlightType: () => { },
})

export default FlightContext;