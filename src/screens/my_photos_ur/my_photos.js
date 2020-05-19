

import img1 from '../../images/buysell1111.png';

import { FlatGrid } from 'react-native-super-grid';

import React, { Fragment } from 'react';
import Topbar from '../../components/topbar/topbar';
import SideDrawer from '../sidedrawer/sidedrawer';
import {MyPhoto} from '../../store/actions/index';
import MenuDrawer from 'react-native-side-drawer';
import Lightbox from 'react-native-lightbox';
import FastImage from 'react-native-fast-image';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';

// import Topbar from './topbar';
import { connect } from 'react-redux';

class MyPhotos extends React.Component {
  constructor(props){
    super(props);
    this.props.GetImages();

   

  }
  state = {
    searched: [],
    isVisible: false,
    charge: false,
    wand: false,
    flip: false,
    wantFlipCharge: false,
    ChargeBuy: false,
    FlipBuy: false,
    open: false,
    WandBuy: false,
    screenHeight: 0,
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
  }
  // drawerContent = () => {
  //   return (
  //     <TouchableWithoutFeedback onPress={this.toggleOpen} style={[styles.animatedBox]}>
  //       <SideDrawer OpenSideDrawer={this.toggleOpen} goto={(s) => this.gotoScreen(s)} />
  //     </TouchableWithoutFeedback>

