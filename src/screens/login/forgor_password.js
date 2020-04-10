import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Platform,
  ActivityIndicator,
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
import { ForgotPassword} from '../../store/actions/index';

class ForgetPass extends Component {

    state = {
        inputs:{
          password:{
            value:'',
            valid:false,
            validationRules:{
              minLengthValidator:5
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
                warningText:'Please Enter A Valid Email Address'
          }
        }
    }
    setPickerValue = (newValue) => {

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
    submit  = ()  => {
      // let  loginData = {
        email =this.state.inputs.email.value
      // }
      this.props.reset(email);
    }

    popScreen = () => {
      Navigation.popToRoot(this.props.componentId);
    } 

  render ()

  {
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
        


    return (
      <ImageBackground source={bg} style={{width:wp('100%'),height:hp('100%'),}}>
       <View style={styles.backgroundLayer}>
        <View style={styles.logo}>
        <Image source={logo} style={styles.logoImage} />
        </View>
        <View style={styles.formOuterView}>
        <View style={styles.formInnerView}>
        <View style={[styles.textInput,this.state.inputs.email.touched && 
          !this.state.inputs.email.valid ?styles.invalid:'']}>
        <TextInput 
        placeholder={'Enter your email address'}
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
        <Text 
      style={[styles.warrnings,this.state.inputs.email.touched && !this.state.inputs.email.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.email.warningText}</Text>
        {/* <View style={[styles.textInput,this.state.inputs.password.touched && !this.state.inputs.password.valid ?styles.invalid:'']}>
        <TextInput 
        placeholder={'Old Password'}
        value={this.state.inputs.password.value} 
        placeholderTextColor={'white'}
        onChangeText={(text) => this.onFieldTextChange(text,'password')} 
            style={styles.textInputField}
        secureTextEntry={true}
         />
        </View> */}
        <Text 
      style={[styles.warrnings,this.state.inputs.password.touched && !this.state.inputs.password.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.password.warningText}</Text>


      {!this.props.loading?  <TouchableOpacity disabled={email ? false : true} 
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
       
         {/* <View style={styles.forgetPassword}>
        <Text style={styles.forgetPasswordText}>
            Forget Password?
        </Text>
        </View> 
         <TouchableOpacity style={[styles.textInput,{justifyContent:'center',alignItems:'center',alignSelf:'auto',alignContent:'center',backgroundColor:'#3C5A99',marginTop:wp('1.5%')}]}>
                <Text style={styles.text}>
                    Login With Facebook
                </Text>
                
        </TouchableOpacity>  */}
        
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
    reset : (email) => dispatch(ForgotPassword(email)),
  }
}

export default connect (mapStateToProps,mapsDispatchToProps ) (ForgetPass);
