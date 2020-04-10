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
  TouchableOpacity,
  Modal,
  Alert,
  TouchableWithoutFeedback,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";
import bg from '../../images/bg-img.jpg';
import techni from '../../images/Tecnisan.jpg';
import Icons from 'react-native-vector-icons/Ionicons';
import MenuDrawer from 'react-native-side-drawer';
import Topbar from '../../components/topbar/topbar';
import {connect} from 'react-redux';
import SideDrawer from '../../screens/sidedrawer/sidedrawer';
import Lightbox from 'react-native-lightbox';
// import AsyncStorage from '@react-native-community/async-storage';
const { height } = Dimensions.get('window');
console.log(hp('100%'));
class BuyAndSell extends Component {

    constructor(props)
    {
      super(props);
      // this.props.buyselldetals();

      this.state = {
        price: 0,
        loading: false
      }
    }

    bid = async () => {
      this.setState({loading: true});
      // const value = await AsyncStorage.getItem('appState');
      // const data = JSON.parse(value);
      fetch('https://urpixpays.com/stagging_urpixpays/savebid', {
      method:'POST',
      headers: {
      Accept:'application/json',
      'Content-Type':'application/json',
      },
      body:JSON.stringify({
        "seller_id":this.props.buysell.seller_id,
        "img_id":this.props.buysell.img_id,
        "buyer_id":this.props.user.no,
        "bid_amount":this.state.price,
      }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({loading: false});
        if(responseData.state == 200) {
          // alert('Your Bid Has Been Submited');
          Alert.alert(
            'Bid Successful',
            'Your Bid Has Been Submited',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          setTimeout(() => { Navigation.pop(this.props.componentId) }, 500);
        }
      })
    }

    state = {
        // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
        screenHeight: 0,
        open: false,
        price: 0
      };
      onContentSizeChange = (contentWidth, contentHeight) => {
        // Save the content height in state
       let content = contentHeight + 150;
        this.setState({ screenHeight: content });
      };
      // drawerContent = () => {
      //   return (
      //     //     <View style={[styles.animatedBox]}>
      //     //     <SideDrawer  OpenSideDrawer={this.toggleOpen}  goto={(s)=>this.gotoScreen(s)}   />
      //     // </View>
            
      //   );
      // };
      toggleOpen = () => {
        this.setState({ open: !this.state.open });
      };
      
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
                    enabled: "true",
                    waitForRender:true,
                  }
                }
              }
            }
          });
          
    }
    onChanged(text){
      let checkZero = text.replace(/^0+(?=\d)/,'');
     let number = checkZero.replace(/[^0-9]/g, '');
     //console.log(number);
     let connectedValue = {};
       this.setState( prevState =>{
         return {
          price:number
         };
       });
       }
  render ()
  {
    console.log(this.props.user);
      // console.log(this.state.screenHeight)
    const scrollEnabled = this.state.screenHeight > height;
    let loader = (
      <React.Fragment>

      </React.Fragment>
    );
      if(this.state.loading){
        loader = (
         <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,height:this.state.screenHeight,width:wp('100%')}}>
            <ActivityIndicator size={'large'} color='#29ABE2'  />
         </View>
        )
      }
    return (
      <View style={{flex:1,zIndex:0}}>
          {/* <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={250}
          overlay={true}
          opacity={.9}
        >
        <View style={styles.topbarBox}>
        <Topbar OpenSideDrawer={this.toggleOpen} style={{zIndex:9999}} title={'Buy/Sell'}/>
      </View> */}
      {loader}
      <ScrollView
      scrollEnabled={scrollEnabled}
      onContentSizeChange={this.onContentSizeChange}
      >
      <View style={styles.mainView}>
          <View style={styles.buyandsellImage}>
          <Lightbox 
                    style={{justifyContent: "center"}}
                    springConfig={{ overshootClamping: true }}
                      renderContent={() => (
                        <Image 
                        source={{uri:this.props.buysell.img_url}} 
                        style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                        resizeMode={'contain'}
                        />
                      )}
                  >
                       <Image 
                        source={{uri:this.props.buysell.img_url}} 
                        style={styles.buyandsellImageInner} 
                        resizeMode={'contain'}
                        />

                    </Lightbox>
       
          </View>
          <View style={styles.ImageDescriptionOuterView}>
            <View style={{marginTop:wp('2%'),marginBottom:wp('1.5%')}}>
                <Text style={{fontSize:wp('5'),fontFamily:'Raleway',fontWeight:'700'}}>
                    Description:
                </Text>
            </View>
            <View style={styles.imagesInfoText}>
                <Text style={styles.InfoImageText}>Image Name:</Text>
                <Text style={styles.InfoImageTextRight}>{this.props.buysell.img_name}</Text>
            </View>
            <View style={styles.imagesInfoText}>
                <Text style={styles.InfoImageText}>
                    Minimum Price:
                </Text>
                <Text style={styles.InfoImageTextRight}>
                    $0.99
                </Text>
            </View>
            <View style={styles.imagesInfoText}>
                <Text style={styles.InfoImageText}>Seller Name:</Text>
                <Text style={styles.InfoImageTextRight}>
                    {this.props.buysell.u_name}
                </Text>
            </View>
            <View style={[styles.imagesInfoText,{marginBottom:wp('2%')}]}>
                <Text style={styles.InfoImageText}>Created At:</Text>
                <Text style={styles.InfoImageTextRight}>
                  {this.props.buysell.img_date}
                </Text>
            </View>
          </View>
          <View style={styles.priceShowOuterView}>
                <View style={styles.PriceShowInner}>
                   <View style={styles.PriceUpperText}>
                        <Text style={styles.UpperTextPrice}>
                        Minimum Bid
                        </Text>
                   </View>
                   <View style={styles.PriceLowerText}>
                        <Text style={styles.LowerTextPrice}>
                        ${this.props.buysell.min_bid}
                        </Text>
                   </View>
                </View>
                <View style={styles.PriceShowInner}>
                   <View style={styles.PriceUpperText}>
                        <Text style={styles.UpperTextPrice}>
                        Top Bid
                        </Text>
                   </View>
                   <View style={styles.PriceLowerText}>
                        <Text style={[styles.LowerTextPrice,{color:'red'}]}>
                        ${this.props.buysell.top_bid}
                        </Text>
                   </View>
                </View>
          </View>
          <View style={styles.bidVIew}>
              {/* First View of Bid View */}
            <View style={styles.upperBidView}>
                <View style={{borderBottomColor:'#29ABE2',borderBottomWidth:wp('.5%')}}>
                    <Text style={styles.upperBidCiewText}>
                        Bid Now!
                    </Text>
                </View>
            </View>
            {/* Second View OF Bid View */}
            <View style={styles.middleBidView}>
            <View style={styles.middleBidViewLeft}>
               <Icons name={'logo-usd'} size={wp('5%')} /> 
            </View>
            <View style={styles.middleBidViewRight}>
                <TextInput 
                placeholder='Enter Your Price'
                style={styles.textInputText}
                value={this.state.price}
                onChangeText={(e)=>{
                  this.onChanged(e);
                }}
                />
            </View>
            </View>
            {/* Third View Of Bid View */}
            <TouchableOpacity style={styles.bottomBidView} onPress={()=>this.bid()}>
                <Text style={styles.bidButtonText}>
                    Bid
                </Text>
            </TouchableOpacity> 
          </View>
          <View style={styles.aboutBidText}>
            <View style={{marginTop:wp('2%'),marginBottom:wp('1.5%')}}>
                <Text style={{fontSize:wp('5'),fontFamily:'Roboto-Bold',fontWeight:'700'}}>
                    How does It work?
                </Text>
            </View>
            <View style={styles.aboutText}>
                <Text style={styles.aboutTextT}>
                You can place a bid of any amount on the item of your choosing. For instance, if the item bidding price starts at $0.99, but it worth $15 to you, you may enter the amount as your bid. Seller has the option of accepting or rejecting your bid after it is placed. There will be an additional approval process by the urpixpays admin after seller’s approval.
                </Text>
            </View>
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
    width:wp('100%'),
    height:hp('10%'),
    borderBottomColor:'rgba(0,0,0,0.5)',
    borderBottomWidth:wp('.4%'),
  },
  buyandsellImage:{
      justifyContent:"center",
      alignSelf:'auto',
      alignItems:'center',
      alignContent:'center',
      paddingTop:wp('5%'),
  },
  buyandsellImageInner:{
      width:wp('70%'),
      height:wp('40%'),
      borderRadius:wp('2%')
    },
    ImageDescriptionOuterView:{
        flex:1,
        borderBottomWidth:1,
        borderBottomColor:'black'

    
    },
    imagesInfoText:{
        flexDirection:'row',
        paddingRight:wp('2%'),
        marginBottom:wp('1%')
    },
    mainView:{
        paddingLeft:wp('10%'),
        paddingRight:wp('10%')
    },
    InfoImageText:{
        fontSize:wp('3.5'),
        fontFamily:'Roboto-Light',
        fontWeight:'400'
    },
    InfoImageTextRight:{
        fontSize:wp('3.5'),
        fontFamily:'Roboto-Light',
        fontWeight:'400',
        paddingLeft:wp('.5'),
        marginRight:wp('2%'),
    },
    priceShowOuterView:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'auto'
    },
    PriceShowInner:{
        paddingTop:wp('2%'),
        paddingBottom:wp('2%'),
    },
    PriceUpperText:{
        paddingBottom:wp('1%'),
        borderBottomWidth:wp('.4'),
        borderBottomColor:'#29ABE2'
    },
    UpperTextPrice:{
        fontSize:wp('4.5%'),
        fontFamily:'Raleway-Bold'
    },
    PriceLowerText:{
        justifyContent:'center',
        alignSelf:'auto',
        alignItems:'center',
        alignContent:'center'
    },
    LowerTextPrice:{
        fontSize:wp('3.5%'),
        color:"#29ABE2",
        marginTop:wp('1%')
    },
    bidVIew:{
        backgroundColor:'#f2f2f2',
        paddingLeft:wp('6%'),
        paddingRight:wp('6%'),
        paddingTop:wp('2%'),
        paddingBottom:wp('2%')
    },
    upperBidView:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'auto',
        marginBottom:wp('3%'),
    },
    middleBidView:{
        flexDirection:"row",
        justifyContent:'center',
        alignSelf:'auto',
        alignItems:'center',
        alignContent:'center',
        marginBottom:wp('3%'),
    },
    middleBidViewLeft:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        alignSelf:'auto',
        width:'20%',
        height:wp('10%'),
        backgroundColor:'white',
        borderRightColor:'#29ABE2',
        borderRightWidth:wp('.5'),
    },
    middleBidViewRight:{
        width:'80%',
        height:wp('10%'),
        backgroundColor:"white",
        justifyContent:'center',
        // alignContent:'center',
        // alignItems:'center',
        // alignSelf:'auto',
    },
    textInputText:{
        fontSize:wp('4%'),
        paddingLeft:wp('2%')
    },
    upperBidCiewText:{
        fontSize:wp('4'),
        fontFamily:'Roboto-Bold'
    },
    bottomBidView:{
        backgroundColor:'#29ABE2',
        justifyContent:'center',
        alignSelf:'auto',
        alignContent:'center',
        alignItems:'center',
        paddingTop:wp('2%'),
        paddingBottom:wp('2%')
    },
    bidButtonText:{
        fontSize:wp('6%'),
        fontFamily:'Roboto-Bold',
        color:'white'
    },
    aboutText:{
        marginTop:wp('2%'),
        marginBottom:wp('3%')
    },
    aboutTextT:{
        fontSize:wp('3.5%'),
        fontFamily:'Roboto',
        fontWeight:'400',
        textAlign:'justify'

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
      
    }
  


});

const mapStateToProps = (state)=>
{
  return{
    buysell:state.BestImages.SaveBuysellDetails,
    user:state.user.user
  }
}
// const mapDispatchToProps = (dispatch) =>
// {
//   return{
//     buyselldetals:() => dispatch(BuySellDetails())
//   }
// }
export default connect(mapStateToProps,null) (BuyAndSell);
