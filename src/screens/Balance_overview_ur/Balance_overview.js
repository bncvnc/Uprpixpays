
import Icon from 'react-native-vector-icons/FontAwesome';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import img1 from '../../images/dollor.jpeg';
import u_image from '../../images/u_img.jpg';
import RNPickerSelect from 'react-native-picker-select';
import React, {Fragment} from 'react';
import WithDraw from '../tables/withdraw';
import FlipView from '../tables/flips';
import Wand from '../tables/wands';
import {BalanceOverview} from '../../store/actions/index';
import {connect} from 'react-redux';
import cards from '../../images/cards.png';
import Modal, { ModalContent,SlideAnimation} from 'react-native-modals';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
  findNodeHandle,
  Modal as NewModal,
  Button
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Navigation } from "react-native-navigation";
import ChargeView from '../tables/charge';
import Buys from '../tables/buy_sell';
import Joins from'../tables/my_joins';
import Topbar from '../../components/topbar/topbar';
import SideDrawer from '../sidedrawer/sidedrawer';
import MenuDrawer from 'react-native-side-drawer';
import DatePicker from 'react-native-datepicker';
import Icons from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
const axios = require('axios');

class BalanceOverView extends React.Component {

 
  constructor(props) {
    super(props);
    this.props.Balance();

    this.state = {
      payableamount:0,
      PayVivaPaypall:false,
      Methode:'',
      pickerSelection: ' Select A Category',
      pickerDisplayed: false,
      amount:0,
      accountInfo:'',
      Description:'',
      pickerSelection1: 'Deposite',
      pickerDisplayed1: false,

      pickerSelection2: 'Withdraw',
      pickerDisplayed2: false,

      diposit:true,
      open:false,
      wand:false,
      joins:false,
      flips:false,
      buySell:false,
      withdraw:false,
      charge:false
    };
  }

  // drawerContent = () => {
  //   return (
  //         <TouchableWithoutFeedback onPress={this.toggleOpen} style={[styles.animatedBox]}>
  //         <SideDrawer  goto={(s)=>this.gotoScreen(s)}  />
  //     </TouchableWithoutFeedback>
        
