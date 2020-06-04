import React, {useState} from 'react';
import './App.css';
import Display from "./components/display/Display";
import {Button} from "./components/button-panel/Button";
import {InputBlock} from "./InputBlock";


function App() {
    let maxCount = 5;
    let [counter, setCounter] = useState<number>(0);

    // для Initial
    let [initialCount, setInitialCount] = useState({
            min:0,
            max:5
        }
    )

    console.log(initialCount)
    const incrementCounter = () => {
        setCounter(counter => counter + 1);
    }

    const resetCounter = () => {
        setCounter(0);
    }

    const setInitialValue = () => {
        console.log('Initial');
    }

    return (
     <>
         <div className={'counterBlock'}>
            <InputBlock counter={counter}/>
             <div className={'buttonBlock'}>
                 <Button title={'SET'}
                         typeCounter={setInitialValue}
                         disabled={false}

                 />
             </div>
         </div>

         <div className={'counterBlock'}>
             <Display counter={counter} maxCount={maxCount}/>
             <div className={'buttonBlock'}>
                 <Button title={'INC'}
                         typeCounter={incrementCounter}
                         disabled={counter === maxCount}
                 />
                 <Button title={'RESET'}
                         typeCounter={resetCounter}
                         disabled={counter === 0}
                 />
             </div>
         </div>
     </>
    );
}

export default App;

