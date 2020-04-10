

import Votes from '../../images/ClosedVotes.png';
import Rank from '../../images/Closedrank.png';
import Cash from '../../images/ClosedCash.png';
import clocks from '../../images/Closedclocks.png';
import LinearGradient from 'react-native-linear-gradient';
// import NewImg from '../../images/123.jpg';
import { FlatGrid } from 'react-native-super-grid';

import React, { Fragment } from 'react';

import {
    MyPhoto,
    getDetailsImage,
    GetVoteImages
} from '../../store/actions/index';

import {Navigation} from 'react-native-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';

import moment from 'moment';
// import Topbar from './topbar';
import { connect } from 'react-redux';

class ChallangeEnded extends React.Component {

    componentDidMount() {
        this.props.rankFucn();
        this.props.GetAllImages();
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

  render() {
    // console.log(this.props.CurrentChallenge[0]);
    var today = new Date();
    var Christmas =this.props.CurrentChallenge[0].start_time? new Date(this.props.CurrentChallenge[0].start_time.replace(/-/g, "/")):0;
    let checkDate = (Date.now()) / 1000.0;
    var diffMs = this.props.CurrentChallenge[0].start_time?moment(this.props.CurrentChallenge[0].start_time).diff(moment().format(), 'seconds'):0;

    let millisends = this.props.CurrentChallenge[0].timeline*60*60-diffMs;
    return (
      <View style={styles.conatainer}>
    <ScrollView>
    
          <View style={styles.headerImage}>
            <Image 
            style={styles.headerImageView} 
            source={{uri:this.props.CurrentChallenge[0].image_url}} 
            resizeMode={'contain'}
            />   
          </View>
          <View style={styles.BodySec}>
                <View style={styles.BodyIcons}>
                    <View style={styles.IconsVote}>
                        <Image style={styles.IconsVoteView} source={Votes} />
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.IconsVoteViewTxt}>Votes</Text>
                            <Text style={styles.IconsVoteViewTxtt}>{this.props.CurrentChallenge[0].votes}</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() =>{
                this.changeScreen('UrPicsPay.ChallengePrice', 'Challenge Prize')
                    }} style={styles.IconsCash}>
                        <Image style={styles.IconsVoteView} source={Cash} />
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.IconsVoteViewTxt}>Cash Prize</Text>
                            <Text style={styles.IconsVoteViewTxtt}>{this.props.CurrentChallenge[0].price}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() =>{
                         this.changeScreen('UrPicsPay.RankPage', 'Rank')
                    }} style={styles.IconsRank}>
                        <Image style={styles.IconsVoteView} source={Rank} />
                        <View style={{flexDirection:'column'}}>
                            <Text style={styles.IconsVoteViewTxt}>Rank</Text>
                            {/* <Text style={styles.IconsVoteViewTxtt}>32</Text> */}
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.BodyIcons}>
                    <View style={styles.IconsVote}>
                        {/* <Image style={styles.IconsVoteView} source={Votes} /> */}
                        {/* <View style={{flexDirection:'column'}}> */}
                            <Text style={[styles.IconsVoteViewTxt]}>{this.props.CurrentChallenge[0].title}</Text>
                            {/* <Text style={styles.IconsVoteViewTxtt}>{this.props.CurrentChallenge[0].votes}</Text> */}
                        {/* </View> */}

                    </View>
                </View>
                <View style={styles.BodyIconss}>
                    <View style={styles.IconsVotee}>
                        <Image style={styles.IconsVoteView} source={clocks} />
                        <Text style={styles.IconsVoteViewTxttt}>{millisends}</Text>
                        <View style={styles.ExpireBox}>
                            <Text style={styles.IconsVoteViewTxtttt}>Expired</Text>
                        </View>
                    </View>   
                </View>
                <View style={styles.BodyDesc}>
                <Text style={styles.BodyDeschead}>
                    {this.props.CurrentChallenge[0].title}
                    </Text>
                    <Text style={styles.BodyDescTxt}>
                  {this.props.CurrentChallenge[0].description}
                    </Text>
                </View>
                {/* <View style={styles.LastTxt}>
                    <Text style={styles.BodyDescTxtt}>Packge Is Expired</Text>
                </View> */}

