

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import  {InvitationTabel}  from '../../store/actions/index';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';



class Invitation extends React.Component {

  constructor(props) {
    super(props);
    this.props.InviteMethod();

    this.state = {
      pickerSelection: ' Select',
      pickerDisplayed: false,

      pickerSelection1: 'Accept',
      pickerDisplayed1: false,

      pickerSelection2: 'Withdraw',
      pickerDisplayed2: false,

      opne: false,
      biding: true,
      invitation: false,
      soldProducts: false,
      cart: false,
    };
  }

  render() {

    console.log(this.props.invitee)


    return (
      <View style={styles.conatainer}>

        <View style={styles.view_tabel}>

          <View style={styles.view_tabel_inner}>
            <View style={styles.view_sr_no}>
              <Text style={{ fontWeight: '600', fontSize: wp('2.9%') }}>S.No</Text>
            </View>


            <View style={styles.view_date_view}>
              <Text style={{ fontWeight: '600', fontSize: wp('2.9%') }}>Date</Text>
            </View>

            <View style={styles.view_full_name}>
              <Text style={{ fontWeight: '600', fontSize: wp('2.9%') }}>
                Full Name
            </Text>
            </View>

            <View style={styles.view_emai}>
              <Text style={{ fontWeight: '600', fontSize: wp('2.9%') }}>Email Address</Text>
            </View>



          </View>
          <View style={styles.view_long_line}></View>

          <FlatList
            // itemDimension={wp('40%')}
            data={this.props.invitee}
            // spacing={wp('1%')}
            // style={styles.gridView}
            // staticDimension={300}
            // fixed
            // spacing={20}
            renderItem={({ item, index }) => {
              index = index + 1


              return (

                <View style={styles.view_tabel_inner2}>
                  <View style={styles.view_sr_no_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%') }}>{index}</Text>
                  </View>


                  <View style={styles.view_date_view_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%') }}>{item.date}</Text>
                  </View>

                  <View style={styles.view_full_name_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%') }}>
                      {item.name}
                    </Text>
                  </View>

                  <View style={styles.view_email_data}>
                    <Text style={{ fontWeight: '100', fontSize: wp('2.7%') }}>{item.email}</Text>
                  </View>



                </View>


              )
            }}
          />





          {/* <View style={styles.view_long_line}></View> */}
        </View>
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
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
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
    marginLeft: wp('1.5%'),
    marginRight: wp('1.5%'),
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
    borderBottomColor: "rgba(0,0,0,0.7)",
    borderBottomWidth: wp('0.1%'),
    alignSelf: 'flex-start',
    width: '100%',
    height: wp('10%'),
  },
  view_sr_no: {
    width: wp('10%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view: {
    width: wp('22%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_full_name: {
    width: wp('27%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_emai: {
    width: wp('35%'),
    height: '100%',

    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  view_sr_no_data: {
    width: wp('10%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    fontWeight: '200',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view_data: {
    width: wp('22%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_full_name_data: {
    width: wp('27%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height: '100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_email_data: {
    width: wp('35%'),
    height: '100%',

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
    invitee: state.BestImages.SaveInviteTable,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    InviteMethod: () => dispatch(InvitationTabel())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Invitation)
