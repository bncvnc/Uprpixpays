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
      SAVEMYPHOTOS,
      SAVE_USER_PROFILE_DATA,
      SAVE_BIDDING_NOTIFICATIONS,
      SAVE_BALANCE_OVERVEW,
      SAVE_INVITAION,
      NOTIFICATION,
      SAVE_CART_BID,
      SAVE_BUY_SELL_DETAILS
      ,SAVE_BUY_SELL_DATA,
      SAVE_FRIENDS_INVITE_DATA,
      SAVE_DETAILS_IAMGES,
      ADD_VOTETING_LIST,
      SAVE_PAGINATION_DATA,
      AddImageToLikeList,
      ADDIMAGETOREPORTLIST
} from './actiontypes';
import {navigation, Navigation} from 'react-native-navigation';
import {uiStartLoading,uiStopLoading} from './index';
import {Alert} from 'react-native';
import FastImage from 'react-native-fast-image';
export const GetImages = () => {
   return dispatch => {
      fetch('https://urpixpays.com/stagging_urpixpays/best_images')
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData);
            let images = [];
            for (const key in responseData) {
               images.push({
                  ...responseData[key],
               });
            }
            console.log(images);
            dispatch(SaveImages(images));
         })
   }
}
export const MyPhoto = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/my_photos/'+getState().user.user.no)
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData);
            let images = [];
            for (const key in responseData) {
               images.push({
                  ...responseData[key],
               });
            }
            console.log(images);
            dispatch(MyPics(images));
         })
   }
}

export const getDetailsImage = () => {
   return (dispatch,getState) => {
      let ChallengeId = getState().BestImages.CurrentChallenge.length == 1 ?getState().BestImages.CurrentChallenge[0].id:getState().BestImages.CurrentChallenge;
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/detail/'+ChallengeId)
         .then((response) => response.json())
         .then((responseData) => {
            // console.log(responseData);

            let data = [];
            // for (const key in responseData.rank){
               data.push({
                  ...responseData
               });
            // }
         
            console.log(data)
            dispatch(SaveDetailsImages(data));
         })
   }
}

export const SaveUserInfoWallet = (type, text) => {
   return (dispatch,getState) => {
      dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/userpix/get', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "uid":getState().user.user.no,
            "type": parseInt(type),
            "amount": parseInt(text)
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData.data);
            "POST Response",
               "Response Body -> " + JSON.stringify(responseData)
            dispatch(uiStopLoading());
               if(responseData.message === 'You do not have sufficient balance in your wallet!')
               {
                  alert('You do not have sufficient balance in your wallet! $' + responseData.data);
               }
               else 
               // if (responseData.data)
                {
               alert(`Action Successful!`);
               dispatch(UserProfileData())
               dispatch(SaveUserDataInfo(responseData.data.Flip, responseData.data.Charge,
                  responseData.data.Wand, responseData.data.walet));
               // dispatch(uiStopLoading());
               // changeScreen('UrPicsPay.mychallenges');
            } 
            // else if (!responseData.data) {
               
            //    //   dispatch(uiStopLoading());
            //    //   alert(responseData.data);
            // }
         })
         .catch((err) => {
            console.log(err)
            dispatch(uiStopLoading())
         })
         .done();
   }
}


export const GiveVoteToImages = (votearray,likedarray,reportarray) => {
   return (dispatch,getState) => {
      dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/voting/set', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "uid":getState().user.user.no,
            "cid": getState().BestImages.CurrentChallenge[0].id,
            "votearry": votearray.join(),
            "likearry":likedarray.join(),
            "question":reportarray.join()
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData);
            "POST Response",
               "Response Body -> " + JSON.stringify(responseData)
               dispatch(uiStopLoading());

               if(responseData.message === 'You do not have sufficient balance in your wallet!')
               {
                  alert('You do not have sufficient balance in your wallet! $' + responseData.data);
               }
               else if(responseData.state ==1)
               // if (responseData.data)
                {

                  
                let  NewVotes = getState().BestImages.VoteImages.filter((e) =>{
                     // console.log(e.selected);
                    return e.selected ==false
                   })
                   console.log(NewVotes);
                   dispatch(SaveVoteImages(NewVotes));
               // alert(`Successfully Voted`);
               // this.UserProfileData(),
               // dispatch(SaveUserDataInfo(responseData.data.Flip, responseData.data.Charge,
               //    responseData.data.Wand, responseData.data.walet));
               // dispatch(uiStopLoading());
               // changeScreen('UrPicsPay.mychallenges');
            } 
            // else if (!responseData.data) {
               
            //    //   dispatch(uiStopLoading());
            //    //   alert(responseData.data);
            // }
         })
         .catch((err) => {
            console.log(err)
            dispatch(uiStopLoading());
         })
         .done();
   }
}

