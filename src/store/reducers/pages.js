import {
    SAVEBESTIMAGES,
    SAVE_OPEN_CHALLENGEDATA,
    SAVE_USER_INFO_WALLET,
    SAVE_APP_INFO,
    SAVE_MY_CHALLENGE,
    OPEN_CHALLENGE,
    SAVE_CLOSED_CHALLENGES,
    SAVE_PAST_CHALLENGES,
    SAVE_VOTE_IMAGES, 
    FRIENDS_INVITE_DATA,
    CHALLENGE_INVITE_DATA,
    SAVEMYPHOTOS,
    SAVE_USER_PROFILE_DATA, 
    SAVE_BIDDING_NOTIFICATIONS, 
    SAVE_BALANCE_OVERVEW,
    SAVE_INVITAION,
    NOTIFICATION,
    SAVE_CART_BID,
    SAVE_BUY_SELL_DATA,
    SAVE_BUY_SELL_DETAILS, 
    SAVE_FRIENDS_INVITE_DATA,
    ACCEPT, 
    SAVE_DETAILS_IAMGES,
    ADD_VOTETING_LIST,
    SAVE_PAGINATION_DATA,
    AddImageToLikeList,
    ADDIMAGETOREPORTLIST,
    ON_VOTE_PRESSED,
    ON_VOTE_PRESSED_RESET
    } from '../actions/actiontypes';
import { validate } from '@babel/types';
const initialState ={
    BestImages:[],
    VoteImages:[],
    MyPhotos:[],
    openChallenge:[],
    Mychalleng:[],  
    CurrentChallenge:[],
    CloseChallenges:[],
    PastChallenges:[],
    SaveUserInfoWallet:[],
    SaveInviteFriends:[],
    SaveInviteChalenge:[],
    SaveuserProfiledata:{},
    Savebiddingsdata:[],
    SaveCartBid:[],
    SaveInviteTable:[],
    Savebalance:{},
    GetNotifiactions:[],
    BuySelldata:[],
    SaveBuysellDetails:{},
    SaveInviteFriendsData:{},
    SaveAcceptdata:[],
    getdetailsimages:[],
    paginationData:{},
    selectedItems:[],

    first:{},
    second:{},
    third:{},
    fourth:{},
    fifth:{},
    sixth:{},
    sevent:{},
    eight:{},
    nineght:{},
    tenght:{},
    eleven:{},
    twelve:{},
    thirten:{},
    fourten:{},
    fiften:{},
    sixten:{},
    seventen:{},
    eighten:{},
    ninghten:{},
    twenty:{},
    twentyone:{}
}
const reducer = (state = initialState,action) =>{
    switch (action.type) {
        case SAVEBESTIMAGES:
            return{
                ...state,
                BestImages:action.BestImages,
            }
            case SAVEMYPHOTOS:
            return{
                ...state,
                MyPhotos:action.MyPhotos,  ///first var is state defined above and second is that defined in save method in reducer
            }
        case SAVE_OPEN_CHALLENGEDATA:
            return{
                ...state,
                openChallenge:action.OpenChallenge
            }
        case SAVE_USER_PROFILE_DATA:
            return{
                ...state,
            SaveuserProfiledata:action.user
            }

        case SAVE_BIDDING_NOTIFICATIONS:
            return{
                ...state,
                Savebiddingsdata:action.bidding,
            }
        case SAVE_BALANCE_OVERVEW:
           return{
               ...state,
               Savebalance:action.balnce
           }
        case SAVE_INVITAION:
            return{
                ...state,
                SaveInviteTable:action.invite
            }
        case NOTIFICATION:
            return{
                ...state,
                GetNotifiactions:action.notification
            }
        case SAVE_CART_BID:
            return{
              ...state,
              SaveCartBid:action.cartbid
            }
        case SAVE_BUY_SELL_DATA:
            {
                return{
                    ...state,
                    BuySelldata:action.busell,
                }
            }
        case SAVE_BUY_SELL_DETAILS:
            return{
                ...state,
                SaveBuysellDetails:action.buselldetaisl,
            }
        case SAVE_FRIENDS_INVITE_DATA:
            {
                return{
                    ...state,
                    SaveInviteFriendsData:action.mydata,
                }
            }
        case ACCEPT:
            {
                return{
                    ...state,
                    SaveAcceptdata:action.val,
                }
            }
            
        case SAVE_DETAILS_IAMGES:
            
                return{
                    ...state,
                    getdetailsimages:action.image
                }
        case ON_VOTE_PRESSED:
            if(state.selectedItems.filter(e => e === action.id).length > 0)
            {   
                return{
                    ...state,
                  selectedItems: state.selectedItems.filter((item)=> {
                    return item !== action.id;
                })
                }

              console.log('This Function Ran');
            }else{

                return{
                    ...state,
                  selectedItems:state.selectedItems.concat(action.id)
                }

            }
             
        case ON_VOTE_PRESSED_RESET:
            return{
                ...state,
                selectedItems:[]
            }  
        case SAVE_APP_INFO :
            return{
                ...state,
                first:action.first,
                second:action.second,
                third:action.third,
                fourth:action.fourth,
                fifth:action.fifth,
                sixth:action.sixth,
                sevent:action.sevent,
                eight:action.eight,
                nineght:action.nineght,
                tenght:action.tenght,
                eleven:action.eleven,
                twelve:action.twelve,
                thirten:action.thirten,
                fourten:action.fourten,
                fiften:action.fiften,
                sixten:action.sixten,
                seventen:action.seventen,
                eighten:action.eighten,
                ninghten:action.ninghten,
                twenty:action.twenty,
                twentyone:action.twentyone
                
            }        
        case SAVE_MY_CHALLENGE:{
            return{
                ...state,
                Mychalleng:action.Mychalleng
            }
        }
        case OPEN_CHALLENGE:{
            return{
                ...state,
                CurrentChallenge:action.CurrentChallenge
            }
        }
        case SAVE_CLOSED_CHALLENGES:{
            return{
                ...state,
                CloseChallenges:action.CloseChallenges
            }
        }  
        case SAVE_PAST_CHALLENGES:{
            return{
                ...state,
                PastChallenges:action.PastChallenges
            }
        }  
        case SAVE_VOTE_IMAGES:{
            return{
                ...state,
                VoteImages:action.VoteImages
            }
        }
        case SAVE_USER_INFO_WALLET:
            {
                return{
                    ...state,
                    SaveUserInfoWallet:action.SaveUserInfoWallet
                }
            }
        case FRIENDS_INVITE_DATA:
            return{
                ...state,
                SaveInviteFriends:action.SaveInviteFriends
            }
        case CHALLENGE_INVITE_DATA:
                return{
                    ...state,
                    SaveInviteChalenge:action.SaveInviteChalenge
                }
        case ADD_VOTETING_LIST:
        const newArray = [...state.VoteImages];
          newArray[action.index].selected = !newArray[action.index].selected;
            return{
                ...state,
                VoteImages:newArray
            }
        case AddImageToLikeList:
        const newArrayForLike = [...state.VoteImages];
        newArrayForLike[action.index].liked = !newArrayForLike[action.index].liked;
            return{
                ...state,
                VoteImages:newArrayForLike
            } 
        case ADDIMAGETOREPORTLIST:
            const newArrayAfterReport =[...state.VoteImages];
            newArrayAfterReport[action.index].reported = !newArrayAfterReport[action.index].reported
            return{...state,
                VoteImages:newArrayAfterReport
                
            }       
        case SAVE_PAGINATION_DATA:
            return{
                ...state,
                paginationData:action.paginate
            }    
        default:
            return state;
            
    }
}
export default reducer;