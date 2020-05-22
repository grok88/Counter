import React from "react";
import style from './Display.module.css';

type DisplayPropsType = {
    counter: number;
    maxCount:number;
}

const Display = (props: DisplayPropsType) => {
    const {counter, maxCount} = props;
    return (
        <div className={`${style.display} ${counter === maxCount ? style.red : ""}`}>
            {counter}
        </div>
    );
}
export default Display;