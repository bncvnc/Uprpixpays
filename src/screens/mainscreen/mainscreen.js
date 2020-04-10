import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Alert,
  View,
  ActivityIndicator,
  Text,
  ImageBackground,
  Image,
  Platform,
  Linking,
  TouchableOpacity
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import { Navigation } from "react-native-navigation";
import bg from '../../images/bg-img.jpg';
import logo from '../../images/urpixpays-logo.png';
import gmail from '../../images/gmail_icon.png';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';

import {saveUserInfo, UserProfileData} from '../../store/actions/index';
import  {GoogleLogin,socialSinup,socialSignIn} from '../../store/actions/index';
import  appNavigation  from '../../components/startTabs/navigations';
import firebase from 'react-native-firebase';
import {ToastAndroid} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
// import FBSDK from 'react-native-fbsdk';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
// const { LoginManager } = FBSDK
// const FBSDK = require('react-native-fbsdk');
// const {
//   LoginManager,
// } = FBSDK;
// var FBLoginButton = require('../../screens/FacebookLogin/FacebookLogin');
// var LoginBehavior = {
//   'ios': FBLoginManager.LoginBehaviors.Browser,
//   'android': FBLoginManager.LoginBehaviors.Native
// }




class MainScreen extends Component {

  constructor (props) {
      super(props);
      this.getMyValue()
  }
   componentDidMount() {
    this._configureGoogleSignIn();
    this.checkPermission();
    // this.messageListener();
    this.createNotificationListeners();
    // const channel = new firebase.notifications.Android.Channel(
    //   'channelId',
    //   'Channel Name',
    //   firebase.notifications.Android.Importance.Max
    // ).setDescription('A natural description of the channel');
    // firebase.notifications().android.createChannel(channel);
    SplashScreen.hide();
}
async createNotificationListeners() {
  /*
  * Triggered when a particular notification has been received in foreground
  * */
  this.notificationListener = firebase.notifications().onNotification((notification) => {
      const { title, body } = notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  * */
  this.notificationOpenedListener = firebase.notifications().onNotificationOpened((notificationOpen) => {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  });

  /*
  * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  * */
  const notificationOpen = await firebase.notifications().getInitialNotification();
  if (notificationOpen) {
      const { title, body } = notificationOpen.notification;
      this.showAlert(title, body);
  }
  /*
  * Triggered for data only payload in foreground
  * */
  this.messageListener = firebase.messaging().onMessage((message) => {
    //process data message
    alert(JSON.stringify(message));
    console.log(JSON.stringify(message));
  });
}

showAlert(title, body) {
  Alert.alert(
    title, body,
    [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}


terms = () => {
  Linking.canOpenURL('https://urpixpays.com/term_conditions').then(supported => {
    if (supported) {
      Linking.openURL('https://urpixpays.com/term_conditions');
    } else {
      console.log("Don't know how to open URI: ");
    }
  });
}


componentWillUnmount() {
  this.notificationListener();
  this.notificationOpenedListener();
}

// showAlert(title, body) {
//   Alert.alert(
//    title, body,
//    [
//      { text: 'OK', onPress: () => console.log('OK Pressed') },
//    ],
//    { cancelable: false },
//   );
//  }

getToken = async () => {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    fcmToken = await firebase.messaging().getToken();
    if (fcmToken) {
      await AsyncStorage.setItem('fcmToken', fcmToken);
    }
  }
};

checkPermission = async () => {
  const enabled = await firebase.messaging().hasPermission();
  if (enabled) {
    this.getToken();
  } else {
    this.requestPermission();
  }
};

requestPermission = async () => {
  try {
    await firebase.messaging().requestPermission();
    this.getToken();
  } catch (error) {
    console.log('permission rejected');
  }
};


_configureGoogleSignIn() {
  GoogleSignin.configure({

     // client ID of type WEB for your server (needed to verify user ID and offline access)

  });
}

removeNotificationListeners = () => {
  this.onUnsubscribeNotificaitonListener();
};

 loginWithFb = async () => {
  let result;

  LoginManager.logInWithPermissions(['public_profile', 'email']).then(
    (result)=> {
      if (result.isCancelled) {
        console.log("Login cancelled");
      } else {
        console.log(
          "Login success with permissions: " +
      
            result.grantedPermissions.toString()
        );
        AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data
          initUser(accessToken)
        });
        
        initUser = (token) => {
          fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
          .then((response) => response.json())
          .then((json) => {
            this.props.socialSignInn(json.email,json.name);
          })
        }
      }
    },
    function(error) {
      console.log("Login fail with error: " + error);
    }
  );
    
  
//   LoginManager.logInWithPermissions(['email']).then(

    
//     function(result) {
//       if (result.isCancelled) {
//         alert('Login was cancelled');
//       } else {
       
//           AccessToken.getCurrentAccessToken().then(
//             (data) => {
//             console.log(data.accessToken.toString())
//             }
//             )
//             alert('Login was successful with permissions: '
//             + data.grantedPermissions.toString());
//       }
      
//       console.log(result);
//     },
//     function(error) {
//       alert('Login failed with error: ' + error);
//     }
    
    
//   );
 }

 

  
  getMyValue = async () => {
    try {
      const value = await AsyncStorage.getItem('appState')
      const token =await AsyncStorage.getItem('fcmToken');
      console.log(token);
      data=JSON.parse(value);
      console.log(data);
      if(data.isLoggedIn)
      {
        this.props.checkIfThereIsdata(data);
        
        appNavigation();
      }
    } catch(e) {
      // read error
      console.log(e);
      console.log(data);
    }
  }

  // signIn = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     this.setState({ userInfo });
  //     console.log(userInfo);
  //   } catch (error) {
  //     console.log(error);
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       // user cancelled the login flow

  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       // operation (f.e. sign in) is in progress already
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       // play services not available or outdated
  //     } else {
  //       // some other error happened
  //     }
  //   }
  // };
  changeScreen = (screen,text) =>{
    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          topBar: {
            visible: true,
            title: {
              text: text,
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
    }


    signIn = async () => {
      try {
        console.log('try');
        await GoogleSignin.hasPlayServices();
        console.log('after');
        const userInfo = await GoogleSignin.signIn();
        console.log('after');
        console.log('userInfo = ', userInfo);
        this.setState({ userInfo });
          if(userInfo.user.email !==null)
          {
          this.props.socialSignInn(userInfo.user.email,userInfo.user.name);
          }
          else{
          ToastAndroid.showWithGravityAndOffset(
          'Something went wrong',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
          )
          }
      } catch (error) {
        console.log('catch');
        console.log(error);
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // user cancelled the login flow
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation (e.g. sign in) is in progress already
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          // play services not available or outdated
        } else {
          // some other error happened
        }
      }
    };



  render ()
  {
    console.log(this.props.logindata)
    var _this = this;
//     BLoginManager.setLoginBehavior(FBLoginManager.LoginBehaviors.Web); // defaults to Native
 
 
// FBLoginManager.loginWithPermissions(["email","user_friends"], function(error, data){
//   if (!error) {
//     console.log("Login data: ", data);
//   } else {
//     console.log("Error: ", error);
//   }
// })
    return (
      <ImageBackground source={bg} style={{width:wp('100%'),height:hp('100%')}}>
       <View style={styles.backgroundLayer}>
        <View style={styles.logo}>
        <Image source={logo} style={styles.logoImage}/>
        </View>
          <View style={styles.MainMiddle}>

          </View>
        <View style={styles.Bootom}>

        {!this.props.loading? 
        <React.Fragment>
        <TouchableOpacity onPress={()=>this.loginWithFb()} style={styles.buttonOuter}>
        <View style={styles.ButtonLeftSide}>
        <Icon name="facebook-f" size={wp('8%')} color="#fff" />
        </View>
        <View style={styles.ButtonMiddle}>

 <TouchableOpacity 
        onPress={()=>this.loginWithFb()}
          style={styles.ButtonInnerText}>
          <Text style={styles.leftText}>
          Continue With
          </Text>
          <Text style={styles.rightText}>
            Facebook
          </Text>
        </TouchableOpacity>
       
        </View>
        <View style={styles.ButtonRightSide}>
    
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() =>this.signIn()}  style={[styles.buttonOuter,{marginTop:hp('5%')}]}>
        <View style={[styles.ButtonLeftSide,{backgroundColor:'grey',opacity:1}]}>
        <Image  resizeMode={'contain'}
        style={{height:wp('8%'),width:wp('11%')}}
        source={gmail} />
    
        </View>
        <View style={styles.ButtonMiddle}>

          <TouchableOpacity 
        onPress={() =>{
          this.signIn();
        }}
        style={styles.ButtonInnerText}
        >
          <Text style={styles.leftText}>
          Continue With 
          </Text>
          <Text style={styles.rightText}>
            Gmail
          </Text>
        </TouchableOpacity>
        
        
        </View>
        <View style={[styles.ButtonRightSide,{backgroundColor:'#ED4335'}]}>
        
        </View>
        </TouchableOpacity>
        </React.Fragment>:<ActivityIndicator size={wp('7%')} color="#29abe2" />}


        {/* {!this.props.gloading?
        <TouchableOpacity style={[styles.buttonOuter,{marginTop:hp('5%')}]}>
        <View style={[styles.ButtonLeftSide,{backgroundColor:'grey',opacity:1}]}>
        <Image  resizeMode={'contain'}
        style={{height:wp('8%'),width:wp('11%')}}
        source={gmail} />
    
        </View>
        <View style={styles.ButtonMiddle}>

          <TouchableOpacity 
        onPress={() =>this.GoogleSignin()} 
        style={styles.ButtonInnerText}
        >
          <Text style={styles.leftText}>
            Login With 
          </Text>
          <Text style={styles.rightText}>
            G-Mail
          </Text>
        </TouchableOpacity>
        
        
        </View>
        <View style={[styles.ButtonRightSide,{backgroundColor:'#ED4335'}]}>
        
        </View>
        </TouchableOpacity>:<ActivityIndicator size={wp('15%')} color="#29abe2" />} */}
        
        <TouchableOpacity onPress={()=> this.changeScreen('UrPicsPay.SignUp','Sign Up')} style={styles.SignUpButtonOuter}>
          <View style={styles.signUpButton}>
            <Text style={styles.leftSignUpText}>
              Sign Up
            </Text>
            <Text style={styles.rightSignUpText}>
              with Email
            </Text>
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.BootomTextOuter}>
          <View style={styles.BootomText}>
          <Text style={styles.BootomTextLeft}>
            Already have an Account?
          </Text>
          <TouchableOpacity onPress={()=> this.changeScreen('UrPicsPay.Login','Login')}>
          <Text style={styles.BootomTextRight}>
            Sign In
          </Text>
          </TouchableOpacity>
          </View>
          </View>
        </View>
        <View style={styles.termsAndConditions}>
        <Text style={styles.termsLeftText}>
          By Signing up you agree with our 
        </Text>
        <Text style={styles.termsRightText} onPress={()=>this.terms()}>
          terms of service
        </Text>
        </View>
        </View>
        
       </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  backgroundLayer:{
    width:wp('100%'),
    height:hp('100%'),

  },
  logo:{
    flex:1,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    zIndex:99999,
  },
  logoImage:{
    width:wp('100%'),
    height:hp('25%')

  },
  MainMiddle:{
    flex:1
  },
  Bootom:{
    flex:2,

  },
  buttonOuter:{
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  ButtonLeftSide:{
    width:wp('17%'),
    height:wp('17%'),
    backgroundColor:'#3C5A99',
    borderRadius:wp('8.5%'),
    borderColor:'white',
    borderWidth:wp('.5'),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.51,
    shadowRadius: 13.16,
    elevation: 1,
    position:'absolute',
    left:wp('7%'),
    zIndex:9999,
    justifyContent:'center',
    alignSelf:'auto',
    alignItems:'center',
    alignContent:'center'

  },
  ButtonMiddle:{
    width:wp('70%'),
    height:wp('14%'),
    justifyContent:'center',
    alignItems:'center',
    // paddingTop:wp('3%'),
    // paddingBottom:wp('3%'),
    backgroundColor:'#ffff'
  },
  ButtonInnerText:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'auto',
    alignContent:'center',
    flexDirection:'row',
    paddingTop:wp('.5%'),

   
  },
  ButtonRightSide:{
    width:wp('3.5%'),
    height:wp('14%'),
    backgroundColor:'#3C5A99'
  },
  leftText:{
    fontSize:wp('4%'),
    fontWeight:'400',
    paddingLeft:wp('8%')
  },
  rightText:{
    fontSize:wp('4.5%'),
    fontWeight:'bold',
    paddingLeft:wp('1%'),
    fontFamily:Platform.OS === 'android' ? 'Raleway':'Roboto-Bold'
  },
  signUpButton:{
    flexDirection:'row',
    width:wp('60%'),
    height:hp('7%'),
    backgroundColor:'grey',
    opacity:.9,
    borderRadius:wp('2%'),
    justifyContent:'center',
    alignSelf:'auto',
    alignItems:'center',
    alignContent:'center'
  },
  leftSignUpText:{
    color:'white',
    fontSize:wp('5%'),
    fontWeight:'bold',
    fontFamily:Platform.OS === 'android' ? 'Roboto-Bold':'Roboto-Bold'
  },
  rightSignUpText:{
    color:'white',
    fontSize:wp('5%'),
    fontWeight:'400',
    fontFamily:Platform.OS === 'android' ? 'Raleway-Light':'Roboto-Bold',
    paddingLeft:wp('2%')
  },
  SignUpButtonOuter:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'auto',
    position:'absolute',
    top:wp('42%'),
    left:wp('20%'),
    zIndex:99999,
    paddingBottom:Platform.OS === 'android' ? 20:0
  },
  BootomText:{
    position:'absolute',
    top:hp('15%'),
    flexDirection:'row',
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'auto'
  },
  BootomTextOuter:{
    flex:0,
    alignSelf:'auto',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  BootomTextLeft:{
    color:'white',
    fontSize:wp('4%'),
    fontWeight:'900',
    fontFamily:Platform.OS === 'android' ? 'Raleway-Light':'Raleway',
  },
  BootomTextRight:{
    color:'#29ABE2',
    fontSize:wp('4%'),
    fontWeight:'900',
    paddingLeft:wp('1%'),
    fontFamily:Platform.OS === 'android' ? 'Roboto-Bold':'Roboto-Bold',
  },
  termsAndConditions:{
    width:wp('70%'),
    height:wp('5%'),
    position:'absolute',
    top:hp('42%'),
    left:wp('7%'),
    flexDirection:'row',


  },
  termsRightText:{
    color:'#29ABE2',
    fontSize:wp('4%'),
    paddingLeft:wp('1%'),
    fontFamily:Platform.OS === 'android' ? 'Raleway-Light':'Raleway-Light',
  },
  termsLeftText:{
    color:'white',
    fontSize:wp('4%'),
    fontFamily:Platform.OS === 'android' ? 'Raleway-Light':'Raleway-Light',
  }

});

const mapStateToProps = state => {
  return {
    pro_data:state.BestImages.SaveuserProfiledata,
    logindata:state.user.user,
    loading:state.isLoading.isLoading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkIfThereIsdata: (data) => dispatch(saveUserInfo(data)),
    gooogle :()=> dispatch(GoogleLogin()),
    social :()=>dispatch(socialSinup()),
    socialSignInn:(email,name)=>dispatch(socialSignIn(email,name)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (MainScreen);
