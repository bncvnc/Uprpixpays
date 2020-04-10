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
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
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
import Charge from '../../images/icon/charge.png';
import wand from '../../images/icon/wand.png';
import vote from '../../images/icon/votes.png';
import BottomBar from '../../components/bottombar/bottombar';
import flipImage from '../../images/buysell1111.png';
import flip from '../../images/icon/flip.png';
import flipicon from '../../images/icon/flipicon1.jpg';
import charges from '../../images/icon/chargess.png';
import key from '../../images/icon/key.png';
import MenuDrawer from 'react-native-side-drawer';
import FlipWithoutBg from '../../images/icon/flip-without-bg.png';
import SideDrawer from '../../screens/sidedrawer/sidedrawer';
const { height } = Dimensions.get('window');
console.log(hp('100%'));
class AllBuyAndSell extends Component {



  state = {
    // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
    screenHeight: 0,
    open: false,
    data: [
      {
        id: 0,
      },
      {
        id: 1,
      },
      {
        id: 2,
      },
      {
        id: 3,
      },
      {
        id: 4,
      },
      {
        id: 5,
      },
      {
        id: 6,
      },
      {
        id: 7,
      }
    ]
  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    content = contentHeight + 150;
    this.setState({ screenHeight: content });
  };
  // drawerContent = () => {
  //   return (
  //     <View style={[styles.animatedBox]}>
  //       <SideDrawer goto={(s) => this.gotoScreen(s)} />
  //     </View>

  //   );
  // };
  toggleOpen = () => {

    this.setState({ open: !this.state.open });
  };
  gotoScreen = (screen) => {

    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          topBar: {
            visible: false
          },
          bottomTabs:{
            visible:false,
            drawBehind:true,
            animate:true
          },
          animations: {
            push: {
              enabled: "true",
              waitForRender: true,

            }
          }

        }
      }
    });

  }

  render() {
    console.log(this.state.screenHeight)
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <View style={{ flex: 1, zIndex: 0 }}>
        {/* <MenuDrawer
          open={this.state.open}
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={250}
          overlay={true}
          opacity={.9}
        > */}
          <View style={styles.topbarBox}>
            <Topbar OpenSideDrawer={this.toggleOpen} style={{ zIndex: 9999 }} title={'Buy/Sell'} />
          </View>
          <ScrollView
            scrollEnabled={scrollEnabled}
            onContentSizeChange={this.onContentSizeChange}
          >
            <View style={styles.mainView}>
              {/* Fillters Start Here */}
              <View style={styles.fillters}>
                <View style={styles.searchFillter}>
                  <View style={styles.searchLeftView}>
                    <TextInput
                      placeholder='Hellow world'
                      style={styles.inputField} />
                  </View>
                  <View style={styles.icon}>
                    <Icons name={'md-search'} size={wp('7%')} style={{ color: 'black' }} />
                  </View>
                </View>
                <View>

                </View>
              </View>
              <View style={[styles.fillters, { marginBottom: wp('4%') }]}>
                <View style={styles.searchFillter}>
                  <View style={styles.searchLeftView}>
                    <Text style={styles.inputFieldLatest}>
                      Latest
                    </Text>
                  </View>
                  <View style={styles.icon}>
                    <Icons name={'md-arrow-dropdown'} size={wp('7%')} style={{ color: 'black' }} />
                  </View>
                </View>
                <View>

                </View>
              </View>
              {/* Fillters End Here */}
              <FlatList
                data={this.state.data}
                renderItem={(item) => {
                  return (
                    <View style={styles.ImagesOuterView}>
                      <ImageBackground source={flipImage} style={styles.bgImage}  >
                        <View style={styles.overlayImage}>
                          <View style={{ flex: 1 }}>

                          </View>
                          <View style={styles.ImagePrice}>
                            <View style={styles.ImagePriceInnerView}>
                              <Text style={styles.middleButtontext}>
                                $104
                            </Text>
                            </View>
                          </View>
                          <View style={styles.ImageInfoatBottom}>
                            <View style={styles.leftViewimage}>
                              <View style={styles.infomation}>
                                <Icons name={'md-information'} size={wp('8%')} style={{ color: 'white' }} />
                              </View>
                            </View>
                            <TouchableOpacity onPress={() => this.gotoScreen('UrPicsPay.BuyAndSell')} style={styles.middleViewImage}>
                              <Text style={styles.middleText}>
                                Details
                                  </Text>
                            </TouchableOpacity>
                            <View style={styles.rightViewImage}>
                              <View style={styles.infomation2}>
                                <Icons name={'md-heart-empty'} size={wp('8%')} style={{ color: 'white' }} />
                              </View>
                            </View>

                          </View>
                        </View>
                      </ImageBackground>
                      <View style={styles.title}>
                        <Text style={styles.titleText}>
                          My Advance DSLR
                  </Text>
                      </View>
                    </View>
                  )
                }}
              />

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
  },
  mainView: {
    // paddingLeft:wp('10%'),
    // paddingRight:wp('10%')
  },
  fillters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'auto'
  },
  searchFillter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.4)',
    borderRadius: wp('1%'),
    marginTop: wp('4%')

  },
  searchLeftView: {
    width: '85%'
  },
  icon: {
    width: '15%',
    justifyContent: 'center',
    alignSelf: 'auto',
    alignContent: 'center',
    alignItems: 'center'
  },
  inputField: {
    fontSize: wp('3%'),
    paddingLeft: wp('3.5%')
  },
  inputFieldLatest: {
    fontSize: wp('3%'),
    paddingLeft: wp('3.5%'),
    fontFamily: 'Roboto-Light',
    fontWeight: '400'
  },
  bgImage: {
    width: wp('100%'),
    height: wp('60%'),
    // borderRadius:wp('10%'),
  },
  overlayImage: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    //borderRadius:wp('2%')
  },
  ImagePrice: {
    flex: 3,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',

  },
  ImagePriceInnerView: {
    borderWidth: 1,
    borderColor: 'white',
    paddingRight: wp('8%'),
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('8%'),
    backgroundColor: 'rgba(255,255,255,.2)'
  },
  middleButtontext: {
    fontSize: wp('5%'),
    color: 'white',
    fontFamily: 'Roboto'
  },
  ImageInfoatBottom: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: 'rgba(0,0,0,.4)',
    paddingTop: wp('1%'),
    paddingBottom: wp('1%')

  },
  infomation: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    // paddingLeft:wp('4%'),
    // paddingRight:wp('4%'),
    // paddingBottom:wp('1%'),
    borderColor: 'white',
    borderWidth: wp('.2%'),
    borderRadius: wp('8%'),
    height: wp('8%'),
    width: wp('8%')
  },
  leftViewimage: {
    paddingLeft: wp('2%'),
    // paddingBottom: wp('1%')
  },
  middleText: {
    fontSize: wp('5%'),
    fontFamily: 'Roboto',
    fontWeight: '600',
    color: 'white'
  },
  middleViewImage: {
    paddingLeft: wp('9%'),
    paddingRight: wp('9%'),
    borderColor: 'rgba(255,255,255,0.5)',
    borderWidth: wp('.3%')
  },
  infomation2: {
    paddingRight: wp('2%')
  },
  title: {
    justifyContent: 'center',
    paddingTop: wp('4%'),
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center'

  },
  titleText: {
    fontSize: wp('4.5%'),
    fontFamily: 'Raleway',
    fontWeight: '400'
  },
  ImagesOuterView: {
    marginBottom: wp('2%')
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

  }
});

export default AllBuyAndSell;