export const GiveVoteAndMoveBAck = (votearray,likedarray,reportarray) => {
   return (dispatch,getState) => {
      // dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/voting/set', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "uid":getState().user.user.no,
            "cid": getState().BestImages.CurrentChallenge[0].id,
            "votearry": votearray.join(),
            "likearry":likedarray.join(),
            "question":reportarray.join()
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData);
            "POST Response",
               "Response Body -> " + JSON.stringify(responseData)
               dispatch(uiStopLoading());

               if(responseData.message === 'You do not have sufficient balance in your wallet!')
               {
                  alert('You do not have sufficient balance in your wallet! $' + responseData.data);
               }
               else if(responseData.state ==1)
               // if (responseData.data)
                {

                  
               //  let  NewVotes = getState().BestImages.VoteImages.filter((e) =>{
               //       // console.log(e.selected);
               //      return e.selected ==false
               //     })
               //     console.log(NewVotes);
               //     dispatch(SaveVoteImages(NewVotes));
               // alert(`Successfully Voted`);
               // this.UserProfileData(),
               // dispatch(SaveUserDataInfo(responseData.data.Flip, responseData.data.Charge,
               //    responseData.data.Wand, responseData.data.walet));
               // dispatch(uiStopLoading());
               // changeScreen('UrPicsPay.mychallenges');
            } 
            // else if (!responseData.data) {
               
            //    //   dispatch(uiStopLoading());
            //    //   alert(responseData.data);
            // }
         })
         .catch((err) => {
            console.log(err)
            dispatch(uiStopLoading());
         })
         .done();
   }
}
export const GetVoteImages = () => {
   return (dispatch,getState) => {
      console.log(getState().BestImages.CurrentChallenge.length);
      let ChallengeId = getState().BestImages.CurrentChallenge.length == 1 ?getState().BestImages.CurrentChallenge[0].id:getState().BestImages.CurrentChallenge;
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/voting/cid/'+ChallengeId+'/uid/'+getState().user.user.no)
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData);
            let images = [];
            if (responseData.wand_charge) {
               for (const key in responseData.wand_charge) {
                  images.push({
                     ...responseData.wand_charge[key],
                     selected:false,
                     liked:false,
                     reported:false
                  });
               }

            }
            if (responseData.normal_img) {
               for (const key in responseData.normal_img) {
                  images.push({
                     ...responseData.normal_img[key],
                     selected:false,
                     liked:false,
                     reported:false
                  });
               }

            }

            //  
            //   console.log(images);
            dispatch(SaveVoteImages(images));
         }).catch((err) =>{
            console.log(err);
         })
   }
}
export const OpenChallenges = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/open/'+getState().user.user.no)
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData.challenge);
            dispatch(SaveOpenChallengesData(responseData.challenge))
         }).catch((err) =>{
            console.log(err);
         })
   }
}
export const MyChallenges = () => {
   return (dispatch,getState) => {
      console.log('asdasdasdas dasd asd asdas das');
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/my/'+getState().user.user.no)
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData.challenge);
            dispatch(SaveMyChallenge(responseData.challenge))
           
         }).catch((err) =>{
            console.log(err);
         })
   }
}

export const RefreshTaskData = (cid) => {
   return (dispatch,getState) => {
      console.log('asdasdasdas dasd asd asdas das');
      fetch('https://urpixpays.com/stagging_urpixpays/GetOneChallege/my/'+getState().user.user.no+'/'+cid)
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData.challenge);
            dispatch(OpenjoinedChallenge(responseData.challenge))
           
         }).catch((err) =>{
            console.log(err);
         })
   }
}

