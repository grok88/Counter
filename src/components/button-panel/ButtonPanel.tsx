import React from "react";
import style from './ButtonPanel.module.css';


type ButtonPanelPropsType = {
    incrementCounter: () => void;
    resetCounter: () => void;
    counter: number;
    maxCount:number
}

const ButtonPanel = (props: ButtonPanelPropsType) => {
    const {incrementCounter, resetCounter, counter, maxCount} = props;

    return (
        <div className={style.buttonBlock}>
            <button className={style.incButton}
                    onClick={incrementCounter}
                    disabled={counter === maxCount}
            >INC
            </button>
            <button className={style.reset}
                    onClick={resetCounter}
                    disabled={counter === 0}>RESET
            </button>
        </div>
    );
}
export default ButtonPanel;