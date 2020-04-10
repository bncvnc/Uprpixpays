

import React from 'react';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Topbar from './topbar';
class InfoPage extends React.Component {
  render() {
    return (
      <View style={styles.Container}>
      {/* <View style={styles.topbar_view}>
          <Topbar />
        </View>
         */}

        <ScrollView>
        <View style={styles.View_flex1}>
          <View style={styles.Box_section}>
            <View style={styles.Text_View}>
              <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'500'}}>
                Natural Beauty
              </Text>
            </View>
            <View style={styles.desc_View}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: wp('3%'),
                  marginTop: wp('3%'),
                  letterSpacing:wp('-0.2'),
                  fontWeight:'500',
                  alignItems: 'center',
                  textAlign: 'justify',
                }}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s.
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'column',flex:0.8,paddingLeft:wp('1%')}}>
            <View style={styles.Box_section1}>
              <View style={styles.desc_View}>
                <Image
                  style={{width: wp('31%'), height: wp('25.5%')}}
                  source={require('../../images/b_1.png')}
                />
              </View>
            </View>
            <View style={styles.Box_section2}>
              <View style={styles.desc_View}>
                <Image
                  style={{width: wp('31%'), height: wp('25.5%')}}
                  source={require('../../images/b_2.png')}
                />
              </View>
            </View>
          </View>
        </View>
        <View style={styles.bg_section}>
          <View style={styles.view_column}>
            <View style={styles.Icon}>
              <Image
                style={{width: wp('10%'), height: wp('10%')}}
                source={require('../../images/11u.png')}
              />
            </View>
            <View style={styles.Text_bold}>
              <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
                Charge
              </Text>
              </View>
              <View style={styles.text_description}>
              <Text style={{fontSize: wp('2%')}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>
          <View style={styles.view_column}>
            <View style={styles.Icon}>
              <Image
                style={{width: wp('10%'), height: wp('10%')}}
                source={require('../../images/12u.png')}
              />
            </View>
            <View style={styles.Text_bold}>
              <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
                FLip
              </Text>
              </View>
              <View style={styles.text_description}>
              <Text style={{fontSize: wp('2%')}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>
           <View style={styles.view_column}>
            <View style={styles.Icon}>
              <Image
                style={{width: wp('10%'), height: wp('10%')}}
                source={require('../../images/13u.png')}
              />
            </View>
            <View style={styles.Text_bold}>
              <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
                Wand
              </Text>
              </View>
              <View style={styles.text_description}>
              <Text style={{fontSize: wp('2%')}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>
          <View style={styles.view_column}>
            <View style={styles.Icon}>
              <Image
                style={{width: wp('10%'), height: wp('10%')}}
                source={require('../../images/14u.png')}
              />
            </View>
            <View style={styles.Text_bold}>
              <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
                Vote
              </Text>
              </View>
              <View style={styles.text_description}>
              <Text style={{fontSize: wp('2%')}}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.spons_section}>
          <View style={styles.Tex_sec}>
            <Text style={{fontSize:wp('5%')}}> Sponsporship / Invitation </Text>
          </View>
          <View
            style={{
              width: wp('50%'),
              height: wp('0.4'),
              backgroundColor: '#29ABE2',
              marginTop: wp('2%'),
            }}
          />
          <Text style={{fontSize: wp('3%'), marginTop: wp('2%'),fontWeight:'200',justifyContent:'center',alignContent:'center',
          alignItems:'center',textAlign:'center'}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.and typesetting
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.b_View}>
            <View style={styles.menu_view}>
              <Text
                style={{
                  fontSize: wp('3.5%'),
                  textAlign: 'center',
                  marginTop: wp('2%'),
                  color: '#29ABE2',
                }}>
                {' '}
                TYPE 1
              </Text>
            </View>
            <Text
              style={{
                fontSize: wp('2.5%'),
                marginTop: wp('2%'),
                padding: wp('3%'),
                fontWeight:'200'
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
          <View style={styles.b_View1}>
            <View style={styles.menu_view}>
              <Text
                style={{
                  fontSize: wp('3.5%'),
                  textAlign: 'center',
                  marginTop: wp('2%'),
                  color: '#29ABE2',
                }}>
                {' '}
                TYPE 2
              </Text>
            </View>
            <Text
              style={{
                fontSize: wp('2.5%'),
                marginTop: wp('2%'),
                padding: wp('3%'),
                fontWeight:'200'
              }}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Text>
          </View>
        </View>
        </ScrollView>
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  engine: {
    position: 'absolute',
    right: 0,
  },
  Container: {
    flex: 1,
  },
  View_flex: {
    flexDirection: 'row',
    width: wp('100%'),
    height: wp('15%'),
    backgroundColor: '#666666',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  H_Text: {
    width: wp('80%'),
    alignItems: 'center',
    marginTop: '3.5%',
  },
  View_flex1: {
      width:wp('100%'),
      marginTop:wp('2%'),
      height:wp('62%'),
    flexDirection: 'row',
  },
  Box_section: {
      flex:1.2,
    backgroundColor: '#29ABE2',
    shadowColor: '#000',
    shadowOffset: {
    width: 2,
    height: 2,
    },
    shadowOpacity: 0.4,
    padding: wp('5%'),


    marginTop: wp('4%'),
    marginBottom: wp('4%'),
    marginLeft: wp('4%'),
    marginRight: wp('1%'),

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  Box_section1: {
    marginTop: wp('4%'),
    shadowColor: '#000',
    shadowOffset: {
    width: 1,
    height: 1,
    },
    shadowOpacity: 0.4,
    width:wp('10%'),
  },
  Box_section2: {
    shadowColor: '#000',
    shadowOffset: {
    width: 1,
    height: 1,
    },
    shadowOpacity: 0.4,
    marginTop: wp('3%'),
    width:wp('10%'),

  },
  Text_View: {
    alignItems: 'center',
  },
  bg_section: {
    justifyContent:'space-between',
    flexDirection: 'row',
    paddingLeft:wp('2%'),
    paddingRight:wp('2%'),
    paddingTop:wp('5%'),
    paddingBottom:wp('5%'),
    width: wp('100%'),
    height: wp('52%'),
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOffset: {
    width: 2,
    height: 2,
    },
    shadowOpacity: 0.4,
    elevation: 7,
  },
  view_column:
  {
      flex:1,
      padding:wp('1%'),
      flexDirection:'column',
      justifyContent:'center',
      alignSelf:'center',
      alignItems:'center',
      alignContent:'center',
  },
  Icon: {
    
  },
  Text_bold: {
      justifyContent:'center',
      marginTop:wp('4%'),
      alignContent:'center',alignItems:'center',
      alignSelf:'center'
  },
 
   text_description:
   {
       marginTop:wp('3%'),
    justifyContent:'center',
    alignContent:'center',alignItems:'center',
    alignSelf:'center'
   },

  spons_section: {
    flexDirection: 'column',
    marginTop: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Tex_sec: {
    alignItems: 'center',
  },
  b_View: {
    width: wp('45%'),
    height: wp('30%'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    backgroundColor: '#F2F2F2',

    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    borderRadius:wp('2%'),
    

    shadowRadius: 4.0,
    elevation: 7,
    marginTop: wp('5%'),
    marginLeft: wp('3%'),
  },
  menu_view: {
    width: wp('45%'),
    height: wp('8%'),
    borderRadius:wp('2%'),
    backgroundColor: '#fff',
    backgroundColor: '#F2F2F2',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    elevation: 7,
  },
  b_View1: {
    width: wp('45%'),
    height: wp('30%'),
    backgroundColor: '#fff',
    shadowColor: '#000',
    borderRadius:wp('2%'),
    backgroundColor: '#F2F2F2',

    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    elevation: 7,
    marginTop: wp('5%'),
    marginLeft: wp('2%'),
  },
});

export default InfoPage;
