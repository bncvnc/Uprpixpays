/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import Icon from 'react-native-vector-icons/FontAwesome';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Icon_out from 'react-native-vector-icons/FontAwesome';
import Search from 'react-native-vector-icons/MaterialIcons';
import img1 from '../../images/buysell1111.png';
import Lightbox from 'react-native-lightbox';
import { FlatGrid } from 'react-native-super-grid';
import RNPickerSelect from 'react-native-picker-select';
import React, { Fragment } from 'react';
import { Navigation } from "react-native-navigation";
import FastImage from 'react-native-fast-image';
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
  ActivityIndicator
} from 'react-native';

import Topbar from './topbar';
import { BuySell,AddMorePages } from '../../store/actions/index';
import { getImageInfo } from '../../store/actions/index';
import { connect } from 'react-redux';

class BuyAndSellView extends React.Component {

  constructor(props) {
    super(props);
    // this.props.buysellFuction('latest','');

    this.props.buysellFuction('latest', '');
  }
  // state={
  //   search:''
  // }
  state ={
    fetching_from_server:false
  }
  changeScreen = (screen) => {
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
              text: 'Details',
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

  renderFooter() {
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

  render() {
    
    // console.log(this.props.buysell.sort)
    console.log(this.props.paginationData)


    // const placeholder = {
    //   label: 'Latest',
    //   value: null,
    //   fontSize:wp('3%'),
    //   color:"#999999",
    // // };
    // const placeholder = {
    //   data: this.props.buysellFuction('latest', '')
    // };


    // console.log(this.props.buysell)
    // console.log(this.props.buysellFuction());

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
    console.log(this.props.buysell)
    return (
      <View style={styles.conatainer}>
        {/* <View style={styles.topbar_view}>
          <Topbar />
        </View> */}
  <ScrollView>

  
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
                    color="#8cc63f"
                    // placeholder={this.props.buysellFuction('latest','')}
                    Icon={() => {
                      return ( <View style={{justifyContent:'center',alignItems:'center'}}>
                        <Arrow name="keyboard-arrow-down" size={wp('7%')} color="#999999" /></View>
                        );
                    }}

                    
                      onValueChange={(value,search) => {
                        this.Run(value,search);
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


        <FlatGrid
          itemDimension={wp('40%')}
          items={this.props.buysell}
          spacing={wp('1%')}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({ item, index }) => {
            // console.log(item);
            var length = 20;
            var ImaName = item.imgname;
            var data = ImaName.length > length ? 
                                ImaName.substring(0, length - 3) + "..." : 
                                ImaName;
            // if(item.id==id)
            // {

            // }

            return (
              <View style={styles.view_pics}>
                <View style={styles.view_photo_1}>
                <Lightbox 
                    style={{justifyContent: "center"}}
                    springConfig={{ overshootClamping: true }}
                      renderContent={() => (
                        // <Image style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                        // source={{
                        //   uri: item.url
                        // }} />
                            <FastImage style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                                         source={{    uri: item.url
                                        ,priority: FastImage.priority.normal
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                         /> 
                      )}
                  >

 <FastImage style={[styles.view_img_bg]}
                                         source={{    uri: item.url
                                        ,priority: FastImage.priority.high
                                        }}
                                        resizeMode={FastImage.resizeMode.contain}
                                         > 
                      <View >
                        <Text style={styles.text_number}>{item.price}</Text>
                      </View>
                      <View style={styles.view_overlay1}>
                        <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                          <View style={{ flex: 0.4, marginLeft: wp('0.75%') }}>
                            <Icon_out name="search-plus" size={wp('5%')} color="#ffffff" />
                            </View>
                          <View style={{
                            flex: 2, justifyContent: 'center', alignContent: 'center',
                            alignItems: 'center', marginTop: wp('0.5%'), marginBottom: wp('0.5%')
                          }}>
                          </View>
                          <TouchableOpacity onPress={() => {
                                this.changeScreen('UrPicsPay.BuyAndSell')
                                this.props.getFunc(item.id);
                              }} style={{ flex: 0.4 }}>
                            <Icon_out name="shopping-cart" size={wp('5%')} color="#ffffff" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </FastImage> 
                        </Lightbox>
                  
                </View>

                <View style={styles.view_img_settings}>
                  <Text style={styles.text_color}>{data}</Text>
                </View>
              </View>
            )
          }}
          keyExtractor={i => items.id}
          ListFooterComponent={this.renderFooter.bind(this)}
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
    paddingRight: wp('2%')
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
    margin: wp('0.6'),
    height: wp('30%'),
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
    height: wp('5%'),
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
    borderWidth: wp('0.1%'),
    borderColor: '#999999',
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
    height: wp('40%'),
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

});

const mapStateToProps = (state) => {
  return {
    buysell: state.BestImages.BuySelldata,
    paginationData: state.BestImages.paginationData,
    isLoading:state.isLoading.isLoading
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