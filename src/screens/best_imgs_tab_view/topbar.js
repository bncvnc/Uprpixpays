
import React, {Fragment, Back} from 'react';

import Icon_bar from 'react-native-vector-icons/MaterialIcons';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';

class Topbar extends React.Component {
  render() {
    return (
      <View style={styles.conatainer}>
        <View style={styles.view_header}>
          <View style={styles.view_icon1}>
            <Icon_bar name="menu" size={wp('8%')} color="balck" />
          </View>
          <View style={styles.view_text}>
            <Text
              style={{
                paddingTop: wp('1%'),
                paddingBottom: wp('0.1%'),
                fontSize: wp('6%'),
                fontWeight: '500',
              }}>
              Best Images
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Topbar;

const styles = StyleSheet.create({
  conatainer: {
    height: hp('10%'),
    width: wp('100%'),
    backgroundColor: '#F4F7FC',
  },
  view_header: {
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    elevation: 5,
    paddingTop: hp('2%'),
    alignContent: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('10%'),
  },
  view_icon1: {
    flex: 0.8,
    justifyContent: 'flex-start',
    alignSelf: 'center',
    paddingLeft: wp('5%'),
    alignItems: 'flex-start',
    alignContent: 'center',
  },

  view_text: {
    flex: 2.2,
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  view_icon2: {
    flex: 0.15,
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_image: {
    flex: 0.14,
    justifyContent: 'center',
    alignSelf: 'auto',
    borderRadius: wp('5%'),
    height: wp('10%'),
    width: wp('10%'),
    alignItems: 'center',
    alignContent: 'center',
  },
});
