import { GetAttendance, AddAttendance, Loading } from "../actions/types";
const initialState = {
    progress:'',
    loading:false,
    msg:''
}

export default function(state= initialState, action) {
    switch (action.type) {
      case GetAttendance:
        return {
          ...state,
          progress: action.payload,
          loading: false
        };
      case AddAttendance:
        return {
          ...state,
          progress: action.payload,
          msg: action.msg,
          error:action.error
        };
      case Loading:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
