
import classes from './Card.module.css'

const Card = (props) => {
    return (
        <div className={classes.container}>
            <div className={classes.label}>
                {props.label}
            </div>
            <div className={classes.card}>
                {props.children}
            </div>
        </div>

    )
}

export default Card;