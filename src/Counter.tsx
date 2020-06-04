import Display from "./components/display/Display";
import ButtonPanel from "./components/button-panel/ButtonPanel";
import React from "react";

export type ButtonsType1 = {
    buttonId:string,
    title:string,
    disabled:boolean
}

type CounterType = {
    counter: number,
    maxCount: number,
    incrementCounter: () => void,
    resetCounter: () => void,
   // buttons:Array<ButtonsType1>
}
export const Counter = (props: CounterType) => {
    const {counter, incrementCounter, maxCount, resetCounter} = props;
    return (
        <div className={'counterBlock'}>
            <Display counter={counter} maxCount={maxCount}/>
            <ButtonPanel incrementCounter={incrementCounter}
                         resetCounter={resetCounter}
                         counter={counter}
                         maxCount={maxCount}
                       //  buttons={buttons}
            />
        </div>
    );
}