export const Closed = () => {

   return (dispatch,getState) => {
      //dispatch(uiStartLoading());

      fetch('https://urpixpays.com/stagging_urpixpays/challenges/closed/'+getState().user.user.no)
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData.challenge);
            dispatch(SaveClosedChallengesData(responseData.challenge))
         })
         .catch((err) => console.log(err))
         .done();
   }


}

export const Past = () => {

   return (dispatch,getState) => {
      //dispatch(uiStartLoading());

      fetch('https://urpixpays.com/stagging_urpixpays/challenges/pass/'+getState().user.user.no)
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData.challenge);
            dispatch(SavePastChallengesData(responseData.challenge))
         })
         .catch((err) => console.log(err))
         .done();
   }


}

export const FriendsIviteData = (name, email) => {
   return (dispatch,getState) => {
      console.log(name);
      console.log(email);
      fetch('https://urpixpays.com/stagging_urpixpays/friend/invite', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "uid":getState().user.user.no,
            "name": name,
            "email": email,
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData)
            dispatch(SaveFriendsIviteData())

         })
         .catch((err) => console.log(err))
         .done();
   }
}

export const SaveFriendsIviteData = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/invite/'+getState().user.user.no, {
         
      })
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData)

            let data = [];
            for (const key in responseData) {
               data.push({
                  ...responseData[key],
               });
            }
            console.log(data);
            dispatch(SaveFreindsData(data))

         })
         .catch((err) => console.log(err))
         .done();
   }
}
export const ResetPassword = (email) => {
   return dispatch => {
      fetch('https://urpixpays.com/stagging_urpixpays/reset_pass', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            // "uid": "222",
            "email": email,

         }),
      })
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData.message === 'Sent password to email. Please signin with your correct password.');
            if (responseData.data) {
               alert('Request sent');
            }
            else {
               alert('Request not sent');
            }

         })
         .catch((err) => console.log(err))
         .done();
   }
}

export const UserProfileDataaa = () => {
   fetch('https://urpixpays.com/stagging_urpixpays/myprofile/222')
      .then((response) => response.json())
      .then((responseData) => {
         console.log(responseData)

      })
      .done();
}

export const ForgotPassword = (email) => {
   return dispatch => {
      dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/forgot_password', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            // "uid": "222",
            "email": email,
           
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData)
            if (responseData.message === 'Invalid email') {
               alert('Invalid email');
               dispatch(uiStopLoading());
            }
            else {
               dispatch(uiStopLoading());
               alert('Request sent to email');
            }

         })
         .catch((err) => console.log(err))
         .done();
   }
}

export const UploadImage = (image,id,screen) => {
   return (dispatch,getState) => {
      console.log('submitteing');
      dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/image/submit', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "iid": 0,
            "uid":getState().user.user.no,
            "cid": id,
            "IdImage": image,
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {
            dispatch(uiStopLoading());
            console.log(responseData.state)
            if(responseData.state){
               Alert.alert(
                  'Alert',
                  responseData.message,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
                dispatch(MyChallenges())
                Navigation.pop(screen)
            }else{
               Alert.alert(
                  'Alert',
                  responseData.message,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
            }

         })
         .catch((err) => {
            dispatch(uiStopLoading());   
            console.log(err)
         })
         .done();
   }
}
export const FlipImage = (image,id,imageId,screen) => {
   return (dispatch,getState) => {
      console.log('submitteing');
      dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/image/submit', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "iid": imageId,
            "uid":getState().user.user.no,
            "cid": id,
            "IdImage": image,
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData)
            dispatch(uiStopLoading());
            dispatch(RefreshTaskData(id))
            dispatch(UserProfileData())
            if(responseData.state ==2){
               Alert.alert(
                  'Alert',
                  responseData.message,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
                dispatch(MyChallenges())
               //  Navigation.pop(screen)
            }else{
               Alert.alert(
                  'Alert',
                  responseData.message,
                  [
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
            }

         })
         .catch((err) =>{
            dispatch(uiStopLoading());
            console.log(err)})
         .done();
   }
}

export const GetNotification = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/getNotification', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
          
            "uid": getState().user.user.no,
            
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData)
            if (responseData) {

               let userData= [];
               for (const key in responseData.data) {
                  userData.push({
                     ...responseData.data[key],

                  });
               }
         
               dispatch(Notifications(userData))




            } else {


            }

         })
         .catch((err) => console.log(err))
         .done();
   }
}


