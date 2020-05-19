import React ,{Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Platform,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Animated,
    Linking,
    LayoutAnimation
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import IconsI from 'react-native-vector-icons/Ionicons';
import IconsM from 'react-native-vector-icons/MaterialIcons';
import userImage from '../../images/buysell1111.png';
import one from '../../images/icon/2.png';
import two from '../../images/icon/3.png';
import three from '../../images/icon/4.png';
import { Navigation } from "react-native-navigation";
import {connect} from 'react-redux';
import { loginUser } from "../../store/actions/index";
import four from '../../images/icon/5.png';
import five from '../../images/icon/6.png';
import six from '../../images/icon/icon-logout.png';
import seven from '../../images/icon/8.png';
import eight from '../../images/icon/a_icon/2.png';
import nine from '../../images/icon/a_icon/1.png';
import eleventh from '../../images/icon/a_icon/5.png';
import tweleve from '../../images/icon/a_icon/3.png';
import thirten from '../../images/icon/a_icon/4.png';
import fourthen from '../../images/icon/a_icon/6.png';
import {logoutUserr,UserProfileData} from '../../store/actions/index';
import {saveUserInfo} from '../../store/actions/index';

import fifthen from '../../images/icon/a_icon/8.png';
import tenth from '../../images/icon/a_icon/chan-menu/3.png';

import Icon from 'react-native-vector-icons/Ionicons';
import FastImage from 'react-native-fast-image';

class SideDrawer extends Component {
  
constructor(props)
{
  super(props);
  this.props.UserData();
   

 
  // Navigation.events().bindComponent(this.props.componentId);
  Navigation.events().registerComponentDidAppearListener( ( { componentId } ) => {
    // only spy on tabs we don't need other screens
    if (componentId === 'MyChallenges' || componentId === 'open' || componentId==='close' || componentId ==='past' || componentId ==='Bidding') {
        this.setState({
            activeComponentId: componentId
        })
    }
    // alert(componentId);
  })

}
// navigationButtonPressed({ buttonId }) {
//   if (buttonId === "openSideDrawer") {
//   (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
//   Navigation.mergeOptions(this.state.activeComponentId, {
//    sideMenu: {
//      left: {
//        visible: this.isSideDrawerVisible,
//      }
//    }
//  });
// }
// }
closeDrawer (){
  (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
  Navigation.mergeOptions(this.state.activeComponentId, {
   sideMenu: {
     left: {
       visible: false,
     }
   }
 });
}
// closeSideDrawer (){
  
// }


  state = {
    openAcounts:false,
    closeAcounts:true,
  }

  gotoScreen = (screen,title) =>{
      // this.closeDrawer();
    Navigation.push(this.state.activeComponentId, {
        component: {
          name: screen,
         
          passProps: {
            text: 'Pushed screen'
          },
          options: {
            sideMenu: {
              left: {
                  visible: false,
                  enabled: false,
                  
                }
          },
           topBar:{
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
          }
        }
      });
     }
     gotoBuyAndSell = (screen,title) =>{
      // this.closeDrawer();
      Promise.all([

        IconsI.getImageSource(Platform.OS === 'android' ?'md-cart':'md-cart',30),
        IconsM.getImageSource(Platform.OS === 'android' ?'md-cart':'gavel',30),
        
    ]).then(source =>{
      Navigation.push(this.state.activeComponentId, {
        component: {
          name: screen,
         
          passProps: {
            text: 'Pushed screen'
          },
          options: {
            sideMenu: {
              left: {
                  visible: false,
                  enabled: false,
                  
                }
          },
           topBar:{
             title:{
               text:title,
               alignment:'center'
             },
             rightButtons:[{
              id: 'GoToCArt',
              icon:Platform.OS==='android'?source[0]:source[1],
              color:'#000000',
              // color:'#ffffff',
            }]
           },
           
           bottomTabs:{
            visible:false,
            drawBehind:true,
            animate:true
          },
           
          }
        }
      });
    })
 
     }
    //  componentWillUpdate() {
    
    //  }
 
    render(){
        let text =this.props.pro_data.name;
        console.log(text);
        console.log(this.props.pro_data.age)
     

         return(
             
      <View style={styles.sideMenuContainer}>
        <ScrollView  showsVerticalScrollIndicator={false}>
          <View style={styles.UserImageOuterView}>
            <View style={styles.UserImage}>
            <FastImage
                        style={styles.profile_image}
                          source={{
                            
                            uri:'https://urpixpays.com/public/images/profile_pictures/'+this.props.pro_data.images,
                              priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                      />
            </View>
            <View style={styles.UserStatus}>
                <View style={{width:wp('3%'),height:wp('3%'),backgroundColor:'green',borderRadius:wp('1.45%')}}>

                </View>
            </View>
            <View style={styles.UserName}>
            <Text style={styles.UserText}>
                    {text}
                </Text>
            </View>
          </View>
          <View style={this.state.openAcounts?[styles.MainView,{opacity:0}]:''}>

         
          {/* <TouchableOpacity onPress={()=> {
              Navigation.push(this.props.id, {
                component: {
                  name: 'UrPicsPay.BuyAndSell',
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
              
            }} style={[styles.menuIconView,styles.active]}>
            <View style={styles.menuIcon}>
              <Image source={one} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Challenges
              </Text>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={()=> {
          //   Navigation.mergeOptions(this.props.componentId, {
          //     sideMenu: {
          //         left: {
          //             visible: false
          //         }
          //     }
          // });
                this.gotoBuyAndSell('UrPicsPay.BuyAndSellView','Buy / Sell')
            }} 
            style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={two} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Buy / Sell
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=> {
            this.gotoScreen('UrPicsPay.MyPhotos','My Photos')}}
           style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={three} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                My Photos
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
            this.gotoScreen('UrPicsPay.FriendInvite','Invite Friends')}} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={four} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Invite Friends
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> {
           
            this.gotoScreen('UrPicsPay.InfoPage','Info ')}} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={five} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Info Page
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.gotoScreen('UrPicsPay.TabViewExample','Best Images')}} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={seven} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Best Images 
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            this.gotoScreen('UrPicsPay.PastChallenges','Past Challengs')}} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={seven} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Past Challenges
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>{
             Linking.canOpenURL('https://urblogpost.com/').then(supported => {
              if (supported) {
                Linking.openURL('https://urblogpost.com/');
              } else {
                console.log("Don't know how to open URI: " + this.props.url);
              }
            });
          }}
          style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={six} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Blog
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{
              LayoutAnimation.spring();
            this.setState({
            openAcounts:true,
            closeAcounts:false
          })}} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={eight} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={[styles.MenuTextView]}>
              <Text style={styles.MenuText}>
                Account Settings
              </Text>
            </View>
          </TouchableOpacity>
          </View>
          
            {/* Account Settings */}
          <View style={this.state.closeAcounts ?[styles.MainView,{opacity:0}]:''}>
          <TouchableOpacity onPress={()=>{
              LayoutAnimation.spring();
            this.setState({
            openAcounts:false,
            closeAcounts:true
          })
          this.slideRight;
          }}  style={[styles.menuIconView,styles.active]}>
            <View style={styles.menuIcon}>
              <Image source={eight} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
              Account Settings
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=> {
            this.gotoScreen('UrPicsPay.Myprofile','My Profile')}}
          style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={nine} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                My Profile
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
           onPress={()=> {
            this.gotoScreen('UrPicsPay.MyPhotos','My Photos')}}
          style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={tenth} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                My Photos
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>{
            this.gotoScreen('UrPicsPay.BalanceOverView','Blannce Overview')}}
          style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={eleventh} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Balance Overview
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={()=>{
            this.gotoScreen('UrPicsPay.Bidding','Bidding')}}
          style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={tweleve} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Bidding Notifications
              </Text>
            </View>
          </TouchableOpacity>
          {Platform.OS==='android'?
        <TouchableOpacity style={styles.menuIconView}>
        <View style={styles.menuIcon}>
          <Image source={thirten} style={{width:wp('15%'),height:wp('10%')}} />
        </View>
        <View style={styles.MenuTextView}>
          <Text style={styles.MenuText}>
            Cart Notifications
          </Text>
        </View>
      </TouchableOpacity>:<React.Fragment>
        
      </React.Fragment>  
        }
          <TouchableOpacity onPress={() =>{
              this.gotoScreen('UrPicsPay.Notification','Notifications')
          }} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={thirten} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Notifications
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{
              this.gotoScreen('UrPicsPay.Products_Purchased','Products Purchased')
          }} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={thirten} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Products Purchased
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>{
              this.gotoScreen('UrPicsPay.UrTrasaction','Transactions')
          }} style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={thirten} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                My Transactions
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
          onPress={this.props.logout}
          style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={six} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={styles.MenuTextView}>
              <Text style={styles.MenuText}>
                Log out
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.menuIconView}>
            <View style={styles.menuIcon}>
              <Image source={fifthen} style={{width:wp('15%'),height:wp('10%')}} />
            </View>
            <View style={[styles.MenuTextView]}>
              <Text style={styles.MenuText}>
                Products Sold
              </Text>
            </View>
          </TouchableOpacity> */}
          </View>
          </ScrollView>
    </View>
         );
    }

}
const styles = StyleSheet.create({
    container:{
        paddingTop:22,
        backgroundColor:"white",
        flex:1,
        paddingTop:50
    },
    Text:{

    },
    drawerItem:{
        flexDirection:'row',
        alignItems:'center',
        padding:10,
        backgroundColor:'#eee',

    },
    drawerItemIcon:{
        marginRight:10
    },

  MainContainer: {
 
    position:'absolute',
    top:40,
    flex:1,
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
 
  },
 
  sideMenuContainer: {
    flex:1,
    paddingTop:wp('5%'),
    backgroundColor: '#fff',
    alignItems: 'center',
    width:wp('60%'),
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
 
    fontSize: wp('5%'),
    color: '#222222',
    
  },
  UserStatus:{
      flexDirection:'row',
      justifyContent:'flex-end',
      marginTop:wp('-1%'),
      paddingRight:wp('15%')
  },
  UserName:{
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      alignSelf:'auto',
  },
  UserText:{
      marginTop:wp('2%'),
      fontSize:wp('3.5%'),
      letterSpacing:2,
      fontFamily:'Roboto'
  },
  UserImage:{
      justifyContent:'flex-start',
      alignContent:'center',
      alignItems:'center',
      alignSelf:'auto'
  },
  active:{
      borderTopWidth:wp('.3'),
      borderBottomColor:'#29ABE2',
      borderBottomWidth:wp('.3'),
      borderTopColor:'#29ABE2'
  },
  menuIconView:{
      borderTopWidth:wp('.1'),
      // borderBottomColor:'rgba(0,0,0,.5)',
      // borderBottomWidth:wp('.1'),
      width:wp('60%'),
      paddingTop:wp('2%'),
      paddingBottom:wp('2%'),
      borderTopColor:'rgba(0,0,0,.5)'
  },
  UserImageOuterView:{
    marginBottom:wp('5%')
  },
  menuIcon:{
    justifyContent:'center',
    alignSelf:'auto',
    alignContent:'center',
    alignItems:'center'
  },
  MenuTextView:{
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'auto',
    
  },
  MenuText:{
    fontSize:wp('3%'),
    fontFamily:'Raleway-Light'
  },
  MainView:{
    //height:0,
    
    display:'none',
  },
  profile_image:
  {
    height:wp('17%'),
    width:wp('17%'),
    borderRadius:wp('8.5%')
  }
})
const mapStateToProps = (state) =>{
  return{
    id:state.isLoading.id,
    pro_data:state.BestImages.SaveuserProfiledata,
    
    data:state.user.user
  }
}
const mapsDispatchToProps = (dispatch) => {
  return{
      logout : () => dispatch(logoutUser()),
      UserData: () => dispatch(UserProfileData()),
      logout :()=> dispatch(logoutUserr())
    }
}

export default connect(mapStateToProps, mapsDispatchToProps)(SideDrawer)