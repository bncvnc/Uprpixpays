
import Port from '../../images/dollor.jpeg';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import React, { Fragment } from 'react';
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
    Linking,
    Platform
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { Navigation } from 'react-native-navigation';
import {UserProfileData} from '../../store/actions/index';
import Lightbox from 'react-native-lightbox';
class UrPortfolio extends React.Component {
  constructor(props) {
    super(props);
    Navigation.events().bindComponent(this);
  }
  navigationButtonPressed({ buttonId }) {
    if (buttonId === "openSideDrawer") {
    (!this.isSideDrawerVisible) ? this.isSideDrawerVisible = true : this.isSideDrawerVisible = false
    Navigation.mergeOptions(this.props.componentId, {
     sideMenu: {
       left: {
         visible: true,
       }
     }
   });
  }
  if (buttonId === "openSideDrawer2") {
    this.changeScreen('UrPicsPay.Notification','Notifications');
  }
 }
 changeScreen = (screen,title) =>{
  Navigation.push(this.props.componentId, {
    component: {
      name: screen,
      passProps: {
        text: 'Pushed screen'
      },
      options: {
        sideMenu: {
          left: {
              visible: false,
              enabled: false
            }
      },
        topBar: {
          visible:true,
          title:{
            text:title,
            alignment:'center'
          }
        },
        bottomTabs:{
          visible:false,
          drawBehind:true,
          animate:true
        },
        animations: {
            push: {
               waitForRender: true
            }
         }
      }
    }
  });
}
    state = {
        screenHeight: 0,
        Portfolio:{},
        userpix:{},
        pickImage:[],
    }
    componentDidMount () {
      this.props.UserData();
      fetch('https://urpixpays.com/stagging_urpixpays/portfolio/'+this.props.user.no)
      .then((response) =>response.json())
      .then((responseData) =>{
        this.setState({
          Portfolio:responseData.data,
          userpix:responseData.data.userpix

        })
      })
    }

    ImagePickr2 = () => {
      ImagePicker.showImagePicker({
        title: 'Please Pick An Image',
        maxWidth:1200,
        maxHeight:1200
      }, res => {
        console.log(res);
        if (res.didCancel) {
          console.log('User Canceled')
        } else if (res.error) {
          console.log('Error', res.error)
        } else {
          this.setState(prevState => {
            return {
              pickImage: prevState.pickImage.concat({
                key: Math.random(),
                uri: res.uri,
                source: res.data,
                filesize: res.fileSize
              })
            }
          })
  
          this.submitImage();
        }
      });
    }
  
    submitImage = () => {
      this.setState({loading: true});
     let idImage = this.state.pickImage;
      fetch('https://urpixpays.com/stagging_urpixpays/saveProfilepic', {
        method: 'POST',
        headers: {
           Accept: 'application/json',
           'Content-Type': 'application/json',
        },
        body: JSON.stringify({
           "uid":this.props.user.no,
           "image": idImage,
        }),
     })
        .then((response) => response.json())
        .then((responseData) => {
          this.setState({loading: false});

           console.log(responseData)
           if(responseData.success){
            fetch('https://urpixpays.com/stagging_urpixpays/portfolio/'+this.props.user.no)
            .then((response) =>response.json())
            .then((responseData) =>{
              this.setState({
                Portfolio:responseData.data,
                userpix:responseData.data.userpix
      
              })
            })
              Alert.alert(
                 'Alert',
                 'Your profile was updated successfully!',
                 [
                   {text: 'OK', onPress: () => console.log('OK Pressed')},
                 ],
                 {cancelable: false},
               );

              //  dispatch(MyChallenges())
           }
  
        })
        .catch((err) => {
          //  dispatch(uiStopLoading());  
          this.setState({loading: false});
           console.log(err)
        })
        .done();
  
  
      // this.props.upload(idImage, this.props.CurrentChallenge[0].id,this.props.componentId);
      this.setState({
        pickImage:[],
      })
  
    }
    gotoScreen = (screen,extraDAta) =>{
      
      Navigation.push(this.props.componentId, {
          component: {
            name: screen,
            passProps: {
              ...extraDAta
            },
            options: {
              sideMenu: {
                left: {
                    visible: false,
                    enabled: false
                  }
            },
            bottomTabs:{
              visible:false,
              drawBehind:true,
              animate:true
            },
              topBar: {
                visible:true,
                background:{
                  color:'black'
                },
                backButton:{
                  color:"white",
                  title:''
                }
              },
              animations: {
                push: {
                   waitForRender: true
                }
             }
            }
          }
        });
        
  }





