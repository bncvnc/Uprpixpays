import {SAVE_USERINFO,LOGOUT_USER,SAVE_USERINFO_VC,SAVE_GOOGLE_LOGIN,SAVE_SOCIAL_LOGIN} from './actiontypes';
import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import {uiStartLoading,uiStopLoading} from './index';
import appNavigation from '../../components/startTabs/navigations';
import {Navigation} from 'react-native-navigation';
import changeScreen from '../../components/changeScreen/changeScreen';
import logout from '../../components/logout/logout.js';
const URI = 'https://urpixpays.com/stagging_urpixpays/usersignin';
import {ToastAndroid} from 'react-native';



export const loginUser = (loginData,componentId) =>{
    return dispatch => {
      console.log('giving = ', loginData, componentId);
      dispatch(uiStartLoading());
    fetch('https://urpixpays.com/stagging_urpixpays/usersignin', {
      method:'POST',
      headers: {
      Accept:'application/json',
      'Content-Type':'application/json',
      },
      body:JSON.stringify({
        "password":loginData.password,
        "email":loginData.email,
      }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log('login = ',responseData);
      "POST Response",
      "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
        if (responseData.message === 'Success Login' ) {
          // alert(`Loged in Successful!`);

         

      
          let userData = {
            id: responseData.data.no,
            name: responseData.data.name,
            age:responseData.data.age,
            age1:responseData.data.age1,
            email: responseData.data.email,
            mobilenum:responseData.data.mobilenum,
            auth_token: responseData.data.auth_token,
            no:responseData.data.no,
            pass:responseData.data.pass,
            password:responseData.data.password,
            permission:responseData.data.permission,
            profile_image:responseData.data.profile_image,
            register_date:responseData.data.register_date,
            role:responseData.data.role,
            vc:responseData.data.role,
            verifyc_code:responseData.data.verifyc_code,
            timestamp: new Date().toString(),
            city:responseData.data.city,
            status:responseData.data.status,
            country:responseData.data.country,
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          console.log(appState);
          AsyncStorage.setItem("appState", JSON.stringify(appState));
          dispatch(saveUserInfo(appState))
        //   this.setState({
        //     isLoggedIn: appState.isLoggedIn,
        //     user: appState.user
        //   });
          //console.log(AsyncStorage.getItem("appState"));
          dispatch(uiStopLoading());
          appNavigation();
          
        } else if(responseData.message  === 'Please signin with your verification code.' && responseData.data == null)
        {

          let userData = {
            email: loginData.email,
            password:loginData.password
        
          };
          let appState = {
            isLoggedIn: false,
            user: userData
          };
          dispatch(saveUserInfo(appState))
          // changeScreen('UrPicsPay.VerificationCode');
           Navigation.push(componentId, {
                component: {
                  name: 'UrPicsPay.VerificationCode',
                  passProps: {
                    text: 'Pushed screen'
                  },
                  options: {
                    topBar: {
                      visible:true,
                      title: {
                        text: 'Verification',
                        alignment: 'center'
                      }
                    },
                    animations: {
                      push: {
                         waitForRender: true
                      }
                   }
                  }
                }
              });
          dispatch(uiStopLoading());
        }
        else{
        //  if(!responseData.message === 'Invalid email or password')
          alert('Invalid email or password');

          dispatch(uiStopLoading());
        }
      })
      .done();

    }
}
export const saveUserInfo = (appState) => {
    return {
      type: SAVE_USERINFO,
      user: appState,
    };
  };
export const logoutUser = () =>{

  return dispatch => {
    let appState = {
      isLoggedIn: false,
      user: {}
    };  
    AsyncStorage.setItem("appState", JSON.stringify(appState));
    logout();
    dispatch(deletestateData());

  }
}
export const deletestateData = () => {
  return {
    type:LOGOUT_USER
}
}

export const resiterUser = (authdata,componentId) => {
  return dispatch =>{
    console.log(authdata);
    dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/sendvc1', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
            "name":authdata.name,
            "email":authdata.email,
            "password":authdata.password,
            "mobile_number":authdata.mobile_number,
            "age":authdata.age,
            // "month":authdata.month,
            // "year":authdata.year,
            "country":authdata.country,
            "city":authdata.city,
          }),
      })
          .then((response) => response.json())
          .then((responseData) => {
            //console.log(responseData);
          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
          console.log(responseData);
           if (responseData.message ==='Sent VC to email again') {
           
            dispatch(uiStopLoading());
            // changeScreen('UrPicsPay.Login');
            // Navigation.push(componentId, {
            //   component: {
            //     name: 'UrPicsPay.Login',
            //     passProps: {
            //       text: 'Pushed screen'
            //     },
            //     options: {
            //       topBar: {
            //         visible:false
            //       },
            //       animations: {
            //         push: {
            //            waitForRender: true
            //         }
            //      }
            //     }
            //   }
            // });
            Navigation.pop(componentId);
            alert('A varification code is sent to your provided email.');
            }else if(responseData.message === 'Sent VC to email')  {
              dispatch(uiStopLoading());
              // changeScreen('UrPicsPay.Login');
              // Navigation.push(componentId, {
              //   component: {
              //     name: 'UrPicsPay.Login',
              //     passProps: {
              //       text: 'Pushed screen'
              //     },
              //     options: {
              //       topBar: {
              //         visible:false
              //       },
              //       animations: {
              //         push: {
              //            waitForRender: true
              //         }
              //      }
              //     }
              //   }
              // });
              Navigation.pop(componentId);
              alert('A Varification code was Sent to your provided email.');
            }
            else{
              alert('Registeration Failed! ' + responseData.message)
              dispatch(uiStopLoading());

            }
          }).catch((err) =>{
            console.log(err);
          })
      .done();
  }
}

