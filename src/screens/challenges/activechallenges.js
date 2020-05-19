import React, { Component } from 'react';
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
  TouchableOpacity,
  Modal,
  PanResponder,
  Easing,
  FlatList,
  Dimensions,
  Alert,
  ActivityIndicator
} from 'react-native';
import WalletImage from '../../images/Waleeticon.png';
import MenuDrawer from 'react-native-side-drawer';
import ImagePicker from 'react-native-image-picker';
import RNSpeedometer from 'react-native-speedometer';
import Lightbox from 'react-native-lightbox';
import LinearGradient from 'react-native-linear-gradient';
import DummyUpload from '../../images/urpixpayss.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";
import bg from '../../images/bg-img.jpg';
import techni from '../../images/Tecnisan.jpg';
import Ficons from 'react-native-vector-icons/MaterialIcons';
import { 
  SaveUserInfoWallet, 
  GetVoteImages, 
  UserProfileData,
  FlipImage,
  MyChallenges,
  uiStopLoading,
  uiStartLoading,
  RefreshTaskData,
  getDetailsImage,
  SaveUserInfoPayThroughInApp
 } from '../../store/actions/index';
import Icons from 'react-native-vector-icons/Ionicons';
import Topbar from '../../components/topbar/topbar';
import Charge from '../../images/icon/charge.png';
import wand from '../../images/icon/wand.png';
import vote from '../../images/icon/votes.png';
import PixP from '../../images/pixP.png';
import BottomBar from '../../components/bottombar/bottombar';
import flipImage from '../../images/img.png';
import flip from '../../images/icon/flip.png';
import flipicon from '../../images/flipIconsNew.jpg';
import charges from '../../images/icon/chargess.png';
import key from '../../images/icon/key.png';
import FlipWithoutBg from '../../images/icon/flip-without-bg.png';
import SideDrawer from '../sidedrawer/sidedrawer';
import { connect } from 'react-redux';
import { UploadImage } from '../../store/actions/index';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import RNIap, {
  InAppPurchase,
  PurchaseError,
  SubscriptionPurchase,
  acknowledgePurchaseAndroid,
  consumePurchaseAndroid,
  finishTransaction,
  finishTransactionIOS,
  purchaseErrorListener,
  purchaseUpdatedListener,
} from 'react-native-iap';
const { height } = Dimensions.get('window');
const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
class ActiveChalenge extends Component {

  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;