export const ChallengeInviteData = (name, email,cid) => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/challenge/invite', {
         method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "uid":getState().user.user.no,
            "cid": cid,
            "name": name,
            "email": email,
         }),
      })
         .then((response) => response.json())
         .then((responseData) => {

            console.log(responseData)
            if(responseData.state){
               alert(responseData.message);
            }
            // dispatch(SaveFreindsInvitedata(responseData.data))

         })
         .catch((err) => console.log(err))
         .done();
   }
}

export const UserProfileData = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/myprofile/'+getState().user.user.no)

         .then((response) => response.json())
         .then((responseData) => {

            if(responseData)
            {
         
               let userData = {
                  name: responseData.u_name,
                  email: responseData.u_email,
                  age: responseData.u_age,
                  timestamp: responseData.u_date,
                  country: responseData.u_country,
                  city: responseData.u_city,
                  wallet: responseData.u_wallet,
                  flip: responseData.u_Flip,
                  images: responseData.u_profile,
                  wand: responseData.u_Wand,
                  charge: responseData.u_Charge,
                  rank: responseData.u_rank,
                  pixpoints: responseData.u_pixpoint,
                  points: responseData.u_points
               };

               // let appState = {
               //    user: userData,
               // };
               // save app state with user date in local storage
               // AsyncStorage["appState"] = JSON.stringify(appState);
         
               dispatch(saveUserInfo(userData))




            } else {


            }
         }).catch((err) => console.log(err))
         .done();
   }
}

export const BalanceOverview = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/balanceoverview/'+getState().user.user.no)

         .then((response) => response.json())
         .then((responseData) => {

            if(responseData)
            {
         
               let userData = {
                  Image: responseData.u_image,
                  Profile: responseData.u_profile,
                  Balance: responseData.balence,
                  Name:responseData.u_name,
                  Desposite: responseData.deposite,
                  Withdraw: responseData.withdraw,
                  
               };

   //             "u_image": "avatar.jpg",
   //  "balence": 0.299999999999999988897769753748434595763683319091796875,
   //  "u_profile": "avatar.jpg",
   //  "u_name": "Ashley",
   //  "deposit": [],
   //  "withdraw": []
         
               dispatch(savebalanceOverview(userData))




            } else {


            }
         }).catch((err) => console.log(err))
         .done();
   }
}



export const BiddingNotification = () => {
   return (dispatch,getState) => {
  
      let UserID =getState().user.user.no;
      fetch('https://urpixpays.com/stagging_urpixpays/bidding/'+UserID+'')
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData);
            // if (responseData.data) {

               let userData= [];
               for (const key in responseData) {
                  userData.push({
                     ...responseData[key],

                  });
               }
               console.log(userData);
         
               dispatch(SaveBiddibg(userData))

         }).catch((err) => console.log(err))
         .done();
   }
}

