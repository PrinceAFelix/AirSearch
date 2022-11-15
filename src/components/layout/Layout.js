
import Header from '../header/Header';
import classes from './Layout.module.css'

const Layout = (props) => {
    return (
        <div className={classes.main}>
            <Header />
            {props.children}
        </div>
    )
}

export default Layout;