<View style={{flexDirection:'column'}}>
                <View style={{flexDirection:'row',padding:5, alignContent:'center',alignItems:'center',marginTop:wp('2%')}}>
                  <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.inviteChallange', 'Invite Challenges')}>
                  <LinearGradient colors={['#29ABE2', '#0099CC','#3B5998']}  style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Invite Friend</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.Details', 'Details')}>
                    <LinearGradient  colors={['#5C4AE5', '#4432CC','#3F2B96']} style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Challenge Detail</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                  
                </View>
                <View style={{flexDirection:'row',padding:5, alignContent:'center',alignItems:'center',marginTop:wp('2%')}}>
                  <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.RankPage', 'Rank')}>
                  <LinearGradient  colors={['#FDC830', '#D8A31E','#F37335']} style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Rank</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.changeScreen('UrPicsPay.ChallengePrice', 'Challenge Prize')}>
                    <LinearGradient colors={['#38EF7D', '#22C65C','#1FAA51']} style={{width:wp('45%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Prize</Text>
                    </LinearGradient>
                    </TouchableOpacity>
                   
                </View>
                <View style={{flexDirection:'row',padding:5, alignContent:'center',alignItems:'center',marginTop:wp('2%')}}>
                  <TouchableOpacity onPress={() => { 
                    this.changeScreen('UrPicsPay.ChallengeTopPhotos', 'Top Photos')
                    
                     }}>
                  <LinearGradient colors={['#FF4B2B','#BC2713','#BC2713']} style={{width:wp('92%'),height:wp('10%'),marginRight:wp('2%'),
                    justifyContent:'center',alignItems:'center',padding:5,elevation:5,borderRadius:3}}>
                          <Text style={{fontSize:wp('4%'),fontWeight:'bold',color:'#fff'}}>Top Photos</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                 
                </View>
              </View>
          </View>
               
    </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor:'#d1d1d1',
    flexDirection: 'column',
   
  },
  headerImage:
  {
      alignContent:'center',
      justifyContent:'center',
      alignItems:'center',
      margin:15
  },
  headerImageView:
  {
    width:wp('95%'),
    height:wp('50%')
  },
  BodySec:
  {
    alignContent:'center',
    justifyContent:'center',
    alignItems:'center',
  },
  BodyIcons:
  {
    flexDirection:'row',
    width:wp('95%'),
    height:wp('18%'),
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center',
    alignContent:'center',
    elevation:5,
    borderRadius:2,
    marginBottom:wp('3%')
  },
  IconsVote:
  {
    flex:0.35,
    flexDirection:'row',
    marginLeft:wp('5%'),
    alignContent:'center',
    alignItems:'center',
    marginTop:wp('2%')
  },
  IconsVotee:
  {
    flexDirection:'row',
    marginLeft:wp('5%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
  },
 
  IconsCash:
  {
    flex:0.4,
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    marginTop:wp('2%')
  },
  IconsRank:
  {
    flex:0.3,
    flexDirection:'row',
    alignContent:'center',
    alignItems:'center',
    marginTop:wp('2%')
  },
  IconsVoteView:
  {
    width:wp('8.5%'),
    height:wp('8.5%')
  },
  IconsVoteViewTxt:
  {
    fontSize:wp('2.9%'),
    color:'#000',
    marginLeft:wp('3%'),
    fontWeight:'bold'
  },
  IconsVoteViewTxtt:
  {
    fontSize:wp('2.8%'),
    color:'#000',
    marginLeft:wp('3%'),
    fontWeight:'600'
  },
  BodyIconss:
  {
    flexDirection:'row',
    width:wp('95%'),
    height:wp('15%'),
    backgroundColor:'#fff',
    elevation:5,
    borderRadius:2,
    marginBottom:wp('3%')
  },
  BodyDesc:
  {
    flexDirection:'column',
    width:wp('95%'),
   
    backgroundColor:'#fff',
    elevation:5,
    borderRadius:2,
    marginBottom:wp('1%')
  },
  IconsVoteViewTxttt:
  {
    fontSize:wp('9%'),
    marginLeft:wp('10%'),
    color:'#000'
  },
  IconsVoteViewTxtttt:
  {
    fontSize:wp('5%'),
    padding:3,
    color:'#fff'
  },
  BodyDescTxt:
  {
    fontSize:wp('3%'),
    padding:15,
    color:'#000',
    textAlign:'justify'
  },
  LastTxt:
  {
   
    width:wp('95%'),
    height:wp('15%'),
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#fff',
    elevation:5,
    borderRadius:2,
    marginBottom:wp('3%')
  },
  BodyDescTxtt:
  {
    fontSize:wp('5%'),
    padding:15,
    color:'#cd2026',
    textAlign:'justify'
  },
  BodyDeschead:
  {
    fontSize:wp('3.5%'),
    padding:15,
    color:'#000',
    fontWeight:'bold'
  },
  ExpireBox:
  {
      backgroundColor:'#cd2026',
      width:wp('20%'),
      marginLeft:wp('9%'),
      borderRadius:5,
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center'
    },
});


const mapStateToProps = (state) => {
  return{
    pics: state.BestImages.ChallangeEnded,
    CurrentChallenge: state.BestImages.CurrentChallenge,
    user: state.user.user,
    pro_data: state.BestImages.SaveuserProfiledata,
    logindata: state.user.user,
    isLoading:state.isLoading.isLoading
  }
}

  const mapsDispatchToProps = dispatch =>{
    return{
      GetImages :()=>dispatch(MyPhoto()),
      rankFucn: () => dispatch(getDetailsImage()),
      GetAllImages: () => (dispatch(GetVoteImages())),
    }
  }
  


export default connect(mapStateToProps, mapsDispatchToProps)(ChallangeEnded);