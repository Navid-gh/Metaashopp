import React from 'react';
import {Link} from "react-router-dom";
import "./Button.css";
const STYLES = ['btn--primary','btn--outline','btn--special','btn--search','btn--search--place','btn--tour','btn--footer','btn--cart','btn--more','btn--signup'];
const SIZES = ['btn--medium', 'btn--large','btn--small'];
function Button(props) {
    const {to,buttonstyle,buttonsize,children} = props;
    let Buttonstyle = STYLES.includes(buttonstyle)?buttonstyle:STYLES[0];
    let Buttonsize = SIZES.includes(buttonsize)?buttonsize:SIZES[0];
  return (
    <Link to={to} className="btn-mobile">
        <button className={`btn ${Buttonstyle} ${Buttonsize}`}>
          {children}
        </button>
    </Link>
  )
}

export default React.memo(Button);