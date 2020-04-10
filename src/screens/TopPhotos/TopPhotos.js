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
  FlatList,
  TouchableOpacity,
  Platform,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import {
    widthPercentageToDP as wp, 
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import FastImage from 'react-native-fast-image';
import img1 from '../../images/buysell1111.png';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";
import Ficons from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import image from '../../images/img.png';
import Topbar from '../../components/topbar/topbar';
import MenuDrawer from 'react-native-side-drawer';
import {GetImages} from '../../store/actions/index'
import SideDrawer from '../sidedrawer/sidedrawer';
import BlackTopbar from '../../components/blackTopBar/blackTopBar';
import {connect} from 'react-redux';
const { height } = Dimensions.get('window');

class TopPhotos extends Component {
  constructor(props){
    super(props);
   this.props.GetAllImages();

  }

    state = {
        screenHeight: 0,
        open: false,
    }
    vote = () =>{
  
      //dispatch(uiStartLoading());
    fetch('https://urpixpays.com/stagging_urpixpays/challenges/voting/cid/439/uid/222')
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
      "POST Response",
      "Response Body -> "+JSON.stringify(responseData)
      console.log(responseData);
        if (responseData.wand_charge) {
          alert(`images shown`);
          // dispatch(uiStopLoading());
    
         
          
          // changeScreen('UrPicsPay.mychallenges');
        } else if(!responseData.data) {
          alert('Failed! '+ responseData.data);
        //   dispatch(uiStopLoading());
        //   alert(responseData.data);
        }
    
      })
      .catch((err)=>console.log(err))
      .done();
    
    
    }
    
    onContentSizeChange = (contentWidth, contentHeight) => {
      // Save the content height in state
      this.setState({ screenHeight: contentHeight });
    };
    renderFotter =() => {
      return(
        <View style={{paddingVertical:20}}>
            <ActivityIndicator animating size="large" />
        </View>
      )
    }

    // drawerContent = () => {
    //   return (
    //         <View style={[styles.animatedBox]}>
    //         <SideDrawer OpenSideDrawer={this.toggleOpen}  goto={(s)=>this.gotoScreen(s)}  />
    //     </View>
          
    //   );
    // };
    toggleOpen = () => {
      this.setState({ open: !this.state.open });
    };
    gotoScreen = (screen) =>{
      
      Navigation.push(this.props.componentId, {
          component: {
            name: screen,
            passProps: {
              text: 'Pushed screen'
            },
            options: {
              topBar: {
                visible:false
              }
            }
          }
        });
        
  }

  render ()
  {
    const scrollEnabled = this.state.screenHeight > height;
    return (
      <View style={{flex:1,zIndex:0}}>
          {/* <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={250}
          overlay={true}
          opacity={.9}
        > */}
        <View style={styles.topbarBox}>
        <BlackTopbar OpenSideDrawer={this.toggleOpen} style={{zIndex:9999}} title={'Details'}/>
      </View>
      <ScrollView
       scrollEnabled={scrollEnabled}
       onContentSizeChange={this.onContentSizeChange}
       >
      <View style={styles.mainView}>
       <View style={styles.TopPhotosOuterView}>
        <View style={styles.ImagePadding}>
        <ImageBackground 
        source={this.props.GetAllImages()}
          

        style={{width:wp('30%'),height:wp('30%')}} >
        <View style={styles.ImageOverLay}>
            <View style={styles.Imagenumber}>
                <View style={styles.TextOuter}>
                <Text style={styles.Text}>
                    1
                </Text>
                </View>
            </View>
            <View style={styles.ImageVotes}>
                  <View style={styles.VotesOuterVIew}> 
                        <Text style={styles.VotesInnerView}>
                          300 votes
                        </Text>
                  </View>
            </View>
        </View>
        </ImageBackground>
        </View>

        
        
       </View>
        
      </View>
      </ScrollView>
      {/* </MenuDrawer> */}
      </View>
      
    )
  }


}


const styles = StyleSheet.create({
  topbarBox:
  {
    width:wp('100%'),
    height:hp('10%'),
    borderBottomColor:'rgba(0,0,0,0.5)',
    borderBottomWidth:wp('.4%'),

    // shadowOffset:{  width: 10,  height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
  },
  bottombarBox:{
    width:wp('100%'),
    height:hp('10%'),
    position:'absolute',
    backgroundColor:'white',
    top:hp('90%'),
    zIndex:9999999,
  },
  mainView:{
    //padding:wp('4%'),
    marginBottom:Platform.OS ==='android' ? wp('4%'):0
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
  },
  animatedBox: {
   // position:'absolute',
    //top:hp('10%'),
    // borderTopColor:'rgba(0,0,0,.5)',
    // borderTopWidth:wp('.4'),
    //bottom:0,
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //paddingTop: 20
   
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },
  sideMenuContainer: {
   
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20
  },
  
  sideMenuProfileIcon:
  {
    resizeMode: 'center',
    width: 150, 
    height: 150, 
    borderRadius: 150/2
  },
  
  sideMenuIcon:
  {
    resizeMode: 'center',
    width: 28, 
    height: 28, 
    marginRight: 10,
    marginLeft: 20
    
  },
  menuText:{
  
    fontSize: 15,
    color: '#222222',
  },
  TopPhotosOuterView:{
    flexDirection:'row',
    flexWrap:"wrap",
    flex:1,
  },
  ImageView:{

  },
  ImagePadding:{
    margin:wp('1%')
  },
  ImageOverLay:{
    height:'100%',
    width:'100%',
    backgroundColor:'rgba(0,0,0,.5)'
  },
  Imagenumber:{
    flex:1,
  },
  ImageVotes:{
    flex:2,
    //marginTop:wp('4%'),
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'auto',
    marginBottom:wp('6%')
  },
  Text:{
    color:'black',
    fontSize:wp('3.5%')
  },
  TextOuter:{
    width:wp('5%'),
    height:wp('5%'),
    marginTop:wp('1%'),
    marginLeft:wp('1%'),
    borderRadius:wp('1%'),
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    alignSelf:'auto',
    backgroundColor:'white'
  },
  VotesOuterVIew:{
    justifyContent:'center',
    width:wp('20%'),
    alignContent:'center',
    alignItems:'center',
    // paddingLeft:wp('1%'),
    // paddingRight:wp('1%'),
    borderWidth:wp('.2%'),
    borderColor:'white'

  },
  VotesInnerView:{
    color:'white',
    fontSize:wp('4%'),
    fontFamily:'Roboto'
  }
  

});

const mapsDispatchToProps = dispatch =>{
  return{
    GetAllImages :()=>dispatch(VoteImages())
  }
}
const mapStateToProps = (state)=>{
  return{
    VoteImages:state.VoteImages
  }
}

export default connect(mapStateToProps,mapsDispatchToProps)(TopPhotos);
