import React from "react";
import style from './Display.module.css';
import { InitialCountType } from "../../App";


type DisplayPropsType = {
    counter: number;
    initialCount:InitialCountType,
    error:string | null
}

const Display = (props: DisplayPropsType) => {
    const {counter,initialCount, error} = props;
    return (
        <div className={`${style.display} ${counter === initialCount.max ? style.red : ""}`}>
            <span className={`${error ? style.setError : ''}`}>{error ? error : counter}</span>
        </div>
    );
}
export default Display;