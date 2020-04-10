import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  FlatList
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import { Navigation } from "react-native-navigation";
import bg from '../../images/bg-img.jpg';
import logo from '../../images/urpixpays-logo.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import badge from '../../images/icon/rank.png';

class BlackTopbar extends Component {

   

      OpenSideDrawer({ buttonId }) {
            
     }  

  render ()
  {

    return (
        <View style={styles.topbarOuter}>
            <TouchableOpacity style={styles.leftSideTopBar} onPress={this.props.OpenSideDrawer}>
            <Icons name={'md-menu'} size={wp('8%')}  />
            </TouchableOpacity>
            <View style={styles.middleSideTopbar}>
            <Text style={styles.topbarText}>
                {this.props.title}
            </Text>
            </View>
            <View style={[styles.rightSideTopbar,{width:wp('12%'),height:wp('12%')}]}>
                {/* <Image source={badg1e} style={{width:wp('12%'),height:wp('12%')}} /> */}
            </View>
        </View>
    )   
  }


}


const styles = StyleSheet.create({
    topbarOuter:{
        width:wp('100%'),
        height:hp('10%'),
        flexDirection:"row",
        alignItems:'center',
        alignContent:'center',
        alignSelf:'auto',
        paddingLeft:wp('5%'),
        backgroundColor:'#9999',
        paddingRight:wp('5%'),
        justifyContent:'space-between',
    },
    topbarText:{
        fontSize:wp('5%'),
        textAlign:'auto'
    }

});

export default BlackTopbar;