export const resiterUserThroughSocial = (authdata,componentId) => {
  return dispatch =>{
    //console.log(authdata);
    dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/sendvc12', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
            "name":authdata.name,
            "email":authdata.email,
            "password":authdata.password,
            "mobile_number":authdata.mobile_number,
            "age":authdata.age,
            "country":authdata.country,
            "city":authdata.city,
          }),
      })
          .then((response) => response.json())
          .then((responseData) => {
            //console.log(responseData);
          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
          console.log(responseData);

          let userData = {
            id: responseData.data.no,
            name: responseData.data.name,
            age:responseData.data.age,
            age1:responseData.data.age1,
            email: responseData.data.email,
            mobilenum:responseData.data.mobilenum,
            auth_token: responseData.data.auth_token,
            no:responseData.data.no,
            pass:responseData.data.pass,
            password:responseData.data.password,
            permission:responseData.data.permission,
            profile_image:responseData.data.profile_image,
            register_date:responseData.data.register_date,
            role:responseData.data.role,
            vc:responseData.data.role,
            verifyc_code:responseData.data.verifyc_code,
            timestamp: new Date().toString(),
            city:responseData.data.city,
            status:responseData.data.status,
            country:responseData.data.country,
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };

          AsyncStorage.setItem("appState", JSON.stringify(appState));
          dispatch(saveUserInfo(appState))
          
          appNavigation();
          }).catch((err) =>{
            alert('Something went wrong can you please try different social sinup method or signup with email regards UrPixPays.')
            console.log(err);
          })
      .done();
  }
}

