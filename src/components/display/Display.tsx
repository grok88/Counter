import React from "react";
import style from './Display.module.css';
import { InitialCountType } from "../../App";


type DisplayPropsType = {
    counter: number;
    initialCount:InitialCountType,
    error:boolean
    message:string | null
}

const Display = (props: DisplayPropsType) => {
    const {counter,initialCount, error, message} = props;
    return (
        <div className={`${style.display} ${counter === initialCount.max ? style.red : ""}`}>
            <span className={`${error ? style.setError : ''}`}>{message ? message : counter}</span>
        </div>
    );
}
export default Display;