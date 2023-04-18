import classes from './ScrapeResults.module.css'


const ScrapeResults = (props) => {


    return (
        <div className={classes.container}>
            <div className={classes.content}>
                <div className={classes.result}>
                    <a href={`https://www.flighthub.com/flight/search?num_adults=${props.ctx.passengers.adult}&num_children=${props.ctx.passengers.child}&num_infants=${props.ctx.passengers.infantsOne}&num_infants_lap=${props.ctx.passengers.infantsTwo}&seat_class=${props.ctx.flightType}&seg0_date=${props.ctx.departureDate}&seg0_from=${props.ctx.fromAirport.code}&seg0_to=${props.ctx.toAirport.code}&seg1_date=${props.ctx.returnDate}&seg1_from=${props.ctx.toAirport.code}&seg1_to=${props.ctx.fromAirport.code}&type=${props.ctx.namedTicketType}`} >Link</a>
                </div>
                <div className={classes.result}>

                </div>
                <div className={classes.result}>

                </div>
                <div className={classes.result}>

                </div>
            </div>
        </div>
    )
}

export default ScrapeResults;