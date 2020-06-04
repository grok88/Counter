import React, {useState} from 'react';
import './App.css';
import {Counter} from "./Counter";
import {v1} from "uuid";


function App() {
    let maxCount = 5;
    let [counter, setCounter] = useState<number>(0);

    const incrementCounter = () => {
        setCounter(counter => counter + 1);
    }

    const resetCounter = () => {
        setCounter(0);
    }

    let [counters, setCounters] = useState([
        {
            id: v1(),
            // buttons:[
            //     {buttonId:v1(), title:"INC", disabled:counter === maxCount},
            //     {buttonId:v1(), title:"RESET", disabled:counter === 0},
            // ]
        }
    ]);

    return (
        <>
            {
                counters.map(elem => {
                    return <Counter
                        key={elem.id}
                        resetCounter={resetCounter}
                        incrementCounter={incrementCounter}
                        maxCount={maxCount}
                        counter={counter}
                      //  buttons={elem.buttons}
                    />
                })
            }
            {/*<Counter resetCounter={resetCounter}*/}
            {/*         incrementCounter={incrementCounter}*/}
            {/*         maxCount={maxCount}*/}
            {/*         counter={counter}*/}
            {/*/>*/}
        </>
    );

    /* <div className={'counterBlock'}>
         <Display counter={counter} maxCount={maxCount}/>
         <ButtonPanel incrementCounter={incrementCounter}
                      resetCounter={resetCounter}
                      counter={counter}
                      maxCount={maxCount}
         />
     </div>*/
}

export default App;

