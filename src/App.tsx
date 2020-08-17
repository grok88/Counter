import React, {useCallback, useEffect} from 'react';

import './App.css';
import Display from "./components/display/Display";
import {Button} from "./components/button-panel/Button";

import {useDispatch, useSelector} from "react-redux";


import {InputBlock} from './InputBlock';
import {AppRootState} from './store/store';
import {
    CounterReducerInitialType,
    setCheck,
    setCounter,
    setError, setIncrementCounter,
    setInitialCount,
    setMessage, setResetCounter
} from './store/counter-reducer';

export type InitialCountType = {
    min: number,
    max: number,
    disabled: boolean,
}

function App() {
    console.log('App');
    const dispatch = useDispatch();
    const counterRedux = useSelector<AppRootState, CounterReducerInitialType>(state => state.counter);

    useEffect(() => {
        let stateAsString = localStorage.getItem('state');
        if (!!stateAsString) {
            let newState = JSON.parse(stateAsString);
            dispatch(setInitialCount(newState.min, newState.max, false));
            dispatch(setCounter(newState.min));
        }

        let checked = localStorage.getItem('checked');
        if (checked) {
            dispatch(setCheck(JSON.parse(checked)));
        }

    }, [dispatch]);

    const addToLocalStorage = useCallback(() => {
        localStorage.setItem('state', JSON.stringify(counterRedux.initialCount));
        localStorage.setItem('checked', JSON.stringify(counterRedux.check));
    }, []);

    //Button type
    const incrementCounter = useCallback(() => {
        dispatch(setIncrementCounter(counterRedux.counter + 1));
    }, [dispatch])

    const resetCounter = useCallback(() => {
        dispatch(setResetCounter(counterRedux.initialCount.min));
    }, [dispatch]);

    //InputBlock
    // Передача начальных значений установленых в <InputBlock>
    const setInitialValue = useCallback(() => {
        dispatch(setMessage(null));
        dispatch(setCounter(counterRedux.initialCount.min));

        dispatch(setInitialCount(undefined, undefined, true));

        if (counterRedux.check) {
            addToLocalStorage();
        } else {
            localStorage.clear();
        }

    }, [dispatch, counterRedux.check]);

    // Установка минимальное значения
    const onChangeMin = useCallback((value: number) => {
        if (value < 0 || value >= counterRedux.initialCount.max) {
            dispatch(setError(true));
            dispatch(setMessage('Incorrect value'));
            dispatch(setInitialCount(value, undefined, true));
        } else {
            dispatch(setError(false));
            dispatch(setMessage('Enter value press Set'));
            dispatch(setInitialCount(value, undefined, false));
        }
    }, [dispatch]);

    // Установка максимального значения
    const onChangeMax = useCallback((value: number) => {
        if (value <= counterRedux.initialCount.min) {
            dispatch(setError(true));
            dispatch(setMessage('Incorrect value'));
            dispatch(setInitialCount(undefined, value, true));
        } else {
            dispatch(setError(false));
            dispatch(setInitialCount(undefined, value, false));
            dispatch(setMessage('Enter value press Set'));
        }
    }, [dispatch]);
    // Записать в localStorage
    const changeChecked = useCallback((check: boolean) => {
        dispatch(setCheck(check));
    }, [dispatch]);

    return (
        <>
            {/*Блок установки значений*/}
            <div className={'counterBlock'}>
                <InputBlock counter={counterRedux.initialCount}
                            check={counterRedux.check}
                            onChangeMin={onChangeMin}
                            onChangeMax={onChangeMax}
                            error={counterRedux.error}
                            checked={changeChecked}
                />
                <div className={'buttonBlock'}>
                    <Button title={'SET'}
                            typeCounter={setInitialValue}
                            disabled={counterRedux.initialCount.disabled}
                    />
                </div>
            </div>

            {/*Блок отображения счетчика*/}
            <div className={'counterBlock'}>
                <Display counter={counterRedux.counter}
                         initialCount={counterRedux.initialCount}
                         message={counterRedux.message}
                         error={counterRedux.error}/>
                <div className={'buttonBlock'}>
                    <Button title={'INC'}
                            typeCounter={incrementCounter}
                            disabled={counterRedux.counter === counterRedux.initialCount.max}
                    />
                    <Button title={'RESET'}
                            typeCounter={resetCounter}
                            disabled={counterRedux.counter === counterRedux.initialCount.min}
                    />
                </div>
            </div>
        </>
    );
}

export default App;



