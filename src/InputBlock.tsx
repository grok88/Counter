import React, {ChangeEvent} from "react";

type CounterPropsType = {
    min: number,
    max: number,
    disabled:boolean
}

type InputBlockType = {
    counter: CounterPropsType,
    onChangeMin: (value: number) => void,
    onChangeMax: (value: number) => void,
    error: boolean,
    checked: (check: boolean) => void,
    check:boolean
}
export const InputBlock = (props: InputBlockType) => {
    const {counter, onChangeMin, onChangeMax, error, checked, check} = props;

    const onChangeMinValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeMin(Number(e.currentTarget.value));
    }
    const onChangeMaxValue = (e: ChangeEvent<HTMLInputElement>) => {
        onChangeMax(Number(e.currentTarget.value));
    }

    const onChangeChecked = (e:ChangeEvent<HTMLInputElement>) => {
        checked(e.currentTarget.checked);
    }

    return (
        <div className={'inputBlock'}>
            <p>
                <label> Сохранить в localStorage:<input type='checkbox'
                                                        checked={check}
                                                        onChange={onChangeChecked}/> </label>
            </p>
            <p>
                <label> max value:<input className={error ? 'error' : ''} type='number' value={counter.max}
                                         onChange={onChangeMaxValue}/> </label>
            </p>
            <p>
                <label> min value:<input className={error ? 'error' : ''} type='number' value={counter.min}
                                         onChange={onChangeMinValue}/> </label>
            </p>
        </div>
    );
}