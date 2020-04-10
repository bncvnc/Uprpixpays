import React, {Component} from 'react';
import FlipWithoutBg from '../../images/icon/flip-without-bg.png';
import closed_Img from '../../images/Opencha-Defualt.png';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Platform,
  Modal,
  ActivityIndicator,
  Dimensions,
  Alert
} from 'react-native';
import WalletImage from '../../images/Waleeticon.png';
import flip from '../../images/icon/flip.png';
import flipicon from '../../images/icon/flipicon1.jpg';
import charges from '../../images/icon/chargess.png';
import key from '../../images/icon/key.png';
import PixP from '../../images/pixP.png';
import Icons from 'react-native-vector-icons/Ionicons';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";
import  appNavigation  from '../../components/startTabs/navigations';
import LinearGradient from 'react-native-linear-gradient';
import Cross from 'react-native-vector-icons/MaterialIcons'
import Topbar from '../../components/topbar/topbar';
import SideDrawer from '../sidedrawer/sidedrawer';
import MenuDrawer from 'react-native-side-drawer';
import Charge from '../../images/icon/charge.png';
import wand from '../../images/icon/wand.png';
import BottomBar from '../../components/bottombar/bottombar';
import flipImage from  '../../images/img.png';
import {
  OpenChallenges,
  SaveComponentId,
  GetVoteImages,
  MyChallenges,
  uiStartLoading,
  uiStopLoading,
  SaveUserInfoWallet,
  UserProfileData
} from '../../store/actions/index';
import logo from '../../images/logoooooooooo.png';
import { connect } from 'react-redux';
import changeScreen from '../../../src/components/changeScreen/changeScreen';
import {ToastAndroid} from 'react-native';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
const URI = 'http://192.168.10.11/UrPicsPay/public/';

const { height } = Dimensions.get('window');
const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
const MULTIPLIER = 1.15
const LONG_DURATION = 350 * MULTIPLIER
const SHORT_DURATION = 190 * MULTIPLIER
class OpenChallenge extends Component {

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

