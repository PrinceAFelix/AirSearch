import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faPlus, faMinus, faX, faChevronLeft, faChevronRight, faLocationDot } from '@fortawesome/free-solid-svg-icons'


const IconsContext = React.createContext({
    down: '',
    plus: '',
    minus: '',
    prev: '',
    next: '',
});


export const IconContextProvider = (props) => {

    const [icons, setIcons] = useState({
        down: <FontAwesomeIcon icon={faCaretDown} />,
        plus: <FontAwesomeIcon icon={faPlus} />,
        minus: <FontAwesomeIcon icon={faMinus} />,
        prev: <FontAwesomeIcon icon={faChevronLeft} />,
        next: <FontAwesomeIcon icon={faChevronRight} />,
        loc: <FontAwesomeIcon icon={faLocationDot} />
    });

    const iconsCtx = ({
        down: icons.down,
        plus: icons.plus,
        minus: icons.minus,
        prev: icons.prev,
        next: icons.next,
        loc: icons.loc,
    })

    return <IconsContext.Provider value={iconsCtx}>{props.children}</IconsContext.Provider>
}


export default IconsContext