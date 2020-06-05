import React from "react";
import style from './ButtonPanel.module.css';
import {Button} from "./Button";
import {ButtonsType1} from "../../Counter";


type ButtonPanelPropsType = {
    incrementCounter: () => void;
    resetCounter: () => void;
    counter: number;
    maxCount: number,
    buttons: Array<ButtonsType1>
}

const ButtonPanel = (props: ButtonPanelPropsType) => {
    const {incrementCounter, resetCounter, counter, maxCount, buttons} = props;

    return (
        <div className={style.buttonBlock}>
            {
                buttons.map(elem => {
                    return (
                        <Button key={elem.buttonId}
                                title={elem.title}
                                typeCounter={elem.onClick}
                                disabled={elem.disabled}
                        />
                    );
                })
            }
            {/*<Button title={'INC'}*/}
            {/*        typeCounter={incrementCounter}*/}
            {/*        disabled={counter === maxCount}*/}
            {/*/>*/}
            {/*<Button title={'RESET'}*/}
            {/*        typeCounter={resetCounter}*/}
            {/*        disabled={counter === 0}*/}

            {/*/>*/}
            {/*<button className={style.incButton}
                    onClick={incrementCounter}
                    disabled={counter === maxCount}
            >INC
            </button>*/}

            {/*<button className={style.reset}
                    onClick={resetCounter}
                    disabled={counter === 0}>RESET
            </button>*/}
        </div>
    );
}
export default ButtonPanel;

