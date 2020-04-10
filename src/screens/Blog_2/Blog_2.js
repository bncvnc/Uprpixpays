
import pro_image from '../../images/profile.png';
import img1 from '../../images/1.jpg';


import React, {Fragment} from 'react';

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
import { connect } from 'react-redux';
class AlBlogs extends React.Component {
  render() {
    return (
      <View style={styles.conatainer}>
        <View style={styles.topbar_view}>
          <Topbar />
        </View>

        <ScrollView>
          <View style={styles.view_parent_view}>
            <View style={styles.view_flex_1_view1}>
              <View style={styles.view_flex_1_view}>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    marginTop:wp('1%'),
                    fontWeight: '600',
                  }}>
                  A Comfortabel Car is best for your journey
                </Text>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    fontWeight: '100',
                    marginTop: wp('1.7%'),
                  }}>
                  If true, the grid will be scrolling horizontally. If you want
                  your item to fill the height when using a horizontal grid, you
                  should give it a
                </Text>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_photo}>
                  <ImageBackground
                    style={styles.view_img_bg}
                    source={img1}></ImageBackground>
                </View>
              </View>
            </View>
            <View style={styles.view_flex_2_view2}>
              <View style={styles.view_flex_1_view}>
                <View style={styles.view_flexes}>
                  <View style={styles.view_flex_1}>
                    <View style={styles.view_person_pic}>
                      <Image style={styles.img_style} source={pro_image} />
                    </View>
                  </View>

                  <View style={styles.view_flex_2}>
                    <View style={styles.view_texes}>
                      <Text style={styles.text_name}>Adnan Ali</Text>
                      <Text style={styles.text_comments4}>Auguts 12,2019</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_texes1}>
                  <Text style={[styles.text_comments1]}>200</Text>
                  <Text style={styles.text_comments2}>views </Text>
                  <Text style={styles.text_comments3}>5</Text>
                  <Text style={styles.text_comments4}>comment </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.view_parent_view}>
            <View style={styles.view_flex_1_view1}>
              <View style={styles.view_flex_1_view}>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    marginTop:wp('1%'),
                    fontWeight: '600',
                  }}>
                  A Comfortabel Car is best for your journey
                </Text>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    fontWeight: '100',
                    marginTop: wp('1.7%'),
                  }}>
                  If true, the grid will be scrolling horizontally. If you want
                  your item to fill the height when using a horizontal grid, you
                  should give it a
                </Text>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_photo}>
                  <ImageBackground
                    style={styles.view_img_bg}
                    source={img1}></ImageBackground>
                </View>
              </View>
            </View>
            <View style={styles.view_flex_2_view2}>
              <View style={styles.view_flex_1_view}>
                <View style={styles.view_flexes}>
                  <View style={styles.view_flex_1}>
                    <View style={styles.view_person_pic}>
                      <Image style={styles.img_style} source={pro_image} />
                    </View>
                  </View>

                  <View style={styles.view_flex_2}>
                    <View style={styles.view_texes}>
                      <Text style={styles.text_name}>Adnan Ali</Text>
                      <Text style={styles.text_comments4}>Auguts 12,2019</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_texes1}>
                  <Text style={[styles.text_comments1]}>200</Text>
                  <Text style={styles.text_comments2}>views </Text>
                  <Text style={styles.text_comments3}>5</Text>
                  <Text style={styles.text_comments4}>comment </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.view_parent_view}>
            <View style={styles.view_flex_1_view1}>
              <View style={styles.view_flex_1_view}>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    marginTop:wp('1%'),
                    fontWeight: '600',
                  }}>
                  A Comfortabel Car is best for your journey
                </Text>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    fontWeight: '100',
                    marginTop: wp('1.7%'),
                  }}>
                  If true, the grid will be scrolling horizontally. If you want
                  your item to fill the height when using a horizontal grid, you
                  should give it a
                </Text>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_photo}>
                  <ImageBackground
                    style={styles.view_img_bg}
                    source={img1}></ImageBackground>
                </View>
              </View>
            </View>
            <View style={styles.view_flex_2_view2}>
              <View style={styles.view_flex_1_view}>
                <View style={styles.view_flexes}>
                  <View style={styles.view_flex_1}>
                    <View style={styles.view_person_pic}>
                      <Image style={styles.img_style} source={pro_image} />
                    </View>
                  </View>

                  <View style={styles.view_flex_2}>
                    <View style={styles.view_texes}>
                      <Text style={styles.text_name}>Adnan Ali</Text>
                      <Text style={styles.text_comments4}>Auguts 12,2019</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_texes1}>
                  <Text style={[styles.text_comments1]}>200</Text>
                  <Text style={styles.text_comments2}>views </Text>
                  <Text style={styles.text_comments3}>5</Text>
                  <Text style={styles.text_comments4}>comment </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.view_parent_view}>
            <View style={styles.view_flex_1_view1}>
              <View style={styles.view_flex_1_view}>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    marginTop:wp('1%'),
                    fontWeight: '600',
                  }}>
                  A Comfortabel Car is best for your journey
                </Text>
                <Text
                  style={{
                    fontSize: wp('2.5%'),
                    fontWeight: '100',
                    marginTop: wp('1.7%'),
                  }}>
                  If true, the grid will be scrolling horizontally. If you want
                  your item to fill the height when using a horizontal grid, you
                  should give it a
                </Text>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_photo}>
                  <ImageBackground
                    style={styles.view_img_bg}
                    source={img1}></ImageBackground>
                </View>
              </View>
            </View>
            <View style={styles.view_flex_2_view2}>
              <View style={styles.view_flex_1_view}>
                <View style={styles.view_flexes}>
                  <View style={styles.view_flex_1}>
                    <View style={styles.view_person_pic}>
                      <Image style={styles.img_style} source={pro_image} />
                    </View>
                  </View>

                  <View style={styles.view_flex_2}>
                    <View style={styles.view_texes}>
                      <Text style={styles.text_name}>Adnan Ali</Text>
                      <Text style={styles.text_comments4}>Auguts 12,2019</Text>
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.view_flex_2_view}>
                <View style={styles.view_texes1}>
                  <Text style={[styles.text_comments1]}>200</Text>
                  <Text style={styles.text_comments2}>views </Text>
                  <Text style={styles.text_comments3}>5</Text>
                  <Text style={styles.text_comments4}>comment </Text>
                </View>
              </View>
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
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    backgroundColor: '#D3D3D3',
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    padding: wp('2%'),
    width: wp('98%'),
  },

  view_photo: {
    height: wp('20%'),
    paddingTop:wp('2%'),
    paddingBottom:wp('1%'),

    width: wp('30%'),
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
    alignSelf: 'center',
  },

  view_text: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
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
    alignSelf: 'center',
  },
  view_person_pic: {
    height: wp('10%'),
    width: wp('10%'),
    padding: wp('2%'),
    backgroundColor: '#F4F7FC',
    borderRadius: wp('5%'),
    marginBottom:wp('2%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  img_style: {
    height: wp('8.5%'),
    width: wp('8.5%'),
  },
  view_flexes: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
    marginTop: wp('5%'),
  },
  view_flex_1: {
    flex: 0.4,
  },
  view_flex_2: {
    flex: 1.6,
  },

  view_flex_3: {
    flex: 1,
    flexDirection: 'row',
  },
  view_texes1: {
    position: 'absolute',
    bottom: wp('2%'),
    marginTop: wp('3%'),
    flexDirection: 'row',
  },
  text_comments1: {
    fontSize: wp('2.5%'),
    color: '#626260',
    marginRight:wp('0.6%')
  },
  text_comments2: {
    fontSize: wp('2.5%'),
    marginRight:wp('1.5%'),
    color: '#626260',
  },
  text_comments3: {
    fontSize: wp('2.5%'),
    marginRight:wp('0.6%'),

    color: '#626260',
  },
  text_comments4: {
    fontSize: wp('2.5%'),
    color: '#626260',
  },
  text_name: {
    fontWeight: '500',
    fontSize: wp('3%'),
  },
  view_gray: {
    backgroundColor: '#626260',
    flexDirection: 'row',
    height: wp('25%'),
    width: wp('100%'),
    marginTop: wp('10%'),
  },
  view_flex_one: {
    flex: 0.8,
    marginLeft: wp('3%'),
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  view_flex_two: {
    flex: 1.2,
    marginRight: wp('3.5%'),
    flexDirection: 'row',
    marginLeft: wp('3%'),
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  view_icon_mail: {
    height: wp('8%'),
    width: wp('12%'),
    marginRight: wp('0.6%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#1DA1F3',
  },
  view_input: {
    height: wp('8%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: wp('40%'),
    backgroundColor: '#F4F7FC',
  },
  input: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: wp('3%'),
    color: '#999999',
  },
  view_style: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  view_parent_view: {
    flexDirection: 'column',
    padding: wp('2%'),
    marginTop: wp('2%'),
    height: wp('40%'),
    width: wp('98%'),
    backgroundColor: 'white',
  },
  view_flex_1_view: {
    flex: 1.2,
  },
  view_flex_2_view: {
    flex: 0.8,
    flexDirection:'row',
    marginTop:wp('2%'),
    marginRight:wp('2%'),
    justifyContent:'flex-end',
    alignContent:'flex-end',
    alignItems:'flex-end',
    alignSelf:'flex-end'
  },
  view_flex_1_view1: {
    flex: 1,
    flexDirection: 'row',
  },
  view_flex_2_view2: {
    flex: 1,
    flexDirection: 'row',
  },
});
export default connect(null,null) (AlBlogs);