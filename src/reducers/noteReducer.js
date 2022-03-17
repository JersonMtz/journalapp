import { types } from '../types';

const initialState = {
    list: [],
    active: null
}

export const noteReducer = (state = initialState, action) => {

    switch(action.type) {
        case types.noteAdd:
            return {
                list: [{ ...action.payload }, ...state.list],
                active: { ...action.payload }
            }
        case types.noteActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.noteLoad:
            return {
                ...state,
                list: [...action.payload]
            }
        case  types.noteEdit:
            const note = action.payload;
            return {
                ...state,
                list: state.list.map(value => 
                    value.id === note.id ? note : value)
            }
        case types.noteFile:
            return {
                ...state,
                active: {
                    ...state.active,
                    imageUrl: action.payload
                }
            }
        case types.noteDelete:
            return {
                list: state.list.filter(value => value.id !== action.payload),
                active: null
            }
        case types.noteClear:
            return initialState;
        default:
            return state
    }
}