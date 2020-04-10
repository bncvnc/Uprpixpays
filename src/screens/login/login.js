import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Navigation } from "react-native-navigation";
import bg from '../../images/bg-img.jpg';
import logo from '../../images/urpixpays-logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import validate from '../../Validate/Validate';
import { loginUser,socialSinup,socialSignIn,saveUserInfo } from "../../store/actions/index";
import startTabs from '../../components/startTabs/startTabs';
import {connect} from "react-redux";
import appNavigation from '../../components/startTabs/navigations';
import {KeyboardAvoidingView} from 'react-native';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";

import SplashScreen from 'react-native-splash-screen';
class Login extends Component {
constructor(props) {
  super(props);
  this.getMyValue()
}
componentDidMount() {
  this._configureGoogleSignIn();
  SplashScreen.hide();
}
    state = {
        inputs:{
          password:{
            value:'',
            valid:false,
            validationRules:{
              minLengthValidator:3
            },
            touched:false,
            warningText:'Password Must Contain 7 to 15 characters which contain one UpperCase character, One numeric digit'
          },
          email:{
            value:'',
                valid:false,
                validationRules:{
                  isEmail:true
                },
                touched:false,
                warningText:'Please Enter a valid Email Address'
          }
        }
    }
    setPickerValue = (newValue) => {

    }

