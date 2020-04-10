
import img1 from '../../images/1.jpg';



import React, { Fragment } from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';

import Topbar from './topbar';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Details extends React.Component {


  render() {
    return (
      <View style={styles.conatainer}>
        <ScrollView scrollEnabled={true} showsVerticalScrollIndicator={false}>
          <View style={styles.view_photo_parent}>
            <View style={styles.view_photo}>
              {/* <ImageBackground style={styles.view_img_bg} source={{
                uri:this.props.CurrentChallenge[0].image_url
              }}> */}
              <FastImage style={styles.view_img_bg} source={{uri:this.props.CurrentChallenge[0].image_url}}>
                <View style={styles.view_overlay}>
                  <View style={styles.view_overlay1}>
                    <Text style={{ fontSize: wp('3.5%'), fontWeight: '600', color: '#ffffff' }}>
                      SPONSORED BY URPIXSPAY.COM,INC</Text>
                  </View>
                  {/* <TouchableOpacity onPress={()=> this.description()}>
                     
                  </TouchableOpacity> */}

                  <Text style={{
                    fontWeight: 'bold', fontSize: wp('6%'),
                    color: '#ffffff', fontFamily: 'Raleway', letterSpacing: wp('1%')
                  }}>{this.props.CurrentChallenge[0].title}</Text>
                </View>
              {/* </ImageBackground> */}
              </FastImage>
            </View>

            {/* <Text style={{ fontSize: wp('4%'), fontWeight: '500', marginTop: wp('3%') }}>YOUR BEST SHOTS!</Text> */}

            <View style={styles.view_description}>
              <Text style={{ fontSize: wp('3.5%'), marginTop: wp('3%'), textAlign: 'justify', }}>
                {this.props.CurrentChallenge[0].description}
              </Text>
            </View>

            <View style={styles.view_text}>
              <Text style={{
                fontWeight: 'bold', fontSize: wp('6%'), marginTop: wp('6%'),
                color: 'black', fontFamily: 'Raleway'
              }}>{this.props.CurrentChallenge[0].title}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    flexDirection: 'column',

  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    padding: wp('2.5%'),
    backgroundColor: '#EDECEA',
    width: '100%',
  },

  view_photo: {
    height: wp('60%'),
    width: '100%',
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
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },

  view_text:
  {
    marginBottom: wp('5%'),
    alignItems: 'center',
    width: '100%'
  },
  view_overlay1: {
    height: wp('9%'),
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  view_description:
  {
    // height: wp('60%'),
    // width: '100%',
    flex:0
  }

});

const mapStatesToProps = state => {
  return {
    CurrentChallenge: state.BestImages.CurrentChallenge
  }
}
export default connect(mapStatesToProps, null)(Details)
