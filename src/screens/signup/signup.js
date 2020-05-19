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
  KeyboardAvoidingView,
  FlatList,
  findNodeHandle
} from 'react-native';
import { WebView } from 'react-native-webview';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Navigation } from "react-native-navigation";
import AsyncStorage from '@react-native-community/async-storage';
import bg from '../../images/bg-img.jpg';
import logo from '../../images/urpixpays-logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import validate from '../../Validate/Validate';
import {resiterUser} from '../../store/actions/index';
import DatePicker from 'react-native-datepicker'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CountryPicker, { CountryModalProvider } from '../../coutryPicker/'
import { CountryCode, Country } from '../../coutryPicker/types'
import { Row } from '../../coutryPicker/Row';
import { DARK_THEME } from '../../coutryPicker/CountryTheme'
class SignUp extends Component {

  componentDidMount= () => {
    this.getMyValue();
    this._GetCountriesData();
  }


    state={
        CountriesData:[],
        COutries:false,
        date: new Date(),
        addDate:false,
        ShowPrivacy:false,
        addMonth:false,
        addYear:false,
        addCountry:false,
        isLoggedIn: false,
        DateSelected:'',
        user: {},
        SelectCountry:false,
        inputs:{
          password:{
            value:'',
            valid:false,
            validationRules:{
              checkPassword:6
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
          },
          name:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:1
                },
                touched:false,
                warningText:'Your Name Must Be 1 Characters Long'
          },
          country:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:2
                },
                touched:false,
                warningText:'Please Add A Country'
          },
          city:{
            value:'',
                valid:false,
                validationRules:{
                  minLength:4
                },
                touched:false,
                warningText:'Please Add A City '
          },
          confiormPassword:{
            value:'',
                valid:false,
                validationRules:{
                  equalTo:'password'
                },
                touched:false,
                warningText:'Your Password Does Not Match'
          },
          myNumber:{
              value:'',
              valid:false,
              validationRules:{
                minLength:2
              },
              touched:false,
              warningText:'Please Enter Numbers Only'
          },
          day:{
            value:'',
            valid:false,
            validationRules:{
              minLength:11
            },
            touched:false,
            warningText:'Please Enter your Day of Birth'
          },
          month :{
            value:'',
            valid:false,
            validationRules:{
              minLength:11
            },
            touched:false,
            warningText:'Please Enter your Borth Month'
          },
          year :{
            value:'',
            valid:false,
            validationRules:{
              minLength:11
            },
            touched:false,
            warningText:'Please Enter your year of Birth'
          }
        }
    }

