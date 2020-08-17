type SetInitialCountAC = {
    type: 'SET-INITIAL-COUNT';
    min: number | undefined;
    max: number | undefined;
    disabled: boolean;
}
type SetErrorAC = {
    type: 'SET-ERROR';
    error: boolean;
}
type SetCounterAC = {
    type: 'SET-COUNTER';
    value: number;
}
type setMessageAC = {
    type: 'SET-MESSAGE';
    message: string | null;
}
type SetCheckAC = {
    type: 'SET-CHECK';
    isChecked: boolean;
}

type CounterReducerType = SetInitialCountAC | SetErrorAC | SetCounterAC | setMessageAC | SetCheckAC;

type InitialCountType = {
    min: number;
    max: number;
    disabled: boolean;
}
export type CounterReducerInitialType = {
    initialCount: InitialCountType;
    error: boolean;
    counter: number;
    message: string | null;
    check: boolean;
}

const initialState: CounterReducerInitialType = {
    initialCount: {
        min: 0,
        max: 5,
        disabled: false
    },
    error: false,
    counter: 0,
    message: null,
    check: false
}

export const counterReducer = (state: CounterReducerInitialType = initialState, action: CounterReducerType) => {
    switch (action.type) {
        case 'SET-INITIAL-COUNT' :

            return {
                ...state,
                initialCount: {
                    ...state.initialCount,
                    min: action.min !== undefined ? action.min : state.initialCount.min,
                    max: action.max !== undefined ? action.max : state.initialCount.max,
                    disabled: action.disabled
                }
            }
        case 'SET-ERROR':
            return {
                ...state,
                error: action.error
            }
        case 'SET-COUNTER':
            return {
                ...state,
                counter: action.value
            }
        case 'SET-MESSAGE':
            return {
                ...state,
                message: action.message
            }
        case 'SET-CHECK':
            return {
                ...state,
                check: action.isChecked
            }
        default:
            return state;
    }

}

export const setInitialCount = (min: number | undefined, max: number | undefined, disabled: boolean): SetInitialCountAC => {
    return {
        type: 'SET-INITIAL-COUNT',
        min,
        max,
        disabled
    }
}
export const setError = (error: boolean): SetErrorAC => {
    return {
        type: 'SET-ERROR',
        error
    }
}
export const setCounter = (value: number): SetCounterAC => {
    return {
        type: 'SET-COUNTER',
        value
    }
}
export const setMessage = (message: string | null): setMessageAC => {
    return {
        type: 'SET-MESSAGE',
        message
    }
}
export const setCheck = (isChecked: boolean): SetCheckAC => {
    return {
        type: 'SET-CHECK',
        isChecked
    }
}