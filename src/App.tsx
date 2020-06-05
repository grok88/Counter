import React, {useEffect, useState} from 'react';
import './App.css';
import Display from "./components/display/Display";
import {Button} from "./components/button-panel/Button";
import {InputBlock} from "./InputBlock";

export type InitialCountType = {
    min: number,
    max: number,
    disabled: boolean,
}

function App() {

    useEffect(() => {
        let stateAsString = localStorage.getItem('state');

        if (!!stateAsString) {
            let newState = JSON.parse(stateAsString);
            setInitialCount({...newState, disabled: true});
            // Чтоб отображалась на дисплее засетанное значения с localStorage
            counter = newState.min;
            setCounter(counter);
        }

        let checked = localStorage.getItem('checked');
        if(checked){
            setCheck(JSON.parse(checked));
        }

    }, [])

    // Для добавления класса ошибуи на инпуты при неверных значениях
    let [error, setError] = useState<boolean>(false);
    //Отображение на display сообщений при ошибках, изменении значений и самого count
    let [message, setMessage] = useState<string | null>(null);

    let [counter, setCounter] = useState<number>(0);

    // для Initial
    let [initialCount, setInitialCount] = useState<InitialCountType>({
            min: 0,
            max: 5,
            disabled: false
        }
    )

    const addToLocalStorage = () => {
        localStorage.setItem('state', JSON.stringify(initialCount));
        localStorage.setItem('checked', JSON.stringify(check));
    }

    const incrementCounter = () => {
        setCounter(counter => counter + 1);
    }

    const resetCounter = () => {
        setCounter(initialCount.min);
    }

    // Передача начальных значений установленых в <InputBlock>
    const setInitialValue = () => {
        setMessage(null);
        counter = initialCount.min;
        setCounter(counter);
        setInitialCount({...initialCount, disabled: true});
        // initialCount.disabled = true;

        if (check){
            addToLocalStorage();
        } else {
            localStorage.clear();
        }

    }
    // Установка минимальное значения
    const onChangeMin = (value: number) => {
        if (value < 0 || value >= initialCount.max) {
            setError(true);
            setMessage('Incorrect value');

            setInitialCount({
                ...initialCount,
                min: value,
                disabled: true
            });
        } else {
            setError(false);
            setMessage('Enter value press Set');
            setInitialCount({
                ...initialCount,
                min: value,
                disabled: false
            });
        }
    }
    // Установка максимального значения
    const onChangeMax = (value: number) => {

        if (value <= initialCount.min) {
            setError(true);
            setMessage('Incorrect value');
            //initialCount.disabled = true;
            //setInitialCount({...initialCount});
            setInitialCount({
                ...initialCount,
                max: value,
                disabled: true
            });
        } else {
            setError(false);
            setInitialCount({
                ...initialCount,
                max: value,
                disabled: false
            });
            setMessage('Enter value press Set');
        }
    }

    // change checkbox and choose localStorage
    let [check, setCheck] = useState<boolean>(false);

    const changeChecked = (check:boolean) => {
         console.log(check);
        setCheck(check);
    }

    return (
        <>
            {/*Блок установки значений*/}
            <div className={'counterBlock'}>
                <InputBlock counter={initialCount}
                            check={check}
                            onChangeMin={onChangeMin}
                            onChangeMax={onChangeMax}
                            error={error}
                            checked={changeChecked}
                />
                <div className={'buttonBlock'}>
                    <Button title={'SET'}
                            typeCounter={setInitialValue}
                            disabled={initialCount.disabled}
                    />
                </div>
            </div>

            {/*Блок отображения счетчика*/}
            <div className={'counterBlock'}>
                <Display counter={counter} initialCount={initialCount} message={message} error={error}/>
                <div className={'buttonBlock'}>
                    <Button title={'INC'}
                            typeCounter={incrementCounter}
                            disabled={counter === initialCount.max}
                    />
                    <Button title={'RESET'}
                            typeCounter={resetCounter}
                            disabled={counter === initialCount.min}
                    />
                </div>
            </div>
        </>
    );
}

export default App;

