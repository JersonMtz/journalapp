import { types } from '../types';

export const loadingReducer = (state = false, action) => {
    switch(action.type) {
        case types.showLoading:
            return true;

        case types.hideLoading:
            return false;
        
        default:
            return state
    }
}