export const Verify =(loginData)=>
{
  return (dispatch,getState) =>
  { 
    dispatch(uiStartLoading());

    fetch('https://urpixpays.com/stagging_urpixpays/register1', {
      method:'POST',
      headers: {
      Accept:'application/json',
      'Content-Type':'application/json',
      },
      body:JSON.stringify({
        "password":getState().user.user.password,
        "email":getState().user.user.email,
        "vc":loginData,
      }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      "POST Response",
      "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
        if (responseData.message === 'Success Sign up' ) {
          // alert(`Loged in Successful!`)
          dispatch(uiStopLoading());

          let userData = {
            // name: responseData.data.name,
            // id: responseData.data.id,
            // age:responseData.data.age,
            // age1:responseData.data.age1,
            // email: responseData.data.email,
            // mobilenum:responseData.data.mobilenum,
            // auth_token: responseData.data.auth_token,
            // no:responseData.data.no,
            // pass:responseData.data.pass,
            // password:responseData.data.password,
            // permission:responseData.data.permission,
            // profile_image:responseData.data.profile_image,
            // register_date:responseData.data.register_date,
            // role:responseData.data.role,
            vc:responseData.vc,
            // verifyc_code:responseData.data.verifyc_code,
            // timestamp: new Date().toString(),
            // city:responseData.data.city,
            // status:responseData.data.status,
            // country:responseData.data.country,
          };
          let appState = {
            isLoggedIn: true,
            user: userData
          };
          console.log(appState);
          // save app state with user date in local storage
          // AsyncStorage["appState"] = JSON.stringify(appState);
          // AsyncStorage.setItem("appState", JSON.stringify(appState));
          dispatch(saveVcLoginData(appState))
        //   this.setState({
        //     isLoggedIn: appState.isLoggedIn,
        //     user: appState.user
        //   });
          //console.log(AsyncStorage.getItem("appState"));

          appNavigation();
          
        } else if(responseData.message  === 'Please signin with your verification code.' && responseData.data == null)
        {
          changeScreen('UrPicsPay.VerificationCode');

        }
        else{
        //  if(!responseData.message === 'Invalid email or password')
          alert('Inavlid Verification code');
          dispatch(uiStopLoading());
        }
      })
      .done();
    }
}


export const socialSinup =(email)=>
{
  return dispatch =>{
    //console.log(authdata);
    dispatch(uiStartLoading());
      fetch('https://urpixpays.com/stagging_urpixpays/sendvc1', {
          method:'POST',
          headers: {
          Accept:'application/json',
          'Content-Type':'application/json',
          },
          body:JSON.stringify({
            
            "email":email,
            // "password":authdata.password,
            // "mobile_number":authdata.mobile_number,
            // "age":authdata.age,
            // // "month":authdata.month,
            // // "year":authdata.year,
            // "country":authdata.country,
            // "city":authdata.city,
          }),
      })
          .then((response) => response.json())
          .then((responseData) => {
            //console.log(responseData);
          "POST Response",
          "Response Body -> "+JSON.stringify(responseData)
          console.log(responseData);
           if (responseData.data) {
              dispatch(uiStopLoading());
              alert(`Registered Successfullly`);
    
              // let userData = {
              //   name: responseData.data.name,
              //   // id: responseData.data.id,
              //   age:responseData.data.age,
              //   email: responseData.data.email,
              //   auth_token: responseData.data.auth_token,
              //   timestamp: new Date().toString(),
              //   city:responseData.data.city,
              //   status:responseData.data.status,
              //   country:responseData.data.country,
              // };
              // let appState = {
              //   isLoggedIn: true,
              //   user: userData
              // };
              // save app state with user date in local storage
              // AsyncStorage["appState"] = JSON.stringify(appState);
              // AsyncStorage.setItem("appState", JSON.stringify(appState));
              dispatch(saveScialInfo(appState))
              // changeScreen('UrPicsPay.Login');
              
              
            }else if(responseData.data === null)  {
              dispatch(uiStopLoading());
              alert('Invalid Email');
            }
            else{
              alert('Registeration Failed!')
              dispatch(uiStopLoading());

            }
          })
      .done();
  }
}

export const socialSignIn = (email,name,cid) =>
{
  console.log('yes yes');
  return dispatch => {
    // alert(email);
    console.log(cid);
    dispatch(uiStartLoading());
  fetch('https://urpixpays.com/stagging_urpixpays/social_signup', {
    method:'POST',
    headers: {
    Accept:'application/json',
    'Content-Type':'application/json',
    },
    body:JSON.stringify({
      "email":email,
      "name":name
    }),
    })
    .then((response) => response.json())
    .then((responseData) => {
      console.log(responseData);
    "POST Response",
    "Response Body -> "+JSON.stringify(responseData)
    console.log('helo = ', responseData);
      if (responseData.success) {
        // alert(responseData.data);
        // alert(`Loged in Successful!`);
        let userData = {
          name: responseData.data.name,
          age:responseData.data.age,
          age1:responseData.data.age1,
          email: responseData.data.email,
          mobilenum:responseData.data.mobilenum,
          auth_token: responseData.data.auth_token,
          no:responseData.data.no,
          pass:responseData.data.pass,
          password:responseData.data.password,
          permission:responseData.data.permission,
          profile_image:responseData.data.profile_image,
          register_date:responseData.data.register_date,
          role:responseData.data.role,
          vc:responseData.data.role,
          verifyc_code:responseData.data.verifyc_code,
          timestamp: new Date().toString(),
          city:responseData.data.city,
          status:responseData.data.status,
          country:responseData.data.country,
        };
        let appState = {
          isLoggedIn: true,
          user: userData
        };
        console.log(appState);
        // save app state with user date in local storage
        // AsyncStorage["appState"] = JSON.stringify(appState);
        AsyncStorage.setItem("appState", JSON.stringify(appState));
        dispatch(saveUserInfo(appState))
      //   this.setState({
      //     isLoggedIn: appState.isLoggedIn,
      //     user: appState.user
      //   });
        //console.log(AsyncStorage.getItem("appState"));
        dispatch(uiStopLoading());
        appNavigation();
        
      } else if(!responseData.success){
        dispatch(uiStopLoading());
        // Navigation.push(cid, {
        //   component: {
        //     name: 'UrPicsPay.socialSingup',
        //     passProps: {
        //       email: email,
        //       name:name
        //     },
        //     options: {
        //       topBar: {
        //         visible: true,
        //         title: {
        //           text: 'SignUp',
        //           alignment: 'center'
        //         }
        //       },
        //       animations: {
        //         push: {
        //            waitForRender: true
        //         }
        //      }
        //     }
        //   }
        // });
      }
      //else if(responseData.message  === 'Please signin with your verification code.' && responseData.data == null)
      // {

      //   let userData = {
      //     email: loginData.email,
      //     password:loginData.password
      
      //   };
      //   let appState = {
      //     isLoggedIn: false,
      //     user: userData
      //   };
      //   dispatch(saveUserInfo(appState))
      //   changeScreen('UrPicsPay.VerificationCode');
      // }
      else if(responseData.message == "Please signin with your verification code."){
      //  if(!responseData.message === 'Invalid email or password')
        alert(responseData.message);

        dispatch(uiStopLoading());
      }else{
        alert(responseData.message);

        dispatch(uiStopLoading());
      }
    }).catch((err) =>{
      console.log('asdasd');
    })
    .done();

  }
}



export const saveVcLoginData = (appState) =>
{
  return{

 type: SAVE_USERINFO_VC,
      uservc: appState,
  }
}
export const SaveSocialSignIn = (appState) =>
{
  return{

 type: SAVE_USERINFO_VC,
      socialsignIn: appState,
  }
}
// export const   _configureGoogleSignIn =() =>{
//   GoogleSignin.configure({
//       webClientId: '949571502386-u08smq0d7ens6rjoi9oj7fs6ivsk0j1o.apps.googleusercontent.com',
//       offlineAccess: false,
//       iosClientId:'914230822668-o0j261lfiivin94ecqv0gdaolmam8k8n.apps.googleusercontent.com',
//       androidClientId:'949571502386-n6jtvi28dkauhghjejfc15p3thp73068.apps.googleusercontent.com',
//   });
// }

// export const  GoogleLogin= ()=>
// {

//   return dispatch =>
//   {
    
//       dispatch(SaveGoogleLogin(appState))
  
//   } 
// }


export const saveScialInfo =(appState)=>
{
  return{
    type:SAVE_SOCIAL_LOGIN,
    social:appState,
  }
    
}
// export const SaveGoogleLogin =(appState)=>
// {
//   return{
//     type:SAVE_GOOGLE_LOGIN,
//     googledata:appState,
//   }
    
// }

export const logoutUserr = () =>{
  return dispatch =>{
    dispatch(authClearStorage()).then(() =>{
      // pusherUnsubscribe();
     
      changeScreen('UrPicsPay.Login')
    })
    //dispatch(authRemoveToken());
}
}
export const authClearStorage = () => {
  return dispatch => {
    return AsyncStorage.removeItem("appState");
  };
};
  