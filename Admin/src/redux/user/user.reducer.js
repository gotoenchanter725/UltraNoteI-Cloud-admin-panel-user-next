import { UserActionTypes } from "./user.types";
const INITIAL_STATE = {
  token: null,
  profiledata: null,
  email: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        token: action.payload,
      };
    case UserActionTypes.SET_USER_PROFILE_DATA:
      return {
        ...state,
        profiledata: action.payload,
      };
    case UserActionTypes.SET_USER_EMAIL_AUTHICATOR:
      return {
        ...state,
        email: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
