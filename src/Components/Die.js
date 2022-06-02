import React from "react";
import "../App.css"

export default function Die(props){
    const style=`die ${props.clicked ? "bgGreen" : "bgWhite"}`

    return(
        <div>
            <button onClick={props.handleDiceClick} 
                    className={style}>
                        {props.value}
            </button>
        </div>
    )
}