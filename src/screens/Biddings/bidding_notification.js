
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Topbar from '../../components/topbar/topbar';
import SideDrawer from '../sidedrawer/sidedrawer';
import MenuDrawer from 'react-native-side-drawer';
import pro_image from '../../images/buysell1111.png';
import Cart_Notification from '../Biddings/CartNotifications';
import Invitation from '../Biddings/Invitation_table';
import Sold_products from '../Biddings/Sold_tabel';
import { connect } from 'react-redux';
import { Accept } from '../../store/actions/Bid_request';
import { BiddingNotification } from '../../store/actions/index';
import RNPickerSelect from 'react-native-picker-select';
import Lightbox from 'react-native-lightbox';
import React, { Fragment } from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  View,
  FlatList,
  ImageBackground,
  Image,
  Text,
  StatusBar,
  Platform,
} from 'react-native';



class Bidding extends React.Component {
  constructor(props) {
    super(props);
    this.props.Bidds();
    // this.props.accept();
    this.state = {
      
      opne: false,
      biding: true,
      invitation: false,
      soldProducts: false,
      cart: false,
    };
  }

  // drawerContent = () => {
  //   return (
  //     <TouchableWithoutFeedback onPress={this.toggleOpen} style={[styles.animatedBox]}>
  //       <SideDrawer goto={(s) => this.gotoScreen(s)} />
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


  
  ChangeBidding = () => {
    this.setState({
      biding: true,
      invitation: false,
      soldProducts: false,
      cart: false,
    })
  }

  ChangeCartNotification = () => {
    this.setState({
      biding: false,
      invitation: false,
      soldProducts: false,
      cart: true,
    })
  }
  ChangeSoldProducts = () => {
    this.setState({
      biding: false,
      invitation: false,
      soldProducts: true,
      cart: false,
    })
  }
  ChangeInvitaion = () => {
    this.setState({
      biding: false,
      invitation: true,
      soldProducts: false,
      cart: false,
    })
  }
  Run = (value,id) =>{
   
    this.props.accept(value,id);
    console.log(value);

  }

