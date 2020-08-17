import style from "./ButtonPanel.module.css";
import React from "react";

type ButtonType = {
    typeCounter: () => void;
    title: string,
    disabled: boolean
}


export const Button = React.memo((props: ButtonType) => {
    const {typeCounter, title, disabled} = props;
    console.log('Button' + title)
    return (
        <button className={style.incButton}
                onClick={typeCounter}
                disabled={disabled}
        >{title}
        </button>
    );
});

