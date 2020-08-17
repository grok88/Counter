type CounterReducerType = string;

type InitialCountType = {
    min: number;
    max: number;
    disabled: boolean;
}
export type CounterReducerInitialType = {
    initialCount: InitialCountType;
}

const initialState: CounterReducerInitialType = {
    initialCount: {
        min: 0,
        max: 5,
        disabled: false
    }
}

export const counterReducer = (state: CounterReducerInitialType = initialState, action: CounterReducerType) => {
    switch ('1') {
        default:
            return state;
    }

}