  //   );
  // };
  handleResponse = data =>{
    if(data.title === 'Success'){
      this.setState({
        PayVivaPaypall:false
      })
      // this.PaymentSuccesfull();
      // this.PayWithPaypall(this.totalAmountPayable,this.CartData)
    }else if(data.title ==='Cancel')
    {
      this.setState({
        PayVivaPaypall:false 
      })
    }
    else{
      return;
    }
  }
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };
  renderFotter =() => {
    return(
      <View style={{paddingVertical:20}}>
          <ActivityIndicator animating size="large" />
      </View>
    )
  }

  gotoScreen = (screen) =>{
    
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

  setPickerValue(newValue, selection) {
    let c = selection;
    console.log(c);
    this.setState({
      [c]: newValue,
    });
    // this.togglePicker();
  }

  togglePicker(d) {
    this.setState({
      pickerDisplayed: !this.state.pickerDisplayed,
    });
  }
  togglePicker1(d) {
    this.setState({
      pickerDisplayed1: !this.state.pickerDisplayed1,
    });
  }
  togglePicker2(d) {
    this.setState({
      pickerDisplayed2: !this.state.pickerDisplayed2,
    });
  }
  ChangeDiposit = () => {
      this.setState({
        diposit:true,
        wand:false,
        joins:false,
        flips:false,
        buySell:false,
        withdraw:false,
        charge:false
      })
  }

  ChangeWand = () => {
    this.setState({
      diposit:false,
      wand:true,
      joins:false,
      flips:false,
      buySell:false,
      withdraw:false,
      charge:false
    })
}
ChangeJoin = () => {
  this.setState({
    diposit:false,
    wand:false,
    joins:true,
    flips:false,
    buySell:false,
    withdraw:false,
    charge:false
  })
}

ChangeFlip = () => {
  this.setState({
    diposit:false,
    wand:false,
    joins:false,
    flips:true,
    buySell:false,
    withdraw:false,
    charge:false
  })
}
ChangeBuySell = () => {
  this.setState({
    diposit:false,
    wand:false,
    joins:false,
    flips:false,
    buySell:true,
    withdraw:false,
    charge:false
  })
}
ChangeWithDraw = () => {
  this.setState({
    diposit:false,
    wand:false,
    joins:false,
    flips:false,
    buySell:false,
    withdraw:true,
    charge:false
  })
}
ChangeCharge = () => {
  this.setState({
    diposit:false,
    wand:false,
    joins:false,
    flips:false,
    buySell:false,
    withdraw:false,
    charge:true
  })
}
changeScreen = (screen,title,extraData) => {
  // AsyncStorage.setItem("screen", JSON.stringify(screen));
  Navigation.push(this.props.componentId, {
    component: {
      name: screen,
      passProps: {
        ...extraData
      },
      options: {
        topBar: {

          visible: true,
          title: {
            text: title,
            color: '#000000',
            alignment: 'center'
          },
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

RequestWIthDraw = () =>{
  console.log(';asdasdasd');
  axios.post('https://urpixpays.com/stagging_urpixpays/withdraw_request', {
    "uid": this.props.user.no,
    "amount":this.state.amount,
    "account_info":this.state.accountInfo,
    "description":this.state.Description,
    "type_name":this.state.Methode
})
  .then((response) => {
    console.log(response.data.success);
    this.setState({
      paypal:false
    })
    if(response.data.message) {
      alert(response.data.message)
      this.setState({
        visible:false
      })
      // this.props.cart();
    }else{
      alert('Your withdrawal request was successful.')
      alert(response.data.message)
    }
  })
  .catch(function (error) {
    console.log(error);
    alert(error)
    this.setState({
      visible:false
    })
  });

}
_scrollToInput (reactNode: any) {
  // Add a 'scroll' ref to your ScrollView
  this.scroll.props.scrollToFocusedInput(reactNode)
}

  render() {
    // console.log(this.PickDate);
    let enable = this.state.screenHeight + 100 > hp('100%');
    const pickerValues = [
      {
        title: 'Category 1',
        value: 'Category 1',
      },
      {
        title: 'Category 2',
        value: 'Category 2',
      },

      {
        title: 'Category 3',
        value: 'Category 3',
      },
      {
        title: 'Category 4',
        value: 'Category 4',
      },
      {
        title: 'Category 5',
        value: 'Category 5',
      },
      {
        title: 'Category 6',
        value: 'Category 6',
      },
    ];
    let Desposit = (<View style={styles.view_tabel}>

      <View style={styles.view_tabel_inner}>
      <View style={styles.view_sr_no}>
        <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>S.No</Text>
      </View>
    
    
      <View style={styles.view_date_view}>
        <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>Account</Text>
      </View>
    
      <View style={styles.view_no_of_charges}>
        <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
          GateWay
        </Text>
      </View>
    
      <View style={styles.view_sr_Price}>
        <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>Date</Text>
      </View>
    
      <View style={styles.view_total_amount}>
        <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
          Balance
        </Text>
      </View>
      <View style={styles.view_total_amount}>
        <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
          Remarks
        </Text>
      </View>
      </View>
      <View style={styles.view_long_line}></View>
    
    
      {/* <View style={styles.view_tabel_inner2}>
      <View style={styles.view_sr_no_data}>
        <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>{</Text>
      </View>
    
    
      <View style={styles.view_date_view_data}>
        <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>02-03-2019</Text>
      </View>
    
      <View style={styles.view_no_of_charges_data}>
        <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
          500.00
        </Text>
      </View>
    
      <View style={styles.view_sr_Price_data}>
        <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1000.00</Text>
      </View>
    
      <View style={styles.view_total_amount_data}>
        <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
          10,000.00
        </Text>
      </View>
    
      <View style={styles.view_total_amount_data}>
        <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
          Successful
        </Text>
      </View>
      </View> */}
      <View style={styles.view_long_line}></View>
    </View> );

    let withdraw =(
        <WithDraw/>
    );
    let Flips = (
      <FlipView/>
    );
    let Charge = (
      <ChargeView/>
    ); 
    let WandView = (
      <Wand />
    )
    let Buy = (
      <Buys />
    );
    let join = (
      <Joins />
    )

    return (
      <View style={styles.conatainer}>


        <View style={styles.view_photo_parent}>
          <View style={styles.view_photo}>
            <ImageBackground style={styles.view_img_bg} source={u_image}>
              <View style={styles.view_overlay}>
                <View style={styles.view_text_top}>
                  <View style={styles.view_flex_1}>
                    <Text style={styles.text_view_top}>Your Balance</Text>
                  </View>
                  <View style={styles.view_flex_2}>
                    <Text style={styles.text_view_top}>{this.props.balance.Balance}</Text>
                  </View>
                </View>

                <View style={styles.view_line}></View>

                <View>
                  <Text
                    style={{
                      fontSize: wp('3.5%'),
                      fontWeight: '400',
                      color: '#ffffff',
                      paddingTop: wp('1.5%'),
                      paddingBottom: wp('1.5%'),
                      paddingLeft: wp('2%'),
                      paddingRight: wp('2%'),
                    }}>
                    View Your Account Details here. You can deposit to or
                    withdraw from your accuont.
                  </Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        <View style={{flexDirection:'column', paddingHorizontal:15,}}>
        <Text style={{alignContent:'flex-start',justifyContent:'flex-start',color:'#29abe2',fontWeight:'bold'}}>Deposit</Text>
        <View style={styles.view_drop}>
            
            <RNPickerSelect style={{}}
                    color="#8cc63f"
                    placeholder={{
                      label: 'Select Payment Methode',
                      value: '',
                      fontSize:wp('3%'),
                      color: '#29ABE2',
                    }}
                    onValueChange={(value)=>{
                      //  if(value == 'Paypal'){
                      //   this.PickDate.togglePicker();
                      //   this.setState({
                      //     PayVivaPaypall:true
                      //   })
                      // }
                      this.setState({
                        depositThrough:value
                      })
                    }}
                    Icon={() => {
                      return ( <View style={{justifyContent:'center',alignItems:'center',marginTop:Platform.OS ==='android'?wp('2.5%'):0}}>
                        <Arrow name="keyboard-arrow-down" size={wp('7%')} color="#999999" /></View>
                        );
                    }}
                      items={[
                        { label: 'Paypal', value: 'Paypal',color:'#000',},
                        { label: 'Stripe', value: 'Stripe',color:'#000', },
                        { label: '2CheckOut', value: '2CheckOut' ,color:'#000'},
                      ]
                      
                  }
                
                    />

            </View>
            {this.state.depositThrough =='Paypal'?<View style={{
        //  marginLeft:wp('4%'),
        //  marginRight:wp('4%'),
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        borderColor:'black',
        borderWidth:2,
       }}>
       <TextInput 
        placeholder={'Enter Amount'}
        placeholderTextColor={'black'}
        value={this.state.payableamount}
       onChangeText={(text) =>{
        let number = text.replace(/[^0-9]/g, '');
        this.setState({
          payableamount:number
        })
       }}
        style={{
          paddingLeft:wp('4%'),
          width:'100%', 
          height:wp('8%'),
          fontSize:wp('3%')
        
        }}
        />
       </View>:<React.Fragment></React.Fragment>}
            <TouchableOpacity 
            onPress={() =>{
              if(this.state.depositThrough =='Stripe'){
                this.changeScreen('UrPicsPay.AddSubscriptionScreen','Stripe Payment')
              }
              if(this.state.depositThrough =='Paypal'){
                let extraData= {
                  payableamount:this.state.payableamount
                }
                this.changeScreen('UrPicsPay.depositThroughToPaypall','Paypal',extraData)
              
              }
            }}
            disabled={this.state.depositThrough == 'Paypal'?this.state.payableamount > 0?false:true:this.state.depositThrough?false:true } 
            style={{
              backgroundColor: this.state.depositThrough == 'Paypal'?this.state.payableamount > 0?'rgba(41, 171, 226, .8)':'gray':this.state.depositThrough?'rgba(41, 171, 226, .8)':'gray',
              padding:wp('2%'),
              justifyContent:'center',
              alignContent:'center',
              alignItems:'center',
              marginTop:wp('2%')
              }}>
              <Text style={{color:'white',fontSize:wp('3.4%'),fontWeight:'bold'}}>
                Deposit Through {this.state.depositThrough}
              </Text>
            </TouchableOpacity>
        </View>        
        <View style={{flexDirection:'column', padding:15,}}>
        <Text style={{alignContent:'flex-start',justifyContent:'flex-start',color:'#29abe2',fontWeight:'bold'}}>Withdraw</Text>
        <View style={styles.view_drop}>
            
            <RNPickerSelect style={{}}
                  ref={ref=>(this.PickDate = ref)}
                    color="#8cc63f"
                    onValueChange={(value)=>{
                     
                      this.setState({
                        paypal:true,
                        Methode:value
                      });
                    }}
                    Icon={() => {
                      return ( <View style={{justifyContent:'center',alignItems:'center',marginTop:Platform.OS ==='android'?wp('2.5%'):0}}>
                        <Arrow name="keyboard-arrow-down" size={wp('7%')} color="#999999" /></View>
                        );
                    }}
                      items={[
                        { label: 'Paypal', value: 'paypal',color:'#29abe2',},
                        { label: 'Stripe', value: 'stripe',color:'#000', },
                        { label: 'Payoneer', value: 'payoneer' ,color:'#000'},
                        { label: 'Google Pay', value: 'googlepay' ,color:'#000'},
                        { label: '2CheckOut', value: '2CheckOut' ,color:'#000'},
                      ]
                      
                  }
                
                    />

            </View>
        </View>         
        <View style={styles.view_nav_bar}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.view_nav_bar_inner}>
              <TouchableOpacity onPress={()=>this.ChangeDiposit()} style={[styles.item_view,{backgroundColor:this.state.diposit?'#8cc63f':'#B5B5B5'}]}>
                <Text style={styles.text_view}>Deposit</Text>
              </TouchableOpacity>
              <View style={styles.view_line1}></View>
              <TouchableOpacity onPress={()=>this.ChangeWithDraw()} style={[styles.item_view,{backgroundColor:this.state.withdraw?'#8cc63f':'#B5B5B5'}]}>
                <Text style={styles.text_view}>Withdrawl</Text>
              </TouchableOpacity>

            </View>
            
          </ScrollView>
        </View>

        {this.state.joins?join:<View></View>}
         {this.state.diposit?Desposit:<View></View>}
         {this.state.withdraw?withdraw:<View></View>}
         {this.state.charge?Charge:<View></View>}
         {this.state.wand?WandView:<View></View>}
         {this.state.flips?Flips:<View></View>}
         {this.state.buySell?Buy:<View></View>}
         {/* </MenuDrawer> */}

        <View style={styles.constainer}>
          <Modal
              visible={this.state.visible}
              transparent={true}
              style={{backgroundColor:'transparent'}}
              onTouchOutside={() => {
              this.setState({ visible: false });
              }}
              modalAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })} >
              <ModalContent style={styles.sec}>
              <ScrollView showsVerticalScrollIndicator={false}>
                      <View style={{width:wp('95%'),alignContent:'flex-start',alignItems:'flex-start'}}>
                      <View style={{alignContent:'flex-start'}}>
                          <Text style={styles.view_txtt}>Request Withdrawal</Text>
                      </View>
                      <View style={{width:wp('100%'),height:wp('0.2%'),backgroundColor:'#000',marginTop:wp('5%'),}} />
                          <View style={styles.section}>
                              <View style={{alignContent:'flex-start'}}>
                                  <Text style={styles.view_txt}>From urpixpays.com</Text>
                              </View>
                              <View style={{flexDirection:'column'}}>   
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}>Name of Card:</Text>
                                  </View>
                                  <View style={styles.section_bodyq}>
                                      <TextInput style={styles.txt_view11}    />
                                  </View>
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}>Email:</Text>
                                  </View>
                                  <View style={styles.section_bodyq}>
                                      <TextInput style={styles.txt_view11} />
                                  </View>
                              
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}>Amount:</Text>
                                  </View>
                                  <View style={styles.section_bodyq}>
                                      <TextInput style={styles.txt_view11}    />
                                  </View>
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}>Credit Card No:</Text>
                                  </View>
                                  <View style={styles.section_bodyq}>
                                      <TextInput style={styles.txt_view11} />
                                  </View>
                              
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}>Expiration Date:</Text>
                                  </View>
                                  <View style={styles.section_body_view}>
                                      <View style={styles.section_f}>
                                          <DatePicker
                                              style={{width: 200}}
                                              date={this.state.date}
                                              mode="date"
                                              placeholder="select date"
                                              format="YYYY-MM-DD"
                                              minDate="1980-01-01"
                                              maxDate="2050-01-01"
                                              confirmBtnText="Confirm"
                                              cancelBtnText="Cancel"
                                              customStyles={{
                                              dateIcon: {
                                                  position: 'absolute',
                                                  left: 0,
                                                  top: 4,
                                                  marginLeft: 0
                                              },
                                              dateInput: {
                                                  marginLeft: 36
                                              }
                                              // ... You can check the source to find the other keys.
                                              }}
                                              onDateChange={(date) => {this.setState({date: date})}}
                                          />
                                      </View>
                                  </View>
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}>CVV No.</Text>
                                  </View>
                                  <View style={styles.section_body_view}>
                                      <View style={styles.section_cvv}>
                                            <TextInput style={styles.txt_view11} />
                                      </View>
                                      <View style={styles.section_card}>
                                          <Image style={styles.img_view}  source={cards} />
                                      </View>
                                  </View>
                                
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}></Text>
                                  </View>
                                  <TouchableOpacity onPress={() =>{
                                    this.RequestWIthDraw()
                                  }} style={styles.section_bodyqq}>
                                      <View style={styles.Sec_txt_view}>
                                          <Text style={styles.txt_vieww}>Confirm</Text>
                                      </View>
                                  </TouchableOpacity>
                                  <TouchableOpacity style={styles.section_cancel}  onPress={() => {
                                    this.setState({
                                      visible:false
                                    })
                                  }}>
                                      <View style={styles.Sec_txt_view}>
                                          <Text style={styles.txt_vieww}>Cancel</Text>
                                      </View>
                                  </TouchableOpacity>
                              </View>    
                          </View>
                      </View>    
                  </ScrollView>
              </ModalContent>
          </Modal>
        </View>

        <View style={styles.constainer}>
          <Modal
              visible={this.state.paypal}
              transparent={true}
              style={{backgroundColor:'transparent'}}
              onTouchOutside={() => {
              this.setState({ paypal: false });
              }}
              modalAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })}
          >
              <ModalContent style={styles.sec}>
              <KeyboardAwareScrollView   innerRef={ref => {
    this.scroll = ref
  }}>
                <ScrollView>
                  <View>
                  <View style={{alignContent:'flex-start',alignItems:'center'}}>
                      <Text style={styles.view_txtt}>Request Withdrawal</Text>
                  </View>
                  <View style={{width:wp('85%'),height:wp('0.2%'),backgroundColor:'#000',marginTop:wp('5%'),}} />
                      <View style={styles.section}>
                          <View style={{alignContent:'flex-start'}}>
                              <Text style={styles.view_txt}>From urpixpays.com</Text>
                          </View>
                      <View style={{flexDirection:'column'}}>
                              <View style={styles.Sec_txt_view}>
                                  <Text style={styles.txt_view}>Your Balance</Text>
                              </View>
                              <View style={{flexDirection:'row',}}>
                                  <View style={styles.section_body1}>
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_view}>$</Text>
                                  </View>
                                  </View>
                                  <View style={styles.section_body}>
                                      <View style={styles.Sec_txt_view}>
                                          <Text style={styles.txt_view}>{this.props.pro_data.wallet.toFixed(2)}</Text>
                                      </View>
                                  </View>
                              </View>
                              <View style={styles.Sec_txt_view}>
                                  <Text style={styles.txt_view}>Amount</Text>
                              </View>
                              <View style={{flexDirection:'row',}}>
                                  <View style={styles.section_body1}>
                                      <View style={styles.Sec_txt_view}>
                                          <Text style={styles.txt_view}>$</Text>
                                      </View>
                                  </View>
                                  <View style={styles.section_bodyy}>
                                      <TextInput 
                                      //  onFocus={(event: Event) => {
                                      //   // `bind` the function if you're using ES6 classes
                                      //   this._scrollToInput(findNodeHandle(event.target))
                                      // }}
                                      style={styles.txt_view1} 
                                      placeholder="90000"
                                      value={this.state.amount}
                                      onChangeText={(text) =>{
                                          let number = text.replace(/[^0-9]/g, '');   
                                          if(this.props.pro_data.wallet > number ){
                                            this.setState({
                                              amount:number
                                            })     
                                          }
                                                                         
                                      }}
                                        />
                                  </View>
                                  <View style={styles.section_body11}>
                                      <View style={styles.Sec_txt_view}>
                                          <Text style={styles.txt_view}>.00</Text>
                                      </View>
                                  </View>
                              </View>
                              <View style={styles.Sec_txt_view}>
                                  <Text style={styles.txt_view}>Account Info</Text>
                              </View>
                              <View style={styles.section_bodyq}>
                                  <TextInput 
                                  //  onFocus={(event: Event) => {
                                  //   // `bind` the function if you're using ES6 classes
                                  //   this._scrollToInput(findNodeHandle(event.target))
                                  // }}
                                  style={styles.txt_view11} 
                                  placeholder="Account Infomation"
                                  value={this.state.accountInfo}
                                  onChangeText={(text)=>{
                                    this.setState({
                                      accountInfo:text
                                    })
                                  }}
                                  />
                              </View>
                              <View style={styles.Sec_txt_view}>
                                  <Text style={styles.txt_view}>Description</Text>
                              </View>
                              <View style={styles.section_bodyq}>
                                  <TextInput 
                                  //  onFocus={(event: Event) => {
                                  //   // `bind` the function if you're using ES6 classes
                                  //   this._scrollToInput(findNodeHandle(event.target))
                                  // }}
                                  style={styles.txt_view11} 
                                  value={this.state.Description}
                                  placeholder="Description"
                                  onChangeText={(text)=>{
                                    this.setState({
                                      Description:text
                                    })
                                  }}
                                  />
                              </View>
                              <View style={styles.Sec_txt_view}>
                                  <Text style={styles.txt_view}></Text>
                              </View>
                              <TouchableOpacity
                              onPress={() =>{
                                this.RequestWIthDraw()
                              }}
                              style={styles.section_bodyqq}>
                                  <View style={styles.Sec_txt_view}>
                                      <Text style={styles.txt_vieww}>Submit</Text>
                                  </View>
                              </TouchableOpacity>
                              
                              <TouchableOpacity style={styles.section_cancel}  onPress={() => {this.setState({ paypal: false });}}>
                                <View style={styles.Sec_txt_view}>
                                    <Text style={styles.txt_vieww}>Cancel</Text>
                                </View>
                              </TouchableOpacity>
                      </View>    
                          
                          

                      </View>

                  </View>
                  
                  </ScrollView>
                  </KeyboardAwareScrollView>
              </ModalContent>
          </Modal>
        </View>


                  <Modal
              visible={this.state.PayVivaPaypall}
              transparent={true}
              style={{backgroundColor:'transparent'}}
              onTouchOutside={() => {
              this.setState({ PayVivaPaypall: false });
              }}
              modalAnimation={new SlideAnimation({
                  slideFrom: 'bottom',
                })} >
              <ModalContent style={{width:wp('100%'),height:'100%'}} >
              <WebView
                    source={{uri:'https://urpixpays.com/stagging_urpixpays/paypal/10'}}
                    onNavigationStateChange={data=> this.handleResponse(data)}
                    // injectedJavaScript={'document.getElementById("price").value="'+AmountTotal+'";document.getElementById("taskId").value="'+this.props.taskId+'";document.getElementById("userId").value="'+this.props.user.id+'";'}
                    // onNavigationStateChange={data=> this.handleResponse(data)}
                      />
              </ModalContent>
          </Modal>
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
    paddingTop: wp('5.5%'),
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    paddingBottom: wp('2%'),
    height: wp('35%'),
    width: wp('96%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
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
    backgroundColor: 'rgba(41, 171, 226, .8)',
  },

  view_line: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: wp('0.1%'),
    width: '100%',
    backgroundColor: '#ffffff',
  },

  view_text_top: {
    flexDirection: 'row',
  },

  view_flex_1: {
    flex: 1,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('1.5%'),
    paddingRight: wp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view_flex_2: {
    flex: 1,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('1.5%'),
    paddingRight: wp('1.5%'),

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text_view_top: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  country_city: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text_country_city: {
    fontWeight: '500',
    paddingLeft: wp('2%'),
    color: '#ffffff',
    fontSize: wp('3%'),
  },
  ImageStyle: {
    padding: wp('2%'),
    margin: wp('2%'),
    height: wp('3%'),
    width: wp('3%'),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  category_text: {
    flex: 1,
    fontFamily: 'Raleway-Regular',
    color: '#ffffff',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    fontSize: wp('3%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  SectionStyle1: {
    marginTop: wp('3%'),
    marginLeft: wp('2%'),
    marginRight: wp('1%'),
    justifyContent: 'center',
    backgroundColor: '#01b1d7',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('30%'),
    height: wp('7%'),
  },

  SectionStyle2: {
    marginTop: wp('3%'),
    marginLeft: wp('1%'),
    marginRight: wp('2%'),
    backgroundColor: '#01b1d7',
    flexDirection: 'row',
    width: wp('30%'),
    height: wp('7%'),
  },
  view_flex_1_sec: {
    flex: 0.7,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view_flex_2_sec: {
    flex: 0.3,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingRight: wp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  communication1: {
    height: wp('10%'),
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#8cc63f',
    borderWidth: wp('0.2%'),
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  view_nav_bar: {
    marginTop: wp('5%'),
    // paddingLeft: wp('2%'),
    // paddingRight: wp('2%'),
    flexDirection: 'row',
    height: wp('9%'),
    width: wp('100%'),
    backgroundColor: '#F2F2F2',
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
    fontSize: wp('3.2%'),
    fontWeight: '500',
    color: '#ffffff',
  },
  item_view: {
    justifyContent: 'center',
    paddingLeft: wp('2.5%'),
    paddingRight: wp('2.5%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
  },
  
  view_line1: {
    height: '100%',
    flexDirection: 'column',
    // marginLeft: wp('1.5%'),
    // marginRight: wp('1.5%'),
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
    flex:1,
    width: wp('100%'),
    height: wp('70%'),
  },
  view_tabel_inner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width:'100%',
    height:wp('7%'),
  },
  view_tabel_inner2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width:'100%',
    height:wp('6%'),
  },
  view_sr_no: {
    width: wp('10%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view: {
    width: wp('21%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_no_of_charges: {
    width: wp('23%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_Price: {
    width: wp('18%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_total_amount: {
    width: wp('23%'),
    height:'100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_no_data: {
    width: wp('10%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    fontWeight:'200',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view_data: {
    width: wp('21%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_no_of_charges_data: {
    width: wp('23%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_Price_data: {
    width: wp('18%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_total_amount_data: {
    width: wp('23%'),
    height:'100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_long_line: {
    height: wp('0.2%'),
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  view_drop: {

    // flexDirection: 'row',
    width: '100%',
    marginTop: wp('2%'),
    borderColor: '#999999',
    borderWidth: wp('0.1%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp('1%'),
    height: wp('9%'),
    backgroundColor: '#ffffff',
    paddingLeft: 8
  },
  constainer:
    {
        
        backgroundColor:'transparent',
        marginTop:wp('50%'),
    },
    topbar_view: {
        flexDirection: 'row',
        height: hp('10%'),
        width: wp('100%'),
        backgroundColor:'#5ba505',
    },
    icons_view:{
        color:'#fff',
        fontSize:wp('7%'),
    },
    top_txt:{
        color:'#fff',
        fontFamily:'Roboto-Medium',
        fontSize:wp('6%')
    },
    top_txtt:{
        color:'#000',
        fontFamily:'Roboto',
        fontSize:wp('4.5%'),
        fontWeight:'700'
    },
    sec:
    {
      
        flexDirection:'column',
        width:wp('95%'),
        borderRadius:6,
        backgroundColor:'#fff', 
    },
    
    view_txtt:
    {
        fontFamily:'Roboto',
        fontSize:wp('5%'),
        fontWeight:'bold'
    },

    body_content11:
    {

        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',

    },
    section:
    {
        flexDirection:'column',
        width:wp('95%'),
        padding:5
    },
    view_txt:
    {
        fontFamily:'Roboto',
        fontSize:wp('4%'),
        fontWeight:'700'
    },
    Sec_txt_view:
    {
        alignContent:'flex-start',
        marginTop:wp('2%'),
        marginBottom:wp('2%')
       
    },
    Sec_txt_view1:
    {
        alignContent:'flex-start',
    },
    txt_view:
    {
        fontFamily:'Roboto',
        fontSize:wp('3.5%'),
        fontWeight:'500',
        
    },
    txt_view11:
    {
        width:wp('90%'),
        height:wp('10%'),
        fontFamily:'Roboto',
        fontSize:wp('3.5%'),
        fontWeight:'500',
        paddingLeft: 8
    },
    txt_vieww:
    {
        fontFamily:'Roboto',
        fontSize:wp('4%'),
        fontWeight:'bold',
        color:'#fff'
    },
    section_body:
    {
        flexDirection:'row',
        width:wp('72%'),
        height:wp('10%'),
        borderRadius:1.5,
        borderWidth:1,
        borderColor:'#b5b5b5',
        backgroundColor:'#e8e9ea',
        alignContent:'flex-end',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingRight:wp('2%')
    },
    section_body_view:
    {
        flexDirection:'row',
        alignContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
    },
    section_bodyq:
    {
        width:wp('84%'),
        height:wp('10%'),
        borderRadius:2,
        borderWidth:1,
        borderColor:'#b5b5b5',
        backgroundColor:'#fff',
        alignContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingRight:wp('2%')
    },
    section_f:
    {
        width:wp('90%'),
        height:wp('10%'),
        borderRadius:2,
        borderColor:'#b5b5b5',
        backgroundColor:'#fff',
        alignContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingRight:wp('2%')
    },
    section_cvv:
    {
        width:wp('41%'),
        height:wp('10%'),
        borderRadius:2,
        borderWidth:1,
        borderColor:'#b5b5b5',
        backgroundColor:'#fff',
        alignContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingRight:wp('2%'),
        marginRight:wp('2%')
    },
    section_card:
    {
        width:wp('41%'),
        height:wp('10%'),
        borderRadius:2,
        borderWidth:1,
        borderColor:'#b5b5b5',
        backgroundColor:'#fff',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        paddingRight:wp('2%')
    },
    img_view:
    {
        width:wp('38%'),
        height:wp('8%'),
        resizeMode:'contain'
    },
    section_s:
    {
        width:wp('45%'),
        height:wp('10%'),
        borderRadius:2,
        borderWidth:1,
        borderColor:'#b5b5b5',
        backgroundColor:'#fff',
        alignContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingRight:wp('2%')
    },
    section_bodyqq:
    {
        flexDirection:'row',
        width:wp('83%'),
        height:wp('10%'),
        backgroundColor:'#28a745',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
   
    },

    section_cancel : {
      flexDirection:'row',
        width:wp('83%'),
        height:wp('10%'),
        backgroundColor:'red',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop: 20
    },
    section_bodyqqq:
    {
        flexDirection:'row',
        width:wp('90%'),
        height:wp('10%'),
        backgroundColor:'#fff',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:wp('2%')
   
    },
    section_body1:
    {
      
        width:wp('12%'),
        height:wp('10%'),
        borderWidth:0.5,
        borderColor:'#b5b5b5',
        backgroundColor:'#e8e9ea',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    section_bodyy:
    {
        flexDirection:'row',
        width:wp('60%'),
        height:wp('10%'),
       
        borderWidth:1,
        borderColor:'#b5b5b5',
        backgroundColor:'#fff',
        alignContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start',
        paddingRight:wp('2%')
    },
    section_body11:
    {
        width:wp('12%'),
        height:wp('10%'),
        borderWidth:0.5,
        borderColor:'#b5b5b5',
        backgroundColor:'#e8e9ea',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center'
    },
    txt_view1:
    {
        width:wp('66%'),
        height:wp('10%'),
        fontFamily:'Roboto',
        fontSize:wp('3.5%'),
        fontWeight:'500',
        paddingLeft: 8
    },
});


const mapStateToProps = state => {
  return {
    balance: state.BestImages.Savebalance,
    pro_data: state.BestImages.SaveuserProfiledata,
    user:state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Balance: () => dispatch(BalanceOverview())
  }
}

export default connect(mapStateToProps,mapDispatchToProps) (BalanceOverView)