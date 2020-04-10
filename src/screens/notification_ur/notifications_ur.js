/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import image from '../../images/profile.png';
import { GetNotification } from '../../store/actions/index';

import Topbar from './topbar';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  TextInput,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';


class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.props.notification();
  }
  render() {
    console.log(this.props.user)
    return (
      <View style={styles.conatainer}>


       

        <View style={styles.text_earlier}>
          <Text
            style={{
              // marginTop: wp('5%'),
              marginLeft: wp('5%'),
              fontSize: wp('2.5%'),
            }}>
            NEW
          </Text>

        </View>

        <FlatList
          // itemDimension={wp('40%')}
          data={this.props.notice}
          renderItem={({ item, index }) => {

            if(item.state == "new")
            {
              return (

                <View style={styles.view_parent}>
                  <View style={styles.view_list}>
  
                    <View style={styles.view_img_list}>
                      <Image style={styles.image} source={image} />
                    </View>
  
                    <View style={styles.view_name_list}>
                      <Text style={{ fontWeight: '600', color: 'black', fontSize: wp('2.5%') }}>
  
                        {item.msg}
                      </Text>
                    </View>
  
                    <View style={styles.view_date_list}>
                      <Text style={styles.time}>{moment(item.n_date).format('MM ddd YYYY, h:mm:ss a')}</Text>
                    </View>
  
                  </View>
  
                  <View style={styles.view_line}></View>
  

                </View>
  
              )
            }
            
          }}
        />
        <View style={styles.text_earlier}>
          <Text
            style={{
              // marginTop: wp('5%'),
              marginLeft: wp('5%'),
              fontSize: wp('2.5%'),
            }}>
            EARLIER
          </Text>

        </View>

        <FlatList
          data={this.props.notice}

          renderItem={({ item, index }) => {

            

            if(item.state == "earlier")
            {
              return (

                <View style={styles.view_parent}>
                  <View style={styles.view_list}>
  
                    <View style={styles.view_img_list}>
                      <Image style={styles.image} source={image} />
                    </View>
  
                    <View style={styles.view_name_list}>
                      <Text style={{ fontWeight: '200', color: 'rgba(0, 0, 0, 0.6)', fontSize: wp('3%') }}>
                        {/* View Your 
                <Text style={{color: 'black',fontSize:wp('3.5%'),fontWeight:'500'}}> account details </Text>
                here. You can deposit to or withdraw from Your Account. */}
  
                        {item.msg}
                      </Text>
                    </View>
  
                    <View style={styles.view_date_list}>
                    <Text style={styles.time}>{moment(item.n_date).format('MM ddd YYYY, h:mm:ss a')}</Text>
                    </View>
  
                  </View>
  
                  <View style={styles.view_line}></View>
  
  
                </View>
  
              )
            }
            
          }}
        />



      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#F4F7FC',
  },
  view_chat: {
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: wp('10%'),
    flexDirection: 'row',
  },
  view_icon: {
    flex: 0.3,
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },

  view_text: {
    backgroundColor: '#e9eef7',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  view_line: {
    height: wp('0.1%'),
    width: wp('100%'),
    backgroundColor: '#999999',
  },
  view_list: {
    justifyContent: 'center',
    alignSelf: 'auto',
    // marginTop: wp('3%'),
    backgroundColor: '#ffffff',
    width: '100%',
    // height: wp('15%'),
    flex:0,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  view_list1: {
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
    height: wp('15%'),
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
  },
  view_img_list: {
    flex: 0.3,
    padding: wp('2%'),
  },
  view_name_list: {
    flex: 1.9,
    marginRight: wp('5%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  view_date_list: {
    justifyContent: 'flex-end',
    position: 'absolute',
    top: 2,
    right: 2,
    alignSelf: 'auto',
    alignItems: 'flex-end',
    marginRight: wp('3%'),
    alignContent: 'flex-end',
    flexDirection: 'column',
  },
  image: {
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    marginLeft: wp('1%'),
    alignItems: 'center',
    alignContent: 'center',
    width: wp('10%'),
    height: wp('10%'),
  },

  time: {
    justifyContent: 'center',
    fontSize: wp('2%'),
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  counter: {
    justifyContent: 'center',
    color: '#ffffff',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },

  view_parent:
  {
    // width: wp('100%'),

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center'
  },
  text_earlier:
  {
    marginVertical:wp('2%'),
  }
});

const mapStateToProps = state => {
  return {
    notice: state.BestImages.GetNotifiactions,
    user:state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    notification: () => dispatch(GetNotification())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);