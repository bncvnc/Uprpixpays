
import pro_image from '../../images/technician-section.png';
import img1 from '../../images/1.jpg';

import {FlatGrid} from 'react-native-super-grid';

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

class Rank extends React.Component {
  render() {
    const items = [
      {name: 'TURQUOISE', code: '#1abc9c'},
      {name: 'EMERALD', code: '#2ecc71'},
      {name: 'PETER RIVER', code: '#3498db'},
      {name: 'AMETHYST', code: '#9b59b6'},
      {name: 'WET ASPHALT', code: '#34495e'},
      {name: 'GREEN SEA', code: '#16a085'},
      {name: 'NEPHRITIS', code: '#27ae60'},
      {name: 'BELIZE HOLE', code: '#2980b9'},
      {name: 'WISTERIA', code: '#8e44ad'},
      {name: 'MIDNIGHT BLUE', code: '#2c3e50'},
      {name: 'SUN FLOWER', code: '#f1c40f'},
      {name: 'CARROT', code: '#e67e22'},
      {name: 'ALIZARIN', code: '#e74c3c'},
      {name: 'CLOUDS', code: '#ecf0f1'},
      {name: 'CONCRETE', code: '#95a5a6'},
      {name: 'ORANGE', code: '#f39c12'},
      {name: 'PUMPKIN', code: '#d35400'},
      {name: 'POMEGRANATE', code: '#c0392b'},
      {name: 'SILVER', code: '#bdc3c7'},
      {name: 'ASBESTOS', code: '#7f8c8d'},
    ];
    return (
      <View style={styles.conatainer}>
        <View style={styles.topbar_view}>
          <Topbar />
        </View>

        <View style={styles.view_photo_parent}>
          <View style={styles.view_photo}>
            <ImageBackground style={styles.view_img_bg} source={img1}>
              <View style={styles.view_overlay}>
                <View style={styles.view_flexes}>
                  <View style={styles.view_flex_1}>
                    <View style={styles.view_person_pic}>
                      <Image style={styles.img_style}
                      source={pro_image} />
                    </View>
                  </View>
                  <View style={styles.view_flex_1}>

                      <View style={styles.view_texes}> 
                      <Text style={styles.text_name}>Arif Sahab</Text>
                    <Text style={styles.text_date}>Auguts 12,2019</Text>
                    </View>
                    <View style={styles.view_votes}>
                    <Text style={styles.text_name}>786</Text>
                    <Text style={styles.text_name}>votes</Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.view_lines}>
            <View style={styles.view_line1}></View>
            <View style={styles.view_line}></View>
            <View style={styles.view_line2}></View>

        </View>

      

        <FlatGrid
          itemDimension={wp('30%')}
          items={items}
          spacing={wp('1%')}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({item, index}) => (
            <View style={styles.view_photo_1}>
              <ImageBackground style={styles.view_img_bg} source={img1}>
                <View style={styles.view_overlay}>
                  <View style={styles.view_number}>
                    <Text style={styles.text_style}>12</Text>
                  </View>

                  <View style={styles.view_text_parent}>
                    <Text style={styles.text_number}>786</Text>
                    <Text style={styles.text_votes}>votes</Text>
                  </View>
                </View>
              </ImageBackground>
            </View>
          )}
        />
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
    backgroundColor: '#F4F7FC',
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
  view_text_parent: {
    height: wp('6%'),
    width: wp('18%'),
    flexDirection: 'row',
    marginTop: wp('6%'),
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
    fontWeight: 'bold',
    fontSize: wp('4%'),
    color: '#ffffff',
  },
  text_votes: {
    fontWeight: 'bold',
    fontSize: wp('3%'),
    color: '#ffffff',
  },
  gridView: {
    flex: 1,
  },

  view_person_pic: {
    height: wp('23%'),
    width: wp('23%'),
    marginLeft:wp('10%'),
    marginTop:wp('6%'),
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
    marginLeft:wp('6%'),

  },
  view_votes:
  {
    marginTop:wp('5%'),
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
  view_lines:
  {
      flexDirection:'row',
      marginBottom:wp('1.5%'),
      marginTop:wp('1%')
  },
  view_line1:
  {
    height: wp('2%'),
    width: wp('2%'),
    marginRight:wp('-0.5%'),
    zIndex:9000,
    padding: wp('0.5%'),
    backgroundColor: '#8CC63F',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',

  },
  view_line2:
  {
    height: wp('2%'),
    width: wp('2%'),
    padding: wp('0.5%'),
    marginLeft:wp('-0.5%'),
    zIndex:9000,
    backgroundColor: '#8CC63F',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',

  }

});
export default connect(null,null) (Rank);