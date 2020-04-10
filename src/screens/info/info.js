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
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";
import bg from '../../images/bg-img.jpg';
import techni from '../../images/Tecnisan.jpg';
import Ficons from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import Topbar from '../../components/topbar/topbar';
import InfoPage1 from '../../images/info-page.png';
import InfoPage2 from '../../images/info-page2.png';
import MenuDrawer from 'react-native-side-drawer';
import InfoPage3 from '../../images/info-page3.png';
import logo from '../../images/logoooooooooo.png';
import SideDrawer from '../../screens/sidedrawer/sidedrawer';
const { height } = Dimensions.get('window');

class InfoScreen extends Component {

    state = {
        screenHeight: 0,
        open: false,
    }
    
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

    // drawerContent = () => {
    //   return (
    //         <View style={[styles.animatedBox]}>
    //         <SideDrawer  goto={(s)=>this.gotoScreen(s)}  />
    //     </View>
          
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
              },animations: {
                push: {
                   waitForRender: true
                }
             }
            }
          }
        });
        
  }

  render ()
  {
    const scrollEnabled = this.state.screenHeight > height;
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
        <Topbar OpenSideDrawer={this.toggleOpen} style={{zIndex:9999}} title={'Info Page'}/>
      </View> */}
      <ScrollView
       scrollEnabled={scrollEnabled}
       onContentSizeChange={this.onContentSizeChange}
       >
      <View style={styles.mainView}>
        <View style={styles.topView}>
           

            <View style={styles.TopMiddleView}>
              <ImageBackground resizeMode='stretch'  source={InfoPage1} style={{width:wp('100%'),height:'100%'}}>
                <View style={styles.headingTop}>
                    <Text style={styles.herdinTopText}>
                      "Turn Your Photos Into Cash"
                    </Text>
                </View>
                <View style={styles.infoHeadings}>
                <View style={styles.infoHeadingsText}>
                      <View style={styles.arrow}>
                        <Ficons name={'angle-double-right'} size={wp('6%')} style={{color:"white",fontWeight:'700'}} />
                      </View>
                      <View style={styles.textInfo}>
                          <Text style={styles.TextinfoText}>
                            Join Free Challenges To earn cash rewards
                          </Text>
                      </View>
                </View>
                <View style={styles.infoHeadingsText}>
                      <View style={styles.arrow}>
                        <Ficons name={'angle-double-right'} size={wp('6%')} style={{color:"white",fontWeight:'700'}} />
                      </View>
                      <View style={styles.textInfo}>
                          <Text style={styles.TextinfoText}>
                            Earn some extra money by selling your photos
                          </Text>
                      </View>
                </View>
                <View style={styles.infoHeadingsText}>
                      <View style={styles.arrow}>
                        <Ficons name={'angle-double-right'} size={wp('6%')} style={{color:"white",fontWeight:'700'}} />
                      </View>
                      <View style={styles.textInfo}>
                          <Text style={styles.TextinfoText}>
                            Buy any photos you like as low price
                          </Text>
                      </View>
                </View>
                <View style={styles.infoHeadingsText}>
                      <View style={styles.arrow}>
                        <Ficons name={'angle-double-right'} size={wp('6%')} style={{color:"white",fontWeight:'700'}} />
                      </View>
                      <View style={styles.textInfo}>
                          <Text style={styles.TextinfoText}>
                            Get cash when your friends join
                          </Text>
                      </View>
                </View>

                </View>
              </ImageBackground>
            </View>

            
        </View>

        <View style={styles.MiddleBarView}>
            <ImageBackground source={InfoPage2} style={{width:'100%',height:wp('33%')}}>
                <View style={styles.middleViewTextView}>
                  <Text style={styles.MiddleText}>
                      Join free challenges to earn cash 
                      rewards Earn some extra money by 
                      selling your photos Buy any photos you 
                      like as low.Get cash when your friends join
                  </Text>
                </View>
            </ImageBackground>
        </View>


        <View style={styles.botoomView}>
         <View style={styles.bottominnerView}>
         <View style={styles.BottomTopView}>
              <View style={styles.LogoView}>
                <Image source={InfoPage3} style={{width:wp('20%'),height:wp('20%')}} />
              </View>

              <View style={styles.BottomTopTextView}>
                  <Text style={styles.BottomTopText}>
                      Taking photos,It's so fun!
                  </Text>
                  <Text style={styles.BottomTopText}>
                    Join the challenges on the run!
                  </Text>
                  <Text style={styles.BottomTopText}>
                    Earn some money and go on!
                  </Text>
              </View>
        </View>
        <View style={styles.BottomMiddleView}>
          <View>
            <Image 
            source={{'uri':'https://icdn7.digitaltrends.com/image/digitaltrends/nikon-d850-review-2-3-1600x1067.jpg'}} 
            style={{width:wp('45%'),height:wp('30%')}} />
          </View>
        </View>
        <View style={styles.BottomViewText}> 
            <View style={{paddingLeft:wp('8%'),paddingHorizontal:wp('8%')}}>
                <Text style={styles.BotomViewTextInner}>
                    Submit Your Photos,get votes and win CASH
                    You will love taking photos like never before!
                </Text>
            </View>
        </View>
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

    // shadowOffset:{  width: 10,  height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
  },
  bottombarBox:{
    width:wp('100%'),
    height:hp('10%'),
    position:'absolute',
    backgroundColor:'white',
    top:hp('90%'),
    zIndex:9999999,
  },
  mainView:{
    //padding:wp('4%'),
    marginBottom:Platform.OS ==='android' ? wp('4%'):0
  },
  topView:{
    flex:1,
    height:wp('70%'),
    flexDirection:'row'
  },
  TopLeftView:{
    marginTop:wp('1.15%'),
    paddingBottom:wp('1%'),
    width:wp('2%'),
    height:hp('29%'),
    backgroundColor:'#29ABE2',
  },
  headingTop:{
    justifyContent:'flex-end',
    paddingBottom:wp('5%'),
    alignContent:'center',
    alignItems:'center',
    alignSelf:'auto',
    flex:1,
  },
  herdinTopText:{
    color:'white',
    fontFamily:'Roboto',
    fontSize:wp('3%')
  },
  infoHeadings:{
    flex:1,
    paddingLeft:wp('8%'),
    paddingRight:wp('7%'),
    paddingBottom:wp('10%')
  },
  infoHeadingsText:{
    flexDirection:'row',
  },
  arrow:{
    color:'white'
  },
  textInfo:{
    justifyContent:'center',
    alignSelf:'auto',
    alignItems:'center',
    alignContent:'center',
    paddingLeft:wp('1.9%')
  },
  TextinfoText:{
    fontSize:wp('3.5%'),
    color:'white',
    fontFamily:'Raleway',
    fontWeight:'400'
  },
  MiddleBarView:{
    flex:2,
   
  },
  botoomView:{
    flex:1,
    paddingLeft:wp('7%'),
    paddingRight:wp('7%'),
    paddingTop:wp('5%')
  },
  middleViewTextView:{
     paddingTop:wp('10%'),
     paddingLeft:wp('12%'),
     paddingRight:wp('12%'),
    justifyContent:"center",
    alignContent:"center",
    alignItems:'center',
    alignSelf:'auto'
  },
  MiddleText:{
    fontSize:wp('3.5%'),
    textAlign:'center',
    color:"white",
    fontFamily:'Raleway'
  },
  bottominnerView:{
    borderTopColor:'rgba(0,0,0,.2)',
    borderTopWidth:wp('.1'),
    borderLeftColor:'rgba(0,0,0,.2)',
    borderLeftWidth:wp('.1'),
    borderBottomWidth:wp('.3'),
    borderBottomColor:'rgba(0,0,255,.3)',
    borderRightWidth:wp('.3'),
    borderRightColor:'rgba(0,0,255,.3)',
    width:'100%',
    height:wp('70%'),
    //backgroundColor:'lightgray'
    //backgroundColor:'black'
  },
  BottomTopView:{
    flexDirection:'row',
    borderBottomColor:'rgba(0,0,0,.1)',
    borderBottomWidth:1,
  },
  BottomTopText:{
    fontSize:wp('3%'),
    fontFamily:'Raleway-Light'
  },
  BottomTopTextView:{
    justifyContent:'center',
    alignContent:'center',
    alignSelf:'auto',
    //alignItems:'center'
  },
  LogoView:{
    paddingLeft:wp('3%'),
    marginRight:wp('5%')
  },
  BottomMiddleView:{
    paddingTop:wp('5%'),
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'auto',
    alignContent:'center'
  },
  BottomViewText:{
    justifyContent:"center",
    alignContent:'center',
    alignSelf:'auto',
    alignItems:'center',
  },
  BotomViewTextInner:{
    textAlign:'center',
    fontSize:wp('3%'),
    paddingTop:wp('2%'),
    lineHeight:wp('5%'),
    fontFamily:'Raleway'
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

export default InfoScreen;