export const BuySell =(sort,search)=>
{
   // const { params } = this.props.navigation.state;
   return(dispatch,getState)=>
   {
      dispatch(uiStopLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/shop/image/'+getState().user.user.no+'/1/'+sort+'/'+search)
      .then((response)=>response.json())
      .then((responseData)=>
      {
         console.log(responseData);
         if(responseData.data)
         {
          

               // let arr={};

               // for(const key in responseData)
               // {
               //    arr.push({
               //       ...responseData[key],
               //    });
               // }
               // console.log(arr);
            dispatch(uiStopLoading());
            dispatch(SavePaginationData(responseData.data.imgurl));
            dispatch(SaveBuySell(responseData.data.imgurl.data));
            

         }
         else{
            console.log('error');
         }
      }).catch((err) => {
         dispatch(uiStopLoading());   
         console.log(err)
      
      })
      .done();
   }
}

export const SavePaginationData = (data) => {
   return {
      type: SAVE_PAGINATION_DATA,
      paginate:data
   }
}
export const AddMorePages =(sort,search)=>
{
   // const { params } = this.props.navigation.state;
   return(dispatch,getState)=>
   {dispatch(uiStartLoading());
      fetch(getState().BestImages.paginationData.next_page_url)
      .then((response)=>response.json())
      .then((responseData)=>
      {
         console.log(responseData.data);
         if(responseData.data)
         {
          

               // let arr={};

               // for(const key in responseData)
               // {
               //    arr.push({
               //       ...responseData[key],
               //    });
               // }
               // console.log(arr);
               dispatch(uiStopLoading());
               dispatch(SavePaginationData(responseData.data.imgurl));
            dispatch(SaveBuySell([...getState().BestImages.BuySelldata,...responseData.data.imgurl.data]))
         }
         else{
            console.log('error');
         }
      }).catch((err) => {
         dispatch(uiStopLoading());
         console.log(err)
      })
      .done();
   }
}

export const getImageInfo=(id)=>
{
   return(dispatch)=>
   {
      fetch('https://urpixpays.com/stagging_urpixpays/auction/'+id)
      .then((response)=>response.json())
      .then((responseData)=>
      {  if(responseData)
         {
          
            // let imageDetails = {
            //    Image: responseData.u_image,
            //    Profile: responseData.u_profile,
            //    Balance: responseData.balence,
            //    Name:responseData.u_name,
            //    Desposite: responseData.deposite,
            //    Withdraw: responseData.withdraw,
               
            // };

            dispatch(SaveBuySellDetails(responseData))
         }
         else{
            console.log('error');
         }
      }).catch((err) => console.log(err))
      .done();

     
   }
}

// export const BuySellDetails =()=>
// {
  


//    return(dispatch)=>
//    {
//       fetch('https://urpixpays.com/stagging_urpixpays/auction/')
//       .then((response)=>response.json())
//       .then((responseData)=>
//       {
//          console.log(responseData);
//          if(responseData)
//          {
          
//             // let imageDetails = {
//             //    Image: responseData.u_image,
//             //    Profile: responseData.u_profile,
//             //    Balance: responseData.balence,
//             //    Name:responseData.u_name,
//             //    Desposite: responseData.deposite,
//             //    Withdraw: responseData.withdraw,
               
//             // };

//             dispatch(SaveBuySellDetails(responseData))
//          }
//          else{
//             console.log('error');
//          }
//       }).catch((err) => console.log(err))
//       .done();
//    }
// }


export const CartNotification = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/cart_bid/'+getState().user.user.no)

         .then((response) => response.json())
         .then((responseData) => {

            if (responseData) {

               let userData= [];
               for (const key in responseData) {
                  userData.push({
                     ...responseData[key],

                  });
               }
               console.log(userData);
               dispatch(SaveCartBid(userData))
            } else {
            }
         }).catch((err) => console.log(err))
         .done();
   }
}

export const InvitationTabel = () => {
   return (dispatch,getState) => {
      fetch('https://urpixpays.com/stagging_urpixpays/u_invitation/'+getState().user.user.no)

         .then((response) => response.json())
         .then((responseData) => {

            if (responseData) {

               let userData= [];
               for (const key in responseData) {
                  userData.push({
                     ...responseData[key],

                  });
               }
               console.log(userData);

    
      //   "u_id": 222,
      //   "amount": 0.1000000000000000055511151231257827021181583404541015625,
      //   "friend_email1": "test123@gmail.com",
      //   "friend_email2": null,
      //   "date": "2019-10-12 11:55:29",
      //   "no": 222,
      //   "name": "Ashley",
      //   "age": 25,
      //   "age1": "0",
      //   "verifyc_code": "0",
      //   "country": "USA",
      //   "city": "Anaheim",
      //   "email": "Ashleyangel@gmail.com",
      //   "pass": "123456",
      //   "password": "e10adc3949ba59abbe56e057f20f883e",
      //   "mobilenum": "123456",
      //   "vc": "true",
      //   "role": "member",
      //   "permission": "1",
      //   "register_date": "2019-07-28 20:52:43",
      //   "profile_image": "avatar.jpg"
         
               dispatch(SaveInvitation(userData))




            } else {


            }
         }).catch((err) => console.log(err))
         .done();
   }
}

