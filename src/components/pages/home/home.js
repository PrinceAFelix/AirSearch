import Card from "../../ui/Card/Card";
import FligthTicketForm from "../../form/FlightTicketForn";
import { IconContextProvider } from "../../../context/icon-context";

import classes from './Home.module.css'
import DateRangePicker from "../../ui/daterangepicker/DateRangePicker";
const Home = () => {
    return (
        <div className={classes.home}>
            <IconContextProvider>
                <FligthTicketForm />
            </IconContextProvider>
            <div className={classes.slogan}>
                AirSearch just what you needed
            </div>
        </div>
    );
}

export default Home;