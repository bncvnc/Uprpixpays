import {SAVE_USERINFO,LOGOUT_USER,SAVE_USER_INFO_WALLET,SAVE_USERINFO_VC,
    SAVE_GOOGLE_LOGIN,SAVE_SOCIAL_LOGIN,SAVE_SOCIAL_SIGIN} from '../actions/actiontypes';
const initialState ={
    isLoggedIn: false,
    user: {},
    charge:0,
    wand:0,
    flip:0,
    wallet:0
}

const reducer = (state = initialState,action) =>{
    switch (action.type) {
        case SAVE_USERINFO:
            return{
                ...state,
                isLoggedIn:action.user.isLoggedIn,
                user:action.user.user
            }
        case LOGOUT_USER:
            return{
                ...state,
                isLoggedIn:false,
                user:{}
            }
        case SAVE_USER_INFO_WALLET:
            return{
                ...state,
                charge:action.Charge,
                flip:action.Flip,
                wand:action.Wand,
                wallet:action.Wallet
            }
        case SAVE_USERINFO_VC:
            return{
                ...state,
                // isLoggedIn:action.user.uservc,
                // user:action.user
                // isLoggedIn:action.user.isLoggedIn,
                user:action.uservc.user
            }
         case SAVE_GOOGLE_LOGIN:
             return{
                 ...state,
                 user:action.user.googledata,
             }   
        case SAVE_SOCIAL_LOGIN:
                return{
                    ...state,
                    user:action.user.social
                }  
        case SAVE_SOCIAL_SIGIN:
                return{
                    ...state,
                    user:action.user.user
                }   
        default:
            return state;
            
    }
}
export default reducer;