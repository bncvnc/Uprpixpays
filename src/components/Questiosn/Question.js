
import React, { Fragment } from 'react';
import img1 from '../../images/voteSubmited.png';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import {
    SafeAreaView,
    StyleSheet,
    TouchableHighlight,
    TouchableOpacity,
    Modal,
    ScrollView,
    TextInput,
    View,
    Image,
    Text,
    ImageBackground,
    StatusBar,
    ActivityIndicator
} from 'react-native';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
export default class ImageBig extends React.Component {
  // add_voting_to_Images:(index)=>(dispatch(add_voting_to_Images(index))),
  state={
    loading:false
  }
    render() {  
      let text=''
  
        const dataArray = [
            { title: "View Answer", content: text },
          ];
       
        return (
          
            // <View style={styles.container}>
                <TouchableOpacity onPress={() =>{
                  this.props.voteOnImage(this.props.index);
                  this.props.OnVotePressed(this.props.item.id);
                }}  style={styles.body_view}>
                    <ImageBackground 
                    style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                    source={{uri: this.props.item.url}}
                    resizeMode={'contain'}
                    onLoadStart={() => { this.setState({ loading: true })} }
                    onLoadEnd={() => { this.setState({ loading: false })} }
                    >
                      {this.state.loading?<View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                        <ActivityIndicator  size={'large'} color={'#29ABE2'} />
                        <Text style={{color:'white'}}>
                          Loading Image ...
                        </Text>
                        </View>:<React.Fragment></React.Fragment>}
                        {this.props.item.selected?<Image  source={img1}  style={{height:wp('15%'),width:wp('15%')}} />:<React.Fragment></React.Fragment>}

                    </ImageBackground>
                </TouchableOpacity>
            // </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        zIndex:0,
      },
      img_bg:
      {
        flex:1,
        backgroundColor:'#fff',
        resizeMode:'contain',
        zIndex:0,

      },
      header:
      { 
        flexDirection:'row',
        backgroundColor:'#3b5999',
        padding:10,
        height:55,
        alignContent:'center',
        alignItems:'center',
        
        
      },
      headIcon:
      {
        flex:0.5,
        fontSize:25,
        fontWeight:'100',
        color:'#fff'
      },
      textHead:
      {
        flexDirection:'row',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginLeft:15
      },
      textHeadView:
      {
        fontSize:18,
        fontWeight:'bold',
        color:'#fff'
      },
     
      body_view:
      {
        width:wp('100%'),
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        // marginTop:15,
        padding:10,
        // marginLeft:10,
        // marginRight:10,
        backgroundColor:'#000000',
        elevation:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
            },
        shadowOpacity: 0.25,
        shadowRadius: 5.84,
        marginBottom:15,
      },
      InputTxtBox:
      {
          flexDirection:'row',
          padding:10,
          marginLeft:10,
          marginRight:10,
          borderRadius:3,     
      },
      
      TxtInputStyles:
      {
        
        fontSize:16,
        fontWeight:'bold',
        marginLeft:5,
        color:'#3b5999'
      },
      TxtInputStyles1:
      {
        fontSize:15,
        fontWeight:'bold',
        marginLeft:15,
      },
      BoxView:
    {
        alignContent:'flex-start',
        alignItems:'flex-start',
        justifyContent:'flex-start'
    },
      Boxstyle:
      {
        flexDirection:'row',
          padding:10,
          marginTop:10,
          width:350,
          backgroundColor:'#fff',
          borderRadius:3,
          elevation:5,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 5.84,
            marginBottom:5,
            alignContent:'center',
            alignItems:'center',
      },
      TxtOpStyles:
      {
        fontSize:16,
        fontWeight:'bold',
        marginLeft:5,
        color:'#3b5999'
      },
      TxtOpStyles1:
      {
        fontSize:16,
        fontWeight:'700',
        marginLeft:5,
        color:'#000'
      },
      Boxstyle1:
      {
        flexDirection:'row',
          padding:10,
          marginTop:10,
          width:350,
          borderRadius:3,
         
      },
      SocialBtnBox:
      {
        flexDirection:'row',
        marginLeft:15,
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:5   
      },
      BtnBox:
      {
          width:250,
          height:50,
          backgroundColor:'#3b5999',
          borderRadius:100,
          elevation:10,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 3,
            },
            shadowOpacity: 0.25,
            shadowRadius: 5.84,
            marginBottom:20,
            alignContent:'center',
            alignItems:'center',
            justifyContent:'center',
            marginTop:5
        
      },
      BtnTxtView:
      {
        fontSize:16,
        color:'#fff',
        fontWeight:'bold',
        
      },
});
