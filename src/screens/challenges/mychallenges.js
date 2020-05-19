import React, {Component} from 'react';
import closed_Img from '../../images/MyChallenges.png';
import {
  SafeAreaView,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  View,
  RefreshControl,
  Text,
  Button,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  Platform,
  Modal,
  Alert,
  Dimensions,
  ActivityIndicator,
  TouchableWithoutFeedback,
  TouchableWithNativeFeedback,
  ToastAndroid
} from 'react-native';
import WalletImage from '../../images/Waleeticon.png';
import AsyncStorage from '@react-native-community/async-storage';
import PixP from '../../images/pixP.png';
import flipImage from '../../images/img.png';
import flip from '../../images/icon/flip.png';
import flipicon from '../../images/icon/flipicon1.jpg';
import Votes from '../../images/Votes.png';
import Charge from '../../images/icon/charge.png';
import FlipWithoutBg from '../../images/icon/flip-without-bg.png';
import wand from '../../images/icon/wand.png';
import key from '../../images/icon/key.png';
import RNSpeedometer from 'react-native-speedometer';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";
import Cross from 'react-native-vector-icons/MaterialIcons'
import Icons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from '../../components/topbar/topbar';
import MenuDrawer from 'react-native-side-drawer';
import BottomBar from '../../components/bottombar/bottombar';
import {
  MyChallenges,
  OpenjoinedChallenge,
  SaveComponentId,
  SaveUserInfoWallet,
  GetVoteImages, 
  UserProfileData,
  FlipImage,
  uiStopLoading,
  uiStartLoading,
  RefreshTaskData,
  BuySell,
  GetNotification,
  SaveUserInfoPayThroughInApp
} from '../../store/actions/index';
import logo from '../../images/logoooooooooo.png';
import SideDrawer from '../sidedrawer/sidedrawer';
import { connect } from 'react-redux';
import firebase from 'react-native-firebase';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import ImagePicker from 'react-native-image-picker';
// in App Pourchase
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

const item = 'wand5'
const itemSkus = Platform.select({
  ios: [
    'wand5'
  ],
  android: [
    'wand5'
  ]
});
const { height } = Dimensions.get('window');
const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
const MULTIPLIER = 1.15
const LONG_DURATION = 350 * MULTIPLIER
const SHORT_DURATION = 190 * MULTIPLIER
class Mychallenge extends Component {
  

