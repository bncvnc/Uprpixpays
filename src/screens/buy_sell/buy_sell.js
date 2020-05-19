/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Icon from 'react-native-vector-icons/FontAwesome';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Icons from 'react-native-vector-icons/Ionicons';
import Icon_out from 'react-native-vector-icons/FontAwesome';
import Search from 'react-native-vector-icons/MaterialIcons';
import img1 from '../../images/buysell1111.png';
import Lightbox from 'react-native-lightbox';
import { FlatGrid } from 'react-native-super-grid';
import RNPickerSelect from 'react-native-picker-select';
import React, { Fragment } from 'react';
import { Navigation } from "react-native-navigation";
import FastImage from 'react-native-fast-image';
import DoubleClick  from 'react-native-double-tap'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Picker,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';

import Topbar from './topbar';
import { BuySell,AddMorePages } from '../../store/actions/index';
import { getImageInfo } from '../../store/actions/index';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
class BuyAndSellView extends React.Component {

  constructor(props) {
    super(props);
    // this.props.buysellFuction('latest','');
    Navigation.events().bindComponent(this);
    
  }
  // state={
  //   search:''
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
  if (buttonId === "GoToCArt") {
    this.changeScreen('UrPicsPay.CartNotifications','Cart');
  }
 }
  state ={
    fetching_from_server:false,
    pickImage: [],
    zoomHeight: hp('100%'), 
    zoomWidth: wp('100%'),
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
               'Your Image was successfully uploaded to bidding page',
               [
                 {text: 'OK', onPress: () => console.log('OK Pressed')},
               ],
               {cancelable: false},
             );
            //  dispatch(MyChallenges())
         }else{
            Alert.alert(
               'Alert',
               'Your Image was successfully uploaded to bidding page',
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
      .done(() =>{
        this.setState({loading: false});
      });


    // this.props.upload(idImage, this.props.CurrentChallenge[0].id,this.props.componentId);
    this.setState({
      pickImage:[],
    })

  }
  changeScreen = (screen,title) => {
    // AsyncStorage.setItem("screen", JSON.stringify(screen));
    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Pushed screen'
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
  Run = (value, search) => {

    this.props.buysellFuction(value, search);
    console.log(value);

  }

  gotoScreen = (screen,extraDAta) =>{
      
    Navigation.push(this.props.componentId, {
        component: {
          name: screen,
          passProps: {
            ...extraDAta
          },
          options: {
            sideMenu: {
              left: {
                  visible: false,
                  enabled: false
                }
          },
          bottomTabs:{
            visible:false,
            drawBehind:true,
            animate:true
          },
            topBar: {
              visible:true,
              background:{
                color:'black'
              },
              backButton:{
                color:"white",
                title:''
              }
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


  renderFooter=() => {
    return (
    //Footer View with Load More button
      <View style={styles.footer}>
        {
          this.props.isLoading?
          <ActivityIndicator color="#29ABE2" size={'large'} style={{ marginLeft: 8 }} />
          :<TouchableOpacity
          activeOpacity={0.9}
          onPress={() =>{
            this.props.AddMorePages()
          }}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
        </TouchableOpacity>
        }
      </View>
    );
  }
  setZoomRef = node => { //the ScrollView has a scrollResponder which allows us to access more methods to control the ScrollView component
    if (node) {
      this.zoomRef = node
      this.scrollResponderRef = this.zoomRef.getScrollResponder()
    }
  }
  handleResetZoomScale = (event) => {
    this.scrollResponderRef.scrollResponderZoomTo({ 
       x: 0, 
       y: 0, 
       width: this.state.zoomWidth, 
       height: this.state.zoomHeight, 
       animated: true 
    })
  }
  renderItemForFlatList = ({ item, index }) => {
    // console.log(item);
    var length = 20;
    var ImaName = item.imgname;
    var data = ImaName.length > length ? 
                        ImaName.substring(0, length - 3) + "..." : 
                        ImaName;
                        let field ='Height'+index;
                        let width = 'Widht'+index
                        let Loading = 'Loading'+index;
                        

    return (
      <View style={styles.view_pics}>
        <View style={styles.view_photo_1}>
        <Lightbox 
            style={{justifyContent: "center"}}
            springConfig={{ overshootClamping: true }}
            swipeToDismiss={false}
              renderContent={() => (

                <ScrollView
                contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }} 
                centerContent //centers content when zoom is less than scroll view bounds 
                maximumZoomScale={2}
                minimumZoomScale={1}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                ref={this.setZoomRef} //helps us get a reference to this ScrollView instance
                style={{ overflow: 'hidden' }}
              >
                 <DoubleClick
  singleTap={() => {
    console.log("single tap");
  }}
  doubleTap={() => {
    this.handleResetZoomScale()
  }}
  delay={200}
>
<View style={{width:wp('100%'),height:hp('100%')}}>
                  <ImageBackground 
                    onLoadStart={() => { this.setState({ [Loading]: true })} }
                    onLoadEnd={() => { this.setState({ [Loading]: false })} }
                    style={{alignSelf: "center", width: '100%', height: '100%'}}
                                 source={{    uri: item.url
                                }}
                                resizeMode={'contain'}
                                 >
                                   {this.state[Loading]?
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state[Loading] } size={'large'} color={'#29ABE2'} />

                </View>
                :<React.Fragment></React.Fragment>}
                                   </ImageBackground></View> 
</DoubleClick>
                  
              </ScrollView>
                  
              )}
          >

<ImageBackground 
onLoadStart={() => { this.setState({ [Loading]: true })} }
onLoadEnd={() => { this.setState({ [Loading]: false })} }
onLoad={
  (evt) => {
    // console.log(evt.nativeEvent);
    this.setState({
      [field]: Platform.OS ==='ios'? evt.nativeEvent.source.height:evt.nativeEvent.source.height / evt.nativeEvent.source.width * wp('100%'),
      [width]:evt.nativeEvent.source.width
    })
  }
}
style={[[styles.view_img_bg,{height:this.state[field]?this.state[field]:hp('20%')}]]}
                                 source={{    uri: item.url
                                }}
                                // resizeMode={'center'}
                                resizeMode={'cover'}
                                resizeMethod={'auto'}
                                 > 

                    {this.state[Loading]?
                <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                <ActivityIndicator animating={ this.state[Loading] } size={'large'} color={'#29ABE2'} />

                </View>
                :<React.Fragment>
<View style={{justifyContent:'space-between',flexDirection:'row',paddingTop:wp('2%')}}>
<View style={{marginLeft:wp('2%')}} >
                <Text style={styles.text_number}>{item.price?item.price:'$0.99'}</Text>
              </View>
              <View style={{marginLeft:wp('2%'),paddingRight:wp('2%')}} >
                <Text style={styles.text_number}>{item.maxprice?'Top Bid: $'+item.maxprice:''}</Text>
              </View>
</View>
              <View style={styles.view_overlay1}>
                <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                  <TouchableOpacity onPress={() =>{
                let ExtraDAta ={
                  AllImages:this.props.buysell,
                  initialindex:index
                }
                this.gotoScreen('UrPicsPay.ShowProfileImages',ExtraDAta)
                  }} style={{ flex: 0.4, marginLeft: wp('0.75%') }}>
                    <Icon_out name="search-plus" size={wp('8%')} color="#ffffff" />
                    </TouchableOpacity>
                  <View style={{
                    flex: 2, justifyContent: 'center', alignContent: 'center',
                    alignItems: 'center', marginTop: wp('0.5%'), marginBottom: wp('0.5%')
                  }}>
                  </View>
                  <TouchableOpacity onPress={() => {
                        this.changeScreen('UrPicsPay.BuyAndSell','Details')
                        this.props.getFunc(item.id);
                      }} style={{ flex: 0.4 }}>
                        {Platform.OS ==='android'?<Arrow name="gavel" size={wp('8%')} color="#ffffff"  />:<Arrow name="gavel" size={wp('8%')} color="#ffffff"  />}
                        
                    
                  </TouchableOpacity>
                </View>
              </View>
                </React.Fragment>}             
              
            </ImageBackground> 
                </Lightbox>
          
        </View>

        <View style={styles.view_img_settings}>
          <Text style={styles.text_color}>{data}</Text>
        </View>
      </View>
    )
  }
  isCloseToTop({ layoutMeasurement, contentOffset, contentSize }) {
    const paddingToTop = 40;
    console.log('CamedINHere')
    return contentSize.height - layoutMeasurement.height - paddingToTop <= contentOffset.y;
  }  
  
  

  render() {
    
   

    let loader = (
      <React.Fragment>

      </React.Fragment>
    );
      if(this.state.loading){
        loader = (
         <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
            <ActivityIndicator size={'large'} color='#29ABE2'  />
         </View>
        )
      }


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
    // console.log(this.props.buysell)
    return (
      <View style={styles.conatainer}>
        {/* <View style={styles.topbar_view}>
          <Topbar />
        </View> */}
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
  bounces={false}
  onScroll= {({ nativeEvent }) => {
    if (this.isCloseToTop(nativeEvent)) {
      // this.setState({refreshing: true});
      this.props.AddMorePages()
      console.log('camed in here')
      // this.props.AddMorePages();
    }
  }}
  >

  
        <View style={styles.view_serch_drop}>
          <View style={styles.view_serch}>
            <View style={{justifyContent:'center',alignItems:'flex-start' , flex:2.75}}>
            <View style={styles.view_msg}>
              {/* <View style={{justifyContent:'center',alignItems:'center'}}> */}
              <TextInput
                style={{ fontSize: wp('3%'),height:wp('12%'),width:wp('80%')}}
                placeholder="Search"
                // value = {this.state.search}
                placeholderTextColor="#999999"
                onChangeText={(text) => {
                  this.Run('latest',text);
                }}
              />
              {/* </View> */}
            </View>
            </View>
           
            <View style={styles.view_icon}>
              <Search name="search" size={wp('4%')} color="#999999" />
            </View>

          </View>

          <View style={styles.view_drop}>

            <RNPickerSelect
                    placeholder={{
                      label: 'Sort by latest',
                      value: 'latest',
                      fontSize:wp('3%'),
                      color: '#29ABE2',
                    }}
                    Icon={() => {
                      return (
                        <View
                          style={{
                            backgroundColor: 'transparent',
                            borderTopWidth: 10,
                            borderTopColor: 'gray',
                            borderRightWidth: 10,
                            borderRightColor: 'transparent',
                            borderLeftWidth: 10,
                            borderLeftColor: 'transparent',
                            width: 0,
                            height: 0,
                            marginTop:Platform.OS ==='android'?wp('1.9%'):0
                          }}
                        />
                      );
                    }}

                    
                      onValueChange={(value,search) => {
                        this.Run(value,search);
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 14,
                          right: 10,
                        },
                        placeholder: {
                          fontSize:wp('3%'),
                          color: '#29ABE2',
                        },
                      }}
                      // selectedValue={this.props.buysellFuction('latest','')}
                      items={[
                        { label: 'Sort by latest', value: 'latest' },
                        { label: 'Sort by popularity', value: 'popularity',color:'#999999' },
                        { label: 'Sort by rating', value: 'rating' ,color:'#999999'},
                        { label: 'Sort by Low to high', value: 'lowtohigh' ,color:'#999999'},
                        { label: 'Sort by high to low', value: 'hightolow' ,color:'#999999'},
                      ]
                      
                   }
                  //  placeholder={placeholder.data}
                 
                    />

          </View>
        </View>


        <FlatList
          // itemDimension={wp('40%')}
          data={this.props.buysell}
          // spacing={0}
          // bounces={false}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          // onEndReached={() =>{
          //   this.props.AddMorePages();
          // }}


        
          // scrollEventThrottle={400}
          onEndReachedThreshold={0.5}
          renderItem={this.renderItemForFlatList}
          keyExtractor={i => items.id}
          initialNumToRender={5}
          // ListFooterComponent={this.renderFooter.bind(this)}
        />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    zIndex:0
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
  view_photo_1: {
    flex: 1,
    // margin: wp('0.6'),
    // height: wp('30%'),
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
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  view_overlay1: {
    height: wp('10%'),
    borderRadius:wp('1.5%'),
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
    fontSize: wp('4.5%'),
    color: '#29ABE2',
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

  view_serch_drop: {
    flex:0,
    marginTop: wp('5%'),
    marginBottom: wp('2%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: wp('90%'),
  },
  view_serch: {
    flexDirection: 'row',
    borderWidth: wp('0.3%'),
    borderColor: '#000000',
    flex:0,
    width: '100%',
    justifyContent: 'center',
    borderRadius: wp('1%'),
    alignContent: 'center',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    alignSelf: 'center',
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
  },

  category_text: {
    fontFamily: 'Raleway-Regular',
    color: '#999999',
    fontSize: wp('2%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  ImageStyle: {
    position: 'absolute',
    right: 1,
    padding: wp('2%'),
    margin: wp('2%'),
    height: wp('3%'),
    width: wp('3%'),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  SectionStyle: {


    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%',

  },
  communication1: {
    height: wp('15%'),
    alignSelf: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  view_msg: {
    // height: '100%',
    paddingLeft: wp('4%'),
    height:wp('9%'),
    // alignContent: 'center',
    justifyContent: 'center',
  },
  view_icon: {
    flex: 0.25,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  SectionStyle1: {

    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  view_flex_1_sec: {
    flex: 0.75,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('3%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view_flex_2_sec: {
    flex: 0.25,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    // paddingRight: wp('1.5%'),
    marginRight: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text_country_city: {
    fontWeight: '100',
    paddingLeft: wp('2%'),
    color: '#999999',
    fontSize: wp('3%'),
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
    // height: wp('40%'),
    flex:1
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#29ABE2',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
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

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: wp('3%'),
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: wp('3%'),
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
const mapStateToProps = (state) => {
  return {
    buysell: state.BestImages.BuySelldata,
    paginationData: state.BestImages.paginationData,
    isLoading:state.isLoading.isLoading,
    user:state.user.user,
    paginate:state.BestImages.paginationData.next_page_url
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    buysellFuction: (sort, search) => dispatch(BuySell(sort, search)),
    getFunc: (id) => dispatch(getImageInfo(id)),
    AddMorePages:()=>dispatch(AddMorePages())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(BuyAndSellView);