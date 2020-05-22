import React, {useState} from 'react';
import './App.css';
import Display from "./components/display/Display";
import ButtonPanel from "./components/button-panel/ButtonPanel";


function App() {
    let maxCount = 5;
    let [counter, setCounter] = useState<number>(0);

    const incrementCounter = () => {
        setCounter(counter => counter + 1);
    }

    const resetCounter = () => {
        setCounter(0);
    }

    return (
        <div className={'counterBlock'}>
            <Display counter={counter} maxCount={maxCount}/>
            <ButtonPanel incrementCounter={incrementCounter}
                         resetCounter={resetCounter}
                         counter={counter}
                         maxCount={maxCount}
            />
        </div>
    );
}

export default App;
