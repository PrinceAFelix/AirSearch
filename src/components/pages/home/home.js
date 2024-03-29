import Card from "../../ui/Card/Card";
import FligthTicketForm from "../../form/FlightTicketForn";
import { IconContextProvider } from "../../../context/icon-context";
import React, { useContext } from "react";
import ScrapeResults from "../../results/ScrapeResults"
import FlightContext from "../../../context/flight-context";
import classes from './Home.module.css'
import DateRangePicker from "../../ui/daterangepicker/DateRangePicker";


const Home = () => {


    const flightCtx = useContext(FlightContext)

    const isSubmit = flightCtx.isSubmitForm

    return (
        <div className={classes.home}>
            <IconContextProvider>
                <FligthTicketForm />
            </IconContextProvider>
            {
                isSubmit ? <ScrapeResults ctx={flightCtx} /> :
                    <div className={classes.slogan}>
                        AirSearch just what you needed
                    </div>

            }



        </div>
    );
}

export default Home;