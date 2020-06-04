import React, {useState} from 'react';
import './App.css';
import Display from "./components/display/Display";
import {Button} from "./components/button-panel/Button";
import {InputBlock} from "./InputBlock";

export type InitialCountType = {
    min: number,
    max: number,
    disabled: boolean
}

function App() {
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

    const incrementCounter = () => {
        setCounter(counter => counter + 1);
    }

    const resetCounter = () => {
        console.log(counter)
        setCounter(initialCount.min);
    }

    // Передача начальных значений установленых в <InputBlock>
    const setInitialValue = () => {
        setMessage(null);
        counter = initialCount.min;
        setCounter(counter);

        initialCount.disabled = true;
        setInitialCount({...initialCount});

    }
    // Установка минимальное значения
    const onChangeMin = (value: number) => {
        if (value < 0 || value >= initialCount.max) {
            setError(true);
            setMessage('Incorrect value');
            initialCount.disabled = true;
            setInitialCount({...initialCount});
            //setInitialCount({...initialCount, disabled: true});
        } else {
            setError(false);
            initialCount.disabled = false;
            setMessage('Enter value press Set');
            setInitialCount({...initialCount,disabled: false});
        }

        setInitialCount({
            ...initialCount, min: value
        });
    }
    // Установка максимального значения значения
    const onChangeMax = (value: number) => {

        if (value <= initialCount.min) {
            setError(true);
            setMessage('Incorrect value');
            initialCount.disabled = true;
            setInitialCount({...initialCount});
           // setInitialCount({...initialCount, disabled: true});
        } else {
            setError(false);
            initialCount.disabled = false;
            setInitialCount({...initialCount, disabled: false});
            setMessage('Enter value press Set');
        }

        setInitialCount({
            ...initialCount, max: value
        });
    }
    return (
        <>
            {/*Блок установки значений*/}
            <div className={'counterBlock'}>
                <InputBlock counter={initialCount}
                            onChangeMin={onChangeMin}
                            onChangeMax={onChangeMax} error={error}/>
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

