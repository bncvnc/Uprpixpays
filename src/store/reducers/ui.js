import { UI_START_LOADING, UI_STOP_LOADING ,SAVE_COMPONENT_ID} from "../actions/actiontypes";
const initialState = {
  isLoading: false,
  id:''
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UI_START_LOADING:
      return {
        ...state,
        isLoading: true
      };
    case UI_STOP_LOADING:
      return {
        ...state,
        isLoading: false
      };
    case SAVE_COMPONENT_ID :
      return{
        ...state,
        id:action.id
      }  
    default:
      return state;
  }
};

export default reducer;