    Navigation.events().bindComponent(this);
    // <== Will be automatically unregistered when unmounted
    // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
  }
  // onNavigatorEvent = event => {
  //   if(event.type === "Drawer") {
  //     if(event.id === "UrPicsPay.InfoPage") {
  //       this.props.navigator.toggleDrawer({
  //         side: 'left'     
  //       });
  //     }
  //   }
  // }

  navigationButtonPressed({ buttonId }) {
    if (buttonId === "openSideDrawer") {
      (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: true,
          }
        }
      });
    }
  }

  // <== Will be automatically unregistered when unmounted


  changeScreen = (screen, title) => {
    // AsyncStorage.setItem("screen", JSON.stringify(screen));
    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          sideMenu: {
            left: {
                visible: false,
                enabled: false
              }
        },
          topBar: {
            visible: true,
            title: {
              text: title,
              alignment: 'center'
            }
          },
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: true
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

  charge = () => {

    //dispatch(uiStartLoading());
    fetch('https://urpixpays.com/stagging_urpixpays/challenges/charge', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "uid": this.props.logindata.no,
        "cid": this.props.CurrentChallenge[0].id,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        "POST Response",
          "Response Body -> " + JSON.stringify(responseData)
        console.log(responseData.message);
        this.props.RefreshTaskData(this.props.CurrentChallenge[0].id);
        if (responseData.message == 'Charge Successful!') {
          alert(`Charge Successful!`);
          // dispatch(uiStopLoading());

          this.props.UserData();
          this.setState({
            charge:false
          })
          this.props.MyChallenges()
          
          // changeScreen('UrPicsPay.mychallenges');
        } else if (responseData.message == 'Please purchase Charge through wallet!') {
          Alert.alert(
            'Alert Title',
            responseData.message+ '.',
            [
              {text: 'OK', onPress: () => {
                this.changeScreen('UrPicsPay.BalanceOverView','Blannce Overview',2);
              }},
            ],
            { cancelable: false }
          )
          //   dispatch(uiStopLoading());
          //   alert(responseData.data);
        }

      })
      .catch((err) => console.log(err))
      .done();


  }

  allcharge = () => {

    //dispatch(uiStartLoading());
    fetch('https://urpixpays.com/stagging_urpixpays/allcharge', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "uid": this.props.logindata.no,
        "value": "charge"
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        "POST Response",
          "Response Body -> " + JSON.stringify(responseData)
        console.log(responseData);
        this.props.RefreshTaskData(this.props.CurrentChallenge[0].id);
        if (responseData.data) {
          alert(`All Charges Successful!`);
          // dispatch(uiStopLoading());

          this.props.MyChallenges()
          
          // changeScreen('UrPicsPay.mychallenges');
        } else if (!responseData.data) {
          alert('All Charges Failed! ' + responseData.data);
          //   dispatch(uiStopLoading());
          //   alert(responseData.data);
        }

      })
      .catch((err) => console.log(err))
      .done();


  }

  flipChargeWand = (type, text) => {

    this.props.Charge(type, text,this.props.componentId);
    this.props.UserData();


  }
  componentDidMount() {
    this.props.GetAllImages()
    this.props.rankFucn();
  }
  vote = () => {


    fetch('https://urpixpays.com/stagging_urpixpays/challenges/voting/cid/439/' + this.props.logindata.no)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        "POST Response",
          "Response Body -> " + JSON.stringify(responseData)
        console.log(responseData);
        this.props.RefreshTaskData(this.props.CurrentChallenge[0].id);
        if (responseData.wand_charge) {
          alert(`images shown`);
          // dispatch(uiStopLoading());
          // changeScreen('UrPicsPay.mychallenges');
        } else if (!responseData.data) {
          alert('Failed! ' + responseData.data);
          //   dispatch(uiStopLoading());
          //   alert(responseData.data);
        }

      })
      .catch((err) => console.log(err))
      .done();

  }

  abbreviateNumber = (number) =>{

    // what tier? (determines SI symbol)
    var tier = Math.log10(number) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}



  wand = () => {

    //dispatch(uiStartLoading());
    fetch('https://urpixpays.com/stagging_urpixpays/challenges/wand', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "uid": this.props.logindata.no,
        "cid": this.props.CurrentChallenge[0].id,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        "POST Response",
          "Response Body -> " + JSON.stringify(responseData)
        console.log(responseData);
        this.props.RefreshTaskData(this.props.CurrentChallenge[0].id);
        if (responseData.message==='Wand Successful!') {
          alert(responseData.message);
          this.props.UserData();
          // this.props.CurrentChallenge;
          
          this.setState({ 
            wand:false
          });
          this.props.MyChallenges()
          
          // dispatch(uiStopLoading());
          // changeScreen('UrPicsPay.mychallenges');
        } else if (responseData.message =='Please purchase Wand through wallet!') {
          Alert.alert(
            'Alert Title',
            responseData.message+ '.',
            [
              {text: 'OK', onPress: () => {
                this.changeScreen('UrPicsPay.BalanceOverView','Blannce Overview',2);
              }},
            ],
            { cancelable: false }
          )
          //   dispatch(uiStopLoading());
          //   alert(responseData.data);
        }

      })
      .catch((err) => console.log(err))
      .done();
  }

  allwand = () => {

    //dispatch(uiStartLoading());
    fetch('https://urpixpays.com/stagging_urpixpays/allwand', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "uid": this.props.logindata.no,
        "value": "wand"
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        "POST Response",
          "Response Body -> " + JSON.stringify(responseData)
        console.log(responseData);
        if (responseData.data) {
          alert(`All Wands Successful!`);
          this.props.UserData();
          // dispatch(uiStopLoading());

          this.props.MyChallenges()
          
          // changeScreen('UrPicsPay.mychallenges');
        } else if (!responseData.data) {
          alert('All Wands Failed! ' + responseData.data);
          //   dispatch(uiStopLoading());
          //   alert(responseData.data);
        }

      })
      .catch((err) => console.log(err))
      .done();


  }






  // toggleOpen = () => {
  //   this.setState({ open: !this.state.open });
  // };

  // drawerContent = () => {
  //   return (
  //         <View style={[styles.animatedBox]}>
  //         <SideDrawer OpenSideDrawer={this.toggleOpen} goto={(s)=>this.gotoScreen(s)} />
  //     </View>

  //   );
  // };


  state = {
    allcharge: false,
    charge: false,
    wand: false,
    allwand: false,
    flip: false,
    wantFlipCharge: false,
    ChargeBuy: false,
    FlipBuy: false,
    WandBuy: false,
    open: false,
    screenHeight: 0,
    pickImage: [],
    UploadImageNew:false,
    UploadPhotoSelected:'',
    firestImage:false,
    secondImage:false,
    thirdImage:false,
    fourthImage:false

  }

  OpenDrawer = () => {
    console.log('hellow');
    (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
    Navigation.mergeOptions('sideMenu', {
      sideMenu: {
        left: {
          visible: this.isSideDrawerVisible,
        }
      }
    });
  }
  gotoScreen = (screen) => {

    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          
          sideMenu: {
            left: {
                visible: false,
                enabled: false
              }
        },
          topBar: {
            visible: false
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
  ImagePickr2 = (imageId) => {
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

        this.FilpImage(imageId);
      }
    });
  }
  submitImage = () => {
    let idImage = this.state.pickImage;
    this.props.uiStartLoading();
    fetch('https://urpixpays.com/stagging_urpixpays/image/submit', {
      method: 'POST',
      headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         "iid": 0,
         "uid":this.props.user.no,
         "cid": this.props.CurrentChallenge[0].id,
         "IdImage": idImage,
      }),
   })
      .then((response) => response.json())
      .then((responseData) => {
        //  dispatch(uiStopLoading());
        this.props.uiStopLoading();
         console.log(responseData)
         this.props.RefreshTaskData(this.props.CurrentChallenge[0].id);
         if(responseData.state){
          this.setState({
            allcharge: false,
            charge: false,
            wand: false,
            allwand: false,
            flip: false,
            wantFlipCharge: false,
            ChargeBuy: false,
            FlipBuy: false,
            WandBuy: false,
            open: false,
            UploadImageNew:false
      })
            Alert.alert(
               'Alert',
               responseData.message,
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
            //  dispatch(MyChallenges())
             this.props.MyChallenges()
             
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
        //  dispatch(uiStopLoading());  
        this.props.uiStopLoading(); 
         console.log(err)
      })
      .done();


    // this.props.upload(idImage, this.props.CurrentChallenge[0].id,this.props.componentId);
    this.setState({
      pickImage:[],
      flip:false
    })

  }
  FilpImage = (imageId) => {
   let idImage = this.state.pickImage;
    this.props.FlipImage(idImage, this.props.CurrentChallenge[0].id,imageId,this.props.componentId);
    this.setState({
      pickImage:[],
      flip:false
    })

  }

  componentWillUnmount = () =>{
    this.setState({
          allcharge: false,
          charge: false,
          wand: false,
          allwand: false,
          flip: false,
          wantFlipCharge: false,
          ChargeBuy: false,
          FlipBuy: false,
          WandBuy: false,
          open: false,
    })
  }

  //   ImagePickr =()=>
  // {


  //   ImagePicker.showImagePicker((response) => {
  //     console.log('Response = ', response);

  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     }
  //     else if (response.error) {
  //       console.log('ImagePicker Error: ', response.error);
  //     }
  //     else if (response.customButton) {
  //       console.log('User tapped custom button: ', response.customButton);
  //     }
  //     else {
  //       // let source = { uri: response.uri };
  //       // You can also display the image using data:
  //       // let source = { uri: 'data:image/jpeg;base64,' + response.data };

  //       this.setState(prevState => {
  //         return {
  //           pickImage: prevState.pickImage.concat({
  //             key: Math.random(),
  //             uri: res.uri,
  //             source: res.data,
  //             filesize: res.fileSize
  //           })
  //         }
  //       })
  //     }
  //   });
  // };

  requestPurchase = async (sku: string,first,second) => {
      
    try {
    const show =  await RNIap.requestPurchase(sku, false);
      console.log(show);
      if(show){
        this.props.SaveUserInfoPayThroughInApp(first,second)
      }
      
    } catch (err) {
      // alert(err);
      console.log(err);
    }
  }

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };

  render() {

    

    console.log(this.props.id);
    // console.log(this.props.isLoading)
    let loader = (
      <React.Fragment>

      </React.Fragment>
    );
      if(this.props.isLoading){
        loader = (
         <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,height:this.state.screenHeight,width:wp('100%')}}>
            <View>
            <ActivityIndicator size={'large'} color='#29ABE2'  />
            <Text style={{color:'white',fontSize:wp('4%')}}>
              Uploading Image...
            </Text>
            </View>
         </View>
        )
      }

    let BuyModalViewText;
    const scrollEnabled = this.state.screenHeight > height;

    if (this.state.ChargeBuy) {
      BuyModalViewText = (<View>
        <View style={styles.middleViewChargeModal}>
          <View>
            <Image source={Charge} style={{ width: wp('18%'), height: wp('18%') }} />
          </View>
        </View>
        <View style={styles.lowerViewChargeModal}>

          {/* First View */}
          <TouchableOpacity onPress={() =>{
            if(Platform.OS==='android'){  
              this.flipChargeWand(2, 2)
            }else{
              Alert.alert(
                'Pay',
                'Buy 2 Charges',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',2,2)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
            
           
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  2
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Charges
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 0.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
          {/* Second View */}
          <TouchableOpacity onPress={() =>{
             if(Platform.OS==='android'){  
              this.flipChargeWand(2, 9)
            }else{
              Alert.alert(
                'Pay',
                'Buy 9 Charges',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',2,9)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  9
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Charges
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 3.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
          {/* Third View */}
          <TouchableOpacity onPress={() => {
             if(Platform.OS==='android'){  
              this.flipChargeWand(2, 19)
            }else{
              Alert.alert(
                'Pay',
                'Buy 19 Charges',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',2,19)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  19
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Charges
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 5.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
          {/* Fourth View */}
          <TouchableOpacity onPress={() => {
            if(Platform.OS==='android'){  
              this.flipChargeWand(2, 39)
            }else{
              Alert.alert(
                'Pay',
                'Buy 39 Charges',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',2,39)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  39
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Charges
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 9.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>)
    } else if (this.state.FlipBuy) {
      BuyModalViewText = (<View>
        <View style={styles.middleViewChargeModal}>
          <View>
            <Image source={FlipWithoutBg} style={{ width: wp('18%'), height: wp('18%') }} />
          </View>
        </View>
        <View style={styles.lowerViewChargeModal}>
          <View style={styles.lowerViewChargeInner}>
            {/* First View */}
            <TouchableOpacity
              onPress={() =>{
                if(Platform.OS==='android'){  
                  this.flipChargeWand(1, 2)
                }else{
                  Alert.alert(
                    'Pay',
                    'Buy 2 Flips',
                    [
                      {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                      {
                        text: 'Buy',
                        onPress: () => {
                          this.requestPurchase('wand5',1,2)
                        },
                      },
                    ],
                    {cancelable: false},
                  );
                }
              }}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    2
                      </Text>
                </View>
                <View>
                  <Text style={styles.chargePaymentValueRight}>
                    Flips
                      </Text>
                </View>
              </View>
              <View>
                <Text style={styles.chargePrice}>
                  $ 0.99
                  </Text>
              </View>
              <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
            </TouchableOpacity>
          </View>
          {/* Second View */}
          <TouchableOpacity onPress={() => {
             if(Platform.OS==='android'){  
              this.flipChargeWand(1, 9)
            }else{
              Alert.alert(
                'Pay',
                'Buy 9 Flips',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',1,9)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  9
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Flips
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 3.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
          {/* Third View */}
          <TouchableOpacity onPress={() => {
             if(Platform.OS==='android'){  
              this.flipChargeWand(1, 19)
            }else{
              Alert.alert(
                'Pay',
                'Buy 19 Flips',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',1,19)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  19
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Flips
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 5.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
          {/* Fourth View */}
          <TouchableOpacity onPress={() => {
             if(Platform.OS==='android'){  
              this.flipChargeWand(1, 39)
            }else{
              Alert.alert(
                'Pay',
                'Buy 39 Flips',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',1,39)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}

            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  39
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Flips
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 9.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>)
    } else if (this.state.WandBuy) {
      BuyModalViewText = (<View>
        <View style={styles.middleViewChargeModal}>
          <View>
            <Image source={wand} style={{ width: wp('18%'), height: wp('18%') }} />
          </View>
        </View>
        <View style={styles.lowerViewChargeModal}>
          <View style={styles.lowerViewChargeInner}>
            {/* First View */}
            <TouchableOpacity onPress={() => {
              if(Platform.OS==='android'){  
                this.flipChargeWand(3, 2)
              }else{
                Alert.alert(
                  'Pay',
                  'Buy 2 Wands',
                  [
                    {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                    {
                      text: 'Buy',
                      onPress: () => {
                        this.requestPurchase('wand5',3,2)
                      },
                    },
                  ],
                  {cancelable: false},
                );
              }
            }}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    2
                      </Text>
                </View>
                <View>
                  <Text style={styles.chargePaymentValueRight}>
                    Wands
                      </Text>
                </View>
              </View>
              <View>
                <Text style={styles.chargePrice}>
                  $ 0.99
                  </Text>
              </View>
              <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
            </TouchableOpacity>
          </View>
          {/* Second View */}
          <TouchableOpacity onPress={() => {
             if(Platform.OS==='android'){  
              this.flipChargeWand(3, 9)
            }else{
              Alert.alert(
                'Pay',
                'Buy 9 Wands',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',3,9)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }
          }
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  9
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Wands
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 3.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
          {/* Third View */}
          <TouchableOpacity onPress={() => {
             if(Platform.OS==='android'){  
              this.flipChargeWand(3, 19)
            }else{
              Alert.alert(
                'Pay',
                'Buy 19 Wands',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',3,19)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  19
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Wands
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 5.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
          {/* Fourth View */}
          <TouchableOpacity onPress={() => {
             if(Platform.OS==='android'){  
              this.flipChargeWand(3, 39)
            }else{
              Alert.alert(
                'Pay',
                'Buy 39 Wands',
                [
                  {text: 'Cancel', onPress: () => console.log('Ask me later pressed')},
                  {
                    text: 'Buy',
                    onPress: () => {
                      this.requestPurchase('wand5',3,39)
                    },
                  },
                ],
                {cancelable: false},
              );
            }
          }}
            style={styles.chargePayment}>
            <View style={styles.chargePaymentValue}>
              <View>
                <Text style={styles.chargePaymentValueLeft}>
                  39
                      </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                  Wands
                      </Text>
              </View>
            </View>
            <View>
              <Text style={styles.chargePrice}>
                $ 9.99
                  </Text>
            </View>
            <View style={{backgroundColor:'#29ABE2',paddingHorizontal:5,paddingVertical:3}}>
              <Text style={[styles.chargePaymentValueRight,{color:'white'}]}>
                  Buy
                  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>)
    }
    
    // console.log(this.props.user);

    var today = new Date();


    // var today = new Date();
    //       var Christmas = new Date(item.item.start_time.replace(/-/g, "/"));
    //       let checkDat  = (Date.now() - new Date(Christmas))/1000.0;
    //       var diffMs = (Christmas - today); 

    // var Christmas = new Date(this.props.CurrentChallenge[0].start_time.replace(/-/g, "/"));
    // let checkDate = (Date.now() - new Date(Christmas)) / 1000.0;
    // var diffMs = (Christmas - today);
    var diffMs = this.props.CurrentChallenge[0]?moment(this.props.CurrentChallenge[0].start_time).diff(moment().format(), 'seconds'):0;

    let millisends =this.props.CurrentChallenge[0]? this.props.CurrentChallenge[0].timeline*60*60-diffMs:0;
    // console.log(this.props.pro_data);
    // console.log(this.props.CurrentChallenge[0]);
    // console.log('wand = ', this.state.wand);
    return (

      <View style={{ flex: 1, zIndex: 0, backgroundColor: '#ffffff' }}>
        {/* 
<MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={250}
          overlay={true}
          opacity={.9}
        > */}


        {/* <View style={styles.topbarBox}>
        <Topbar OpenSideDrawer={this.toggleOpen} style={{zIndex:9999}} title={'Active Chalenges'} />
      </View> */}
        {/* <View style={styles.bottombarBox}>
        <BottomBar />
      </View> */}
     {loader}
        <ScrollView showsVerticalScrollIndicator={false}
          scrollEnabled={scrollEnabled}
          onContentSizeChange={this.onContentSizeChange}
        >
    
<View style={styles.challengeBar}>
           <View style={{flexDirection:'row'}}>
              <TouchableOpacity onPress={() => this.setState({
                charge: false,
                wand: false,
                flip: false,
                ChargeBuy: true,
                FlipBuy: false,
                WandBuy: false,

              })} style={styles.challengeBarSecondComponentOuter}>
                <View style={styles.challengeBarSecondComponent1}>
                  <Image source={flip} style={{ width: wp('10%'), height: wp('10%') }} />
                </View>
                <View style={styles.challengeBarSecondComponent2}>
                  <Text style={styles.challengeBarSecondComponentTetx}>
                    {this.abbreviateNumber(this.props.pro_data.flip)}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({
                charge: false,
                wand: false,
                flip: false,
                ChargeBuy: false,
                FlipBuy: false,
                WandBuy: true,

              })} style={styles.challengeBarSecondComponentOuter}>
                <View style={styles.challengeBarThirdComponent1}>
                  <Image source={Charge} style={{ width: wp('5%'), height: wp('4%') }} />
                </View>
                <View style={styles.challengeBarThirdComponent2}>
                  <Text style={styles.challengeBarThirdComponentTetx}>
                    {this.abbreviateNumber(this.props.pro_data.charge)}
                  </Text>
                </View>
              </TouchableOpacity>
              
                
              <TouchableOpacity
                onPress={() =>{
                  this.changeScreen('UrPicsPay.BalanceOverView','Blannce Overview',2);
                }}
              style={styles.challengeBarFirstComponentOuter}>
                 <View style={[styles.challengeBarFirstComponent2,{width:wp('6%'),justifyContent:'center',alignContent:'center',alignItems:'center'}]}>
              <Image source={WalletImage} style={{ width: wp('5%'), height: wp('4%') }} />
              </View>
              <View style={styles.challengeBarFirstComponent1}>
                <Text style={styles.challengeBarFirstComponentText}>
                  ${this.abbreviateNumber(this.props.pro_data.wallet)}
                </Text>
              </View>
            </TouchableOpacity>
            </View>
            <View style={{flexDirection:'row',paddingTop:wp('1%')}}>

          
              
              <TouchableOpacity onPress={() => this.setState({
                charge: false,
                allcharge: false,
                allwand: false,
                wand: false,
                flip: false,
                ChargeBuy: false,
                FlipBuy: true,
                WandBuy: false,

              })} style={styles.challengeBarSecondComponentOuter}>
                <View style={styles.challengeBarfouthComponent1}>
                  <Image source={wand} style={{ width: wp('7%'), height: wp('7%') }} />
                </View>
                <View style={styles.challengeBarfouthComponent2}>
                  <Text style={styles.challengeBarfouthComponentTetx}>
                    {this.abbreviateNumber(this.props.pro_data.wand)}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({
                charge: false,
                allcharge: false,
                allwand: false,
                wand: false,
                flip: false,
                ChargeBuy: false,
                FlipBuy: true,
                WandBuy: false,

              })} style={styles.challengeBarSecondComponentOuter}>
                <View style={styles.challengeBarfouthComponent1}>
                  <Image source={PixP} style={{ width: wp('7%'), height: wp('7%') }} />
                </View>
                <View style={styles.challengeBarfouthComponent2}>
                  <Text style={styles.challengeBarfouthComponentTetx}>
                    {this.abbreviateNumber(this.props.pro_data.pixpoints)}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.challengeBarFirstComponentOuter,{width:wp('26%')}]}>
              <View style={styles.challengeBarFirstComponent1}>
                <Text style={[styles.challengeBarFirstComponentText,{fontSize:wp('3%')}]}>
                  PIX ID: {this.props.user.no}
                </Text>
              </View>

            </TouchableOpacity>
                </View>
            </View>
        
          <View style={styles.mainView}>
          {/* //Challenge bar Ends */}

            {/* <ImageBackground style={styles.mainImage} source={{
              uri: this.props.CurrentChallenge[0].image_url
            }}>
              
            </ImageBackground> */}


            <FastImage
        style={styles.mainImage} 
        nativeID={`image${this.props.id}Dest`}
        source={{
           uri:this.props.CurrentChallenge[0]? this.props.CurrentChallenge[0].image_url:'',
            priority: FastImage.priority.high,
        }}
        // resizeMode={FastImage.resizeMode.contain}
    >
      <View style={styles.imageOverlay}>
                <View style={styles.imgaeUpperVIew}>
                  {/* UpperLeftVIew */}
                  <View style={styles.imageUpperViewLeft}>
                    <View>
                      <Text style={styles.imageUpperViewLeftText1}>
                        {this.props.CurrentChallenge[0].votes}
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.imageUpperViewLeftText2}>
                        Total Votes
                      </Text>
                    </View>
                  </View>
                  {/* Upper LeftView End */}
                  {/* Upper View Middle Start */}
                  <View style={styles.imageUpperViewMiddle}>
                    <View>
                      <Text style={styles.imageUpperViewMiddleText1}>
                        {/* GAME OF FLIP */}
            </Text>
                    </View>
                  </View>
                  {/* Upper view Middle End */}
                  {/* Upper View right */}
                  <View style={{ flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <View>
                      <View style={styles.imageUpperViewright}>
                        <Text style={styles.imageUpperViewRightText1}>
                          {this.props.CurrentChallenge[0].type}
            </Text>
                      </View>
                    </View>
                  </View>
                  {/* Upper View Right End */}
                </View>
                {/* Upper View End */}
                {/* Middle VIew Start */}
                <View style={styles.imgaeMiddleVIew}>
                  {/* FIrst VIew OF Middle */}
                  <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.Details', 'Details')}
                    style={styles.view_title}>
                    <Text style={styles.imageMiddleVIewFirstText}>
                      {this.props.CurrentChallenge[0].title}
                    </Text>
                  </TouchableOpacity>
                  {/* Second VIew Of Middle  */}
                  <TouchableOpacity
                    onPress={() => this.changeScreen('UrPicsPay.RankPage', 'Rank')}
                    style={styles.imageMiddleVIewSecondOuter}>
                    <Text style={styles.imageMiddleVIewSecondText}>
                      CHALLENGE RANK
                </Text>
                  </TouchableOpacity>
                </View>
                {/* Middle VIew ENd */}
                <View style={styles.imageBottomView}>
                  <TouchableOpacity
                    onPress={() => this.changeScreen('UrPicsPay.ChallengePrice', 'Challenge Prize')}
                    style={styles.imageBottomViewLeft}>
                    <View>
                      <Text style={styles.imageBottomViewText1}>
                        {this.props.CurrentChallenge[0].price}
            </Text>
                    </View>
                    <View>
                      <Text style={styles.imageBottomViewText2}>
                        Cash Prize
            </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity

                    style={styles.imageBottomViewLeft}>
                    <View>
                      <Text style={[styles.imageBottomViewText1, { color: 'transparent' }]}>
                      {this.props.CurrentChallenge[0].price}
                     </Text>
                    </View>
                    <View>
                      <Text style={[styles.imageBottomViewText2, { color: 'transparent' }]}>
                        Cash Prize
                       </Text>
                    </View>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    onPress={() => this.changeScreen('UrPicsPay.inviteChallange', 'Invite Challenges')}
                    style={[styles.imageBottomViewLeft, { flexDirection: 'row', paddingRight: wp('2%'),marginBottom:wp('2%') }]}>
                    <View>
                      <Ficons name="group-add" size={wp('7%')} style={{ color: '#29ABE2' }} />
                    </View>
                    <View>
                      <Text style={styles.imageBottomViewText2}>
                        Challenge
            </Text>
                    </View>
                  </TouchableOpacity>
                </View>

              </View>
    </FastImage>
            {/* Images VIew End Here */}
            {/* Images Outlie */}
            <View style={styles.imagesViewOutline}>
            
            </View>
            {/* Image OutLine Ends Here */}
            {/* Counter View Starts  Here */}
            
            <View style={styles.counterSHow}>
              <View style={{
                backgroundColor: 'rgba(0,0,0,0.8)',
                paddingLeft: wp('5%'), paddingRight: wp('5%'), paddingTop: wp('1.5%'),
                elevation: 7, borderRadius: wp('1%'),
                shadowOffset: { width: 2, height: 2, },
                shadowColor: 'black',
                shadowOpacity: 1.0,
                marginLeft:wp('1%')
              }}>
                
                <CountDown
                  size={wp('4.5%')}
                  until={millisends}
                  // onFinish={() => alert('Finished')}
                  digitStyle={{ backgroundColor: 'rgba(255,255,255,1)', borderWidth: 0, borderColor: '#1CC625', borderRadius: 0 }}
                  digitTxtStyle={{ color: '#29ABE2' }}
                  timeLabelStyle={{ color: '#FFF', fontWeight: '500' }}
                  separatorStyle={{ color: '#FFF', fontSize: wp('6%'), marginBottom: wp('5%') }}
                  timeToShow={['D', 'H', 'M', 'S']}
                  timeLabels={{ d:'Days', m: 'Minutes', s: 'Seconds', h: 'Hour' }}
                  showSeparator
                />
                
              </View>
              
            </View>
            
        
            {/* Counter View Ends Here */}
            {/* INNer Button Views Start Here  */}



            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginLeft: 0, marginRight: 0}}>
              <TouchableOpacity onPress={() => this.setState({
                  wand: true
                })} >
                <RNSpeedometer 
                value={this.props.CurrentChallenge[0].wandexposure.wandexposure/2} 
                size={50} 
                minValue= {0} 
                maxValue= {7}
                labelStyle={{display:'none'}}
                labelWrapperStyle={{display:'none'}}
                ref={ref =>{this.wandSpeedMeter = ref}}
                 />
                 
                <TouchableOpacity onPress={() => this.setState({
                  wand: true
                })} 
                style={
                  {backgroundColor: '#29ABE2', 
                  width: 50, 
                  height: Platform.OS === 'ios' ? 20 : 20, 
                  marginTop: 10
                  }}>
                    <Text style={{marginLeft: 8,color:'white'}}>Wand</Text>

                  </TouchableOpacity>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.setState({
                  charge: true
                })}
                >
                <RNSpeedometer 
                value={this.props.CurrentChallenge[0].exposure.exposure/2} 
                size={50} 
                minValue= {0} 
                maxValue= {7}
                labelStyle={{display:'none'}}
                labelWrapperStyle={{display:'none'}}
                ref={ref =>{this.chargerSpeedMeter = ref}}
                />
                <TouchableOpacity onPress={() => this.setState({
                  charge: true
                })} 
                style={
                  {backgroundColor: '#29ABE2', 
                  width: 55, 
                  height: Platform.OS === 'ios' ? 20 : 20,
                   marginTop: 10
                   }}><Text style={{marginLeft: 5,color:'white'}}>Charge</Text>
                   </TouchableOpacity>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonsView}>
              {/* <View style={{width: '100%', flexDirection: 'row'}}> */}
              {/* <ScrollView
                horizontal={true} showsHorizontalScrollIndicator={false}> */}

                {/* First View */}

                {/* <TouchableOpacity onPress={() => this.setState({
                  allcharge: true
                })} style={styles.firstBox}>
                  <Image source={Charge} style={{ height: wp('6%'), width: wp('6%') }} />
                  <Text style={{ fontSize: wp('3%') }}>
                    Charge All
                 </Text>
                </TouchableOpacity> */}
                {/* Second View */}
                
                {/* </View> */}
                <View style={{width: '100%', flexDirection: 'row', }}>
                {/* Fourth View */}
                {/* <View style={styles.fourthBox}>

                </View> */}
                {/* Fifth View */}
                
                {/* <TouchableOpacity onPress={() => this.setState({
                  allwand: true
                })} style={styles.thirdBox}>
                  <Image source={wand} style={{ height: wp('7%'), width: wp('7%') }} />
                  <Text style={{ fontSize: wp('3%') }}>
                    Wand All
                </Text>
                </TouchableOpacity> */}
                {/* Sixth View */}


                {/* <View style={styles.sixthBox}>

                </View> */}
                {/* Seventh View */}
                <TouchableOpacity onPress={() => { this.changeScreen('UrPicsPay.TopPhotosView', 'Vote') }}
                  style={styles.fifthBox}>
                  <Image source={vote} style={{ height: wp('7%'), width: wp('9%') }} />
                  <Text style={{ fontSize: wp('3%') }}>
                    Vote
                 </Text>
                </TouchableOpacity>
                <View style={styles.sixthBox}>

                </View>
                {/* Seventh View */}
                <TouchableOpacity style={styles.seventhBox}>
                  <Text style={{ fontSize: wp('3%'), color: '#29ABE2', marginBottom: wp('1.5%') }}>
                    {this.props.CurrentChallenge[0].vote_sum.vote_sum}
                  </Text>
                  <Text style={{ fontSize: wp('3%') }}>
                    Votes
  </Text>
                </TouchableOpacity>
                </View>
              {/* </ScrollView> */}
            </View>



            {/* Inner Buttons Views Ends Here */}
            {/* Image Flip View Stats Here */}
            {this.props.CurrentChallenge[0].image ? this.props.CurrentChallenge[0].photocount === 4 ? <View style={styles.ImagesFlipbackground}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('0%') }}>
              <TouchableOpacity onPress={() => this.setState({
                UploadImageNew: true,
                UploadPhotoSelected: this.props.CurrentChallenge[0].image.image[0]?this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].url : this.props.CurrentChallenge[0].image_url:''
              })}
                    >
                        <ImageBackground
                        onLoadStart={() => { this.setState({ firestImage: true })} }
                        onLoadEnd={() => { this.setState({ firestImage: false })} }
        style={{ width: wp('34%'), height: wp('25%') }}
        source={ this.props.CurrentChallenge[0].image.image[0]?
          {
          uri: this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].url : this.props.CurrentChallenge[0].image_url,
            priority: FastImage.priority.high,
        }:
        DummyUpload
      }
        resizeMode={FastImage.resizeMode.cover}
    >
       {this.state.firestImage?  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state.firestImage } size={'large'} color={'#29ABE2'} />

                </View>: <View style={styles.imageInnerTex}>
                      <Text style={styles.imageText}>
                      {this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].vote : ''}
                      </Text>
                    </View>}
     
    </ImageBackground>
   

                    </TouchableOpacity>
                   
    <TouchableOpacity onPress={() => this.setState({
                UploadImageNew: true,
                UploadPhotoSelected:this.props.CurrentChallenge[0].image.image[1]? this.props.CurrentChallenge[0].image.image[1] ? this.props.CurrentChallenge[0].image.image[1].url : this.props.CurrentChallenge[0].image_url:''
              })}
                    >
                       <ImageBackground
                           onLoadStart={() => { this.setState({ secondImage: true })} }
                           onLoadEnd={() => { this.setState({ secondImage: false })} }
        style={{ width: wp('34%'), height: wp('25%') }}
        source={
          this.props.CurrentChallenge[0].image.image[1]?
          {
          uri: this.props.CurrentChallenge[0].image.image[1] ? this.props.CurrentChallenge[0].image.image[1].url : this.props.CurrentChallenge[0].image_url,
            priority: FastImage.priority.high,
        }:DummyUpload
      }
      resizeMode={FastImage.resizeMode.cover}
    >
      {this.state.secondImage?  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state.secondImage } size={'large'} color={'#29ABE2'} />

                </View>:<View style={styles.imageInnerTex}>
                      <Text style={styles.imageText}>
                        {this.props.CurrentChallenge[0].image.image[1] ? this.props.CurrentChallenge[0].image.image[1].vote : ''}
                      </Text>
                    </View>}
      
    </ImageBackground>
                    </TouchableOpacity>
   
                

              </View>
              <TouchableOpacity onPress={() => this.setState({
                flip: true
              })} style={styles.thirdView}>
                <Image source={flipicon} style={{ width: wp('15'), height: wp('15%') }} />
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('8%') }}>
              <TouchableOpacity onPress={() => this.setState({
                UploadImageNew: true,
                UploadPhotoSelected:this.props.CurrentChallenge[0].image.image[2]? this.props.CurrentChallenge[0].image.image[2] ? this.props.CurrentChallenge[0].image.image[2].url : this.props.CurrentChallenge[0].image_url:''
              })}
                    >
                         <ImageBackground
                             onLoadStart={() => { this.setState({ thirdImage: true })} }
                             onLoadEnd={() => { this.setState({ thirdImage: false })} }
        style={{ width: wp('34%'), height: wp('25%') }}
        source={
          this.props.CurrentChallenge[0].image.image[2]?
          {
          uri: this.props.CurrentChallenge[0].image.image[2] ? this.props.CurrentChallenge[0].image.image[2].url : this.props.CurrentChallenge[0].image_url,
            priority: FastImage.priority.high,
        }:
        DummyUpload 
      }
      resizeMode={FastImage.resizeMode.cover}
    >
      {this.state.thirdImage?  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state.thirdImage } size={'large'} color={'#29ABE2'} />

                </View>:<View style={styles.imageInnerTex}>
                      <Text style={styles.imageText}>
                        {this.props.CurrentChallenge[0].image.image[2] ? this.props.CurrentChallenge[0].image.image[2].vote : ''}
                      </Text>
                    </View>}
      
    </ImageBackground> 
                       </TouchableOpacity>
            
    <TouchableOpacity onPress={() => this.setState({
                UploadImageNew: true,
                UploadPhotoSelected:this.props.CurrentChallenge[0].image.image[3]? this.props.CurrentChallenge[0].image.image[3] ? this.props.CurrentChallenge[0].image.image[3].url : this.props.CurrentChallenge[0].image_url:''
              })}
                    >
   <ImageBackground
     onLoadStart={() => { this.setState({ fourthImage: true })} }
     onLoadEnd={() => { this.setState({ fourthImage: false })} }
        style={{ width: wp('34%'), height: wp('25%') }}
        source={
          this.props.CurrentChallenge[0].image.image[3]?
          {
          uri: this.props.CurrentChallenge[0].image.image[3] ? this.props.CurrentChallenge[0].image.image[3].url : this.props.CurrentChallenge[0].image_url,
            priority: FastImage.priority.high,
        }:
        DummyUpload
      
      }
      resizeMode={FastImage.resizeMode.cover}
    >
      {this.state.fourthImage?  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state.fourthImage } size={'large'} color={'#29ABE2'} />

                </View>: <View style={styles.imageInnerTex}>
                      <Text style={styles.imageText}>
                        {this.props.CurrentChallenge[0].image.image[3] ? this.props.CurrentChallenge[0].image.image[3].vote : ''}
                      </Text>
                    </View>}
     
    </ImageBackground>
                
   </TouchableOpacity>
   
              </View>
            </View> :this.props.CurrentChallenge[0].photocount === 2 ? <React.Fragment><View style={styles.ImagesFlipbackground1}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp('0%') }}>

                <TouchableOpacity onPress={() => this.setState({
                UploadImageNew: true,
                UploadPhotoSelected:this.props.CurrentChallenge[0].image.image[0]? this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].url : this.props.CurrentChallenge[0].image_url:''
              })}
                    > 
                     <ImageBackground
                       onLoadStart={() => { this.setState({ firestImage: true })} }
                       onLoadEnd={() => { this.setState({ firestImage: false })} }
                    style={{ width: wp('34%'), height: wp('25%') }}
                    source={
                      this.props.CurrentChallenge[0].image.image[0]?
                      {
                      uri: this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].url : this.props.CurrentChallenge[0].image_url,
                        priority: FastImage.priority.high,
                    }:
                    DummyUpload
                  
                  }
                  resizeMode={FastImage.resizeMode.cover}
                >
                   {this.state.firestImage?  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state.firestImage } size={'large'} color={'#29ABE2'} />

                </View>: <View style={styles.imageInnerTex}>
                                  <Text style={styles.imageText}>
                                    {this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].vote : ''}
                                  </Text>
                                </View>}
                  
                </ImageBackground>
                    </TouchableOpacity>
              
                    
                    <TouchableOpacity onPress={() => this.setState({
                UploadImageNew: true,
                UploadPhotoSelected:  this.props.CurrentChallenge[0].image.image[1]?this.props.CurrentChallenge[0].image.image[1] ? this.props.CurrentChallenge[0].image.image[1].url : this.props.CurrentChallenge[0].image_url:''
              })}
                    >

                    <ImageBackground
  onLoadStart={() => { this.setState({ secondImage: true })} }
  onLoadEnd={() => { this.setState({ secondImage: false })} }
style={{ width: wp('34%'), height: wp('25%') }}
source={
  this.props.CurrentChallenge[0].image.image[1]?
  {
  uri: this.props.CurrentChallenge[0].image.image[1] ? this.props.CurrentChallenge[0].image.image[1].url : this.props.CurrentChallenge[0].image_url,
    priority: FastImage.priority.high,
}:DummyUpload

}
resizeMode={FastImage.resizeMode.cover}
>
{this.state.secondImage?  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state.secondImage } size={'large'} color={'#29ABE2'} />

                </View>: <View style={styles.imageInnerTex}>
              <Text style={styles.imageText}>
                {this.props.CurrentChallenge[0].image.image[1] ? this.props.CurrentChallenge[0].image.image[1].vote : ''}
              </Text>
            </View>}

</ImageBackground>

                    </TouchableOpacity>


                  

                </View>
                <TouchableOpacity onPress={() => this.setState({
                  flip: true
                })} style={styles.thirdView1}>
                  <Image source={flipicon} style={{ width: wp('15'), height: wp('15%') }} />
                </TouchableOpacity>

              </View></React.Fragment>:<React.Fragment>
                <View style={[styles.ImagesFlipbackground1,{height:wp('50%')}]}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: wp('1%') }}>

                <TouchableOpacity onPress={() => this.setState({
                UploadImageNew: true,
                UploadPhotoSelected:this.props.CurrentChallenge[0].image.image[0]? this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].url : this.props.CurrentChallenge[0].image_url:''
              })}
                    > 
                     <ImageBackground
                       onLoadStart={() => { this.setState({ firestImage: true })} }
                       onLoadEnd={() => { this.setState({ firestImage: false })} }
                    style={{ width: wp('34%'), height: wp('25%') }}
                    source={
                      this.props.CurrentChallenge[0].image.image[0]?
                      {
                      uri: this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].url : this.props.CurrentChallenge[0].image_url,
                        priority: FastImage.priority.high,
                    }:
                    DummyUpload
                  
                  }
                  resizeMode={FastImage.resizeMode.cover}
                >
                   {this.state.firestImage?  <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state.firestImage } size={'large'} color={'#29ABE2'} />

                </View>: <View style={styles.imageInnerTex}>
                                  <Text style={styles.imageText}>
                                    {this.props.CurrentChallenge[0].image.image[0] ? this.props.CurrentChallenge[0].image.image[0].vote : ''}
                                  </Text>
                                </View>}
                  
                </ImageBackground>
                    </TouchableOpacity>
              
                    


                  

                </View>
                <TouchableOpacity onPress={() => this.setState({
                  flip: true
                })} style={[styles.thirdView1,{top:wp('30%')}]}>
                  <Image source={flipicon} style={{ width: wp('15'), height: wp('15%') }} />
                </TouchableOpacity>

              </View></React.Fragment> : <View></View>}


                {/* New Buttons COde Start */}

                <View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row',padding:5, alignContent:'center',alignItems:'center',marginTop:wp('2%')}}>
                  <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.inviteChallange', 'Invite Challenges')}>
                  <LinearGradient colors={['#29ABE2', '#0099CC','#3B5998']}  style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Invite Friends</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.Details', 'Details')}>
                    <LinearGradient  colors={['#5C4AE5', '#4432CC','#3F2B96']} style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Challenge Details</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                  
                </View>
                <View style={{flexDirection:'row',padding:5, alignContent:'center',alignItems:'center',marginTop:wp('2%')}}>
                  <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.RankPage', 'Rank')}>
                  <LinearGradient  colors={['#FDC830', '#D8A31E','#F37335']} style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Rank</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.ChallengePrice', 'Challenge Prize')}>
                    <LinearGradient colors={['#38EF7D', '#22C65C','#1FAA51']} style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Prize</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                   
                </View>
                <View style={{flexDirection:'row',padding:5, alignContent:'center',alignItems:'center',marginTop:wp('2%')}}>
                  <TouchableOpacity onPress={() => { 
                    this.changeScreen('UrPicsPay.ChallengeTopPhotos', 'Top Photos')
                    
                     }}>
                  <LinearGradient colors={['#FF4B2B','#BC2713','#BC2713']} style={{width:wp('92%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Top Photos</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                 
                </View>
              </View>

                {/* New Buttons Code Ends Here */}

        
            {/* Image Flip View Ends Here */}


            {/* Image Flip View Stats Here */}

            {/* Image Flip View Ends Here */}


            {/* Models Start Here */}
            {/* All Charge Modal  */}

            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.allcharge}
                // onRequestClose={() => { this.isVisible(false); } }
                >
                <View style={styles.modelOuterView}>
                  <View style={styles.chareModal}>
                    <View>
                      <Image source={Charge} style={{ width: wp('20%'), height: wp('20%') }} />
                    </View>
                    <View style={styles.chargeModalButtons}>
                      <TouchableOpacity onPress={() => this.allcharge()}



                        style={styles.chargeButton} >
                        <Text style={{ fontSize: wp('3.5%'), color: 'white' }}>
                          All Charges
            </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            allcharge: false
                          })
                        }}
                        style={styles.chargeButtonCancle} >
                        <Text style={{ fontSize: wp('3.8%'), color: 'red', fontFamily: 'Roboto' }}>
                          Cancel
            </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            {/*  Charge Modal  */}

            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.charge}
                onRequestClose={() => {
                  this.setState({
                    isVisible:false
                  })
                }}>
                <View style={styles.modelOuterView}>
                  <View style={styles.chareModal}>
                    <View>
                      <Image source={Charge} style={{ width: wp('20%'), height: wp('20%') }} />
                    </View>
                    <View style={styles.chargeModalButtons}>
                      <TouchableOpacity onPress={() => this.charge()}



                        style={styles.chargeButton} >
                        <Text style={{ fontSize: wp('3.5%'), color: 'white' }}>
                          Charge</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          this.setState({
                            charge: false
                          })
                        }}
                        style={styles.chargeButtonCancle} >
                        <Text style={{ fontSize: wp('3.8%'), color: 'red', fontFamily: 'Roboto' }}>
                          Cancel
            </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Charge Modal Ends Here */}
            {/* Wand Modal Starts Here */}
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.wand}
                onRequestClose={() => {
                  this.setState({
                    isVisible:false
                  })
                }}>
                <View style={styles.modelOuterView}>
                  <View style={styles.chareModal}>
                    <View>
                      <Image source={wand} style={{ width: wp('20%'), height: wp('20%') }} />
                    </View>
                    <View style={styles.wandModalButtons}>
                      <TouchableOpacity onPress={() => this.wand()}


                        style={styles.chargeButton} >
                        <Text style={{ fontSize: wp('3.5%'), color: 'white' }}>
                          Wand
            </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          wand: false
                        })
                      }} style={styles.chargeButtonCancle} >
                        <Text style={{ fontSize: wp('3.8%'), color: 'red', fontFamily: 'Roboto' }}>
                          Cancel
            </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Wand MOdal Ends Here */}

            {/* All Wand Modal Starts Here */}
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.allwand}
                onRequestClose={() => {
                  this.setState({
                    isVisible:false
                  })
                }}>
                <View style={styles.modelOuterView}>
                  <View style={styles.chareModal}>
                    <View>
                      <Image source={wand} style={{ width: wp('20%'), height: wp('20%') }} />
                    </View>
                    <View style={styles.wandModalButtons}>
                      <TouchableOpacity onPress={() => this.allwand()}


                        style={styles.chargeButton} >
                        <Text style={{ fontSize: wp('3.5%'), color: 'white' }}>
                          All Wands
                         </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => {
                        this.setState({
                          allwand: false
                        })
                      }} style={styles.chargeButtonCancle} >
                        <Text style={{ fontSize: wp('3.8%'), color: 'red', fontFamily: 'Roboto' }}>
                          Cancel
                         </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Wand MOdal Ends Here */}
            {/* Flip Model Starts Here */}
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.flip}
                onRequestClose={() => {
                  this.setState({
                    isVisible:false
                  })
                }}>
                <View style={styles.modelOuterView}>
                 
                  <TouchableOpacity onPress={() => this.setState({
                    charge: false,
                    wand: false,
                    flip: false,
                    ChargeBuy: false,
                    FlipBuy: false,
                    WandBuy: false,

                  })} style={styles.crossbutton}>
                    <Icons name="ios-close-circle-outline" size={wp('12%')} style={{ color: 'white' }} />
                  </TouchableOpacity>
                 
                  <View style={[styles.chareModalImage,{height:wp('40%')}]}>
                    
                    <View style={[styles.wandModalButtons, { marginTop: wp('7%'),flex:0,flexDirection:'column' }]}>

                    <FlatList 
                data={this.props.CurrentChallenge[0].image?this.props.CurrentChallenge[0].image.image:this.props.CurrentChallenge[0]}
                horizontal={true}
                renderItem={(info)=>{
                  console.log(info);
                  return (
<ImageBackground
style={{ width: wp('22.5%'), height: wp('20%'),marginLeft:wp('2%') }}
source={{
  uri:info.item.url,
}}
>
<View style={styles.modelImageText}>
                          <TouchableOpacity onPress={()=>{
                            this.ImagePickr2(info.item.id);
                          }} style={styles.modelImageTextCircle}>
                            {/* <Image source={DummyUpload}  style={{width:wp('8%'),height:wp('8%')}} /> */}
                          <Text style={styles.modelImageTextinner}>
                              Flip
                  </Text>
                          </TouchableOpacity>
                        </View>
</ImageBackground>



                  )
                }}
                keyExtractor = { (item, index) => index.toString() }
              />
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
            {/* Flip Modal Ends Here */}
            {/* Charge Flip wand Buy Modal Starts Here */}
            <View>
              <Modal
                animationType="fade"
                transparent={true}
                visible={this.state.ChargeBuy || this.state.FlipBuy || this.state.WandBuy ? true : false}
                onRequestClose={() => {
                  this.setState({
                    isVisible:false
                  })
                }}
                >
                <View style={styles.modelOuterView}>
                  <TouchableOpacity onPress={() => this.setState({
                    charge: false,
                    wand: false,
                    flip: false,
                    ChargeBuy: false,
                    FlipBuy: false,
                    WandBuy: false,

                  })} style={styles.crossbutton}>
                    <Icons name="ios-close-circle-outline" size={wp('12%')} style={{ color: 'white' }} />
                  </TouchableOpacity>
                  <View style={styles.chareModalView}>
                    <View style={styles.upperIVewChargeModal}>
                      <TouchableOpacity onPress={() => this.setState({
                        FlipBuy: true,
                        ChargeBuy: false,
                        WandBuy: false
                      })} style={[styles.ModalChargeButton, this.state.FlipBuy ? styles.activeButton : '']}>
                        <Text style={styles.ModalChargeButtonText}>
                          Flip
            </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.setState({
                        FlipBuy: false,
                        ChargeBuy: true,
                        WandBuy: false
                      })} style={[styles.ModalChargeButton, this.state.ChargeBuy ? styles.activeButton : '']}>
                        <Text style={styles.ModalChargeButtonText}>
                          Charge
            </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.setState({
                        FlipBuy: false,
                        ChargeBuy: false,
                        WandBuy: true
                      })} style={[styles.ModalChargeButton, this.state.WandBuy ? styles.activeButton : '']}>
                        <Text style={styles.ModalChargeButtonText}>
                          Wand
            </Text>
                      </TouchableOpacity>
                    </View>
                    {BuyModalViewText}
                  </View>
                </View>
              </Modal>
            </View>
            {/* Charge Flip wand Buy Modal Ends Here */}


            {/* Upload Image Modal  */}
            <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.UploadImageNew}
                onRequestClose={() => {
                  this.setState({
                    UploadImageNew:false
                  })
                }}>
                <View style={styles.modelOuterView}>
                 
                  <TouchableOpacity onPress={() => this.setState({
                    charge: false,
                    wand: false,
                    flip: false,
                    ChargeBuy: false,
                    FlipBuy: false,
                    WandBuy: false,
                    UploadImageNew:false

                  })} style={styles.crossbutton}>
                    <Icons name="ios-close-circle-outline" size={wp('12%')} style={{ color: 'white' }} />
                  </TouchableOpacity>
                 
                  <View style={styles.chareModalImage2}>
                    <Text style={{color:'black'}}>
                      Click Here to Upload Your Photo
                    </Text>
                  {this.props.isLoading?loader:<TouchableOpacity
                      onPress={() => {
                        if(this.props.CurrentChallenge[0].image){
                          if(this.props.CurrentChallenge[0].image.image.length == this.props.CurrentChallenge[0].photocount){
                            Alert.alert(
                              'Alert',
                              'You have reached maximum number of photo uploads for this Challenge. You may use the Flip option to change any  or all your photos.',
                              [
                                {text: 'OK', onPress: () => console.log('OK Pressed')},
                              ],
                              {cancelable: false},
                            );
                          }else{
                            this.ImagePickr();
                          }
                        }else{
                          this.ImagePickr();
                        }
                       
                      
                      }}
                      style={[styles.flipModelText2,{backgroundColor:'#ffffff'}]}>
                      {/* <Text
                        style={styles.flipModelTextInner}>
                        Click Here to Upload Photo
              </Text> */}
               {/* <Image  /> */}
                 <ImageBackground 
                 source={
                  this.state.UploadPhotoSelected?{
                    uri:this.state.UploadPhotoSelected
                  }:DummyUpload
                  }  style={{width:wp('30%'),height:wp('30%')}}
                  resizeMode={'contain'}
                 >

                 </ImageBackground>


                    </TouchableOpacity>}
                    
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </ScrollView>
        {/* </MenuDrawer> */}
      </View>

    )
  }


}


