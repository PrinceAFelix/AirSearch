

import classes from './DateButton.module.css'

const DateButton = (props) => {
    const handleClick = () => {
        props.onClick(props.label);
    }
    return (
        <button onClick={handleClick} disabled={props.isDisabled} className={`${classes.button} ${props.className}`} type={props.type}>
            {props.label}
        </button>
    )
}

export default DateButton;