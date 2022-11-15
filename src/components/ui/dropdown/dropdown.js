import classes from './dropdown.module.css'

import FlightContext from '../../../context/flight-context'
import { useContext } from 'react'
import Button from '../button/Button'
import DropdownItem from './DropdownItem'

const passengerOption = [
    { id: 'PN1', amount: 0, option: 'adult' },
    { id: 'PN2', amount: 0, option: 'child (2-11)' },
    { id: 'PN3', amount: 0, option: 'Infants (In seat)' },
    { id: 'PN4', amount: 0, option: 'Infants (On lap)' },
]

const ticketOption = [
    { id: 'TT1', option: 'Economy' },
    { id: 'TT2', option: 'Premium Economy' },
    { id: 'TT3', option: 'Business' },
    { id: 'TT4', option: 'First' },
]

const DropDown = (props) => {

    const flightCtx = useContext(FlightContext)

    const isVisible = props.isVisible

    const onChangeTicketType = (btn) => {
        console.log(btn)
    }

    //Set the Numbers
    passengerOption.map((option, index) => {
        switch (index) {
            case 0:
                option.amount = flightCtx.passengers.adult;
                break;
            case 1:
                option.amount = flightCtx.passengers.child;
                break;
            case 2:
                option.amount = flightCtx.passengers.infantsOne;
                break;
            case 3:
                option.amount = flightCtx.passengers.infantsTwo;
                break;
            default:
                break;
        }
    })




    const mapFrom = props.for === 'passengernum' ? passengerOption : ticketOption;

    return (
        <div className={`${classes.dropdown} ${isVisible ? classes.visible : ''}`}>
            <div className={classes.option_container}>

                {mapFrom.map((option, index) => (
                    <ul className={classes.ul} key={option.id}>
                        <DropdownItem for={props.for} amount={option.amount} num={props.numOfPass} id={option.id} optionTitle={option.option} onChangeType={onChangeTicketType} />
                    </ul>
                ))}
            </div>
        </div>
    )
}

export default DropDown;