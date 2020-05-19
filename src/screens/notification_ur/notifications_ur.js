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
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';


class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.props.notification();
  }
  cleareNotifications = () =>{
    this.setState({
      loading:true
    })
    fetch('https://urpixpays.com/stagging_urpixpays/clearnotification', {
      method:'POST',
      headers: {
      Accept:'application/json',
      'Content-Type':'application/json',
      },
      body:JSON.stringify({
        "uid":this.props.user.id,
      }),
  })
  .then((response) =>response.json())
  .then((responseData) =>{
    this.setState({
      loading:false
    })
    console.log(responseData);
    this.props.notification();
  }).catch((err) =>{
    this.setState({
      loading:false
    })
  })
  }
  state={
    loading:false,
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

    return (
      <View style={styles.conatainer}>

{loader}
<View style={[{justifyContent:'flex-end',alignContent:'flex-end',flexDirection:'row',alignItems:'flex-end',alignSelf:'auto'}]}>
         <TouchableOpacity 
         onPress={() =>{
          this.cleareNotifications();
         }}
         style={{backgroundColor:'#29ABE2',padding:wp('2%'),borderRadius:wp('1%'),marginRight:wp('1%')}}> 
         <Text
            style={{
              // marginTop: wp('5%'),
              // marginRight: wp('5%'),
              fontSize: wp('3%'),
              color:'white'
            }}>
            Clear Notifications
          </Text>
         </TouchableOpacity>

        </View>

        <View style={styles.text_earlier}>
          {/* <Text
            style={{
              // marginTop: wp('5%'),
              marginLeft: wp('5%'),
              fontSize: wp('2.5%'),
            }}>
            NEW
          </Text> */}

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
                    <View style={{height:wp('10%'),width:wp('4%')}}> 

                    </View>
                    {/* <View style={styles.view_img_list}>
                      <Image style={styles.image} source={image} />
                    </View> */}
  
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
    // top: 2,
    right: 2,
    bottom:2,
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
    alignContent: 'center',
    marginBottom:wp('1%')
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