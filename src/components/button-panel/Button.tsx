import style from "./ButtonPanel.module.css";
import React from "react";

type ButtonType = {
    typeCounter: () => void;
    title: string,
    disabled: boolean
}

export const Button = (props: ButtonType) => {
    const {typeCounter, title, disabled, } = props;
    return (
        <button className={style.incButton}
                onClick={typeCounter}
                disabled={disabled}
        >{title}
        </button>
    );
}