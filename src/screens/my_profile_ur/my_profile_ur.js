/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Icon_edit from 'react-native-vector-icons/MaterialIcons';
import pro_image from '../../images/technician-section.png';
import img1 from '../../images/dollor.jpeg';
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { UserProfileData } from '../../store/actions/index';
import validate from '../../Validate/Validate';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import FastImage from 'react-native-fast-image';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  findNodeHandle,
  ActivityIndicator,
  Alert
} from 'react-native';

import Topbar from './topbar';
import ImagePicker from 'react-native-image-picker';
const axios = require('axios');

class MyProfile extends React.Component {
  constructor(props){
    super(props);
    this.props.UserData();
  }
  componentDidMount = () =>{
    this.setState(prevState =>{
      
      return {
        inputs: {
          ...prevState.inputs,
          email: {
            ...prevState.inputs.email,
            value: this.props.pro_data.email,
            valid:this.props.pro_data.email?this.props.pro_data.email.length > 3 ?true:false:false,
            touched:false
          },
          city: {
            ...prevState.inputs.city,
            value: this.props.pro_data.city,
            valid:this.props.pro_data.city?this.props.pro_data.city.length > 1?true:false:false,
            touched:false
          },
          country: {
            ...prevState.inputs.country,
            value: this.props.pro_data.country,
            valid:this.props.pro_data.country?this.props.pro_data.country.length > 2 ?true:false:false,
            touched:false
          },
          age: {
            ...prevState.inputs.age,
            value: this.props.pro_data.age,
            valid:this.props.pro_data.age?this.props.pro_data.age.length > 0 ?true:false:false,
            touched:false
          },
          password: {
            ...prevState.inputs.password,
            value: this.props.pro_data.password,
            valid:true,
            touched:false
          }
        },
      };
      
    })
  }