  render() {

    const placeholder = {
      label: 'Select',
      value: null,
      fontSize:wp('3%'),
      color: '#8cc63f',
    };

   

    console.log(this.props.biddings);
    


    // let Biding = (
    // );

    let CartNotification = (
      <Cart_Notification />
    );
    let Invitation_table = (
      <Invitation />
    );
    let SolddProducts = (
      <Sold_products />
    );

   

    return (
      <View style={styles.conatainer}>
        {/* <MenuDrawer
          open={this.state.open}
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={250}
          overlay={true}
          opacity={.9}
        > */}
        {/* <View style={styles.topbarBox}>
            <Topbar OpenSideDrawer={this.toggleOpen} style={{ zIndex: 9999 }} title={'Bidding Notifications'} />
          </View> */}

        <View style={styles.view_nav_bar}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View style={styles.view_nav_bar_inner}>
              <TouchableOpacity onPress={() => this.ChangeBidding()}
                style={[styles.item_view, { backgroundColor: this.state.biding ? '#8cc63f' : '#B5B5B5' }]}>
                <Text style={styles.text_view}>Bidding Notifications</Text>
              </TouchableOpacity>
              <View style={styles.view_line1}></View>
              <TouchableOpacity onPress={() => this.ChangeCartNotification()}
                style={[styles.item_view, { backgroundColor: this.state.cart ? '#8cc63f' : '#B5B5B5' }]}>
                <Text style={styles.text_view}>Cart Notifications</Text>
              </TouchableOpacity>
              <View style={styles.view_line1}></View>

              <TouchableOpacity onPress={() => this.ChangeSoldProducts()}
                style={[styles.item_view, { backgroundColor: this.state.soldProducts ? '#8cc63f' : '#B5B5B5' }]}>
                <Text style={styles.text_view}>Sold Products</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.ChangeInvitaion()}
                style={[styles.item_view, { backgroundColor: this.state.invitation ? '#8cc63f' : '#B5B5B5' }]}>
                <Text style={styles.text_view}>Invitation Table</Text>
              </TouchableOpacity>
              <View style={styles.view_line1}></View>

            </View>
          </ScrollView>
        </View>


        {this.state.biding ? <View style={styles.view_tabel}>

          <View style={styles.view_tabel_inner}>
            <View style={styles.view_sr_no}>
              <Text style={{ fontWeight: '500', fontSize: wp('2.7%') }}>S.No</Text>
            </View>
            <View style={styles.view_date_view}>
              <Text style={{ fontWeight: '500', fontSize: wp('2.7%') }}>Date</Text>
            </View>
            <View style={styles.view_image_title}>
              <Text style={{ fontWeight: '500', fontSize: wp('2.7%') }}>
                Image Title
                </Text>
            </View>
            <View style={styles.view_sr_Price}>
              <Text style={{ fontWeight: '500', fontSize: wp('2.7%') }}>Price</Text>
            </View>
            <View style={styles.view_imge_view}>
              <Text style={{ fontWeight: '500', fontSize: wp('2.7%') }}>
                Image View
              </Text>
            </View>
            <View style={styles.view_imge_action}>
              <Text style={{ fontWeight: '500', fontSize: wp('2.7%') }}>
                Action
                </Text>
            </View>
          </View>
          <View style={styles.view_long_line}></View>
          <FlatList
            // itemDimension={wp('40%')}
            data={this.props.biddings}

            // spacing={wp('1%')}
            // style={styles.gridView}
            // staticDimension={300}
            // fixed
            // spacing={20}

            renderItem={({ item, index }) => {
              index = index + 1
              console.log(item);
              return (

                <View style={styles.view_tabel_inner2}>
                  <View style={styles.view_sr_no_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%') }}>{index}</Text>
                  </View>


                  <View style={styles.view_date_view_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%'),textAlign:'center' }}>{item.time}</Text>
                  </View>

                  <View style={styles.view_image_title_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%') }}>
                      {item.img_id}


                    </Text>
                  </View>

                  <View style={styles.view_sr_Price_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%') }}>{item.price}</Text>
                  </View>

                  <View style={styles.view_imge_view_data}>
                  <Lightbox 
                    springConfig={{ overshootClamping: true }}
                      renderContent={() => (
                            <Image style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                                         source={{    uri: item.url
                                        }}
                                        resizeMode={'contain'}
                                         /> 
                      )}
                  >
                     <Image style={{height:wp('8%'),width:wp('20%')}}
                        source={{uri: item.url}}
                        />
                        </Lightbox>

                  </View>

                  <View style={styles.view_imge_action_data}>

                    <RNPickerSelect
                    color="#8cc63f"
                    placeholder={{
                      label: item.state,
                      value: null,
                      fontSize:wp('3%'),
                      color: '#8cc63f',
                    }}
                    Icon={() => {
                      return ( <View style={{justifyContent:'center',alignItems:'center',marginTop:Platform.OS==='android' ?wp('3.4%'):0}}>
                        <Arrow name="keyboard-arrow-down" size={wp('6%')} color="#8cc63f" /></View>
                        )

                     ;
                    }}

                    
                      onValueChange={(value) => {
                        this.Run(value,item.id);
                      }}
                      items={[
                        { label: 'Request', value: 'Request',color:'#8cc63f' },
                        { label: 'Accepted', value: 'Accepted' ,color:'#8cc63f'},
                        { label: 'Cancel', value: 'Cancel',color:'#8cc63f' },
                        { label: 'Delete', value: 'Delete' ,color:'#8cc63f'},
                      ]
                   }
                      
                    />
                  </View>
                       
                      
                    </View>
          // <View style={styles.view_long_line}></View>       
          //        </View>
    )
  }
}
/>


  < View style = { styles.view_long_line } ></View >
          </View > : <View></View>}
{ this.state.invitation ? Invitation_table : <View></View> }
{ this.state.cart ? CartNotification : <View></View> }
{ this.state.soldProducts ? SolddProducts : <View></View> }

{/* </MenuDrawer> */ }
      </View >
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
    backgroundColor: 'grey',
    width: wp('100%'),
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
  view_photo_parent: {
    paddingTop: wp('5.5%'),
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    paddingBottom: wp('2%'),
    height: wp('45%'),
    width: wp('96%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, .6)',
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
    borderColor: '#8cc63f',
    borderWidth: wp('0.1%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('17%'),
    height: wp('6%'),
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
    flex: 0.8,

    flexDirection: 'row',
    paddingLeft: wp('1%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view_flex_2_sec: {
    flex: 0.2,

    flexDirection: 'row',
    paddingRight: wp('0.5%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  communication1: {
    height: wp('5%'),
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
    backgroundColor: '#B5B5B5',
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
    fontSize: wp('3%'),
    fontWeight: '500',
    color: '#ffffff',
  },
  item_view: {
    justifyContent: 'center',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
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
    flex: 1,
    width: wp('100%'),
    height: wp('70%'),
  },
  view_tabel_inner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width: '100%',
    height: wp('8%'),
  },
  view_tabel_inner2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    borderBottomColor: "rgba(0,0,0,0.7)",
    borderBottomWidth: wp('0.1%'),
    width: '100%',
    height: wp('10%'),
  },
  view_sr_no: {
    width: wp('8%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view: {
    width: wp('17%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_image_title: {
    width: wp('17%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_Price: {
    width: wp('11%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_view: {
    width: wp('23%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_action: {
    width: wp('23%'),
    height: '96%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_no_data: {
    width: wp('8%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    fontWeight: '200',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view_data: {
    width: wp('17%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_image_title_data: {
    width: wp('17%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_Price_data: {
    width: wp('11%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_view_data: {
    width: wp('23%'),
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    height: '100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_action_data: {
    width: wp('24%'),
    height: '100%',
    borderColor:'#8cc63f',
    borderWidth:wp('0.1%'),
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
});

const mapStateToProps = state => {
  return {
    biddings: state.BestImages.Savebiddingsdata,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    Bidds: () => dispatch(BiddingNotification()),
    accept: (val,id) => dispatch(Accept(val,id)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Bidding)