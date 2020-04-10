import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon_arrow_back from 'react-native-vector-icons/MaterialIcons';
import Sort from 'react-native-vector-icons/MaterialIcons';
import Time from 'react-native-vector-icons/MaterialIcons';
import arror_icon from '../../asserts/arrow_icon.png';
import Ion_Icon from 'react-native-vector-icons/Ionicons';
import image_link from '../../asserts/attachicon.png';
import image_arro from '../../asserts/arrow.png';
import CardView from 'react-native-cardview';
import pro_image from '../../asserts/technician-section.png';
import img1 from '../../asserts/dollor.jpeg';
import img2 from '../../asserts/2.jpg';
import img3 from '../../asserts/3.jpg';
import {FlatGrid} from 'react-native-super-grid';

import React, {Fragment} from 'react';
import image from '../../asserts/profile.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default class Login extends React.Component {
    render() {
        return (
            <View style={styles.conatainer}>

              <View style={styles.view_tabel}>

              <View style={styles.view_long_line}></View>

<View style={styles.view_tabel_inner}>
<View style={styles.view_sr_no}>
  <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>S.No</Text>
</View>


<View style={styles.view_account}>
  <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>Account</Text>
</View>

<View style={styles.view_gateway}>
  <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
    GateWay
  </Text>
</View>

<View style={styles.view_date}>
  <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>Date</Text>
</View>

<View style={styles.view_balance}>
  <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
    Balance
  </Text>
</View>
<View style={styles.view_remarks}>
  <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
    Remarks
  </Text>
</View>
</View>
<View style={styles.view_long_line}></View>


{/* <View style={styles.view_tabel_inner2}>
<View style={styles.view_sr_no_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>


<View style={styles.view_account_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>

<View style={styles.view_gateway_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    paypal
  </Text>
</View>

<View style={styles.view_date_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>26-09-2019</Text>
</View>

<View style={styles.view_balance_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    10,000.00
  </Text>
</View>

<View style={styles.view_remarks_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    Successful
  </Text>
</View>
</View>
<View style={styles.view_long_line}></View>


<View style={styles.view_tabel_inner2}>
<View style={styles.view_sr_no_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>


<View style={styles.view_account_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>

<View style={styles.view_gateway_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    paypal
  </Text>
</View>

<View style={styles.view_date_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>26-09-2019</Text>
</View>

<View style={styles.view_balance_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    10,000.00
  </Text>
</View>

<View style={styles.view_remarks_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    Successful
  </Text>
</View>
</View>
<View style={styles.view_long_line}></View>


<View style={styles.view_tabel_inner2}>
<View style={styles.view_sr_no_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>


<View style={styles.view_account_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>

<View style={styles.view_gateway_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    paypal
  </Text>
</View>

<View style={styles.view_date_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>26-09-2019</Text>
</View>

<View style={styles.view_balance_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    10,000.00
  </Text>
</View>

<View style={styles.view_remarks_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    Successful
  </Text>
</View>
</View>
<View style={styles.view_long_line}></View>


<View style={styles.view_tabel_inner2}>
<View style={styles.view_sr_no_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>


<View style={styles.view_account_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>

<View style={styles.view_gateway_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    paypal
  </Text>
</View>

<View style={styles.view_date_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>26-09-2019</Text>
</View>

<View style={styles.view_balance_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    10,000.00
  </Text>
</View>

<View style={styles.view_remarks_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    Successful
  </Text>
</View>
</View>
<View style={styles.view_long_line}></View>


<View style={styles.view_tabel_inner2}>
<View style={styles.view_sr_no_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>


<View style={styles.view_account_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>

<View style={styles.view_gateway_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    paypal
  </Text>
</View>

<View style={styles.view_date_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>26-09-2019</Text>
</View>

<View style={styles.view_balance_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    10,000.00
  </Text>
</View>

<View style={styles.view_remarks_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    Successful
  </Text>
</View>
</View>
<View style={styles.view_long_line}></View>


<View style={styles.view_tabel_inner2}>
<View style={styles.view_sr_no_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>


<View style={styles.view_account_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>1</Text>
</View>

<View style={styles.view_gateway_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    paypal
  </Text>
</View>

<View style={styles.view_date_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>26-09-2019</Text>
</View>

<View style={styles.view_balance_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    10,000.00
  </Text>
</View>

<View style={styles.view_remarks_data}>
  <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
    Successful
  </Text>
</View>
</View> */}
<View style={styles.view_long_line}></View>
</View> 
</View>
);
}
}

const styles = StyleSheet.create({
    conatainer: {
      flex: 1,
      backgroundColor: '#ffffff',
    },

    view_line1: {
      height: '100%',
      flexDirection: 'column',
      marginLeft: wp('1.5%'),
      marginRight: wp('1.5%'),
      width: wp('0.2%'),
      backgroundColor: '#ffffff',
    },
    view_line_right: {
      height: '100%',
      flexDirection: 'column',
      width: wp('0.2%'),
      backgroundColor: 'rgba(0, 0, 0, .4)',
    },
  
    view_tabel: {
      flex:1,
      marginTop:wp('20%'),
      width: wp('100%'),
      height: wp('70%'),
    },
    view_tabel_inner: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
      width:'100%',
      height:wp('7%'),
    },
    view_tabel_inner2: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignContent: 'flex-start',
      alignItems: 'flex-start',
      alignSelf: 'flex-start',
      width:'100%',
      height:wp('6%'),
    },
    view_sr_no: {
      width: wp('10%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_account: {
      width: wp('15%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_gateway: {
      width: wp('17%'),
      paddingLeft: wp('1%'),
      paddingRight: wp('1%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_date: {
      width: wp('19%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_balance: {
      width: wp('19%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_remarks: {
        width: wp('20%'),
        height:'100%',
       
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
    view_sr_no_data: {
      width: wp('10%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      fontWeight:'200',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_date_data: {
      width: wp('19%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_account_data: {
      width: wp('15%'),
      paddingLeft: wp('1%'),
      paddingRight: wp('1%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_gateway_data: {
      width: wp('17%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_balance_data: {
      width: wp('19%'),
      height:'100%',
      borderRightWidth: wp('0.2%'),
      borderRightColor: 'rgba(0, 0, 0, .4)',
      alignContent: 'center',
      alignItems: 'center',
      justifyContent: 'center',
    },
    view_remarks_data: {
        width: wp('20%'),
        height:'100%',
       
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      },
    view_long_line: {
      height: wp('0.2%'),
      flexDirection: 'column',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, .4)',
    },
  });