    onContentSizeChange = (contentHeight) => {
        // Save the content height in state
        content = contentHeight + 100;
        this.setState({ screenHeight: content });
    };

    ShareonFb = () => {
      Linking.canOpenURL('https://www.facebook.com/sharer.php?u=https://urpixpays.com/portfolio/'+this.props.user.no).then(supported => {
        if (supported) {
          Linking.openURL('https://www.facebook.com/sharer.php?u=https://urpixpays.com/portfolio/'+this.props.user.no);
        } else {
          console.log("Don't know how to open URI: ");
        }
      });
    }

    ShareOnlinkdin = () =>{

      Linking.canOpenURL('https://www.linkedin.com/shareArticle?mini=true&url=https://urpixpays.com/invite_sign_up/'+this.props.user.no).then(supported => {
        if (supported) {
          Linking.openURL('https://www.linkedin.com/shareArticle?mini=true&url=https://urpixpays.com/invite_sign_up/'+this.props.user.no);
        } else {
          console.log("Don't know how to open URI: ");
        }
      });
    }

    ShareOnTweter = () =>{
      Linking.canOpenURL('https://twitter.com/share?text=Please check my Portfolio on UrPixPays. &url=https://urpixpays.com/portfolio/'+this.props.user.no).then(supported => {
        if (supported) {
          Linking.openURL('https://twitter.com/share?text=Please check my Portfolio on UrPixPays. &url=https://urpixpays.com/portfolio/'+this.props.user.no);
        } else {
          console.log("Don't know how to open URI: ");
        }
      });
    }
    ShareOnGmail   = () =>{
      Linking.canOpenURL('mailto:?Subject=Please check my Portfolio on UrPixPays. https://urpixpays.com/portfolio/'+this.props.user.no+' and Turn your photos into cash').then(supported => {
        if (supported) {
          Linking.openURL('mailto:?Please check my Portfolio on UrPixPays. https://urpixpays.com/portfolio/'+this.props.user.no+' and Turn your photos into cash');
        } else {
          console.log("Don't know how to open URI: ");
        }
      });
    }
    componentWillReceiveProps() {
      fetch('https://urpixpays.com/stagging_urpixpays/portfolio/'+this.props.user.no)
      .then((response) =>response.json())
      .then((responseData) =>{
        this.setState({
          Portfolio:responseData.data,
          userpix:responseData.data.userpix

        })
      })
    }
    render() {  
        const  {Portfolio} =this.state;
        const {userpix} = Portfolio;
        console.log(this.state.userpix.rank);
        let enable = this.state.screenHeight + 100 > 100;
        return (

          <View style={styles.container}>
            <ScrollView>
            <View style={styles.Section}>
                <ImageBackground style={styles.PortImgSection} source={Portfolio.cover?{
                  uri:Portfolio.cover
                }:Port} />
                <View style={styles.ProSection}>
                    <View style={styles.ProfileSection}>
                        <TouchableOpacity onPress={() =>{
                          this.ImagePickr2();
                        }} style={styles.ProfileSectionStyle}>
                          <ImageBackground style={{width:'100%',height:'100%',justifyContent:'center',alignContent:'center',alignSelf:'auto',alignItems:'center'}} borderRadius={wp('8%')} source={Portfolio.cover?{
                  uri:'https://urpixpays.com/public/images/profile_pictures/'+this.props.pro_data.images
                }:Port}> 
                          <Icons style={styles.ProfileSectionStyleIcons}  name='pencil' />
                          </ImageBackground>
                          
                        </TouchableOpacity>
                        <View style={styles.ProfileNameSection}>
                            <Text style={styles.ProfileNameSectionTxt}>{Portfolio.u_name}</Text>
                        </View>
                    </View>
                    <View style={styles.PointSection}>
                        <View style={styles.PointSectionStyle}>
                          <TouchableOpacity onPress={() =>{
                            this.ShareonFb();
                          }} style={styles.facebookPage}>
                              <Icons style={styles.SocialPageSectionIcons} name="facebook" />
                          </TouchableOpacity>
                          <TouchableOpacity 
                          onPress={() =>{
                            this.ShareOnlinkdin();
                          }}
                          style={styles.facebookPage}>
                              <Icons style={styles.SocialPageSectionIcons} name="linkedin" />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() =>{
                            this.ShareOnTweter();
                          }} style={styles.facebookPage}>
                              <Icons style={styles.SocialPageSectionIcons} name="twitter" />
                          </TouchableOpacity>
                          <TouchableOpacity onPress={() =>{
                            this.ShareOnGmail();
                          }} style={styles.facebookPage}>
                              <Icons style={styles.SocialPageSectionIcons} name="envelope" />
                          </TouchableOpacity>  
                        </View>
                    </View>
                </View>
                <View style={styles.SocialSection}>
                    <View style={styles.SocialPageSection}>
                        <View style={styles.PointSectionView}>
                            <Text style={styles.PointSectionViewTxt}>PIX ID</Text>
                            <Text style={styles.PointNumSectionViewTxt}>{this.props.user.no}</Text>
                        </View>
                        <View style={styles.PixPointSectionVieww}>
                            <Text style={styles.PointSectionViewTxt}>PIX POINTS</Text>
                            <Text style={styles.PointNumSectionViewTxt}>{this.state.userpix.pixpoint}</Text>
                        </View>
                        <View style={styles.RankPointSectionVieww}>
                            <Text style={styles.PointSectionViewTxt}>RANK</Text>
                            <Text style={styles.PointNumSectionViewTxt}>{this.state.userpix.rank > 8 ?'Pro':this.state.userpix.rank }</Text>
                        </View>
                        <View style={styles.CountryPointSectionVieww}>
                            <Text style={styles.PointSectionViewTxt}>COUNTRY</Text>
                            <Text style={styles.PointNumSectionViewTxt}>{Portfolio.country}</Text>
                        </View>
                    </View>
                    
                </View> 
                {Portfolio.about_user?<React.Fragment>
                  <View style={{paddingLeft:wp('2%'),marginBottom:wp('2%')}}>
                  <Text style={{fontSize:wp('3.5%'),fontWeight:'bold'}}> 
                    About
                  </Text>
                </View>
                <View style={{paddingHorizontal:wp('2%'),marginBottom:wp('2%')}}>
                  <Text style={{fontSize:wp('3%')}}>
                    {Portfolio.about_user}
                  </Text>
                </View>
                </React.Fragment>:<React.Fragment></React.Fragment>}
            
            <View style={{width:wp('100%'),height:wp('0.3%'),backgroundColor:'#a1a1a1',marginBottom:Platform.OS === 'ios' ? wp('2%') : wp('5%')}} /> 

                {/* <View style={styles.ImgSection}> */}
              
           
                <FlatList
            data ={Portfolio.images}
            numColumns={3}
            renderItem={({item,index}) =>{
              // if(index > 5 )
              // {
              //   index = index + 5;
              // }
              return(
                <TouchableOpacity onPress={() =>{
                  let ExtraDAta ={
                    AllImages:Portfolio.images,
                    initialindex:index
                  }
                  this.gotoScreen('UrPicsPay.ShowProfileImages',ExtraDAta)
                }} style={styles.ImgSectionStyle}>
                <Image 
                style={styles.ImgSectionView} 
                source={{
                  uri:item.url
                }} />
          </TouchableOpacity>
               
              )
            }}
            />  
                </View>
                </ScrollView>
              {/* </View> */}
        </View>
           
        );
    }
}
const styles = StyleSheet.create({

  container: {
      flex: 1,
      backgroundColor:'#ebeff8',
      zIndex:0,
    },
    Section:
    {
    },
    PortImgSection:
    {
      width:wp('100%'),
      height:Platform.OS === 'ios' ? wp('45%') : wp('35%'),
      resizeMode:'contain',
    },
    ProSection:
    {
      flexDirection:'row'
    },
    ProfileSection:
    {
      padding:wp('2%'),
      justifyContent:'center',
      alignItems:'center'
    },
    ProfileSectionStyle:
    {
      width:wp('12%'),
      height:wp('12%'),
      backgroundColor:'#29ABE2',
      borderRadius:wp('100%'),
      justifyContent:'center',
      alignItems:'center'
    },
    ProfileSectionStyleIcons:
    {
      fontSize:15,
      color:'#29ABE2',
      position:'absolute',
      bottom:-wp('1.0%'),
      right:-wp('1%'),
    },
    ProfileNameSection:
    {
 
      marginTop:wp('1%'),
      justifyContent:'center',
      alignItems:'center'
    },
    ProfileNameSectionTxt:
    {
      fontSize:12,
      fontWeight:'700',
      textAlign:'center',
    },
    PointSection:
    {
      flex:1,
      alignItems:'center',
      marginTop:wp('2%')
    },
    PointSectionStyle:
    {
      flexDirection:'row',
      width:wp('67%'),
      height:wp('12%'),
      backgroundColor:'#f1f1f1',
      alignItems:'center',
      padding:wp('2%'),
      borderRadius:wp('1%'),
      elevation:3,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 3.5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1,
    },
    PointSectionView:
    {
      flex:0.33
    },
    PointSectionViewTxt:
    {
      fontSize:12,  
      fontWeight:'bold',
      textAlign:'center'
    },
    PointNumSectionViewTxt:
    {
      fontSize:13,  
      textAlign:'center'
    },
    PixPointSectionVieww:
    {
      flex:0.39
    },
    RankPointSectionVieww:
    {
      flex:0.35
    },
    CountryPointSectionVieww:
    {
      flex:0.45
    },
    SocialSection:
    {
      marginTop:wp('2%'),
      justifyContent:'center',
      alignItems:'center',
      marginBottom:wp('3%')
    },
    SocialPageSection:
    {
      flexDirection:'row',
      width:wp('94%'),
      height:wp('14%'),
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      elevation:3,
      shadowColor: "#000",
      shadowOffset: {
      width: 0,
      height: 3.5,
      },
      shadowOpacity: 0.25,
      shadowRadius: 1,
      borderRadius:5,
    },
    facebookPage:
    {
      flex:0.3,
      justifyContent:'center',
      alignItems:'center',
    },
    SocialPageSectionIcons:
    {
      fontSize:16,
      color:'#29ABE2',
    },
    ImgSection:
    {
      flexDirection:'row',
    },
    ImgSectionStyle:
    {
      padding:wp('2%')
    },
    ImgSectionView:
    {
      width:wp('30%'),
      height:wp('30%'),
      
    },
});

const mapStateToProps = state => {
  return {
    user: state.user.user,
    pro_data:state.BestImages.SaveuserProfiledata,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rankFucn: () => dispatch(getDetailsImage()),
    UserData: () => dispatch(UserProfileData())
   
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(UrPortfolio);
