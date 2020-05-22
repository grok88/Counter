import React from "react";
import style from './Display.module.css';

type DisplayPropsType = {
    counter: number;
}

const Display = (props: DisplayPropsType) => {
    const {counter} = props;
    return (
        <div className={`${style.display} ${counter === 5 ? style.red : ""}`}>
            {counter}
        </div>
    );
}
export default Display;