  //   );
  // };
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };
  renderFotter = () => {
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View>
    )
  }
  
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
          animations: {
            push: {
              waitForRender: true
            }
          }
        }
      }
    });

  }


  render() {
    console.log(this.props.pics);


    const state = this.state;
    const items = [
      { name: 'TURQUOISE', code: '#1abc9c' },
      { name: 'EMERALD', code: '#2ecc71' },
      { name: 'PETER RIVER', code: '#3498db' },
      { name: 'AMETHYST', code: '#9b59b6' },
      { name: 'WET ASPHALT', code: '#34495e' },
      { name: 'GREEN SEA', code: '#16a085' },
      { name: 'NEPHRITIS', code: '#27ae60' },
      { name: 'BELIZE HOLE', code: '#2980b9' },
      { name: 'WISTERIA', code: '#8e44ad' },
      { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
      { name: 'SUN FLOWER', code: '#f1c40f' },
      { name: 'CARROT', code: '#e67e22' },
      { name: 'ALIZARIN', code: '#e74c3c' },
      { name: 'CLOUDS', code: '#ecf0f1' },
      { name: 'CONCRETE', code: '#95a5a6' },
      { name: 'ORANGE', code: '#f39c12' },
      { name: 'PUMPKIN', code: '#d35400' },
      { name: 'POMEGRANATE', code: '#c0392b' },
      { name: 'SILVER', code: '#bdc3c7' },
      { name: 'ASBESTOS', code: '#7f8c8d' },
    ];
    return (
      <View style={styles.conatainer}>
            {this.props.pics.length > 0?<FlatGrid
              itemDimension={wp('40%')}
              items={this.props.pics}
              spacing={wp('1%')}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              // spacing={20}
              renderItem={({ item, index }) => (

                <View style={styles.view_photo_1}>
                  <Lightbox style={{flex: 1}} springConfig={{ overshootClamping: true }}
                      renderContent={() => (
                        // <Image style={{flex: 1, resizeMode: 'contain'}}
                        // source={{
                        //   uri: item.url
                        // }} />
                        <FastImage style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                        source={{    uri: item.url
                       ,priority: FastImage.priority.normal
                       }}
                       resizeMode={FastImage.resizeMode.contain}
                        /> 
                      )}>
                         <FastImage style={styles.view_img_bg}
                                         source={{    uri: item.url
                                        ,priority: FastImage.priority.normal
                                        }}
                                        resizeMode={FastImage.resizeMode.cover}
                                         > 
                                         <View style={styles.view_overlay}>
                        <View style={styles.voteContainer}>
                          <View style={styles.view_text_container}>
                            <Text style={styles.votes}>{item.vote}</Text>
                            <Text style={styles.votesText}>Votes</Text>
                          </View>
                        </View>
                      </View>
                                          </FastImage>

                  </Lightbox>
                </View>

              )}
            />:<View style={{justifyContent:'center',alignItems:'center',marginTop:wp('30%')}}>
            <Text style={{alignItems:'center',fontSize:wp('4%')}}>You have not uploaded any photo yet</Text>
          </View> }
          
        {/* </MenuDrawer> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    paddingTop: wp('2%'),
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    paddingBottom: wp('2%'),
    height: wp('60%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  topbarBox:
  {
    width: wp('100%'),
    height: hp('10%'),
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: wp('.4%'),

    // shadowOffset:{  width: 10,  height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
  },
  view_photo_1: {
    flex: 1,
    margin: wp('0.6'),

    height: wp('25%'),
  },
  view_photo: {
    flex: 1,
    margin: wp('0.6'),
    height: '100%',
    width: '100%',
  },
  view_number: {
    marginLeft: wp('0.5%'),
    marginTop: wp('0.5%'),
    height: wp('5.5%'),
    width: wp('5.5%'),
    padding: wp('1%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('0.5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_img_bg: {
    borderWidth: wp('0.4%'),
    borderColor: '#8cc63f',
    width: '100%',
    height: '100%',
  },

  text_style: {
    fontWeight: '500',
    color: 'blue',
    fontSize: wp('3%'),
  },
  view_overlay: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  view_overlay1: {
    height: wp('5%'),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  view_text_parent: {
    height: wp('5%'),
    width: wp('15%'),
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: wp('12%'),
    borderColor: 'white',
    borderWidth: wp('0.2%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_text_parent1: {
    height: wp('3.5%'),
    width: wp('25%'),
    flexDirection: 'row',
    borderColor: 'white',
    borderWidth: wp('0.2%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text_name: {
    fontWeight: 'bold',
    fontSize: wp('7%'),

    color: '#ffffff',
  },
  text_date: {
    fontWeight: '500',
    fontSize: wp('6%'),
    color: '#ffffff',
  },
  text_number: {
    fontWeight: '600',
    fontSize: wp('3%'),
    color: '#ffffff',
  },
  text_votes: {
    fontWeight: 'bold',
    fontSize: wp('3%'),
    color: '#ffffff',
  },
  text_votes1: {
    fontWeight: '200',
    fontSize: wp('2.5%'),
    color: '#ffffff',
  },
  gridView: {
    flex: 1,
  },

  view_person_pic: {
    height: wp('23%'),
    width: wp('23%'),
    marginLeft: wp('10%'),
    marginTop: wp('6%'),
    padding: wp('5%'),
    backgroundColor: '#F4F7FC',
    borderRadius: wp('12.50%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_flexes: {
    flexDirection: 'row',
  },
  view_flex_1: {
    flex: 1,
  },
  view_flex_1: {},
  img_style: {
    height: wp('22%'),
    width: wp('22%'),
  },
  view_texes: {

    marginTop: wp('10%'),
    marginLeft: wp('6%'),

  },
  view_votes:
  {
    marginTop: wp('5%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_line: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: wp('1%'),
    width: wp('78%'),
    backgroundColor: '#8CC63F',
  },




  view_img_settings: {
    height: wp('5%'),
    flex: 0.2,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginLeft: wp('5%'),
  },
  text_color: {
    fontSize: wp('3%'),
    fontWeight: '400',
  },

  view_pics:
  {
    height: wp('40%'),
  },
  voteContainer: {
    position: 'absolute',
    bottom: wp('0.1%'),
    left: wp('33%'),
    width: 0,
    height: 0,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: wp('13%'),
    borderRightWidth: 0,
    borderBottomWidth: wp('17%'),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'rgba(0,0,0,0.6)',
  },
  votes: {
    fontSize: wp('2.5%'),
    color: 'white',
    fontWeight: '600',
  },
  votesText: {

    color: 'white',
    fontSize: wp('2%')
  },
  view_text_container:
  {
    marginRight: wp('10%'),
    height: wp('10%'),
    width: wp('10%'),
    justifyContent: 'center', alignContent: 'center',
    alignItems: 'center', alignSelf: 'center',
    marginTop: wp('8%'),
  }


});


const mapStateToProps = (state) => {
  return{
    pics: state.BestImages.MyPhotos
  }
}

  const mapsDispatchToProps = dispatch =>{
    return{
      GetImages :()=>dispatch(MyPhoto())
    }
  }
  


export default connect(mapStateToProps, mapsDispatchToProps)(MyPhotos);