export const SaveBuySell =(istate)=>
{
   return{
      type: SAVE_BUY_SELL_DATA,
      busell:istate,
   }
}

export const SaveBuySellDetails =(istate)=>
{
   return{
      type: SAVE_BUY_SELL_DETAILS,
      buselldetaisl:istate,
   }
}
// export const  =(istate)=>
// {
//    return{
//       type: SAVE_BUY_SELL_DETAILS,
//       buselldetaisl:istate,
//    }
// }

export const saveUserInfo = (appState) => {
   return {
      type: SAVE_USER_PROFILE_DATA,
      user: appState,
   };
};

export const savebalanceOverview = (appState) => {
   return {
      type: SAVE_BALANCE_OVERVEW,
      balnce: appState,
   };
};

export const SaveBiddibg = (appState) => {
   return {
      type: SAVE_BIDDING_NOTIFICATIONS,
      bidding: appState,
   };
};
export const SaveCartBid = (appState) => {
   return {
      type: SAVE_CART_BID,
      cartbid: appState,
   };
};

export const Notifications = (appState) =>
{
   return {
      type: NOTIFICATION,
      notification: appState,
   };
}

export const SaveInvitation = (appState) => {
   return {
      type: SAVE_INVITAION,
      invite: appState,
   };
};


export const SaveOpenChallengesData = (OpenChalleng) => {
   return {
      type: SAVE_OPEN_CHALLENGEDATA,
      OpenChallenge: OpenChalleng
   }
}

export const SaveClosedChallengesData = (CloseChallenges) => {
   return {
      type: SAVE_CLOSED_CHALLENGES,
      CloseChallenges: CloseChallenges
   }
}

export const SavePastChallengesData = (PastChallenges) => {
   return {
      type: SAVE_PAST_CHALLENGES,
      PastChallenges: PastChallenges
   }
}
export const SaveMyChallenge = (Mychalleng) => {
   return {
      type: SAVE_MY_CHALLENGE,
      Mychalleng: Mychalleng
   }
}

export const SaveImages = (images) => {
   return {
      type: SAVEBESTIMAGES,
      BestImages: images

   }
}
export const MyPics = (images) => {
   return {
      type: SAVEMYPHOTOS,
      MyPhotos: images

   }
}

export const SaveDetailsImages = (data) => {
   return {
      type:SAVE_DETAILS_IAMGES,
      image:data

   }
}

export const SaveVoteImages = (images) => {
   return {
      type: SAVE_VOTE_IMAGES,
      VoteImages: images
   }
}

export const add_voting_to_Images=(index) =>{
   return{
      type:ADD_VOTETING_LIST,
      index:index
   }
}
export const Add_Image_To_Like_List =(index) =>{
   return{
      type:AddImageToLikeList,
      index:index
   }
}
export const ADD_IMAGE_TO_REPORT_LIST=(index) =>{
   return{
      type:ADDIMAGETOREPORTLIST,
      index:index
   }
}

export const SaveUserDataInfo = (Flip, Charge, Wand, Wallet) => {
   return {
      type: SAVE_USER_INFO_WALLET,
      Flip: Flip,
      Charge: Charge,
      Wand: Wand,
      Wallet: Wallet
   }
}
export const OpenjoinedChallenge = (challenge) => {
   return {
      type: OPEN_CHALLENGE,
      CurrentChallenge: challenge

   }
}

export const FreindsInvitedata = (name, email) => {
   return {
      type: FRIENDS_INVITE_DATA,
      name: name,
      email: email
   }
}
export const SaveFreindsData = (appState) => {
   return {
      type: SAVE_FRIENDS_INVITE_DATA,
      mydata:appState
   }
}

