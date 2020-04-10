import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList
} from 'react-native';
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
import { loginUser } from "../../store/actions/index";
import startTabs from '../../components/startTabs/startTabs';
import {connect} from "react-redux";
import { Verify} from '../../store/actions/index';

class VClogin extends Component {

    state = {
        vc :'',
       
    }
   

    changeScreen = (screen) =>{
      Navigation.push(this.props.componentId, {
        component: {
          name: screen,
          passProps: {
            text: 'Pushed screen'
          },
          options: {
            topBar: {
              visible:false
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
    //  Verify =(vc)=>
    // {
    //   return dispatch =>
    //   {
    
    //     fetch('https://urpixpays.com/stagging_urpixpays/register1', {
    //       method:'POST',
    //       headers: {
    //       Accept:'application/json',
    //       'Content-Type':'application/json',
    //       },
    //       body:JSON.stringify({
    //         // "password":loginData.password,
    //         // "email":loginData.email,
    //         "vc":vc,
    //       }),
    //       })
    //       .then((response) => response.json())
    //       .then((responseData) => {
    //         console.log(responseData);
    //       "POST Response",
    //       "Response Body -> "+JSON.stringify(responseData)
    //       console.log(responseData);
    //         if (responseData.message === 'Success Login' ) {
    //           // alert(`Loged in Successful!`)
    //           dispatch(uiStopLoading());
    
              // let userData = {
              //   // name: responseData.data.name,
              //   // id: responseData.data.id,
              //   // age:responseData.data.age,
              //   // age1:responseData.data.age1,
              //   // email: responseData.data.email,
              //   // mobilenum:responseData.data.mobilenum,
              //   // auth_token: responseData.data.auth_token,
              //   // no:responseData.data.no,
              //   // pass:responseData.data.pass,
              //   // password:responseData.data.password,
              //   // permission:responseData.data.permission,
              //   // profile_image:responseData.data.profile_image,
              //   // register_date:responseData.data.register_date,
              //   // role:responseData.data.role,
              //   vc:responseData.vc,
              //   // verifyc_code:responseData.data.verifyc_code,
              //   // timestamp: new Date().toString(),
              //   // city:responseData.data.city,
              //   // status:responseData.data.status,
              //   // country:responseData.data.country,
              // };
              // let appState = {
              //   isLoggedIn: true,
              //   user: userData
              // };
              // console.log(appState);
              // save app state with user date in local storage
              // AsyncStorage["appState"] = JSON.stringify(appState);
              // AsyncStorage.setItem("appState", JSON.stringify(appState));
              // dispatch(saveVcLoginData(appState))
            //   this.setState({
            //     isLoggedIn: appState.isLoggedIn,
            //     user: appState.user
            //   });
              //console.log(AsyncStorage.getItem("appState"));
    
    //           appNavigation();
              
    //         } else if(responseData.message  === 'Please signin with your verification code.' && responseData.data == null)
    //         {
    //           changeScreen('UrPicsPay.VerificationCode');
    
    //         }
    //         else{
    //         //  if(!responseData.message === 'Invalid email or password')
    //           alert('Login Failed: '+responseData.data);
    //           // dispatch(uiStopLoading());
    //         }
    //       })
    //       .done();
    //     }
    // }
    
    submit  = ()  => {
      // let  loginData = {
        vc =this.state.vc
      // }
      this.props.code(vc);
      console.log(vc)
    }

    popScreen = () => {
      Navigation.pop(this.props.componentId);
    } 

  render ()

  {
    return (
      <ImageBackground source={bg} style={{width:wp('100%'),height:hp('100%'),}}>
       <View style={styles.backgroundLayer}>
        <View style={styles.logo}>
        <Image source={logo} style={styles.logoImage} />
        </View>
        <View style={styles.formOuterView}>
        <View style={styles.formInnerView}>
        <View style={styles.textInput}>
        <TextInput 
        placeholder={'Enter your verification code'}
        placeholderTextColor={'white'}
        style={styles.textInputField}
        value={this.state.vc} 
        onChangeText={(val)=>this.setState({vc:val})}
        autoCorrect={false}
        placeholderTextColor={'white'}
        // onChangeText={(text) => this.onFieldTextChange(text,'code')} 
     
         />
        </View>


        {!this.props.loading? <TouchableOpacity 
        
        style={{flexDirection:'row'}} onPress={()=> this.submit()}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }} 
        colors={[ '#bbd9f1','#138ece','#0067a9']} 
        style={[styles.textInput,{justifyContent:'center',
        alignItems:'center',alignSelf:'auto',alignContent:'center',
        backgroundColor:'#13191a',marginTop:wp('1.5%')}]}>
                <Text style={styles.text}>
                    Submit
                </Text>
                
        </LinearGradient>
        </TouchableOpacity>:<ActivityIndicator size={wp('15%')} color="#29abe2" />}

        </View>

        </View>
        <TouchableOpacity onPress={() => this.popScreen()} style={styles.crossbutton}>
                <Icons name="ios-close-circle-outline" size={wp('12%')} style={{color:'white'}}/>
        </TouchableOpacity>
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
    top:hp('80%'),
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

});

const mapStateToProps = state =>{
  return{
    loading:state.isLoading.isLoading

  }
}
const mapsDispatchToProps = dispatch => {
  return {
    code : (loginData) => dispatch(Verify(loginData)),
  }
}

export default connect (mapStateToProps,mapsDispatchToProps ) (VClogin);
