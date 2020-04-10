
import React, { Fragment, Back } from 'react';
import Icon_bar from 'react-native-vector-icons/MaterialIcons';
import Icon_arrow_back from 'react-native-vector-icons/MaterialIcons';

import picture from '../../images/picture.png';
import invite from '../../images/invite.png';
import rank from '../../images/rank.png';
import bars from '../../images/bars.png';
import details from '../../images/details.png';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  ImageBackground,
  TextInput,
  View,
  Image,
  Text,
  StatusBar,
} from 'react-native';

class Topbar extends React.Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  render() {
    return (
      <View style={styles.conatainer}>


        <View style={styles.view_header}>
          <View style={styles.view_icon1}>
            <View style={styles.view_iocn_parent}>
              <View style={styles.view_icon2}>
                <Icon_arrow_back name="arrow-back" size={wp('8%')} color="#000000" />
              </View>
            </View>



            <Modal
              animationType="none"
              transparent={true}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View
                style={{
                  height: '100%',
                  width: '100%',
                  backgroundColor: 'rgba(153, 153, 153, 0.4)',
                }}>
                <View
                  style={{
                    justifyContent: 'flex-start',
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    alignContent: 'flex-start',
                    shadowOffset: { width: 2, height: 2 },
                    shadowColor: 'black',
                    shadowOpacity: 0.5,
                    borderTopLeftRadius: wp('2%'),
                    height: wp('85%'),
                    padding: wp('2%'),
                    width: wp('55%'),
                    alignItems: 'flex-start',
                  }}>
                  <View style={styles.view_model}>

                    <View style={styles.view_sub_main}>
                      <View style={styles.view_sub_img}>
                        <Image style={styles.sub_imgs} source={details} />
                      </View>
                      <View style={styles.view_text_pro}>
                        <Text style={{ fontSize: wp('3%'), fontWeight: '200' }}>
                          Details
                          </Text>
                      </View>
                    </View>
                    <View style={styles.view_sub_line}></View>

                    <View style={styles.view_sub_main}>
                      <View style={styles.view_sub_img}>
                        <Image style={styles.sub_imgs} source={rank} />
                      </View>
                      <View style={styles.view_text_pro}>
                        <Text style={{ fontSize: wp('3%'), fontWeight: '200' }}>
                          Prize
                          </Text>
                      </View>
                    </View>
                    <View style={styles.view_sub_line}></View>

                    <View style={styles.view_sub_main}>
                      <View style={styles.view_sub_img}>
                        <Image style={styles.sub_imgs} source={picture} />
                      </View>
                      <View style={styles.view_text_pro}>
                        <Text
                          style={{ fontSize: wp('3.5%'), fontWeight: '200' }}>
                          Top Photos
                          </Text>
                      </View>
                    </View>
                    <View style={styles.view_sub_line}></View>

                    <View style={styles.view_sub_main}>
                      <View style={styles.view_sub_img}>
                        <Image style={styles.sub_imgs} source={bars} />
                      </View>
                      <View style={styles.view_text_pro}>
                        <Text
                          style={{ fontSize: wp('3.5%'), fontWeight: '200' }}>
                          Rank
                          </Text>
                      </View>
                    </View>
                    <View style={styles.view_sub_line}></View>

                    <View style={styles.view_sub_main}>
                      <View style={styles.view_sub_img}>
                        <Image style={styles.sub_imgs} source={invite} />
                      </View>
                      <View style={styles.view_text_pro}>
                        <Text
                          style={{ fontSize: wp('3.5%'), fontWeight: '200' }}>
                          Invite Friends
                          </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
          <View style={styles.view_text}>
            <Text
              style={{
                paddingTop: wp('1%'),
                paddingBottom: wp('0.1%'),
                color: '#ffffff',
                fontSize: wp('6%'),
                fontWeight: '500',
              }}>
              Details
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

    backgroundColor: '#F4F7FC',
  },

  // view_iocn_parent: {
  //   flex: 1,
  //   justifyContent: 'flex-start',
  //   alignItems: 'flex-start',
  //   alignContent: 'flex-start',
  //   alignSelf: 'flex-start',
  // },
  view_text_pro:
  {
    flex: 1.5,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },
  view_sub_text_pro:
  {
    flex: 1.5,
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
  },

  view_model: {
    height: '100%',
    alignSelf: 'center',
    alignItems: 'flex-start',
    alignContent: 'center',
    width: '100%',
    paddingTop: wp('2%'),
    top: hp('10%'),
    position: 'absolute',
    left: wp('0%'),
    backgroundColor: '#ffffff',
  },
  view_sub_main: {
    height: wp('14%'),
    width: '100%',
  },
  view_sub_img: {

    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  sub_imgs: {
    height: wp('8%'),
    width: wp('8%'),
  },
  view_line: {
    height: wp('0.1%'),
    width: '100%',
    backgroundColor: '#999999',
  },
  view_sub_line: {
    height: wp('0.08%'),
    marginTop: wp('1%'),
    marginBottom: wp('1%'),
    width: '100%',
    backgroundColor: 'rgba(153, 153, 153, 0.5)',
  },
  view_header: {
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: 'black',
    shadowOpacity: 0.4,
    alignContent: 'center',
    backgroundColor: '#666666',
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
    flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'auto',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },

  view_iocn_parent:
  {
    flex: 1,
    // marginTop:wp('2.7%'),
    justifyContent:'center',
    alignItems: 'flex-start',
    // alignContent: 'flex-start',
    // alignSelf: 'flex-start',


  },
  view_icon2: {

    height: wp('10%'),
    width: wp('10%'),
    padding: wp('1%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
});
