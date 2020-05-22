import React from "react";
import style from './ButtonPanel.module.css';


type ButtonPanelPropsType = {
    incrementCounter: () => void;
    resetCounter: () => void;
    counter: number
}

const ButtonPanel = (props: ButtonPanelPropsType) => {
    const {incrementCounter, resetCounter, counter} = props;

    return (
        <div className={style.buttonBlock}>
            <button className={style.incButton}
                    onClick={incrementCounter}
                    disabled={counter === 5 ? true : false}
            >INC
            </button>
            <button className={style.reset}
                    onClick={resetCounter}
                    disabled={counter === 0 ? true : false}>RESET
            </button>
        </div>
    );
}
export default ButtonPanel;