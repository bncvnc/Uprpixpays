
import img1 from '../../images/1.jpg';



import React, {Fragment} from 'react';
import image from '../../images/profile.png';
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

class OpenChalennges extends React.Component {
  render() {
    return (
      <View style={styles.conatainer}>
        <View style={styles.topbar_view}>
          <Topbar />
        </View>

        <View style={styles.view_photo_parent}>

        
            
          <View style={styles.view_photo}>
            <ImageBackground style={styles.view_img_bg} source={img1}>
              <View style={styles.view_overlay}>
                  <View style={styles.view_overlay1}>

                      <Text style={{fontSize:wp('3.5%'),fontWeight:'600',color:'#ffffff'}}>SPONSORED BY URPIXSPAY.COM,INC</Text>

                  </View>
                  <View>

                  </View>

                  <Text style={{fontWeight:'bold',fontSize:wp('6%'),
                color:'#ffffff',fontFamily:'Raleway',letterSpacing:wp('1%')}}>Portrait Photography</Text>
              </View>

              
            </ImageBackground>
          </View>

          <Text style={{fontSize:wp('4%'),fontWeight:'500',marginTop:wp('3%')}}>YOUR BEST SHOTS!</Text>
          <Text style={{fontSize:wp('3.5%'),marginTop:wp('3%'),textAlign:'justify',
}}>It is a long established fact that a reader will
               be distracted by the readable content of a page when 
               looking at its layout. The point of using Lorem 
               Ipsum is that it has a more-or-less normal distribution 
               of letters, as opposed to using 'Content here, content 
               here', making it look like readable English. Many desktop 
               publishing packages and web page editors now use Lorem Ipsum 
               as their default model text, and a search for 'lorem ipsum' 
               will uncover many web sites still in their infancy. Various
                versions have evolved 
              over the years, sometimes by accident, sometimes on purpose
               (injected humour and the like).</Text>
        </View>

            <View style={styles.view_text}>
                <Text style={{fontWeight:'bold',fontSize:wp('6%'),marginTop:wp('6%'),
                color:'#ffffff',fontFamily:'Raleway'}}>Portrait Photography</Text>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    padding:wp('2%'),
    alignItems: 'center',
    alignSelf: 'auto',
    
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    padding:wp('2%'),
    marginTop:wp('2%'),
    height: wp('120%'),
    width: wp('98%'),
    
   
  },
 
  view_photo: {
    height:wp('60%'),
    width:wp('95%'),
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
    justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center'
  },

  view_text:
  {
      justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center'
  },
  view_overlay1: {
    height:wp('9%'),
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    position:'absolute',
    top:0,
    justifyContent:'center',
      alignContent:'center',
      alignItems:'center',
      alignSelf:'center'
  },
  
});
export default connect(null,null) (OpenChalennges);