_GetCountriesData =() =>{

  fetch('https://urpixpays.com/stagging_urpixpays/countries')
  .then((response)=>response.json())
  .then((result) => {
    console.log(result.data)
    this.setState({
      CountriesData:result.data
    })
  }).catch((err) => {
    
  });
}


    getMyValue = async () => {
      try {
        const value = await AsyncStorage.getItem('appState')
        data=JSON.parse(value);
        console.log(data);
        if(data.isLoggedIn)
        {
          //this.props.checkIfThereIsdata(data);
          this.changeScreen('UrPicsPay.OpenChallenge')
        }
      } catch(e) {
        // read error
        console.log(e);
      }
      
    
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
              confiormPassword: {
                ...prevState.inputs.confiormPassword,
                valid:
                  field === "password"
                    ? validate(
                        prevState.inputs.confiormPassword.value,
                        prevState.inputs.confiormPassword.validationRules,
                        connectedValue
                      )
                    : prevState.inputs.confiormPassword.valid
              },
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

      onChanged(text){ 
        let number = text.replace(/[^0-9]/g, '');
        //console.log(number);
        let connectedValue = {};
          this.setState( prevState =>{
            return {
              inputs: {
                ...prevState.inputs,
                myNumber: {
                  ...prevState.inputs.myNumber,
                  value: number,
                  valid: validate(
                    text,
                    prevState.inputs.myNumber.validationRules,
                    connectedValue
                  ),
                  touched:true
                  
                }
                
              }
              
            };
          });
       
           
      
      
          } 
           getAge = (dateString) => {
            var today = new Date();
            var birthDate = new Date(dateString);
            var age = today.getFullYear() - birthDate.getFullYear();
            var m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age;
         }

          register = () => {
              //alert('Hellow');
             let CHeckAge =this.getAge(this.state.DateSelected.substring(5, 7) +'/'+this.state.DateSelected.substring(8, 10) + '/' + this.state.DateSelected.substring(0, 4));
             console.log(CHeckAge);
             if(CHeckAge < 18) {
               alert('Your Age Does not qualify for our minimum age requirements');
               return;
             }

            let authdata = {
                    name:this.state.inputs.name.value,
                    email:this.state.inputs.email.value,
                    password:this.state.inputs.password.value,
                    mobile_number:this.state.inputs.myNumber.value,
                    age:CHeckAge,
                    // age:this.state.inputs.month.value,
                    // age:this.state.inputs.year.value,
                    country:this.state.inputs.country.value,
                    city:this.state.inputs.city.value,
              }
            this.props.onRegister(authdata,this.props.componentId);
            console.log(authdata);
            console.log(authdata.age);
          }
          onContentSizeChange = (contentWidth, contentHeight) => {
            // Save the content height in state
            this.setState({ screenHeight: contentHeight });
          };

          onItemSelected = (key) => {
            const selPlace  = this.props.places.find(place => {
                return place.key === key;
            });
        }
        dayChange =(day,type) => {
            console.log(type);
            this.setState(prevState =>{
               // console.log(info)
                return {
                    inputs: {
                        ...prevState.inputs,
                        [type]: {
                          ...prevState.inputs[type],
                          value: day.titile,
                          valid: true,
                          touched:true
                          
                        }
                        
                      },
                      addDate:false,
                      addMonth:false,
                      addYear:false
                }
            })
        }

        popScreen = () => {
          Navigation.popToRoot(this.props.componentId);
        } 
          _scrollToInput (reactNode: any) {
            // Add a 'scroll' ref to your ScrollView
            this.scroll.props.scrollToFocusedInput(reactNode)
          }
           onSelect = (country: Country) => {
            console.log(country);
            this.setState(prevState =>{
      
              return {
                inputs: {
                  ...prevState.inputs,
                  country: {
                    ...prevState.inputs.country,
                    value: country.name,
                    valid:true,
                    touched:false
                  }
                },
              };
              
            })
          }
        
  render ()
  {
    const withFilter=true;
    const withFlag = true;
    const withCurrencyButton =true;
    const withCallingCodeButton=true;
    const withCountryNameButton = true;
    const withAlphaFilter=true;
    const withCallingCode =true;
    const withCurrency=true;
    const withEmoji=true;
    const withModal=true;
    const withFlagButton=true;
    const disableNativeModal =false;

  
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
        for( let i=1930;i < 2020 ; i++){
            year.push({
                titile:i,
                value:i
              });
        }

        
        
        
        let email= this.state.inputs.email.valid;
        let password= this.state.inputs.password.valid;
        let confiormPassword = this.state.inputs.confiormPassword.valid;
        let myNumber = this.state.inputs.myNumber.valid;
        let City = this.state.inputs.city.valid;
        let country = this.state.inputs.country.valid;
        

        const scrollEnabled = this.state.screenHeight > hp('100%');

    return (
      <ImageBackground source={bg} style={{flex:1}}>
            <KeyboardAwareScrollView   innerRef={ref => {
    this.scroll = ref
  }}>
          <ScrollView
           scrollEnabled={true}
           onContentSizeChange={this.onContentSizeChange} 
          >

        <View style={styles.logo}>
        <Image source={logo} style={styles.logoImage} />
        </View>
        <View style={styles.formOuterView}>
        <View style={styles.formInnerView}>
        <View style={[styles.textInput,this.state.inputs.name.touched && !this.state.inputs.name.valid ?styles.invalid:'']}>
        <TextInput 
         onFocus={(event: Event) => {
          // `bind` the function if you're using ES6 classes
          this._scrollToInput(findNodeHandle(event.target))
        }}
        placeholder={'Full Name'}
        placeholderTextColor={'white'}
        value={this.state.inputs.name.value} 
        onChangeText={(text) => this.onFieldTextChange(text,'name')} 
        style={[styles.textInputField,]}
         />
         
        </View>
        <Text 
      style={[styles.warrnings,this.state.inputs.name.touched && !this.state.inputs.name.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.name.warningText}</Text>
        <View style={[styles.textInput,this.state.inputs.email.touched && !this.state.inputs.email.valid ?styles.invalid:'']}>
        <TextInput 
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            this._scrollToInput(findNodeHandle(event.target))
          }}
        placeholder={'Email'}
        value={this.state.inputs.email.value} 
        keyboardType={'email-address'}
        autoCorrect={false}
        autoCapitalize="none" 
        placeholderTextColor={'white'}
        onChangeText={(text) => this.onFieldTextChange(text,'email')} 
        style={styles.textInputField}
         />
        </View>
        <Text 
      style={[styles.warrnings,this.state.inputs.email.touched && !this.state.inputs.email.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.email.warningText}</Text>
        <View style={[styles.textInput,this.state.inputs.password.touched && !this.state.inputs.password.valid ?styles.invalid:'']}>
        <TextInput 
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            this._scrollToInput(findNodeHandle(event.target))
          }}
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
        <View style={[styles.textInput,this.state.inputs.confiormPassword.touched && !this.state.inputs.confiormPassword.valid ?styles.invalid:'']}>
        <TextInput 
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            this._scrollToInput(findNodeHandle(event.target))
          }}
        placeholder={'Confirm Password'}
        value={this.state.inputs.confiormPassword.value} 
        placeholderTextColor={'white'}
        onChangeText={(text) => this.onFieldTextChange(text,'confiormPassword')}  
        style={styles.textInputField}
        secureTextEntry={true}
         />
        </View>
        <Text 
      style={[styles.warrnings,this.state.inputs.confiormPassword.touched && !this.state.inputs.confiormPassword.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.confiormPassword.warningText}</Text>
        <View style={[styles.textInput,this.state.inputs.myNumber.touched && !this.state.inputs.myNumber.valid ?styles.invalid:'']}>
        <TextInput 
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            this._scrollToInput(findNodeHandle(event.target))
          }}
        placeholder={'Phone'}
        placeholderTextColor={'white'}
        keyboardType='numeric'
        onChangeText={(text)=> this.onChanged(text)}
        style={styles.textInputField}
        value={this.state.inputs.myNumber.value}
         />
        </View>
        <Text 
      style={[styles.warrnings,this.state.inputs.myNumber.touched && !this.state.inputs.myNumber.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.myNumber.warningText}</Text>
        <View style={{flexDirection:'row'}}>
        <View style={styles.textInputFOrdate}>
        <Text style={styles.textInputFieldDate}>
            Age 
        </Text>
        </View>
        <TouchableOpacity onPress={() => { this.PickDate.onPressDate()}} style={styles.textInputFOrdateRight}>
        <Text style={[styles.textInputFieldDateRight,{paddingLeft:wp('6%')}]}>
            {this.state.DateSelected?this.state.DateSelected.substring(8, 10): 'Day'} <Icon name="sort-down" size={wp('7%')} color="#fff" />
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.PickDate.onPressDate()}} style={styles.textInputFOrdateRight}>
        <Text style={styles.textInputFieldDateRight}>
        {this.state.DateSelected?this.state.DateSelected.substring(5, 7): 'Month'}  <Icon name="sort-down" size={wp('7%')} color="#fff" />
        </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { this.PickDate.onPressDate()}} style={styles.textInputFOrdateRight}>
        <Text style={styles.textInputFieldDateRight}>
        {this.state.DateSelected?this.state.DateSelected.substring(0, 4): 'Year'}  <Icon name="sort-down" size={wp('7%')} color="#fff" />
        </Text>
        </TouchableOpacity>
        <View>
        <Modal visible={this.state.addDate} transparent={true} >
        <View style={{
                  paddingTop: hp('6%'),
                  backgroundColor: '#rgba(255, 255, 255, 1)',
                  width: '100%',
                  height:'100%'
                }}>
            <Text style={{fontWeight:'bold',marginBottom:4,textAlign:'center',fontSize:wp('4%')}}>
                ---Select Day---
            </Text>
            {/* <View style={styles.pickerOuter}> */}
            <FlatList
                ref={x => this.flatlist = x}
                data={day}
                renderItem={(info) => {
                   
                   
                return (
                    
                    <TouchableOpacity onPress={()=>this.dayChange(info.item,'day')} id={info.index}  
                    style={{
                      width: '100%', justifyContent: 'center',
                     alignContent: 'center',
                     borderBottomColor: 'rgba(153, 153, 153, 0.5)',
                     borderBottomWidth: wp('0.2%'),
                    //  height:'100%',
                     alignSelf: 'auto',
                     alignItems: 'center'
                   }}>
                        <View style={styles.communication1}>
                          <View style={styles.view_text_dropdown}>
                            <Text style={styles.text_dropdown} id={info.index}>
                              {info.item.titile}
                            </Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                )
                }}
      />
                    <TouchableOpacity onPress={() => { this.setState({addDate:false})}}  style={{paddingTop:4,paddingBottom:4,alignItems:'center'}}>
                        <Text style={{color:'#000000',fontSize:wp('4%')}}>Cancel</Text>
                    </TouchableOpacity>
            </View>
            {/* </View> */}
            
           
        </Modal>
        </View>
        <View>
        <Modal visible={this.state.addMonth} transparent={true} >
            <View style={{
                  paddingTop: hp('6%'),
                  backgroundColor: '#rgba(255, 255, 255, 1)',
                  width: '100%',
                  height:'100%'
                }}>
            <Text style={{fontWeight:'bold',marginBottom:4,textAlign:'center',fontSize:wp('4%')}}>
                 ---Select Month---
            </Text>
            {/* <View style={styles.pickerOuter}> */}
            <FlatList
                ref={x => this.flatlist = x}
                data={month}
                renderItem={(info) => {
                   
                return (
                
                    <TouchableOpacity onPress={()=>this.dayChange(info.item,'month')} id={info.index}
                    style={{
                      width: '100%', justifyContent: 'center',
                     alignContent: 'center',
                     borderBottomColor: 'rgba(153, 153, 153, 0.5)',
                     borderBottomWidth: wp('0.2%'),
                    //  height:'100%',
                     alignSelf: 'auto',
                     alignItems: 'center'
                   }}>
                        {/* <Text  style={{fontSize:wp('4%')}} id={info.index} >{info.item.titile}</Text> */}

                        <View style={styles.communication1}>
                          <View style={styles.view_text_dropdown}>
                            <Text style={styles.text_dropdown} id={info.index}>
                              {info.item.titile}
                            </Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                )
                }}
      />
                    <TouchableOpacity onPress={() => { this.setState({addMonth:false})}}  style={{paddingTop:4,paddingBottom:4,alignItems:'center'}}>
                        <Text style={{color:'#000000',fontSize:wp('4%')}}>Cancel</Text>
                    </TouchableOpacity>
            </View>
            {/* </View> */}
            
           
        </Modal>
        </View>
        <View>
        <Modal visible={this.state.addYear} transparent={true} >
            <View style={{
                  paddingTop: hp('6%'),
                  backgroundColor: '#rgba(255, 255, 255, 1)',
                  width: '100%',
                  height:'100%'
                }}>
            <Text style={{fontWeight:'bold',marginBottom:4,textAlign:'center',fontSize:wp('4%')}}>
                ---Select Year---
            </Text>
            {/* <View style={styles.pickerOuter}> */}
            <FlatList
                ref={x => this.flatlist = x}
                data={year}
                renderItem={(info) => {
                  
                return (
                
                    <TouchableOpacity 
                    onPress={()=>this.dayChange(info.item,'year')} id={info.index} 
                    style={{
                      width: '100%', justifyContent: 'center',
                     alignContent: 'center',
                     borderBottomColor: 'rgba(153, 153, 153, 0.5)',
                     borderBottomWidth: wp('0.2%'),
                    //  height:'100%',
                     alignSelf: 'auto',
                     alignItems: 'center'
                   }}>
                        {/* <Text  style={{fontSize:wp('4%')}} id={info.index} >{info.item.titile}</Text> */}


                        <View style={styles.communication1}>
                          <View style={styles.view_text_dropdown}>
                            <Text style={styles.text_dropdown} id={info.index}>
                              {info.item.titile}
                            </Text>
                          </View>
                        </View>
                    </TouchableOpacity>
                )
                }}
      />
                    <TouchableOpacity onPress={() => { this.setState({addYear:false})}} 
                     style={{paddingTop:4,paddingBottom:4,alignItems:'center'}}>
                        <Text style={{color:'#000000',fontSize:wp('4%')}}>Cancel</Text>
                    </TouchableOpacity>
            {/* </View> */}
            </View>
            
           
        </Modal>
        </View>
        <View>
        <Modal visible={this.state.addCountry} transparent={true} >
            <View style={styles.textInputFOrdateright}>
            <Text style={{fontWeight:'bold',marginBottom:4,textAlign:'center',fontSize:wp('4%')}}>
                Please Select Year
            </Text>
            {/* <View style={styles.pickerOuter}> */}
            <FlatList
                ref={x => this.flatlist = x}
                data={year}
                renderItem={(info) => {
                  
                return (
                    <TouchableOpacity id={info.index}  style={{paddingTop:4,paddingBottom:4,alignItems:'center'}}>
                        <Text  style={{fontSize:wp('4%')}} id={info.index} >{info.item.titile}</Text>
                    </TouchableOpacity>
                )
                }}
      />
                    <TouchableOpacity onPress={() => { this.setState({addCountry:false})}}  style={{paddingTop:4,paddingBottom:4,alignItems:'center'}}>
                        <Text style={{color:'#000000',fontSize:wp('4%')}}>Cancel</Text>
                    </TouchableOpacity>
            {/* </View> */}
            </View>
            
           
        </Modal>

        {/* Countries */}
        <Modal visible={this.state.COutries} transparent={true} >
            <View style={{
                   paddingTop: hp('6%'),
                   backgroundColor: '#rgba(255, 255, 255, 1)',
                   width: '100%',
                   height:'100%',
                   paddingBottom: hp('6%'),
            }}>
            <Text style={{fontWeight:'bold',marginBottom:4,textAlign:'center',fontSize:wp('4%')}}>
                Please Select Coutry
            </Text>
            {/* <View style={styles.pickerOuter}> */}
            <FlatList
                ref={x => this.flatlist = x}
                data={this.state.CountriesData}
                renderItem={({item}) => {
                    // console.log(item);
                return (
                    <TouchableOpacity onPress={() =>{
                      this.setState(prevState =>{
      
                        return {
                          COutries:false,
                          inputs: {
                            ...prevState.inputs,
                            country: {
                              ...prevState.inputs.country,
                              value: item,
                              valid:true,
                              touched:false
                            }
                          },
                        };
                        
                      })
                           
                    }}   style={{paddingTop:4,paddingBottom:4,alignItems:'center'}}>
                        <Text  style={{fontSize:wp('4%')}}  >{item}</Text>
                    </TouchableOpacity>
                )
                }}
                keyExtractor={({item})=>item}
      />
                    <TouchableOpacity onPress={() => { this.setState({COutries:false})}}  style={{paddingTop:4,paddingBottom:4,alignItems:'center'}}>
                        <Text style={{fontWeight:'bold',marginBottom:4,textAlign:'center',fontSize:wp('4%')}}>Cancel</Text>
                    </TouchableOpacity>
            {/* </View> */}
            </View>
            
           
        </Modal>
        </View>
        </View>
        <TouchableOpacity onPress={() => { this.setState({SelectCountry:true})}} style={[styles.textInput,this.state.inputs.country.touched && !this.state.inputs.country.valid ?styles.invalid:'']}>
        <Text style={styles.textInputField}>
          {this.state.inputs.country.value.length > 0?this.state.inputs.country.value:'Country'}
        </Text>
        
        
        </TouchableOpacity>
        <Text 
      style={[styles.warrnings,this.state.inputs.country.touched && !this.state.inputs.country.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.country.warningText}</Text>
        <View style={[styles.textInput,this.state.inputs.city.touched && !this.state.inputs.city.valid ?styles.invalid:'']}>
        <TextInput 
          onFocus={(event: Event) => {
            // `bind` the function if you're using ES6 classes
            this._scrollToInput(findNodeHandle(event.target))
          }}
        placeholder={'City'}
        onChangeText={(text) => this.onFieldTextChange(text,'city')} 
        placeholderTextColor={'white'}
        style={styles.textInputField}
         />
        </View>
        <Text 
      style={[styles.warrnings,this.state.inputs.city.touched && !this.state.inputs.city.valid ?styles.show:styles.disapair]}
      >{this.state.inputs.city.warningText}</Text>
       

                  {!this.props.loading ? <TouchableOpacity 
        disabled={email && password && confiormPassword && myNumber && City && country ? false : true}
        onPress={()=>
         { 
          let CHeckAge =this.getAge(this.state.DateSelected.substring(5, 7) +'/'+this.state.DateSelected.substring(8, 10) + '/' + this.state.DateSelected.substring(0, 4));
             if(CHeckAge < 18) {
               alert('Your Age Does not qualify for our minimum age requirements our minimum age requirement is 18 ');
               return;
             } 
          this.setState({
            ShowPrivacy:true
          })
        }
        } 
        
        style={{flexDirection:'row'}}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }}
         colors={[ '#bbd9f1','#138ece','#0067a9']}
          style={[styles.textInput,{justifyContent:'center',alignItems:'center',alignSelf:'auto',alignContent:'center',backgroundColor:'#13191a'}]}>
                <Text style={styles.text}>
                    Sign Up
                </Text>
                
        </LinearGradient>
        </TouchableOpacity>:<ActivityIndicator size={wp('15%')} color="#29abe2" />
}

       {/* Privacy Policy  */}




       <Modal 
       visible={this.state.ShowPrivacy}
        transparent={true}
        onRequestClose={() =>{
          this.setState({
            ShowPrivacy:false
          })
        }}
        >
            <View style={{
              flex:1,
              zIndex:9999
            }}>
             <View style={{
                      marginTop:wp('40%'),
                      width:'100%',
                      height:hp('70%')
             }}>
             <View 
             style={{
               width:'100%',
               height:hp('50%')
             }}>
             <WebView
                    source={{uri:'https://urpixpays.com/privacy'}}
                      />
             </View>
             <View style={{
               width:'100%',  
              backgroundColor:'white',
              flexDirection:'row',  
              justifyContent:'space-between',
              alignContent:'space-between',
              alignItems:'center',
              alignSelf:'auto',
              paddingHorizontal:wp('5%')
             }}>
               <TouchableOpacity 
               onPres={() =>{
                 this.setState({
                  ShowPrivacy:false
                 })
               }}
               
               style={{
                 padding:wp('3%'),
                backgroundColor:'#29abe2',
               }}>
                 <Text style={{fontSize:wp('3.5%'),color:'#fff'}}>
                   Decline
                 </Text>
               </TouchableOpacity>
               <TouchableOpacity onPress={() =>{
                    this.register() 
                    this.setState({
                      ShowPrivacy:false
                    })
               }} style={{
                 padding:wp('3%'),
                 backgroundColor:'#29abe2',
               }}>
                 <Text style={{fontSize:wp('3.5%'),color:'#fff'}}>
                   Accept
                 </Text>
               </TouchableOpacity>
             </View>
             </View>
            </View>
        </Modal>



       {/* End Privcy Policy */}



        {/* <TouchableOpacity onPress={()=> this.popScreen()} style={styles.crossbutton}>
                <Icons name="ios-close-circle-outline" size={wp('12%')} style={{color:'white'}} />
        </TouchableOpacity> */}
        </View>

        </View>
       <View>
       <CountryPicker
          theme={{}}
          onSelect={this.onSelect}
          modalProps={{
            visible:this.state.SelectCountry
          }}
          onClose={() =>{
            this.setState({
              SelectCountry:false
            })
          }}
          onOpen={() =>{

          }}
          {...{
            CountryCode,
            withFilter,
            excludeCountries: ['FR'],
            withFlag,
            withCurrencyButton,
            withCallingCodeButton,
            withCountryNameButton,
            withAlphaFilter,
            withCallingCode,
            withCurrency,
            withEmoji,
            withModal,
            withFlagButton,
            disableNativeModal,
            
          }}
        />
       </View>
        </ScrollView>
        </KeyboardAwareScrollView>
        <View style={{height:0}}>
        <DatePicker
        date={this.state.date}
        ref={ref=>(this.PickDate = ref)}
        mode="date"
        hideText={true}
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        minuteInterval={10}
        customStyles={{
          dateIcon: {
            display:'none'
          },
          dateInput: {
            color:'black',
            borderWidth:0
          },
          dateText:{
            //fontSize:wp('4%'),
            fontSize:wp('5.5%'),color:'black',fontWeight:'600'
          }
          // ... You can check the source to find the other keys.
        }}
        onDateChange={(date) => {this.setState({
          DateSelected: date,
          
        })}}
      />
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
    flex:0,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    zIndex:99999,
  },
  logoImage:{
    width:wp('100%'),
    height:wp('35%')

  },
  termsLeftText:{
    color:'white',
    fontSize:wp('4%'),
    fontFamily:Platform.OS === 'android' ? 'Raleway-Light':'Raleway-Light',
  },
  formOuterView:{
      flex:2,
      width:wp('100%'),
      paddingLeft:wp('8%'),
      paddingRight:wp('8%'),

  },
  textInput:{
    width:'100%',
    height:hp('6%'),
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginBottom:hp('1%'),
    justifyContent:'center',

  },
  invalid:{
    borderBottomColor:'rgba(255,0,0,1)',
    borderBottomWidth:2,
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
    margin:wp('10%'),
    backgroundColor: 'rgba(255,255,255,1)',
    padding:20,
    position:'absolute',
    bottom:20,
    // left:20,
    // right:20,
    width:wp('100%'),
    height:hp('50%')
  },
  pickerOuter:{
      height:hp('15%'),
  },
  textInputFOrdateRight:{
    width:'26.3%',
    height:wp('11%'),
    alignContent:'center',
    alignItems:'center',
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
    fontFamily:Platform.OS === 'android' ? 'Raleway-Medium':'Raleway-Medium',
},
crossbutton:{
    position:'absolute',
    top:hp('65%'),
    left:wp('37%'),
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
  communication1: {
    height: wp('10%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },

  view_text_dropdown:
  {
    justifyContent: 'center',
    marginLeft: wp('4%'),
  },
  text_dropdown:
  {
    justifyContent: 'center',
    fontSize:wp('4%'),
    fontFamily:'Roboto',
    letterSpacing: wp('0.1%')
  },


});

const mapStateToProps = state =>{
  return{
    loading:state.isLoading.isLoading
  }
}

const mapsDispatchToProps = dispatch =>{
    return{
        onRegister :(authdata,componentId)=>dispatch(resiterUser(authdata,componentId))
    }
}

export default connect(mapStateToProps,mapsDispatchToProps) (SignUp);
