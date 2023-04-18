import React from "react"

const FlightContext = React.createContext({
    tickettype: { roundtrip: false, oneway: false },
    namedTicketType: '',
    fromAirport: {
        code: '',
        value: ''
    },
    toAirport: {
        code: '',
        value: ''
    },
    departureDate: new Date(),
    returnDate: new Date(),
    passengers: {
        adult: 0,
        child: 0,
        infantsOne: 0,
        infantsTwo: 0
    },
    totalPassenger: 1,
    flightType: 'Economy',
    isSubmitForm: false,
    onChangeTicketType: () => { },
    onAddAirports: () => { },
    onAddDates: () => { },
    onAddPassenger: () => { },
    onRemovePassenger: () => { },
    onAddFlightType: () => { },
})

export default FlightContext;

//https://www.flighthub.com/flight/search?num_adults=2&num_children=0&num_infants=0&num_infants_lap=0&seat_class=Economy&seg0_date=2023-1-21&seg0_from=YOW&seg0_to=MNL&seg1_date=2023-1-28&seg1_from=YOW&seg1_to=MNL&type=oneway$

//https://www.flighthub.com/flight/search?num_adults=1&num_children=0&num_infants=0&num_infants_lap=0&seat_class=Economy&seg0_date=2022-11-24&seg0_from=YOW&seg0_to=MNL&seg1_date=2022-11-30&seg1_from=MNL&seg1_to=YOW&type=roundtrip


