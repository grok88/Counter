import React, {useCallback, useEffect} from 'react';
import './App.css';
import Display from "./components/display/Display";
import {Button} from "./components/button-panel/Button";
import {InputBlock} from "./InputBlock";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./store/store";
import {
    CounterReducerInitialType,
    setCheck,
    setCounter,
    setError, setIncrementCounter,
    setInitialCount,
    setMessage, setResetCounter
} from "./store/counter-reducer";

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
    },[]);

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

    }, [dispatch,counterRedux.check]);

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


/*

function App() {

    useEffect(() => {
        let stateAsString = localStorage.getItem('state');
        console.log(stateAsString)
        if (!!stateAsString) {
            let newState = JSON.parse(stateAsString);
            setInitialCount({...newState, disabled: true});
            // Чтоб отображалась на дисплее засетанное значения с localStorage
            counter = newState.min;
            setCounter(counter);
        }

        let checked = localStorage.getItem('checked');
        console.log(checked)
        if (checked) {
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
    );
    // change checkbox and choose localStorage
    let [check, setCheck] = useState<boolean>(false);

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

        if (check) {
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

    const changeChecked = (check: boolean) => {
        console.log(check);
        setCheck(check);
    }

    return (
        <>
            {/!*Блок установки значений*!/}
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

            {/!*Блок отображения счетчика*!/}
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
*/