export const GetAppInfo = () => {
   return dispatch => {
      fetch('https://urpixpays.com/stagging_urpixpays/info_page')
         .then((response) => response.json())
         .then((responseData) => {
            console.log(responseData);
            let first = {
               imgname: responseData[0].imgname,
               image_title: responseData[0].image_title,
               image_detail: responseData[0].image_detail
            };
            let second = {
               imgname: responseData[1].imgname,
               image_title: responseData[1].image_title,
               image_detail: responseData[1].image_detail
            };

            let third = {
               imgname: responseData[2].imgname,
               image_title: responseData[2].image_title,
               image_detail: responseData[2].image_detail
            };
            let fourth = {
               imgname: responseData[3].imgname,
               image_title: responseData[3].image_title,
               image_detail: responseData[3].image_detail
            };
            let fifth = {
               imgname: responseData[4].imgname,
               image_title: responseData[4].image_title,
               image_detail: responseData[4].image_detail
            };
            let sixth = {
               imgname: responseData[5].imgname,
               image_title: responseData[5].image_title,
               image_detail: responseData[5].image_detail
            };
            let sevent = {
               imgname: responseData[6].imgname,
               image_title: responseData[6].image_title,
               image_detail: responseData[6].image_detail
            };
            let eight = {
               imgname: responseData[7].imgname,
               image_title: responseData[7].image_title,
               image_detail: responseData[7].image_detail
            };
            let nineght = {
               imgname: responseData[8].imgname,
               image_title: responseData[8].image_title,
               image_detail: responseData[8].image_detail
            };
            let tenght = {
               imgname: responseData[9].imgname,
               image_title: responseData[9].image_title,
               image_detail: responseData[9].image_detail
            };
            let eleven = {
               imgname: responseData[10].imgname,
               image_title: responseData[10].image_title,
               image_detail: responseData[10].image_detail
            };
            let twelve = {
               imgname: responseData[11].imgname,
               image_title: responseData[11].image_title,
               image_detail: responseData[11].image_detail
            };
            let thirten = {
               imgname: responseData[12].imgname,
               image_title: responseData[12].image_title,
               image_detail: responseData[12].image_detail
            };
            let fourten = {
               imgname: responseData[13].imgname,
               image_title: responseData[13].image_title,
               image_detail: responseData[13].image_detail
            };
            let fiften = {
               imgname: responseData[14].imgname,
               image_title: responseData[14].image_title,
               image_detail: responseData[14].image_detail
            };
            let sixten = {
               imgname: responseData[15].imgname,
               image_title: responseData[15].image_title,
               image_detail: responseData[15].image_detail
            };
            let seventen = {
               imgname: responseData[16].imgname,
               image_title: responseData[16].image_title,
               image_detail: responseData[16].image_detail
            };
            let eighten = {
               imgname: responseData[17].imgname,
               image_title: responseData[17].image_title,
               image_detail: responseData[17].image_detail
            };
            let ninghten = {
               imgname: responseData[18].imgname,
               image_title: responseData[18].image_title,
               image_detail: responseData[18].image_detail
            };
            let twenty = {
               imgname: responseData[19].imgname,
               image_title: responseData[19].image_title,
               image_detail: responseData[19].image_detail
            };
            let twentyone = {
               imgname: responseData[20].imgname,
               image_title: responseData[20].image_title,
               image_detail: responseData[20].image_detail
            }
            dispatch(SaveAppInfo(first, second, third, fourth, fifth, sixth, sevent, eight, nineght, tenght, eleven, twelve, thirten, fourten, fiften, sixten, seventen, eighten, ninghten, twenty, twentyone));

         })
   }
}
export const SaveAppInfo = (first, second, third, fourth, fifth, sixth, sevent, eight, nineght, tenght, eleven, twelve, thirten, fourten, fiften, sixten, seventen, eighten, ninghten, twenty, twentyone) => {
   return {
      type: SAVE_APP_INFO,
      first: first,
      second: second,
      third: third,
      fourth: fourth,
      fifth: fifth,
      sixth: sixth,
      sevent: sevent,
      eight: eight,
      nineght: nineght,
      tenght: tenght,
      eleven: eleven,
      twelve: twelve,
      thirten: thirten,
      fourten: fourten,
      fiften: fiften,
      sixten: sixten,
      seventen: seventen,
      eighten: eighten,
      ninghten: ninghten,
      twenty: twenty,
      twentyone: twentyone
   }
}