    state = {
        searched:[],
        isLoading:false,
        isVisible:false,
        charge:false,
        wand:false,
        flip:false,
        wantFlipCharge:false,
        ChargeBuy:false,
        FlipBuy:false,
        open: false,
        WandBuy:false,
        textHeight:0,
        screenHeight: 0,
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
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    join = (ChallengeId) =>{
      
   //dispatch(uiStartLoading());
   this.setState({
    isLoading:true
  })
   console.log(ChallengeId);
   fetch('https://urpixpays.com/stagging_urpixpays/user/challenges/join', {
    method: 'POST',
         headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({
            "uid":this.props.logindata.no ,
            "cid": ChallengeId,
           
         }),
      })
    .then((response) => response.json())
       .then((responseData) => {
    console.log(responseData);
    if(responseData.message ==='Successful Join')
    { 

      this.setState({
        isVisible:false,
        isLoading:false
      })
    setTimeout(() => { 
      this.props.GetOPenChallenge()
    }, 100);
    this.props.GetMychallnges();
 
      if(Platform.OS ==='android'){
        ToastAndroid.showWithGravityAndOffset(
          'You have joined the challenge successfully',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }else{
        Alert.alert(
          'Success Alert',
          'You have joined the challenge successfully',
          [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ],
          {cancelable: false},
        );
      }
    
     
    }
      // if (responseData.success) {
      //   alert(`join Successfully Successful!`);
      //   dispatch(uiStopLoading());
      // appNavigation();
      // } else if(!responseData.success) {
      //   alert('Join Failed! '+ responseData.data);
      //   dispatch(uiStopLoading());
      //   alert(responseData.data);
      // }
  
    }).catch((err)=>{
      console.log(err)
      this.setState({
        isLoading:false
      })
    })
    .done(); 
}
PaidJoin = (ChallengeId) =>{
      
  //dispatch(uiStartLoading());
  this.setState({
    isLoading:true
  })
  // console.log(this.props.logindata.no);
  fetch('https://urpixpays.com/stagging_urpixpays/user/challenges/paidjoin', {
   method: 'POST',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "uid":this.props.logindata.no ,
           "cid": ChallengeId,
          
        }),
     })
   .then((response) => response.json())
      .then((responseData) => {
   console.log(responseData);
   this.setState({
    isVisible:false,
    isLoading:false
  })

   if(responseData.message ==='You have successfully joined the paid challenge!')
   {
    setTimeout(() => { 
      this.props.GetOPenChallenge()
    }, 100);
    this.props.UserData();
    this.props.GetMychallnges();
    if(Platform.OS ==='android'){
      ToastAndroid.showWithGravityAndOffset(
        'You have joined the challenge successfully',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    }else{
      Alert.alert(
        'Success Alert',
        'You have joined the challenge successfully',
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
     this.setState({
       isVisible:false
     })
   }else if(responseData.message ==='You do not have sufficient balance in your wallet')
   {
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
  
    this.setState({
      isVisible:false
    })
   }
 
   }).catch((err) =>{
    this.setState({
      isLoading:false
    })
    setTimeout(() => { 
      this.props.GetOPenChallenge()
    }, 100);
    this.props.GetMychallnges();
   })
   .done(); 
}
componentDidMount(){
  // this.props.SaveComponentId(this.props.componentId);
}

flipChargeWand = (type, text) => {

  this.props.Charge(type, text);
  this.props.UserData();


}




    getDtata = () =>{
      fetch('https://urpixpays.com/stagging_urpixpays/challenges/open/222')
      .then((response)=>response.json())
      .then((responseData)=>{
        console.log(responseData.challenge);
      })
    }

    requestData = () =>
    {
      fetch('https://urpixpays.com/stagging_urpixpays/user/challenges/join')
    }

    drawerContent = () => {
      return (
            <TouchableWithoutFeedback onPress={this.toggleOpen} style={[styles.animatedBox]}>
            <SideDrawer  OpenSideDrawer={this.toggleOpen}  goto={(s)=>this.gotoScreen(s)}  />
        </TouchableWithoutFeedback>
          
      );
    };
    toggleOpen = () => {
      this.setState({ open: !this.state.open });
    };
    
    onContentSizeChange = (contentWidth, contentHeight) =>{
      this.setState({ textHeight: contentHeight });
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

  placeDeletedHandler = (id) => {
    this.setState(prevState => {
      return {
        searched: this.props.openChallenge.filter(openChallenge => {
          return openChallenge.id === id;
        }),
        isVisible: true
      };
    });
    // console.log(id);
  };

  render ()
  {

    // console.log(this.props.pro_data)

    const scrollEnabled = this.state.screenHeight > height;
    let loader = (
      <React.Fragment>

      </React.Fragment>
    );
      if(this.state.isLoading || this.props.isLoading){
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
            <TouchableOpacity onPress={() => this.flipChargeWand(2, 1)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    1
                        </Text>
                </View>
                <View>
                  <Text style={styles.chargePaymentValueRight}>
                    Charge
                        </Text>
                </View>
              </View>
              <View>
                <Text style={styles.chargePrice}>
                  $ 0.9
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
            {/* Second View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(2, 5)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    5
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
                  $ 1.95
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
            {/* Third View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(2, 10)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    10
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
                  $ 3.50
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
            {/* Fourth View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(2, 25)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    25
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
                  $ 7.5
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
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
                onPress={() => this.flipChargeWand(1, 1)}
                style={styles.chargePayment}>
                <View style={styles.chargePaymentValue}>
                  <View>
                    <Text style={styles.chargePaymentValueLeft}>
                      1
                        </Text>
                  </View>
                  <View>
                    <Text style={styles.chargePaymentValueRight}>
                      Flip
                        </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.chargePrice}>
                    $ 0.39
                    </Text>
                </View>
                <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
              </TouchableOpacity>
            </View>
            {/* Second View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(1, 5)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    5
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
                  $ 1.75
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
            {/* Third View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(1, 10)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    10
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
                  $ 3.20
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
            {/* Fourth View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(1, 25)}
  
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    25
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
                  $ 7.25
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
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
              <TouchableOpacity onPress={() => this.flipChargeWand(3, 1)}
                style={styles.chargePayment}>
                <View style={styles.chargePaymentValue}>
                  <View>
                    <Text style={styles.chargePaymentValueLeft}>
                      1
                        </Text>
                  </View>
                  <View>
                    <Text style={styles.chargePaymentValueRight}>
                      Wand
                        </Text>
                  </View>
                </View>
                <View>
                  <Text style={styles.chargePrice}>
                    $ 0.59
                    </Text>
                </View>
                <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
              </TouchableOpacity>
            </View>
            {/* Second View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(3, 5)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    5
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
                  $ 2.75
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
            {/* Third View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(3, 10)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    10
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
                  $ 5
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
            {/* Fourth View */}
            <TouchableOpacity onPress={() => this.flipChargeWand(3, 25)}
              style={styles.chargePayment}>
              <View style={styles.chargePaymentValue}>
                <View>
                  <Text style={styles.chargePaymentValueLeft}>
                    25
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
                  $ 11.25
                    </Text>
              </View>
              <View>
                <Text style={styles.chargePaymentValueRight}>
                    Buy
                    </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>)
      }
    return (
      <View style={{flex:1,zIndex:0}}>
      <ScrollView
      //  scrollEnabled={scrollEnabled}
      //  onContentSizeChange={this.onContentSizeChange}
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
                  
                  <TouchableOpacity style={styles.challengeBarFirstComponentOuter}>
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
                  <TouchableOpacity style={styles.challengeBarFirstComponentOuter}>
              <View style={styles.challengeBarFirstComponent1}>
                <Text style={[styles.challengeBarFirstComponentText,{fontSize:wp('3%')}]}>
                PIX ID: {this.props.user.no}
                </Text>
              </View>
              {/* <View style={styles.challengeBarFirstComponent2}>

              </View> */}
            </TouchableOpacity>
                    </View>
                </View>
              </View>
        

      <View style={styles.mainView}>
      {loader}
      {this.props.openChallenge.length > 0 ?<FlatList 
      data={this.props.openChallenge}
      renderItem={(item)=> {
        // console.log(item.item)
        // var today = new Date();
        // var Christmas = new Date(item.item.start_time.replace(/-/g, "/"));
        // let checkDate = (Date.now() - new Date(Christmas)) / 1000.0;
        // var diffMs = (Christmas - today); 
        // console.log(Christmas);
        var diffMs = item.item.start_time?moment(item.item.start_time).diff(moment().format(), 'seconds'):0;

        let millisends = item.item.timeline*60*60-diffMs;
        // console.log(diffMs);
        // var Christmas = new Date(this.props.CurrentChallenge[0].start_time.replace(/-/g, "/"));
        // let checkDate = (Date.now() - new Date(Christmas)) / 1000.0;
        // var diffMs = (Christmas - today);

        return (
          <View style={styles.challengeOuterView}>
      <FastImage
      style={{width:wp('100%'),height:wp('56%'),resizeMode:'contain'}}
        source={{
          uri:item.item.image_url,
            priority: FastImage.priority.high,
        }}
        // resizeMode={FastImage.resizeMode.contain}
    >
      <View style={styles.imageOverlay}>
                  {item.item.type =='paid'?<View style={styles.imageUpperViewLeft}>
                    <View>
                      <Text style={styles.imageUpperViewLeftText1}>
                       {item.item.paid} Fee
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
              <TouchableOpacity onPress={()=> {
                this.placeDeletedHandler(item.item.id)
               
              }} 
              style={styles.ImageInnerLowerView}>
                <LinearGradient start={{ x: 0, y: 0 }}
                  end={{ x: 1.2, y: 0 }} colors={[ '#bbd9f1','#138ece','#0067a9']} style={styles.buttonView}>
                  <Text style={styles.ImageLowerButton}>
                    JOIN
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
    </FastImage>
          <View style={styles.infoView}>
              <View style={styles.InfoLeftView}>
                <View style={styles.textView}>
                  <Text style={styles.leftTExt}>
                    {item.item.votes}
                  </Text>
                </View>
                <View>
                <Text style={styles.leftTextBottom}>
                Votes
                </Text>
                </View>
              </View>
              <View style={styles.infoMiddleView}>
              <CountDown
                  size={wp('3.5%')}
                  until={millisends}
                  // onFinish={() => alert('Finished')}
                  digitStyle={{backgroundColor: '#333333', borderWidth: 0, borderColor: '#1CC625',borderRadius:0}}
                  digitTxtStyle={{color: 'white',padding:0}}
                  timeLabelStyle={{color: '#FFF', fontWeight: '500',fontSize:wp('3%')}}
                  separatorStyle={{color: '#FFF',fontSize:wp('5%'),marginBottom:wp('5%')}}
                  timeToShow={['D', 'H', 'M', 'S']}
                  timeLabels={{d:'Days',m: 'Minutes', s: 'Seconds',h:'Hours'}}
                  showSeparator
                />
              </View>
              <View style={styles.infoRightView}>
              <View>
                  <Text style={styles.rightText}>
                    {item.item.price}
                  </Text>
                </View>
                <View>
                <Text style={styles.rightTextBottom}>
                Prize
                </Text>
                </View>
              </View>
          </View>
          <View style={styles.ImageOuline}>
  
          </View>
          </View>
        )
      }}
      keyExtractor={item => item.index}
      ListFooterComponent={this.renderFotter}
      keyExtractor = { (item, index) => index.toString() }

      />:<View style={styles.sec_close}>
      <View  style={styles.sec_close_img}>
          <Image style={styles.sec_img} source={closed_Img} />
      </View>
</View>}
      </View>
    
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
               console.log(content);
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
                    if(content.type ==='paid')
                    {
                      this.setState({
                        isVisible:false
                      })
                      this.PaidJoin(content.id);
                    }else{
                      this.setState({
                        isVisible:false
                      })
                      this.join(content.id)
                    }
                  
                    }} style={styles.ImageInnerLowerView}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }} 
                  colors={[ '#bbd9f1','#138ece','#0067a9']} style={styles.buttonView}>
                    <Text style={[styles.ImageLowerButton,{fontSize:wp('5%')}]}>
                      Join
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
      </ScrollView>
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
    height:wp('1.8%'),
    backgroundColor:'#29ABE2'
  },
  infoView:{
    backgroundColor:'#333333',
    width:'100%',
    flexDirection:'row',
    height:wp('14%'),
    alignItems:'center',
    alignContent:'center',
    alignSelf:'auto'
  },
  leftTExt:{
    color:'white',
    fontSize:wp('4.5%'),
  },
  leftTextBottom:{
    color:'white',
    fontSize:wp('4.7%'),
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
    alignContent:'center',
    alignItems:'center',
    paddingLeft:wp('5%'),
    paddingRight:wp('5%'),
  
  },
  infomiddleText:{
    fontSize:wp('6%'),
    color:"white",
    fontWeight:'600',
    fontFamily:'Roboto-Medium',
   

  },
  rightText:{
      fontSize:wp('4.3%'),
      color:"white"
  },
  rightTextBottom:{
    fontSize:wp('4.5%'),
    color:'white'
  },
  infoRightView:{
    justifyContent:"center",
    flex:0.5,
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center'
  },
  infoMiddleView:{
    // paddingLeft:wp('7%'),
    // paddingRight:wp('7%'),
    borderRightWidth:wp('.2'),
    flex:1,
    borderRightColor:'white',
    borderLeftWidth:wp('.2'),
    borderLeftColor:'white'
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
 position:'absolute',
  top:hp('10%'),
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
     paddingRight:wp('6%')
   },
   description:{
     fontSize:wp('3.8%'),
    lineHeight:wp('5.3%'),
    fontWeight:'400',
    fontFamily:'Raleway',
     letterSpacing:1,
     textTransform:'capitalize',

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
   croxx:
   {
     flexDirection:'row',
     justifyContent:'flex-end',
     alignItems:'flex-end',
     width:'100%',
   },
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
    fontSize: wp('5%'),
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
  },firstBox: {
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
    height: wp('55%'),
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
    top: hp('65%'),
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
  sec_close:
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
    openChallenge:state.BestImages.openChallenge,
    pro_data: state.BestImages.SaveuserProfiledata,
    logindata:state.user.user,
    isLoading:state.isLoading.isLoading,
    user:state.user.user
  }
}

const mapsDispatchToProps = dispatch =>{
  return{
    Charge: (type, text) => dispatch(SaveUserInfoWallet(type, text)),
    GetOPenChallenge : () => dispatch(OpenChallenges()),
    SaveComponentId:(id)=>dispatch(SaveComponentId(id)),
    GetAllImages: () => (dispatch(GetVoteImages())),
    UserData: () => dispatch(UserProfileData()),
    GetMychallnges : () => dispatch(MyChallenges()),

  }
}

export default connect(mapStatesToProps,mapsDispatchToProps) (OpenChallenge);