    _configureGoogleSignIn() {
      GoogleSignin.configure({
    
         // client ID of type WEB for your server (needed to verify user ID and offline access)
    
      });
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

    signIn = async () => {
      try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
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
              this.initUser(accessToken)
            });
            
            
          }
        },
        function(error) {
          console.log("Login fail with error: " + error);
        }
      );
        
      
     }
     initUser = (token) => {
      fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
      .then((response) => response.json())
      .then((json) => {
        this.props.socialSignInn(json.email,json.name);
      })
    }

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

    onFieldTextChange = (text,field) => {
      let connectedValue = {};
      if (this.state.inputs[field].validationRules.equalTo) {
        const equalControl = this.state.inputs[field].validationRules.equalTo;
        const equalValue = this.state.inputs[equalControl].value;
        connectedValue = {
          ...connectedValue,
          equalTo: equalValue
        };
      }
      if (field === "password") {
        connectedValue = {
          ...connectedValue,
          equalTo: text
        };
      }
      this.setState(prevState =>{
        
        return {
          inputs: {
            ...prevState.inputs,
            [field]: {
              ...prevState.inputs[field],
              value: text,
              valid: validate(
                text,
                prevState.inputs[field].validationRules,
                connectedValue
              ),
              touched:true
              
            }
            
          }
          
        };
        
      })
    }
    SubmitData  = ()  => {
      let  loginData = {
        email : this.state.inputs.email.value,
        password: this.state.inputs.password.value
      }
      this.props.LogInUser(loginData,this.props.componentId);
      console.log(loginData);
    }
    popScreen = () => {
      Navigation.popToRoot(this.props.componentId);
    } 

  render ()
  {

    console.log(this.props.logindata)
        let email= this.state.inputs.email.valid;
        let password= this.state.inputs.password.valid;
        let day = [];
        let month = [];
        let year = [];
        for(i=1;i < 32 ; i++){
            day.push({
                titile:i,
                value:i
              });
        }
        for(i=1;i < 13 ; i++){
            month.push({
                titile:i,
                value:i
              });
        }
        for(i=1990;i < 2020 ; i++){
            year.push({
                titile:i,
                value:i
              });
        }
        
        const scrollEnabled = this.state.screenHeight > hp('100%');


    return (
      <ImageBackground source={bg} style={styles.img_bg}>
        

       {/* <View style={styles.backgroundLayer}> */}
       <ScrollView
           scrollEnabled={scrollEnabled}
           onContentSizeChange={this.onContentSizeChange} 
          >
        <KeyboardAvoidingView style={{width:wp('100%'),height:hp('100%')}} behavior={Platform.OS==='ios'?'height':''}  enabled> 
        <View style={styles.logo}>
        <Image source={logo} style={styles.logoImage} />
        </View>
        <View style={styles.formOuterView}>
        <View style={styles.formInnerView}>
        <View style={[styles.textInput]}>
        <TextInput 
        placeholder={'Enter Your PixId or Email'}
        placeholderTextColor={'white'}
        style={styles.textInputField}
        value={this.state.inputs.email.value} 
        keyboardType={'email-address'}
        autoCorrect={false}
        autoCapitalize="none" 
        placeholderTextColor={'white'}
        onChangeText={(text) => this.onFieldTextChange(text,'email')} 
         />
        </View>

        {/* <Text 
      style={[styles.warrnings,this.state.inputs.email.touched && !this.state.inputs.email.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.email.warningText}</Text> */}
        <View style={[styles.textInput,this.state.inputs.password.touched && !this.state.inputs.password.valid ?styles.invalid:'']}>
        <TextInput 
        placeholder={'Password'}
        value={this.state.inputs.password.value} 
        placeholderTextColor={'white'}
        onChangeText={(text) => this.onFieldTextChange(text,'password')} 
        style={styles.textInputField}
        secureTextEntry={true}
         />
        </View>
        <Text 
      style={[styles.warrnings,this.state.inputs.password.touched && !this.state.inputs.password.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.password.warningText}</Text>

          {!this.props.loading?
        <TouchableOpacity disabled={password ? false : true} 
        style={{flexDirection:'row'}} onPress={()=> this.SubmitData()}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }} 
        colors={[ '#bbd9f1','#138ece','#0067a9']} 
        style={[styles.textInput,{justifyContent:'center',
        alignItems:'center',alignSelf:'auto',alignContent:'center',
        backgroundColor:'#13191a',marginTop:wp('1.5%')}]}>
                <Text style={styles.text}>
                    Login
                </Text>
                
        </LinearGradient>
        </TouchableOpacity>:<ActivityIndicator size={wp('15%')} color="#29abe2" />}
            <View
            style={styles.forgetPassword}
            >
       
        <Text style={styles.BootomTextLeft}>
          New to app?
        </Text>
        <TouchableOpacity 
        onPress={()=>this.changeScreen('UrPicsPay.SignUp','Sign Up')}
        >
        <Text style={styles.BootomTextRight}>
        Sign Up
        </Text>
        </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
        onPress={()=>this.changeScreen('UrPicsPay.Forgot_Password','Forget Password')}
        style={styles.forgetPassword}>
        <Text style={styles.forgetPasswordText}>
            Forget Password?
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.loginWithFb()} style={[styles.textInput,{justifyContent:'center',
        alignItems:'center',alignSelf:'auto',alignContent:'center',backgroundColor:'#3C5A99',marginTop:wp('1.5%')}]}>
                <Text style={styles.text}>
                    Continue With Facebook
                </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>this.signIn()} style={[styles.textInput,{justifyContent:'center',
        alignItems:'center',alignSelf:'auto',alignContent:'center',backgroundColor:'#ED4335',marginTop:wp('1.5%')}]}>
                <Text style={styles.text}>
                Continue With Gmail
                </Text>
        </TouchableOpacity>
        </View>
        </View>
        </KeyboardAvoidingView>
        </ScrollView>
       {/* </View> */}
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  // backgroundLayer:{
  //   width:wp('100%'),
  //   height:hp('100%'),

  // },
  logo:{
    flex:.5,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    zIndex:99999,
  },
  logoImage:{
    width:wp('100%'),
    height:wp('25%')

  },
  termsLeftText:{
    color:'white',
    fontSize:wp('4%'),
    fontFamily:Platform.OS === 'android' ? 'Raleway-Light':'Raleway-Light',
  },
  formOuterView:{
      flex:1,
      width:wp('100%'),
      paddingLeft:wp('8%'),
      paddingRight:wp('8%'),

  },
  textInput:{
    width:'100%',
    height:hp('7%'),
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom:hp('1%'),
    justifyContent:'center',
    

  },
  formInnerView:{
    paddingLeft:wp('2%'),
    paddingRight:wp('2%'),
  },
  textInputField:{
      fontSize:wp('3.7%'),
      color:'white',
      paddingLeft:wp('4%'),
      //paddingTop:hp('1.8%'),
      fontFamily:Platform.OS === 'android' ? 'Raleway-Medium':'Raleway-Medium',
  },
  textInputFieldDate:{
      fontSize:wp('3.7%'),
      color:'white',
      paddingLeft:wp('4%'),
      paddingTop:hp('1.6%'),
      fontFamily:Platform.OS === 'android' ? 'Raleway-Medium':'Raleway-Medium',
  },
  textInputFOrdate:{
    width:'20%',
    height:wp('11%'),
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom:hp('1%'),
    marginRight:wp('1%')
  },
  textInputFOrdateright:{
    margin:20,
    backgroundColor: 'rgba(255,255,255,1)',
    padding:20,
    position:'absolute',
    bottom:20,
    left:20,
    right:20,
    height:hp('20%')
  },
  pickerOuter:{
      height:hp('15%'),
  },
  textInputFOrdateRight:{
    width:'26.3%',
    height:wp('11%'),
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom:hp('1%')
  },
  textInputFieldDateRight:{
    fontSize:wp('3.7%'),
    color:'white',

    fontFamily:Platform.OS === 'android' ? 'Raleway-Medium':'Raleway-Medium',
},
text:{
    fontSize:wp('3.7%'),
    color:'white',
    fontFamily:Platform.OS === 'android' ? 'Raleway-Bold':'Raleway-Bold',
    fontWeight:'bold'
},
crossbutton:{
    position:'absolute',
    top:hp('90%'),
    left:wp('45%'),
},
forgetPassword:{
    flexDirection:'row',
    justifyContent:'flex-end',
    alignContent:'center',
    alignItems:'center',
    height:wp('8%')
},
forgetPasswordText:{
    fontSize:wp('4.5%'),
    color:'white',
    textDecorationLine: 'underline',
},
warrnings:{
  fontSize:wp('3.5%'),
    color:'white',
    fontFamily:'Arial',
    
},
disapair:{
  height:0,
  opacity:0
},
show:{
  opacity:100,
  marginBottom:wp('1%')
},
invalid:{
  borderBottomColor:'rgba(255,0,0,1)',
  borderBottomWidth:2,
},
img_bg:
{
  flex:1
},

BootomTextRight:{
  color:'#29ABE2',
  fontSize:wp('4%'),
  fontWeight:'900',
  paddingLeft:wp('1%'),
  fontFamily:Platform.OS === 'android' ? 'Roboto-Bold':'Roboto-Bold',
},
BootomTextLeft:{
  color:'white',
  fontSize:wp('4%'),
  fontWeight:'900',
  fontFamily:Platform.OS === 'android' ? 'Raleway-Light':'Raleway',
},
});

const mapStateToProps = (state) => 
{
  return{
    logindata:state.user.user,
    loading:state.isLoading.isLoading
  }
}

const mapsDispatchToProps  = (dispatch) =>{
  return{
    LogInUser : (loginData,componentId) => dispatch(loginUser(loginData,componentId)),
    socialSignInn:(email,name)=>dispatch(socialSignIn(email,name)),
    social :()=>dispatch(socialSinup()),
    checkIfThereIsdata: (data) => dispatch(saveUserInfo(data)),
  }
}

export default connect (mapStateToProps,mapsDispatchToProps ) (Login);
