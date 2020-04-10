import { UI_START_LOADING, UI_STOP_LOADING ,SAVE_COMPONENT_ID} from './actiontypes';

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};
export const SaveComponentId = (id) =>{
    return{
        type:SAVE_COMPONENT_ID,
        id:id
    }
}