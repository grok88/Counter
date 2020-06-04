import React from "react";

type InputBlockType = {
    counter: number
}
export const InputBlock = (props: InputBlockType) => {
    return (
        <div className={'inputBlock'}>
            <p>
                <label> max value:<input type='number' value={5}/> </label>
            </p>
            <p>
                <label> min value:<input type='number' value={props.counter}/> </label>
            </p>
        </div>
    );
}