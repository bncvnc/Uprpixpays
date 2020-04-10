
import React, {Fragment, Back} from 'react';

import Icon_arrow_back from 'react-native-vector-icons/MaterialIcons';
import Icon_move_vert from 'react-native-vector-icons/MaterialIcons';

import pro_image from '../../images/technician-section.png';


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
        render(){

            return (
                <View style={styles.conatainer}>
                  <View style={styles.view_header}>
                  <View style={styles.view_icon1}>
                      <Icon_arrow_back name="arrow-back" size={wp('8%')} color="#ffffff" />
                    </View>
                    <View style={styles.view_text}>
                      <Text
                        style={{
                          paddingTop: wp('1%'),
                          paddingBottom: wp('0.1%'),
                          color:'#ffffff',
                          fontSize:wp('6%'),
                          fontWeight:'500'
                        }}>
                        Ahmad Fraz
                      </Text>
                      </View>

                      <View style={styles.view_image}>
                          <Image style={{height: wp('9%'), width: wp('9%')}}
                          source={pro_image}/>
                      </View>
          
                      <View style={styles.view_icon2}>
                      <Icon_move_vert name="more-vert" size={wp('10%')} color="#ffffff" />
                    </View>
                  </View>

               

                </View>
        
              );
        } 
  }
  export default Topbar;

  const styles = StyleSheet.create({
    conatainer: {

       height:hp('10%'),
       width:wp('100%'), 
      backgroundColor: '#F4F7FC',
    },
    view_header: {
      justifyContent: 'center',
      alignSelf: 'auto',
      alignItems: 'center',
      paddingTop:hp('2%'),
      alignContent: 'center',
      backgroundColor:'#8CC63F',
      flexDirection: 'row',
      width:wp('100%'),
      height:hp('10%'),
      
    },
    view_icon1: {
      flex:0.2,
      justifyContent: 'center',
      alignSelf: 'auto',
      alignItems: 'center',
      alignContent: 'center',
    },
  
    view_text: {
      
        flex:1,
        justifyContent: 'center',
        alignSelf: 'auto',
        alignItems: 'center',
        alignContent: 'center',
    },
    view_icon2: {
      
        flex:0.15,
        justifyContent: 'center',
        alignSelf: 'auto',
        alignItems: 'center',
        alignContent: 'center',
    },
    view_image: {
      
        flex:0.14,
        justifyContent: 'center',
        alignSelf: 'auto',
        borderRadius:wp('5%'),
        height:wp('10%'),
        width:wp('10%'),
        alignItems: 'center',
        alignContent: 'center',
    },
   

   
  });
  