      constructor(props){
        super(props);
        // this.getDtata();
        this.props.GetOPenChallenge();
        Navigation.events().bindComponent(this);
      }
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
      if (buttonId === "openSideDrawer2") {
        this.changeScreen('UrPicsPay.Notification','Notifications');
      }
     }

    state = {
      pickImage: [],
      loading: false,
        searched:[],
        isVisible:false,
        charge:false,
        allcharge: false,
        allwand: false,
        wand:false,
        flip:false,
        wantFlipCharge:false,
        ChargeBuy:false,
        FlipBuy:false,
        open: false,
        WandBuy:false,
        screenHeight: 0,
        textHeight:0,
        data:[
          {
            id:0,
          },
          {
            id:1,
          },
          {
            id:2,
          },
          {
            id:3,
          },
          {
            id:4,
          },
          {
            id:5,
          },
          {
            id:6,
          },
          {
            id:7,
          }
        ]
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
    wand = (cid) => {

      //dispatch(uiStartLoading());
      this.setState({
        loading:true
      })
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/wand', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uid": this.props.logindata.no,
          "cid": cid,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          "POST Response",
            "Response Body -> " + JSON.stringify(responseData)
          console.log(responseData);
          this.setState({
            loading:false
          })
          // this.props.RefreshTaskData(this.props.CurrentChallenge[0].id);
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
            responseData.message + '.',
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
        .catch((err) => {
          this.setState({
            loading:false
          })
          console.log(err)
        })
        .done();
    }

    charge = (cid) => {

      //dispatch(uiStartLoading());
      this.setState({
        loading:true
      })
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/charge', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "uid": this.props.logindata.no,
          "cid": cid,
        }),
      })
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          "POST Response",
            "Response Body -> " + JSON.stringify(responseData)
          console.log(responseData.message);
          this.setState({
            loading:false
          })
          // this.props.RefreshTaskData(this.props.CurrentChallenge[0].id);
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
        .catch((err) => {
          console.log(err)
          this.setState({
            loading:false
          })
        })
        .done();
  
  
    }


    flipChargeWand = (type, text) => {

      this.props.Charge(type, text,this.props.componentId);
      this.props.UserData();
  
  
    }

    flipChargeWandThroughAppPurchase =(type, text) =>{
      this.props.SaveUserInfoPayThroughInApp(type, text,this.props.componentId)
      this.props.UserData();
    }


    SubmitToken = () => {
     let idImage = this.state.fcmToken;
      fetch('https://urpixpays.com/stagging_urpixpays/user_token', {
        method: 'POST',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "uid":this.props.user.no,
           "token": idImage,
        }),
     })
        .then((response) => response.json())
        .then((responseData) => {
        })
        .catch((err) => {
          //  dispatch(uiStopLoading());  
           console.log(err)
        })
        .done();
  
  
    }
    


    submitImage = () => {
      this.setState({loading: true});
     let idImage = this.state.pickImage;
      fetch('https://urpixpays.com/stagging_urpixpays/upload_image', {
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
           if(responseData.state){
              Alert.alert(
                 'Alert',
                 'Your Image was successfully uploaded to Buy & Sell page',
                 [
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                 ],
                 {cancelable: false},
               );
              //  dispatch(MyChallenges())
           }else{
              Alert.alert(
                 'Alert',
                 'Your Image was successfully uploaded to Buy & Sell page',
                 [
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                 ],
                 {cancelable: false},
               );
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
    
   async componentDidMount(){
      // this.LoadImages();
      this.props.notification();
      this.props.buysellFuction('latest', '');
      this.props.SaveComponentId(this.props.componentId);

      const channel = new firebase.notifications.Android.Channel('test-channel', 'Test Channel', firebase.notifications.Android.Importance.Max)
      .setDescription('My apps test channel');

      // Create the channel
      firebase.notifications().android.createChannel(channel);
      this.checkPermission();
      this.createNotificationListeners();
      try {
        let connection = await RNIap.initConnection();
        if(connection){
          const products: Product[] = await RNIap.getProducts(itemSkus);
          this.setState({ products });
        }
       
      } catch(err) {
        console.warn(err); // standardized err.code and err.message available
      }
    }

     purchaseUpdateSubscription = purchaseUpdatedListener(
      async (purchase: InAppPurchase | SubscriptionPurchase) => {
        const receipt = purchase.transactionReceipt;
        if (receipt) {
          try {
            console.log(receipt);
            // if (Platform.OS === 'ios') {
            //   finishTransactionIOS(purchase.transactionId);
            // } else if (Platform.OS === 'android') {
            //   // If consumable (can be purchased again)
            //   consumePurchaseAndroid(purchase.purchaseToken);
            //   // If not consumable
            //   acknowledgePurchaseAndroid(purchase.purchaseToken);
            // }
            const ackResult = await finishTransaction(purchase);
          } catch (ackErr) {
            console.warn('ackErr', ackErr);
          }

          this.setState({receipt}, () => this.goNext());
        }
      },
    );


    purchaseErrorSubscription = purchaseErrorListener(
      (error: PurchaseError) => {
        console.log('purchaseErrorListener', error);
        // Alert.alert('purchase error', JSON.stringify(error));
      },
    );

 goNext = (): void => {
    // Alert.alert('Receipt', this.state.receipt);
  };
    requestPurchase = async (sku: string,first,second) => {
      
      try {
      const show =  await RNIap.requestPurchase(sku, false);
        console.log(show);
        if(show){
          this.props.SaveUserInfoPayThroughInApp(first,second)
        }
        
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }

    componentWillUnmount() {
      this.removeNotificationListeners();
    }

    getToken = async () => {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      this.setState({
        fcmToken:fcmToken
      })
      if (!fcmToken) {
        fcmToken = await firebase.messaging().getToken();
        if (fcmToken) {
          this.setState({
            fcmToken:fcmToken
          })
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
  
    createNotificationListeners = () => {
      this.onUnsubscribeNotificaitonListener = firebase
        .notifications()
        .onNotification(notification => {
          alert(notification);
          firebase.notifications().displayNotification(notification);
        });
    };
  
    removeNotificationListeners = () => {
      this.onUnsubscribeNotificaitonListener();
    };
  

    changeScreen = (screen,title,id) =>{
      // AsyncStorage.setItem("screen", JSON.stringify(screen));
        Navigation.push(this.props.componentId, {
          component: {
            name: screen,
            passProps: { id },
            options: {
              sideMenu: {
                left: {
                    visible: false,
                    enabled: false
                  }
            },
              topBar: {
                visible:true,
                title:{
                  text:title,
                  alignment:'center'
                }
              },
              bottomTabs:{
                visible:false,
                drawBehind:true,
                animate:true
              },
              animations: {
                push: {
                  content: {
                    alpha: {
                      from: 0,
                      to: 1,
                      duration: LONG_DURATION
                    }
                  },
                  sharedElementTransitions: [
                    {
                      fromId: `image${id}`,
                      toId: `image${id}Dest`
                    }
                  ]
                }
               }
            }
          }
        });
      }


    getDtata = () =>{
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/open/222')
      .then((response)=>response.json())
      .then((responseData)=>{
        console.log(responseData.challenge);
      })
    }

    drawerContent = () => {
      return (
        
            <View style={[styles.animatedBox]}>
            <SideDrawer OpenSideDrawer={this.toggleOpen}  goto={(s)=>this.gotoScreen(s)}  />
        </View>
          
      );
    };
    toggleOpen = () => {
      this.setState({ open: !this.state.open });
    };
    
    onContentSizeChange = (contentWidth, contentHeight) => {
      // Save the content height in state
      this.setState({ screenHeight: contentHeight });
    };
    onContentSizeChange = (contentWidth, contentHeight) =>{
      this.setState({ textHeight: contentHeight });
    }
    // renderFotter =() => {
    //   return(
    //     <View style={{paddingVertical:20}}>
    //         <ActivityIndicator animating size="large" />
    //     </View>
    //   )
    // }

    gotoScreen = (screen) =>{
      
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

  allwand = () => {

    //dispatch(uiStartLoading());
    this.setState({loading: true});
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
        this.setState({loading: false});
        if (responseData.message =='Wand Successful!') {
          alert(responseData.message);
          this.props.UserData();
          // dispatch(uiStopLoading());

          this.props.MyChallenges()
          this.setState({
            allwand:false,
            loading:false
          })
          // Navigation.popToRoot(this.props.componentId);
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
      .catch((err) => {
        console.log(err)
        this.setState({
          allwand:false,
          loading:false
        })
        this.setState({loading: false});
      })
      .done();


  }

  allcharge = () => {

    //dispatch(uiStartLoading());
    this.setState({loading: true});
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
        this.setState({loading: false});
        
        if (responseData.message =='Charge Successful!') {
          alert(responseData.message);
          // dispatch(uiStopLoading());
          this.props.UserData();
          this.props.MyChallenges()
          // Navigation.popToRoot(this.props.componentId);
          this.setState({
            allcharge:false,
            loading:false
          })
          // changeScreen('UrPicsPay.mychallenges');
        } else if (responseData.message =='Please purchase Charge through wallet!') {
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
      .catch((err) => {
        console.log(err)
        this.setState({
          allcharge:false
        })
        this.setState({loading: false});
      })
      .done();


  }

  placeDeletedHandler = (id) => {
    this.setState(prevState => {
      return {
        searched: this.props.Mychalleng.filter(openChallenge => {
          return openChallenge.id === id;
        }),
      };
    });
   let searchedData =[];
    searchedData = this.props.Mychalleng.filter(openChallenge => {
    return openChallenge.id === id;
  });

    
    this.props.GotoChallenge(searchedData);
    this.GotoAnotherPage(id);
  };

  GotoAnotherPage = (id) =>{
  
    this.changeScreen('UrPicsPay.ActiveChalenge','Active Challenges',id);
    
  }
  LoadImages = () =>{
   let loadImages = FastImage.preload([
      {
          uri: 'https://urpixpays.com/public/uploads/challengesimages/457PGN.jpg',
      },
      {
        uri:'https://urpixpays.com/public/uploads/challengesimages/470Camera.jpg'
      }
  ])
  console.log(loadImages);
  }


  RenViewContent =(item)=> {
      var today = new Date();
      var Christmas =item.item.start_time? new Date(item.item.start_time.replace(/-/g, "/")):0;
      let checkDate = (Date.now()) / 1000.0;
      var diffMs = item.item.start_time?moment(item.item.start_time).diff(moment().format(), 'seconds'):0;

      let millisends = item.item.timeline*60*60-diffMs;

      return (

        <View style={styles.challengeOuterView}>
    

   <FastImage
      nativeID={`image${item.item.id}`}
     style={{width:wp('100%'),height:wp('56%'),resizeMode:'contain'}}
      source={{
        uri:item.item.image_url,
          priority: FastImage.priority.high,
      }}
      // resizeMode={FastImage.resizeMode.contain}
  >
   <View style={styles.imageOverlay}>
   {item.item.c_type =='game'?<View style={styles.imageUpperViewLeft}>
                  <View>
                    <Text style={styles.imageUpperViewLeftText1}>
                     {item.item.c_type}
                    </Text>
                  </View>
                </View>:<React.Fragment></React.Fragment>}
            <View style={styles.ImageInnerUpperView}>
              <View>
                <Image source={logo} style={styles.Logo} />
              </View>
              <View>
                <Text style={styles.ImageInnerText}>
                  CHALLENGE
                </Text>
              </View>
            </View>
            <View style={styles.ImageInnerMiddleView}>
              <View>
              <Text style={styles.middleText}>
                {item.item.title}
              </Text>
              </View>
            </View>
            
               <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:wp('8%')}}>
               <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
           <RNSpeedometer 
              value={item.item.wandexposure.wandexposure/2} 
              size={wp('10%')} 
              minValue= {0} 
              maxValue= {7}
              labelStyle={{display:'none'}}
              labelWrapperStyle={{display:'none'}}
              ref={ref =>{this.wandSpeedMeter = ref}}
               />
               <TouchableOpacity
                onPress={() =>{
                  this.wand(item.item.id);
                  
                }}
               style={
                {
                backgroundColor: '#29ABE2', 
                width: wp('15%'), 
                height: wp('7%'), 
                marginTop: 5,
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center'
                }}
               >
                <Text style={{color:'white',fontSize:wp('3.5%')}}>
                   Wand
                 </Text> 
               </TouchableOpacity>

           </View>
               <TouchableOpacity onPress={()=> this.placeDeletedHandler(item.item.id)} style={styles.ImageInnerLowerView}>
              <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }} colors={[ '#bbd9f1','#138ece','#0067a9']} style={styles.buttonView}>
                <Text style={styles.ImageLowerButton}>
                  Open
                </Text>
              </LinearGradient>
            </TouchableOpacity>
           <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
           <RNSpeedometer 
              value={item.item.exposure.exposure/2} 
              size={wp('10%')} 
              minValue= {0} 
              maxValue= {7}
              labelStyle={{display:'none'}}
              labelWrapperStyle={{display:'none'}}
              ref={ref =>{this.wandSpeedMeter = ref}}
               />
               <TouchableOpacity
               onPress={() =>{
                 this.charge(item.item.id);

               }}
               style={
                {
                backgroundColor: '#29ABE2', 
                width: wp('15%'), 
                height: wp('7%'), 
                marginTop: 10,
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center'
                }}
               >
                <Text style={{color:'white',fontSize:wp('3.5%')}}>
                   Charge
                 </Text> 
               </TouchableOpacity>
                 
           </View>
               </View>
          </View>
  </FastImage>
  <View style={{backgroundColor:'#29ABE2',justifyContent:'center',alignItems:'center'}}>
          <View style={styles.InfoLeftView} >
            <CountDown 
                size={wp('3%')}
                until={millisends}
                // onFinish={() => alert('Finished')}
                digitStyle={{backgroundColor: '#fff',borderColor: '#fff',borderRadius:3,marginTop:wp('3%')}}
                digitTxtStyle={{color: '#000',padding:0}}
                timeLabelStyle={{color: '#fff', fontWeight: '500',fontSize:wp('3%')}}
                separatorStyle={{color: '#fff',fontSize:wp('5%'),marginLeft:wp('2%'),marginRight:wp('2%'),marginBottom:wp('3.5%')}}
                timeToShow={['D','H','M','S']}
                timeLabels={{d:'Days',m:'Minutes',s:'Seconds',h:'Hours'}}
                showSeparator
              />
            </View>
  </View>
  <View style={styles.infoView}>
        
            <View style={styles.infoMiddleView}>
              <View>
                <Text style={styles.leftTextBottom}>
                Votes
                </Text>
              </View>
              <View style={styles.textView}>
                <Text style={styles.leftTExt}>
                 {item.item.votes}
                </Text>
              </View>
              
            </View>

            <View style={styles.infoRightView}>
              <View>
                <Text style={styles.rightTextBottom}>
                    Cash Prize
                </Text>
              </View>
              <View>
                  <Text style={styles.rightText}>
                    {item.item.price}
                  </Text>
              </View>
             
            </View>
        </View>
        <View style={styles.ImageOuline}></View>
        </View>
      )
    }

  render ()
  {
    
    console.log('state = ',this.state);
    let loader = (
      <React.Fragment>

      </React.Fragment>
    );
      if(this.state.loading || this.props.isLoading){
        loader = (
         <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
            <ActivityIndicator size={'large'} color='#29ABE2'  />
         </View>
        )
      }

      let BuyModalViewText;
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

        // ToastAndroid.showWithGravityAndOffset(
        //   'You have joined the challenge successfully.',
        //   ToastAndroid.LONG,
        //   ToastAndroid.BOTTOM,
        //   25,
        //   50,
        // );

        // return;
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
                  $3.99
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
    const scrollEnabled = this.state.screenHeight > height;
    // console.log(this.props.CurrentChallenge);
    return (
      
      <View style={{flex:1,zIndex:0}}>
        {loader}
<TouchableOpacity onPress={
          ()=>{
            this.ImagePickr();
          }
        }
        style={styles.backButton}>
                    <Icons name={'md-camera'} size={wp('8%')} color={'white'} />
                  </TouchableOpacity>
        <ScrollView
        onScroll={({
          nativeEvent: {
            contentOffset: { x, y }
          }
        }) => {
          if (this.y > y && y <= 44) {
            Navigation.mergeOptions(this.props.componentId, {
              topBar: {
                visible: true,
                // height:100
              }
            });
          }
          this.y = y;
        }}
        >
        
        <View style={{width:wp('100%'), backgroundColor:'black'}}>
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
                    { this.abbreviateNumber(this.props.pro_data.pixpoints)}
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
        </View>

    
        <View style={{backgroundColor: 'gray', height: wp('10%'), flexDirection: 'row'}}>
          <TouchableOpacity onPress={() => this.setState({allcharge: true})} style={{flexDirection: 'row'}}>
            <View style={{backgroundColor: 'white', borderRadius: 5, height: wp('7%'),paddingLeft: wp('1%'), paddingRight: wp('1%'), marginTop: wp('1.5%'), marginLeft: wp('6%')}}>
              <Image source={Charge} style={{ height: wp('6%'), width: wp('6%') }}/>
            </View>
            <View style={{marginLeft: wp('2%'), marginTop: wp('2%')}}>
              <Text style={{ fontSize: wp('4%'), color: 'white', fontWeight: 'bold' }}>
                Charge All
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.setState({allwand: true})} style={{flexDirection: 'row', marginLeft: wp('25%')}}>
            <View style={{backgroundColor: 'white', borderRadius: 5, height: wp('7%'),paddingLeft: wp('1%'), paddingRight: wp('1%'), marginTop: wp('1.5%'), marginLeft: wp('6%')}}>
              <Image source={wand} style={{ height: wp('7%'), width: wp('7%') }} />
            </View>
            <View style={{marginLeft: wp('2%'), marginTop: wp('2%')}}>
              <Text style={{ fontSize: wp('4%'), color: 'white', fontWeight: 'bold' }}>
                Wand All
              </Text>
            </View>
          </TouchableOpacity>
          
        </View>
      
{this.props.Mychalleng.length > 0 ?<View style={styles.mainView2}>
      
      <FlatList 
     
      data={this.props.Mychalleng}
      renderItem={this.RenViewContent}
      keyExtractor={item => item.index}
      ListFooterComponent={this.renderFotter}
      keyExtractor = { (item, index) => index.toString() }
      //ListHeaderComponent={this.renderFotter}
      />
    </View>:<View style={styles.sec_close}>
        <View  style={styles.sec_close_img}>
            <Image style={styles.sec_img} source={closed_Img} />
        </View>
  </View>}
    </ScrollView>
      
      <Modal            
          animationType = {"fade"}  
          transparent = {true}  
          visible = {this.state.isVisible}  
          onRequestClose={() => {
            this.setState({
              isVisible:false
            })
          }}
          >  
          {/*All views of Modal*/}  
              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
              <View style = {styles.modal}>  
             {this.state.searched.map((content,index) => {

               return (
               <View key={index}>
                   <TouchableOpacity 
                  onPressOut={() => {
                    this.setState({
                      isVisible:false
                    })
                  }}


                 style={styles.croxx}>
                   <Cross name="cancel" size={wp('7%')} color="#000000" />
                 </TouchableOpacity>
                  <View style={[styles.titleOuter,{borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,.2)'}]}>
                  <Text style = {styles.text}>{content.title}</Text>  
                  </View>
                  {content.type ==='paid'? <View style={[styles.titleOuter]}>
                  <Text style = {[styles.text,{color:'red'}]}>This is a paid Challenge. Are you sure you want to continue?</Text>  
                  </View>:<View></View>}
                 
                  <ScrollView
                  scrollEnabled={this.state.textHeight > hp('50%')?true:false}
                   style={{maxHeight:hp('50%')}}
                   onContentSizeChange={this.onContentSizeChange}
                    >
                  <View style={styles.descriptionOuter}>
                  <Text style={[styles.description]}>
                    {content.description}
                  </Text>
                  </View>
                  </ScrollView>
                  


                  <TouchableOpacity onPress = {() => {  
                    this.setState({ isVisible:!this.state.isVisible});
                    this.changeScreen('UrPicsPay.ActiveChalenge','Active Challenges');
                    this.props.GotoChallenge(this.state.searched);

                    }} style={styles.ImageInnerLowerView}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }} colors={[ '#bbd9f1','#138ece','#0067a9']} style={styles.buttonView}>
                    <Text style={[styles.ImageLowerButton,{fontSize:wp('5%')}]}>
                      Continue
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
               </View>
               )
             })}
          </View>  
              </View>
        </Modal> 

        <View>
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.allcharge}
                // onRequestClose={() => { this.isVisible(false); } }
                >
                <View style={styles.modelOuterView}>
                {loader}
                  <View style={styles.chareModal}>
                    <View>
                      <Image source={Charge} style={{ width: wp('20%'), height: wp('20%') }} />
                    </View>
                    <View style={styles.chargeModalButtons}>
                      <TouchableOpacity onPress={() => this.allcharge()} style={styles.chargeButton} >
                        <Text style={{ fontSize: wp('3.5%'), color: 'white' }}>
                          Charge All
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
                {loader}
                  <View style={styles.chareModal}>
                    <View>
                      <Image source={wand} style={{ width: wp('20%'), height: wp('20%') }} />
                    </View>
                    <View style={styles.wandModalButtons}>
                      <TouchableOpacity onPress={() => this.allwand()}


                        style={styles.chargeButton} >
                        <Text style={{ fontSize: wp('3.5%'), color: 'white' }}>
                          Wand All
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
                    {loader}
                    {BuyModalViewText}
                  </View>
                </View>
              </Modal>
            </View>
      {/* </ScrollView> */}
      {/* </MenuDrawer> */}
      </View>
      
    )
  }


}



const styles = StyleSheet.create({
  topbarBox:
  {
    width:wp('100%'),
    height:hp('10%'),
    borderBottomColor:'rgba(0,0,0,0.5)',
    borderBottomWidth:wp('.4%'),

    // shadowOffset:{  width: 10,  height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
  },
  mainView2:{

  },
  bottombarBox:{
    width:wp('100%'),
    // height:wp('15%'),
    position:'absolute',
    backgroundColor:'white',
    bottom:wp('5%'),
    zIndex:9999,
  },
  mainView:{
    // paddingTop:wp('4%'),
    // marginBottom:wp('10%')
    // marginBottom:wp('25%')
  },
  imageOverlay:{
    height:'100%',
    width:'100%',
    backgroundColor:'rgba(0,0,0,0.5)',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'auto'
  },
  ImageView:{
   
    flex:1,
    width:'100%',
    // justifyContent:'center',
    // alignContent:'center',
    // alignItems:'center',
    height:wp('50%')

  },
  Logo:{
    width:wp('14%'),
    height:wp('14%')
  },
  ImageInnerText:{
    fontSize:wp('3.5%'),
    color:"white",
    fontFamily:'Raleway',
    fontWeight:'600'
  },
  middleText:{
    fontSize:wp('4.5%'),
    color:'white',
    fontWeight:'600',
    fontFamily:'Raleway',

  },
  ImageLowerButton:{
    fontSize:wp('4%'),
    color:'white'
  },
  ImageInnerMiddleView:{
    height:wp('15%'),
    justifyContent:'center',
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center'
    //flex:1,
    //marginTop:hp('4%')
  },
  ImageInnerUpperView:{
    height:wp('20%'),
    justifyContent:'center',
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center'
    // flex:1,
   // marginTop:hp('3.5%')
    // marginTop:wp('8%')
  },
  ImageInnerLowerView:{
    //flex:1
    justifyContent:'center',
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center',
    height:wp('15%'),
  },
  buttonView:{
    paddingLeft:wp('8%'),
    paddingTop:wp('.8%'),
    paddingBottom:wp('.8%'),
    borderRadius:wp('10%'),
    paddingRight:wp('8%'),

  },
  ImageOuline:{
    width:'100%',
    height:wp('0.7%'),
    backgroundColor:'#29ABE2'
  },

  infoView:{
    backgroundColor:'#f1f1f1',
    width:'100%',
    flexDirection:'row',
    height:wp('11%'),
    alignItems:'center',
    alignContent:'center',

  },
  leftTExt:{
    color:'#000',
    fontSize:wp('3.9%'),
  },
  leftTextBottom:{
    color:'#000',
    fontWeight:'bold',
    fontSize:wp('4%'),
  },
  textView:{
    justifyContent:"center",
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center'
  },
  InfoLeftView:{
    justifyContent:"center",
    alignSelf:'auto',
    flex:1,
    alignContent:'center',
    alignItems:'center',
    // paddingLeft:wp('3%'),
    // paddingRight:wp('3%'),
  
  },
  infomiddleText:{
    fontSize:wp('6%'),
    color:"white",
    fontWeight:'600',
    fontFamily:'Roboto-Medium',

  },
  rightText:{
      fontSize:wp('3.9%'),
      color:"#000"
  },
  rightTextBottom:{
    fontSize:wp('4%'),
    fontWeight:'bold',
    color:'#000'
  },
  infoRightView:{
    
    justifyContent:"center",
    flex:0.5,
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center'
  },
  infoMiddleView:{
    alignItems:'center',
    justifyContent:'center',
    borderRightWidth:wp('.2'),
    flex:0.5,
    borderRightColor:'#29ABE2',
    // borderLeftWidth:wp('.3'),
    height:wp('5%'),
    // borderLeftColor:'#29ABE2'
  },
  challengeOuterView:{
    // marginBottom:wp('1%')
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
  flex:1,
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
  borderRadius: 150/2
},

sideMenuIcon:
{
  resizeMode: 'center',
  width: 28, 
  height: 28, 
  marginRight: 10,
  marginLeft: 20
  
},

menuText:{

  fontSize: 15,
  color: '#222222',
  
},
modal: {  
  justifyContent: 'center',  
  borderRadius:wp('2%'),
  backgroundColor:'white',
  flex:0,
  width:'90%',
  position:'absolute',
  top:hp('13%'),
  // maxHeight:hp('0%')

  
   
   },  
   text: {  
      color: '#3f2949',  
      fontSize:wp('4.5%'),
      fontWeight:'bold',
      marginTop: wp('4%'),
      marginBottom:wp('3%'),
      fontFamily:'Raleway', 
      paddingLeft:wp('3%'),
      paddingRight:wp('3%')


   },
   titleOuter:{
    justifyContent:'center',
    alignSelf:'auto',
    alignItems:'center',
    alignContent:'center',
  
   },
   descriptionOuter:{


     paddingTop:wp('2%'),
     paddingBottom:wp('2%'),
     paddingLeft:wp('6%'),
     paddingRight:wp('6%'),
     
   },
   description:{
     fontSize:wp('3.8%'),
    lineHeight:wp('5.3%'),
    fontWeight:'400',
    fontFamily:'Raleway',
     letterSpacing:1,
     textTransform:'capitalize',

   } ,
   croxx:
   {
     flexDirection:'row',
     justifyContent:'flex-end',
     alignItems:'flex-end',
     width:'100%',
   } ,
   challengeBar: {
    width:wp('100%'),
    flexDirection: 'column',
    backgroundColor: 'black',
    alignContent: 'center',
    paddingTop:wp('2%'),
    // alignItems:'center',
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
    padding: wp('4%'),
    marginBottom: wp('10%'),
    zIndex: -9999,
  },
  challengeBarFirstComponentOuter: {
    height: wp('6%'),
    width: wp('20%'),
    marginLeft:wp('5%'),
    flexDirection: 'row',
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

    marginLeft: wp('12%'),
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
    marginLeft: wp('2%'),
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
  backButton:{
    width:wp('14%'),
    height:wp('14%'),
    backgroundColor:'#29ABE2',
    position:'absolute',
    bottom:30,
    zIndex:9999,
    borderRadius:wp('7%'),
    right:15,
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    padding:wp('1.5%')
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
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  chargeModalButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    alignContent: 'center',
    marginTop: wp('2%')
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
    marginTop: wp('2%')
  },
  imageOverlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  imageUpperViewLeft: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: wp('1%'),
    position: 'absolute',
    left: 0,
    top: 20,
    paddingBottom: wp('1%'),
    paddingLeft: wp('6%'),
    paddingRight: wp('6%')
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
    paddingLeft: wp('1%')
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
    top: wp('41%'),
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
    marginTop: wp('15%'),
    height: wp('77%'),
    padding: wp('2%')

  },
  ImagesFlipbackground1: {
    backgroundColor: '#f2f2f2',
    // position:'absolute',
    // top:wp('95%'),
    marginTop: wp('15%'),
    height: wp('35%'),
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
    backgroundColor: 'rgba(0,0,0,0.4)',
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
    borderRadius:wp('1%'),
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    paddingTop: wp('1.5%'),
    paddingBottom: wp('1.5%'),
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
    backgroundColor: 'gray',
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    padding: wp('1.5%')

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
    backgroundColor: 'rgba(0,0,0,.4)',

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
  },sec_close:
  {
    flex:1,
    flexDirection:'column',
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center'
  },
  sec_close_img:
  {
    padding:10,
    alignItems:'center',
    
  },
  sec_img:
  {
     width:wp('70%'),
     height:wp('40%'),
     marginTop:wp('10%')
     
  },
});
const mapStatesToProps = state =>{
  return{
    Mychalleng:state.BestImages.Mychalleng,
    CurrentChallenge: state.BestImages.CurrentChallenge,
    user:state.user.user,
    logindata: state.user.user,
    pro_data: state.BestImages.SaveuserProfiledata,
    isLoading:state.isLoading.isLoading
  }
}

const mapsDispatchToProps = dispatch =>{
  return{
    Charge: (type, text,componentId) => dispatch(SaveUserInfoWallet(type, text,componentId)),
    GetOPenChallenge : () => dispatch(MyChallenges()),
    GotoChallenge:(challenge) =>dispatch(OpenjoinedChallenge(challenge)),
    SaveComponentId:(id)=>dispatch(SaveComponentId(id)),
    UserData: () => dispatch(UserProfileData()),
    MyChallenges:()=>dispatch(MyChallenges()),
    RefreshTaskData:(cid)=>dispatch(RefreshTaskData(cid)),
    buysellFuction: (sort, search) => dispatch(BuySell(sort, search)),
    notification: () => dispatch(GetNotification()),
    SaveUserInfoPayThroughInApp:(type, text,componentId) =>dispatch(SaveUserInfoPayThroughInApp(type, text,componentId))
  }
}

export default connect(mapStatesToProps,mapsDispatchToProps) (Mychallenge);