  state = {
    loading:false,
    pickImage:[],
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
      age:{
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


  UpdateProfile = ()  =>{
    axios.post('https://urpixpays.com/stagging_urpixpays/saveProfile', {
      "uid" :this.props.user.no,
      "name": this.props.user.name,
      "email": this.state.inputs.email.value,
      "city":this.state.inputs.city.value,
      "country":this.state.inputs.country.value,
      "age":this.props.pro_data.age,
      "password":this.state.inputs.password.value
  })
    .then((response) => {
      console.log(response.data.message);
      if(response.data.message =="profile update successfully") {
        alert('Your profile was updated successfully!');
        this.props.UserData();
      }else{
        alert(response.data.data)
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error)
      
    });

  }
  ImagePickr = () => {
    ImagePicker.showImagePicker({
      title: 'Please Pick An Image',
      maxWidth:1200,
      maxHeight:1200
    }, res => {
      console.log(res);
      if (res.didCancel) {
        console.log('User Canceled')
      } else if (res.error) {
        console.log('Error', res.error)
      } else {
        this.setState(prevState => {
          return {
            pickImage: prevState.pickImage.concat({
              key: Math.random(),
              uri: res.uri,
              source: res.data,
              filesize: res.fileSize
            })
          }
        })

        this.submitImage();
      }
    });
  }

  ImagePickr2 = () => {
    ImagePicker.showImagePicker({
      title: 'Please Pick An Image',
      maxWidth:1200,
      maxHeight:1200
    }, res => {
      console.log(res);
      if (res.didCancel) {
        console.log('User Canceled')
      } else if (res.error) {
        console.log('Error', res.error)
      } else {
        this.setState(prevState => {
          return {
            pickImage: prevState.pickImage.concat({
              key: Math.random(),
              uri: res.uri,
              source: res.data,
              filesize: res.fileSize
            })
          }
        })

        this.submitImage2();
      }
    });
  }

  submitImage = () => {
    this.setState({loading: true});
   let idImage = this.state.pickImage;
    fetch('https://urpixpays.com/stagging_urpixpays/saveProfilepic', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         "uid":this.props.user.no,
         "image": idImage,
      }),
   })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({loading: false});
        //  dispatch(uiStopLoading());
        // this.props.uiStopLoading();
         console.log(responseData)
         if(responseData.success){
            Alert.alert(
               'Alert',
               'Your profile was updated successfully!',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
             this.props.UserData();
            //  dispatch(MyChallenges())
         }

      })
      .catch((err) => {
        //  dispatch(uiStopLoading());  
        this.setState({loading: false});
         console.log(err)
      })
      .done();


    // this.props.upload(idImage, this.props.CurrentChallenge[0].id,this.props.componentId);
    this.setState({
      pickImage:[],
    })

  }
  submitImage2 = () => {
    this.setState({loading: true});
   let idImage = this.state.pickImage;
    fetch('https://urpixpays.com/stagging_urpixpays/savecover', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         "uid":this.props.user.no,
         "image": idImage,
      }),
   })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({loading: false});
        //  dispatch(uiStopLoading());
        // this.props.uiStopLoading();
         console.log(responseData)
         if(responseData.success){
            Alert.alert(
               'Alert',
               'Your profile was updated successfully!',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
             this.props.UserData();
            //  dispatch(MyChallenges())
         }

      })
      .catch((err) => {
        //  dispatch(uiStopLoading());  
        this.setState({loading: false});
         console.log(err)
      })
      .done();


    // this.props.upload(idImage, this.props.CurrentChallenge[0].id,this.props.componentId);
    this.setState({
      pickImage:[],
    })

  }

  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }
  render() {

    let LoginButton =( <View>

      </View>);
      if(this.state.loading) {
        LoginButton =(
          <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
          <ActivityIndicator size={'large'} color={'#e2e2e2'}  />
       </View>
        )
      }
    console.log(this.props.pro_data)
    return (
      <View style={styles.conatainer}>
        {/* <View style={styles.topbar_view}>
          <Topbar />
        </View> */}
   <KeyboardAwareScrollView   innerRef={ref => {
    this.scroll = ref
  }}>
        <ScrollView>
          {LoginButton}
          <View style={styles.view_photo_parent}>
            <View style={styles.view_photo}>
              <ImageBackground style={styles.view_img_bg}
               source={this.props.pro_data.cover_img?{
                uri:'https://urpixpays.com/public/images/profile_pictures/'+this.props.pro_data.cover_img
              }:img1}
              resizeMode={'cover'}
              >
                <View style={styles.view_overlay}>
                  <View style={styles.view_flexes}>
                    <View style={styles.view_flex_img}>
                      <View style={styles.view_border}>
                        <TouchableOpacity onPress={() =>{
                          this.ImagePickr();
                        }} style={styles.view_person_pic}>
                          <FastImage
                        style={styles.img_style}
                          source={{
                            
                            uri:'https://urpixpays.com/public/images/profile_pictures/'+this.props.pro_data.images,
                              priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                      />
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          marginLeft: wp('10%'),
                          marginTop: wp('3%'),
                          flexDirection: 'row',
                          justifyContent: 'center',
                        }}>
                        <View
                          style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                          }}>
                          <View
                            style={{
                              height: wp('2.7%'),
                              width: wp('2.7%'),
                              backgroundColor: '#00FF00',
                              borderRadius: wp('1.85%'),
                              marginRight: wp('2%'),
                            }}>

                            </View>
                        </View>

                        <View style={{}}>
                          <Text
                            style={{
                              fontSize: wp('4%'),
                              fontWeight: '500',
                              color: '#ffffff',
                            }}>
                            online
                        </Text>
                        </View>
                      </View>
                    </View>
                    <View style={styles.view_flex_text}>
                      <View style={styles.view_texes}>
                        <Text style={styles.text_name}>{this.props.pro_data.name}</Text>
                      </View>
                      <TouchableOpacity onPress={() =>{
                        this.ImagePickr2();
                      }} style={styles.view_edit}>
                        <Icon_edit name='create' size={wp('5%')} color='black' />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
          </View>


          <View style={styles.view_box_items}>
            <View style={styles.view_box_view1}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',textAlign:'center',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.timestamp}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.2%')
                  }}>Sing Up Date</Text>
                </View>
              </View>
            </View>
            <View style={styles.view_box_view2}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.wallet}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>Wallet</Text>
                </View>
              </View>
            </View>
            <View style={styles.view_box_view3}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.points}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>Votes</Text>
                </View>
              </View>
            </View>
            <View style={styles.view_box_view4}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.pixpoints}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>Pix Points</Text>
                </View>
              </View>
            </View>

          </View>


          <View style={styles.view_box_items1}>
            <View style={styles.view_box_view5}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.flip}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.2%')
                  }}>Flips</Text>
                </View>
              </View>
            </View>
            <View style={styles.view_box_view6}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.charge}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>Charges</Text>
                </View>
              </View>
            </View>
            <View style={styles.view_box_view7}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.wand}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>Wands</Text>
                </View>
              </View>
            </View>
            <View style={styles.view_box_view8}>
              <View style={{
                justifyContent: 'center', alignContent: 'center', alignItems: 'center',
                alignSelf: 'center',
              }}>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginTop: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>{this.props.pro_data.rank}</Text>
                </View>
                <View style={{
                  flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center',
                  marginBottom: wp('1%')
                }}>
                  <Text style={{
                    fontSize: wp('3%'), fontWeight: '800', color: 'white',
                    letterSpacing: wp('-0.1%')
                  }}>Rank</Text>
                </View>
              </View>
            </View>

          </View>





          <View style={styles.view_tabel}>
            <View style={styles.view_long_line}></View>
            <View style={styles.view_tabel_inner}>
              <View style={styles.view_sr_no}>
                <Text style={{ fontWeight: '500', fontSize: wp('3%') }}>
                  Age
              </Text>
              </View>

              <View style={[styles.view_date_view,{justifyContent:'center',alignContent:'flex-start',alignItems:'flex-start'}]}>
                <Text style={{ fontWeight: '500', fontSize: wp('3%'), color: 'black' }}>
                {this.props.pro_data.age}
              </Text>
              
              {/* <TextInput
                style={styles.textInputField}
                placeholder={'Please Enter Your Age'}
                onChangeText={(text) => this.onFieldTextChange(text,'age')} 
                value={this.state.inputs.age.value}
                /> */}
              </View>

            </View>
            <View style={styles.view_long_line}></View>
            <View style={styles.view_tabel_inner}>
              <View style={styles.view_sr_no}>
                <Text style={{ fontWeight: '500', fontSize: wp('3%') }}>
                  Country
              </Text>
              </View>

              <View style={styles.view_date_view}>
                {/* <Text style={{ fontWeight: '500', fontSize: wp('3%'), color: '#999999' }}> */}
                {/* {this.props.pro_data.country} */}
                <TextInput
                   onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this._scrollToInput(findNodeHandle(event.target))
                  }}
                style={styles.textInputField}
                placeholder={this.props.pro_data.country}
                onChangeText={(text) => this.onFieldTextChange(text,'country')} 
                value={this.state.inputs.country.value}
                />
              {/* </Text> */}
              </View>

            </View>
            <View style={styles.view_long_line}></View>
            <View style={styles.view_tabel_inner}>
              <View style={styles.view_sr_no}>
                <Text style={{ fontWeight: '500', fontSize: wp('3%') }}>
                  City
              </Text>
              </View>

              <View style={styles.view_date_view}>
              <TextInput
                 onFocus={(event: Event) => {
                  // `bind` the function if you're using ES6 classes
                  this._scrollToInput(findNodeHandle(event.target))
                }}
                style={styles.textInputField}
                placeholder={this.props.pro_data.city}
                onChangeText={(text) => this.onFieldTextChange(text,'city')} 
                value={this.state.inputs.city.value}
                />
              </View>

            </View>
            <View style={styles.view_long_line}></View>
            <View style={styles.view_tabel_inner}>
              <View style={styles.view_sr_no}>
                <Text style={{ fontWeight: '500', fontSize: wp('3%') }}>
                  Email
              </Text>
              </View>

              <View style={styles.view_date_view}>
              <TextInput
                 onFocus={(event: Event) => {
                  // `bind` the function if you're using ES6 classes
                  this._scrollToInput(findNodeHandle(event.target))
                }}
                style={styles.textInputField}
                placeholder={this.props.pro_data.email}
                onChangeText={(text) => this.onFieldTextChange(text,'email')} 
                value={this.state.inputs.email.value}
                />
              </View>

            </View>
            <View style={styles.view_long_line}></View>
            <View style={styles.view_tabel_inner}>
              <View style={styles.view_sr_no}>
                <Text style={{ fontWeight: '500', fontSize: wp('3%') }}>
                  password
              </Text>
              </View>

              <View style={[styles.view_date_view,{justifyContent:'center',alignContent:'flex-start',alignItems:'flex-start'}]}>
              <TextInput
                   onFocus={(event: Event) => {
                    // `bind` the function if you're using ES6 classes
                    this._scrollToInput(findNodeHandle(event.target))
                  }}
                  placeholderTextColor={'black'}
                style={styles.textInputField}
                placeholder={this.props.pro_data.password}
                onChangeText={(text) => this.onFieldTextChange(text,'password')} 
                value={this.state.inputs.password.value}
                />
              </View>

            </View>
            <View style={styles.view_long_line}></View>
          </View>

          <TouchableOpacity onPress={() =>{
            this.UpdateProfile();
          }} style={styles.update_view}>
            <Text style={{ fontWeight: '400', fontSize: wp('6%'), color: '#ffffff' }}>Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    paddingTop: wp('0.5%'),
    height: wp('45%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_img_bg: {
    width: '100%',
    height: '100%',
  },
  view_photo_1: {
    flex: 1,
    margin: wp('0.6'),
    height: wp('30%'),
  },
  view_photo: {
    flex: 1,
    margin: wp('0.6'),
    height: '100%',
    width: '100%',
  },

  view_overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },

  view_line: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: wp('0.1%'),
    width: '100%',
    backgroundColor: 'rgba(0,0,0,.1)',
  },


  view_nav_bar: {
    marginTop: wp('5%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    flexDirection: 'row',
    height: wp('9%'),
    width: wp('100%'),
    backgroundColor: '#B5B5B5',
  },
  view_nav_bar_inner: {
    flexDirection: 'row',
    height: wp('9%'),
  },
  img_view: {
    height: wp('7.5%'),
    width: wp('7.5%'),
  },
  text_view: {
    fontSize: wp('3%'),
    fontWeight: '500',
    color: '#ffffff',
  },
  item_view: {
    justifyContent: 'center',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
  },
  view_line1: {
    height: '100%',
    flexDirection: 'column',
    marginLeft: wp('1.5%'),
    marginRight: wp('1.5%'),
    width: wp('0.2%'),
    backgroundColor: '#ffffff',
  },
  view_line_right: {
    height: '100%',
    flexDirection: 'column',
    width: wp('0.2%'),
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },

  view_tabel: {
    width: wp('100%'),
    marginTop: wp('7%'),
    height: wp('55%'),
  },
  view_tabel_inner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
    height: wp('10%'),
  },
  view_tabel_inner2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
    height: '5%',
  },
  view_sr_no: {
    width: wp('25%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view: {
    height: '100%',
    width:'100%',
    alignContent: 'center',
    paddingLeft: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  view_long_line: {
    height: wp('0.2%'),
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  view_border: {
    height: wp('27%'),
    marginLeft: wp('10%'),
    marginTop: wp('6%'),
    width: wp('27%'),
    borderRadius: wp('13.5%'),
    borderColor: '#ffffff',
    borderWidth: wp('0.1%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_person_pic: {
    height: wp('25%'),
    width: wp('25%'),
    padding: wp('5%'),
    backgroundColor: '#F4F7FC',
    borderRadius: wp('12.5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_flexes: {
    flexDirection: 'row',
  },

  view_flex_1: {},
  img_style: {
    height: wp('22%'),
    borderRadius:wp('11%'),
    width: wp('22%'),
  },
  view_texes: {
    marginLeft: wp('4%')
  },
  view_votes: {
    marginTop: wp('5%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_flex_img: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  view_flex_text: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignContent: 'center', alignItems: 'center',
    alignSelf: 'center',
    marginTop: wp('5%'),
  },
  view_edit:
  {
    marginLeft: wp('3%'),
    justifyContent: 'center',
    alignContent: 'center', alignItems: 'center',
    alignSelf: 'center',
    height: wp('5%'),
    width: wp('5%'),
    backgroundColor: 'white',
    borderRadius: wp('1%')

  },
  text_name:
  {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    letterSpacing: wp('0.5%'),
    color: 'white'
  },
  view_box_items:
  {
    flexDirection: 'row',
    height: wp('20%'),
    width: wp('90%'),
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: wp('1%'),
    alignContent: 'center',
    marginTop: wp('4%'),
  },
  view_box_items1:
  {
    flexDirection: 'row',
    height: wp('20%'),
    width: wp('90%'),
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: wp('1%'),
    alignItems: 'center',
    alignContent: 'center',

  },
  view_box_view3:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#F15A24',
    borderRadius: wp('2%'),
  },
  view_box_view1:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#8CC63F',
    borderRadius: wp('2%'),
  },
  view_box_view2:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#29ABE2',
    borderRadius: wp('2%'),
  },
  view_box_view4:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#00A99D',
    borderRadius: wp('2%'),
  },
  view_box_view5:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#ED1E79',
    borderRadius: wp('2%'),
  },
  view_box_view6:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#FBB03B',
    borderRadius: wp('2%'),
  },
  view_box_view7:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#1B1464',
    borderRadius: wp('2%'),
  },
  view_box_view8:
  {
    height: wp('18%'),
    width: wp('20%'),
    backgroundColor: '#666666',
    borderRadius: wp('2%'),
  },
  update_view:
  {
    height: wp('15%'),
    width: wp('100%'),
    backgroundColor: '#8cc63f',
    shadowColor: '#8cc63f',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    justifyContent: 'center',
    alignContent: 'center', alignItems: 'center',
    alignSelf: 'center',
  },
  textInputField:{
    fontSize:wp('3.7%'),
    color:'black',
    width:'100%',
    // paddingLeft:wp('4%'),
    //paddingTop:hp('1.8%'),
    fontFamily:Platform.OS === 'android' ? 'Raleway-Medium':'Raleway-Medium',
},
});

const mapStateToProps = state => {
  return {
    pro_data:state.BestImages.SaveuserProfiledata,
    user:state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    UserData: () => dispatch(UserProfileData())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);