
import { HomeActionTypes } from './home.types';

const INITIAL_STATE = {
totaluser: null,
users:null,
totalbalancedata:null,
totalActiveUsersData:null,
deposits:null
};

const homeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case HomeActionTypes.SET_TOTAL_USERS:
        return {
          ...state,
          users: action.payload
        };
        case HomeActionTypes.SET_TOTAL_BALANCE: 
        return {
        ...state,
        totalbalancedata: action.payload 
        };     
        case HomeActionTypes.SET_ACTIVE_USERS:
        return {
        ...state,
        totalActiveUsersData: action.payload  
        }   
        case HomeActionTypes.SET_DEPOSITS_TRANSACTION:
         return {
         ...state,
         deposits:action.payload  
         } 
      default:
        return state;
    }
  };
  
  export default homeReducer;