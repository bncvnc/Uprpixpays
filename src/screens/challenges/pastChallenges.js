import React, {Component} from 'react';
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
  Platform,
  Modal,
  ActivityIndicator,
  Dimensions,
  TouchableWithoutFeedback
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import closed_Img from '../../images/No-Passt.png';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";

import LinearGradient from 'react-native-linear-gradient';

import Topbar from '../../components/topbar/topbar';

import MenuDrawer from 'react-native-side-drawer';
import BottomBar from '../../components/bottombar/bottombar';
import flipImage from  '../../images/img.png';
import {
  SaveComponentId,
  Past,
  OpenjoinedChallenge
} from '../../store/actions/index';
import logo from '../../images/logoooooooooo.png';
import SideDrawer from '../sidedrawer/sidedrawer';
import { connect } from 'react-redux';
import changeScreen from '../../components/changeScreen/changeScreen';


const { height } = Dimensions.get('window');
      
const URI = 'http://192.168.10.11/UrPicsPay/public/';


class PastChallenges extends Component {

      constructor(props){
        super(props);
        // this.getDtata();
        this.props.GetPastChallenges();
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
        searched:[],
        isVisible:false,
        charge:false,
        wand:false,
        flip:false,
        wantFlipCharge:false,
        ChargeBuy:false,
        FlipBuy:false,
        open: false,
        WandBuy:false,
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

    componentDidMount(){
      this.props.SaveComponentId(this.props.componentId);
    }



    join = (userId,ChallengeId) =>{
  
      //dispatch(uiStartLoading());
    fetch('https://urpixpays.com/stagging_urpixpays/user/challenges/join', {
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      "uid": userId,
      "cid": ChallengeId,
      
   }),
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
          
          changeScreen('UrPicsPay.mychallenges');

    
      })
      .done();

    
}

changeScreen = (screen,title) =>{
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
               waitForRender: true
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

    toggleOpen = () => {
      this.setState({ open: !this.state.open });
    };
    
    onContentSizeChange = (contentWidth, contentHeight) => {
      // Save the content height in state
      this.setState({ screenHeight: contentHeight });
    };


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
        searched: this.props.CloseChallenges.filter(CloseChallenges => {
          return CloseChallenges.id === id;
        }),
        isVisible: true
      };
    });
    // console.log(id);
  };

  placeDeletedHandler = (id) => {
    this.setState(prevState => {
      return {
        searched: this.props.PastChallenges.filter(openChallenge => {
          return openChallenge.id === id;
        }),
      };
    });
  //  let searchedData =[];
   let searchedData = this.props.PastChallenges.filter(openChallenge => {
    return openChallenge.id === id;
  });

    
    this.props.GotoChallenge(searchedData);
    this.GotoAnotherPage();
  };

  GotoAnotherPage = () =>{
  
        
    this.changeScreen('UrPicsPay.ChallengeEnded','Challenge Ended')
    
  }

  render ()
  {
    const scrollEnabled = this.state.screenHeight > height;
    console.log(this.state.searched[0]);
    return (
      <View style={{flex:1,zIndex:0}}>
      <ScrollView
       >
      <View style={styles.mainView}>
        {this.props.PastChallenges.length >0?<FlatList 
        data={this.props.PastChallenges}
        renderItem={(item)=> {
          console.log(item.item)
          var today = new Date();
          var Christmas = new Date(item.item.start_time);
          var diffMs = (Christmas - today); 

          return (
            <View style={styles.challengeOuterView}>
      
            <ImageBackground source={{uri:item.item.image_url}}
             style={{width:wp('100%'),height:wp('56%'),resizeMode:'contain'}}>
              <View style={styles.imageOverlay}>
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
                <TouchableOpacity 
                 onPress={()=> this.placeDeletedHandler(item.item.id)}
                style={styles.ImageInnerMiddleView}>
                  <View>
                  <Text style={styles.middleText}>
                    {item.item.title}
                  </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ImageBackground>
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
                <TouchableWithoutFeedback
                onPress={()=> this.placeDeletedHandler(item.item.id)}
               
               style={styles.infoMiddleView}>

              <Text style={styles.text_ended}>Ended</Text>

                </TouchableWithoutFeedback>
                <View style={styles.infoRightView}>
                <View>
                    <Text style={styles.rightText}>
                      {item.item.price}
                    </Text>
                  </View>
                  <View>
                  <Text style={styles.rightTextBottom}>
                      Prices
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
        />: <View style={styles.sec_close}>
        <View  style={styles.sec_close_img}>
            <Image style={styles.sec_img} source={closed_Img} />
        </View>
  </View>}
      </View>
      
      <Modal            
          animationType = {"fade"}  
          transparent = {true}  
          visible = {this.state.isVisible}  
          onRequestClose = {() =>{ console.log("Modal has been closed.") } }>  
          {/*All views of Modal*/}  
              <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
              <View style = {styles.modal}>  
             {this.state.searched.map((content,index) => {
               console.log(content);
               return (
               <View key={index}>
                  <View style={[styles.titleOuter,{borderBottomWidth:1,borderBottomColor:'rgba(0,0,0,.2)'}]}>
                  <Text style = {styles.text}>{content.title}</Text>  
                  </View>
                  {content.type ==='paid'? <View style={[styles.titleOuter]}>
                  <Text style = {[styles.text,{color:'red'}]}>This is a paid Challenge. Are you sure you want to continue?</Text>  
                  </View>:<View></View>}
                 
                  <ScrollView
                  // scrollEnabled={this.state.textHeight > hp('60%')?true:false}
                   style={{maxHeight:hp('50%')}}
                   onContentSizeChange={this.onContentSizeChange}
                    >
                  <View style={styles.descriptionOuter}>
                  <Text style={[styles.description]}>
                    {content.description}
                  </Text>
                  </View>
                  </ScrollView>
                  <TouchableOpacity onPress = {() =>this.join(222,content.id)} style={styles.ImageInnerLowerView}>
                  <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }} colors={[ '#bbd9f1','#138ece','#0067a9']} 
                  style={styles.buttonView}>
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
    justifyContent:'space-around',
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
    paddingLeft:wp('5%'),
    justifyContent:"center",
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center'
  },
  infoMiddleView:{
    paddingLeft:wp('7%'),
    paddingRight:wp('7%'),
    borderRightWidth:wp('.2'),
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

   }  ,
   text_ended:
   {
     fontSize:wp('5%'),
     color:'#ffffff'
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
    PastChallenges:state.BestImages.PastChallenges
  }
}

const mapsDispatchToProps = dispatch =>{
  return{
    GetPastChallenges : () => dispatch(Past()),
    SaveComponentId:(id)=>dispatch(SaveComponentId(id)),
    GotoChallenge:(challenge) =>dispatch(OpenjoinedChallenge(challenge)),
  }
}

export default connect(mapStatesToProps,mapsDispatchToProps) (PastChallenges);
