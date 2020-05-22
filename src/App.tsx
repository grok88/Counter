import React, {useState} from 'react';
import './App.css';
import Display from "./components/display/Display";
import ButtonPanel from "./components/button-panel/ButtonPanel";


function App() {
    let [counter, setCounter] = useState<number>(0);

    const incrementCounter = () => {
        counter += 1;
        setCounter(counter);
    }

    const resetCounter = () => {
        setCounter(0);
    }

    return (
        <div className={'counterBlock'}>
            <Display counter={counter}/>
            <ButtonPanel incrementCounter={incrementCounter}
                         resetCounter={resetCounter}
                         counter={counter}
            />
        </div>
    );
}

export default App;
