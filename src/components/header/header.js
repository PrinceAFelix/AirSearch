import React, { Fragment } from "react";

import classes from './Header.module.css'
import bgimage from '../../assets/bg_img.png'

const Header = () => {

    return (
        <Fragment>
            <header className={classes.header}>
                <h1 className={classes.h1}>
                    <span className={classes.bold}>Air</span>
                    <span className={classes.normal}>Search</span>
                </h1>
                {/* <div className={classes.menu}>
                    <div className={classes.menu_burger}>

                    </div>
                </div> */}
            </header>
            <div className={classes.image}>
                <img src={bgimage}></img>
            </div>
        </Fragment>
    )
}

export default Header;