import React, {ChangeEvent} from "react";

type CounterPropsType = {
    min: number,
    max: number
}

type InputBlockType = {
    counter: CounterPropsType,
    onChangeMin: (value: number) => void,
    onChangeMax: (value: number) => void,
    error:string | null
}
export const InputBlock = (props: InputBlockType) => {
    const {counter, onChangeMin, onChangeMax,error} = props;

    const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeMin(Number(e.currentTarget.value));
    }
    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeMax(Number(e.currentTarget.value));
    }

    return (
        <div className={'inputBlock'}>
            <p>
                <label> max value:<input className={error ? 'error': ''} type='number' value={counter.max} onChange={onChangeMaxValue} /> </label>
            </p>
            <p>
                <label> min value:<input  className={error ? 'error': ''} type='number' value={counter.min} onChange={onChangeMinValue}/> </label>
            </p>
        </div>
    );
}