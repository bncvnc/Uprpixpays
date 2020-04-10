

import React, {Fragment, Back} from 'react';

import Icon_arrow_back from 'react-native-vector-icons/MaterialIcons';



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

                    <View style={styles.view_iocn_parent}>
                    <View style={styles.view_icon1}>
                      <Icon_arrow_back name="arrow-back" size={wp('8%')} color="#000000" />
                    </View>
                    </View>
                 
                    <View style={styles.view_text}>
                      <Text
                        style={{
                          paddingTop: wp('1%'),
                          paddingBottom: wp('0.1%'),
                          color:'#ffffff',
                          fontSize:wp('6%'),
                          fontWeight:'bold'
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

       height:hp('10%'),
       width:wp('100%'), 
      backgroundColor: '#F4F7FC',
    },
    view_header: {
      justifyContent: 'flex-end',
      alignSelf: 'flex-end',
      alignItems: 'flex-end',
      paddingTop:hp('2%'),
      alignContent: 'center',
      backgroundColor:'#1c1c1c',
      flexDirection: 'row',
      width:wp('100%'),
      height:hp('10%'),
      
    },
    view_iocn_parent:
    {
      flex:1,
      justifyContent:'flex-start',
      alignItems:'flex-start',
      alignContent:'flex-start',
      alignSelf:'flex-start',
      

    },
    view_icon1: {
     
      marginLeft:wp('5%'),
      height:wp('10%'),
      width:wp('10%'),
      padding:wp('1%'),
      backgroundColor:'#ffffff',
      borderRadius:wp('5%'),
      justifyContent: 'center',
      alignSelf: 'auto',
      alignItems: 'center',
      alignContent: 'center',
    },
  
    view_text: {
      flex:2,
      justifyContent:'flex-start',
      alignItems:'flex-start',
      alignContent:'flex-start',
      alignSelf:'flex-start',
      
       
    },
    
   

   
  });
  