const styles = StyleSheet.create({
  topbarBox:
  {
    width: wp('100%'),
    height: hp('10%'),
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: wp('.4%'),
    

    elevation: 7,// 
    shadowOffset: { width: 10, height: 10, },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
  },
  bottombarBox: {
    width: wp('100%'),
    // height:wp('15%'),
    position: 'absolute',
    backgroundColor: 'white',
    bottom: wp('5%'),
    zIndex: 9999,
  },
  challengeBar: {
    flexDirection: 'column',
    backgroundColor: 'black',
    alignContent: 'center',
    paddingTop:wp('2%'),
    width:'100%',
    // alignItems: 'center',
    height: wp('16%'),
    shadowOffset: { width: 2, height: 2, },
    elevation: 7,
    shadowColor: 'black',
    shadowOpacity: 1.0,
  },
  challengeBarFirstComponent1: {
    backgroundColor: "#29ABE2",
    height: wp('6%'),
    width: '100%',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  mainView: {
    padding: wp('3%'),
    marginBottom: wp('10%'),
    zIndex: -9999,
  },
  
  challengeBarFirstComponentOuter: {
    height: wp('6%'),
    width: wp('20%'),
    flexDirection: 'row',
    marginLeft:wp('5%'),
  },
  challengeBarFirstComponent2: {
    backgroundColor: "#fff",
    height: wp('6%'),
    width: wp('1.8%')
  },
  challengeBarFirstComponentText: {
    fontSize: wp('4%'),
    color: 'white'
  },
  challengeBarSecondComponentOuter: {
    height: wp('6%'),
    width: wp('8%'),
    marginLeft: wp('6%'),
    marginRight:wp('20%'),
    flexDirection: 'row',
  },
  challengeBarSecondComponent1: {
    backgroundColor: "#fff",
    height: wp('6%'),
    width: '100%',
    alignItems: 'center',
    borderRadius: wp('1%'),
    alignContent: 'center',
    justifyContent: 'center'
  },
  challengeBarSecondComponent2: {
    width: wp('12%'),
    height:hp('5%'),
    marginBottom:wp('1.5%'),

  },
  challengeBarThirdComponent2:{
    width: wp('12%'),
    height:hp('5%'),
    marginBottom:wp('1.5%'),
  },
  challengeBarSecondComponentTetx: {
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    color: 'white',
    marginBottom:wp('1.5%'),
    width: wp('12%'),
    fontSize: wp('4.5%'),
    marginLeft: wp('2%'),
    fontFamily: 'Raleway-Bold'
  },
  challengeBarThirdComponentOuter: {
    height: wp('6%'),
    width: wp('8%'),

    marginLeft: wp('8%'),
    flexDirection: 'row',
  },
  challengeBarThirdComponent1: {
    backgroundColor: "#fff",
    height: wp('6%'),

    width: '100%',
    alignItems: 'center',
    borderRadius: wp('1%'),
    alignContent: 'center',
    justifyContent: 'center'
  },
  challengeBarThirdComponentTetx: {
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    width: wp('12%'),
    marginBottom:wp('1.5%'),
    color: 'white',
    fontSize: wp('5%'),
    marginLeft: wp('2%'),
    fontFamily: 'Raleway-Bold'
  },
  challengeBarfouthComponentOuter: {
    height: wp('6%'),
    width: wp('8%'),
    marginLeft: wp('12%'),
    flexDirection: 'row',
  },
  challengeBarfouthComponent1: {
    backgroundColor: "#fff",
    height: wp('6%'),
    width: '100%',
    alignItems: 'center',
    borderRadius: wp('1%'),
    alignContent: 'center',
    justifyContent: 'center'
  },
  challengeBarfouthComponentTetx: {
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
    marginBottom:wp('1.5%'),
    alignSelf: 'auto',
    color: 'white',
    fontSize: wp('5%'),
    marginLeft: wp('2%'),
    fontFamily: 'Raleway-Bold'
  },
  challengeBarfouthComponent2 :{
    width: wp('12%'),
    height:hp('5%'),
    marginBottom:wp('1.5%'),
  },
  mainImage: {
    marginTop: wp('4%'),
    width: '100%',
    height: wp('40%'),

  },
  imgaeUpperVIew: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: "center",
    alignItems: 'center',
    alignSelf: 'auto',
    flex: 1,
  },
  imageOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageUpperViewLeft: {
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: wp('1%'),
    paddingLeft: wp('1%')
  },
  imageUpperViewLeftText1: {
    fontSize: wp('4%'),
    fontFamily: 'Raleway',
    fontWeight: '800',
    color: 'white',
  },
  imageUpperViewLeftText2: {
    fontSize: wp('3%'),
    fontFamily: 'Roboto-Light',
    color: 'white',
    fontWeight: '600'
  },
  imageUpperViewMiddleText1: {
    fontSize: wp('3%'),
    fontFamily: 'Raleway-Bold',
    color: 'white',
    fontWeight: '900'
  },
  imageUpperViewMiddle: {
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: wp('1%'),
    // paddingLeft: wp('1%'),
    paddingRight:wp('6.5%')
  },
  imageUpperViewright: {
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: wp('1%')
  },
  imageUpperViewRightText1: {
    fontSize: wp('3%'),
    fontFamily: 'Raleway-Light',
    color: 'white',
    textTransform: 'capitalize',
    fontWeight: '900'
  },
  imgaeMiddleVIew: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    alignContent: 'center'
  },
  imageBottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: "center",
    alignItems: 'center',
    alignSelf: 'auto',
    flex: 1
  },
  view_title:
  {
    justifyContent: 'center',
    alignItems: 'center',

  },
  imageMiddleVIewFirstText: {
    fontSize: wp('4.5%'),
    color: 'white',
    fontFamily: 'Raleway',
    letterSpacing: 2
  },
  imageMiddleVIewSecondText: {
    fontSize: wp('3%'),
    color: 'white',
    fontFamily: 'Roboto',
    fontWeight: '900'
  },
  imageMiddleVIewSecondOuter: {
    backgroundColor: 'rgba(255,255,255,.4)',
    width: '100%',
    height: wp('4%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto'
  },
  imageBottomViewLeft: {
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    paddingTop: wp('1%'),
    paddingLeft: wp('1%')
  },
  imageBottomViewText1: {
    fontSize: wp('4%'),
    fontFamily: 'Raleway',
    fontWeight: '800',
    color: 'white',
  },
  imageBottomViewText2: {
    fontSize: wp('3%'),
    fontFamily: 'Roboto-Light',
    color: 'white',
    fontWeight: '600'
  },
  imagesViewOutline: {
    width: '100%',
    height: wp('1.7%'),
    backgroundColor: '#29ABE2'
  },
  counterSHow: {
    position: 'absolute',
    top: wp('45%'),
    left: wp('18%')
  },
  view_button_parent:
  {
    justifyContent: 'center', alignContent: 'center',
    alignItems: 'center',
    width: wp('100%'),
  },
  buttonsView: {
    width: wp('100%'),
    height: wp('20%'),
    paddingHorizontal: wp('7%'),
    // marginHorizontal:wp('1%'),
    // height:wp('17%'),
    // flexDirection:'row',
    // justifyContent:'space-evenly',
    // marginTop:  Platform.OS === 'ios' ? wp('2%') : 0,
    marginLeft: wp('15%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center'
    // left:wp('2.9%')
  },
  firstBox: {
    backgroundColor: '#f2f2f2',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    // paddingLeft:wp('4%'),
    // paddingRight:wp('4%'),
    width: wp('20%'),
    height: wp('16%'),
    marginHorizontal: wp('2%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1%'),
    elevation: 4,
    shadowOffset: { width: 0, height: wp('.1') },
    shadowColor: 'black',
    shadowOpacity: .9,

  },
  secondBox: {
    width: wp('.2%'),
    backgroundColor: '#000000',
    // borderRadius:10,
    marginHorizontal: wp('2%'),
    height: wp('16%'),


    // elevation:7,
    // shadowOffset: { width: 0, height: wp('.1') },
    // shadowColor: 'black',
    // shadowOpacity: .9,
  },
  thirdBox: {
    backgroundColor: '#f2f2f2',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),

    marginHorizontal: wp('2%'),
    width: wp('20%'),
    height: wp('16%'),

    // paddingRight:wp('5%'),
    // paddingLeft:wp('5%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1%'),
    elevation: 4,
    shadowOffset: { width: 0, height: wp('.1') },
    shadowColor: 'black',
    shadowOpacity: .9,

  },
  fourthBox: {
    width: wp('.2%'),
    backgroundColor: '#000000',
    // borderRadius:10,
    height: wp('16%'),

    marginHorizontal: wp('2%'),

    // elevation:7,
    // shadowOffset: { width: 0, height: wp('.1') },
    // shadowColor: 'black',
    // shadowOpacity: .9,
  },
  fifthBox: {
    backgroundColor: '#f2f2f2',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    // paddingLeft:wp('5%'),
    // paddingRight:wp('5%'),
    justifyContent: 'center',
    height: wp('16%'),

    alignContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1%'),
    elevation: 4,
    width: wp('20%'),
    marginHorizontal: wp('2%'),
    shadowOffset: { width: 0, height: wp('.1') },
    shadowColor: 'black',
    shadowOpacity: .9,
  },
  sixthBox: {
    width: wp('.2%'),
    backgroundColor: '#000000',
    height: wp('16%'),

    // borderRadius:10,
    marginHorizontal: wp('2%'),

    // elevation:7,
    // shadowOffset: { width: 0, height: wp('.1') },
    // shadowColor: 'black',
    // shadowOpacity: .9,
  },
  seventhBox: {
    backgroundColor: '#f2f2f2',
    paddingTop: wp('2%'),
    paddingBottom: wp('2%'),
    // paddingLeft:wp('6%'),
    // paddingRight:wp('6%'),
    justifyContent: 'center',
    height: wp('16%'),

    alignContent: 'center',
    alignItems: 'center',
    width: wp('20%'),
    marginHorizontal: wp('2%'),

    borderRadius: wp('1%'),
    elevation: 4,
    shadowOffset: { width: 0, height: wp('.1') },
    shadowColor: 'black',
    shadowOpacity: .9,
  },
  ImagesFlipbackground: {
    backgroundColor: '#f2f2f2',
    // position:'absolute',
    // top:wp('95%'),
    marginTop: wp('3%'),
    height: wp('62%'),
    padding: wp('2%')

  },
  ImagesFlipbackground1: {
    backgroundColor: '#f2f2f2',
    // position:'absolute',
    // top:wp('95%'),
    // marginTop: wp('15%'),
    height: wp('30%'),
    padding: wp('2%')

  },
  thirdView: {
    position: 'absolute',
    top: wp('27%'),
    left: wp('38.5%')
  },
  thirdView1: {
    position: 'absolute',
    top: wp('10%'),
    left: wp('38.5%')
  },
  imageInnerTex: {
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageText: {
    color: 'white',
    fontSize: wp('8%'),
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
  chareModal: {
    margin: 20,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 20,
    position: 'absolute',
    top: hp('35%'),
    left: 20,
    right: 20,
    height: wp('40%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center'
  },
  modelOuterView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.4)'
  },
  chargeModalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    alignContent: 'center',
    marginTop: wp('2%')
  },
  chargeButton: {
    backgroundColor: '#29ABE2',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    marginRight: wp('1%')

  },
  chargeButtonCancle: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingTop: wp('1%'),
    paddingBottom: wp('1%')
  },
  wandModalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    alignContent: 'center',
    marginTop: wp('2%'),
    //borderBottomWidth:1,
    //borderBottomColor:'#29ABE2',
  },
  flipModelText: {
    backgroundColor: '#29ABE2',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    padding: wp('1.5%'),
    marginTop:wp('12%')

  },
  flipModelTextInner: {
    fontSize: wp('4%'),
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: 'white'
  },
  modelImageText: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(0,0,0,.4)',

  },
  modelImageTextinner: {
    justifyContent: "center",
    alignSelf: 'center',
    color: '#29ABE2',
    fontSize: wp('3.5%')
  },
  chareModalImage: {
    margin: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 5,
    position: 'absolute',
    top: hp('35%'),
    left: 0,
    right: 0,
    height: wp('47%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center'
  },
  modelImageTextCircle: {
    height: wp('8%'),
    width: wp('8%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: wp('8%'),
    backgroundColor: 'rgba(0,0,0,.5)',
  },
  upperIVewChargeModal: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    flexDirection: 'row'
  },
  middleViewChargeModal: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    flexDirection: 'row'
  },
  lowerViewChargeModal: {
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    flexDirection: 'row'
  },
  ModalChargeButton: {
    paddingLeft: wp('6%'),
    paddingRight: wp('6%'),
    paddingTop: wp('2.5%'),
    paddingBottom: wp('2.5%'),
    margin: wp('2%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    width: wp('28%'),
    backgroundColor: 'lightgray'
  },
  chareModalView: {
    margin: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 5,
    position: 'absolute',
    top: hp('30%'),
    left: 0,
    right: 0,
    height: wp('60%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center'
  },
  chargePaymentValue: {
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    flexDirection: 'row',
    borderBottomColor: '#29ABE2',
    borderBottomWidth: 1,
    paddingBottom: wp('1%')
  },
  chargePaymentValueLeft: {
    fontSize: wp('3.5'),
    fontFamily: 'Roboto',
    fontWeight: '500'
  },
  chargePaymentValueRight: {
    fontSize: wp('3.5'),
    fontFamily: 'Roboto',
    fontWeight: '500',
    paddingLeft: wp('.5%')
  },
  chargePayment: {
    paddingTop: wp('2.8%'),
    paddingBottom: wp('2.8%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    width: wp('20%'),
    margin: wp('1%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(255,255,255,.7)',
    borderRadius: 1,
    borderColor: 'rgba(0,0,0,.6)',
    borderWidth: wp('.1%')

  },
  lowerViewChargeInner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto'
  },
  chargePrice: {
    fontSize: wp('4%'),
    color: 'red',
    fontFamily: 'Roboto',
    paddingTop: wp('1%'),
    // paddingBottom:wp('1%')
  },
  ModalChargeButtonText: {
    fontSize: wp('3.5'),
    fontFamily: 'Roboto',
    color: 'white',
    fontWeight: '600'
  },
  activeButton: {
    backgroundColor: '#29ABE2',
    elevation: 7,
    shadowOffset: { width: 2, height: 2, },
    shadowColor: 'black',
    shadowOpacity: .7,

  },
  crossbutton: {
    position: 'absolute',
    top: hp('75%'),
    left: wp('46.5%'),
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
  },
  animatedBox: {
    // position:'absolute',
    //top:hp('10%'),
    // borderTopColor:'rgba(0,0,0,.5)',
    // borderTopWidth:wp('.4'),
    //bottom:0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //paddingTop: 20

  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },
  sideMenuContainer: {

    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20
  },

  sideMenuProfileIcon:
  {
    resizeMode: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },

  sideMenuIcon:
  {
    resizeMode: 'center',
    width: 28,
    height: 28,
    marginRight: 10,
    marginLeft: 20

  },

  menuText: {

    fontSize: 15,
    color: '#222222',

  },
  challengeBarfouthComponent2 :{
    width: wp('12%'),
    height:hp('5%'),
    marginBottom:wp('1.5%'),
  },
  chareModalImage2: {
    margin: 5,
    backgroundColor: 'rgba(255,255,255,1)',
    padding: 5,
    position: 'absolute',
    top: hp('25%'),
    left: 0,
    right: 0,
    height: wp('60%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center'
  },
  flipModelText2: {
    backgroundColor: '#29ABE2',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    padding: wp('1.5%'),
    // marginTop:wp('12%')

  },


});

const mapStatesToProps = state => {
  return {
    CurrentChallenge: state.BestImages.CurrentChallenge,
    user: state.user.user,
    pro_data: state.BestImages.SaveuserProfiledata,
    logindata: state.user.user,
    isLoading:state.isLoading.isLoading
  }
}

const mapsDispatchToProps = dispatch => {
  return {
    Charge: (type, text,componentId) => dispatch(SaveUserInfoWallet(type, text,componentId)),
    GetAllImages: () => (dispatch(GetVoteImages())),
    upload: (image, id,screen) => (dispatch(UploadImage(image, id,screen))),
    FlipImage:(image,id,imageId,screen)=>dispatch(FlipImage(image,id,imageId,screen)),
    UserData: () => dispatch(UserProfileData()),
    MyChallenges:()=>dispatch(MyChallenges()),
    uiStopLoading:()=>dispatch(uiStopLoading()),
    uiStartLoading:()=>dispatch(uiStartLoading()),
    RefreshTaskData:(cid)=>dispatch(RefreshTaskData(cid)),
    rankFucn: () => dispatch(getDetailsImage()),
    SaveUserInfoPayThroughInApp:(type, text,componentId) =>dispatch(SaveUserInfoPayThroughInApp(type, text,componentId))
  }
}

export default connect(mapStatesToProps, mapsDispatchToProps)(ActiveChalenge);
