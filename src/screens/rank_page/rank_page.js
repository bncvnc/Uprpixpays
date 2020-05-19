
import pro_image from '../../images/technician-section.png';
import img1 from '../../images/1.jpg';

import FastImage from 'react-native-fast-image';
import React, {Fragment} from 'react';
import Lightbox from 'react-native-lightbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
  TouchableOpacity
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Topbar from './topbar';
import { connect } from 'react-redux';
import {getDetailsImage} from '../../store/actions/index';

class RankPage extends React.Component {

  constructor(props)
  {
    super(props);
    
  }
  componentWillMount =( ) =>{
    // this.props.rankFucn();
  }

  RenderContentData = ({ item, index }) => {
    let colors = [,'#8CC63F','#1B1464', '#ED1E79', '#F7931E','#1B1464','#C1272D'];
    
     index = index + 1
    // console.log(item);

    // if(item.name.length > 10) item.name = item.name.substring(0,15);
    // if(item.user.register_date.length > 10) item.user.register_date = item.user.register_date.substring(0,10);

    let profile = 'avatar.jpg';
    if(item.user){
      profile = item.user.profile_image;
    }
    if(index% colors.length)
    {
      return (

        <View style={[styles.view_photo_parent1,{backgroundColor: colors[index % colors.length] }]}>
          <View style={styles.view_photo}>
            {/* <ImageBackground style={styles.view_img_bg}> */}
              <View style={styles.view_flexes}>
                <View style={styles.view_flex_1}>
                  <View style={styles.view_person_pic}>
                    <Image style={styles.img_style}
                     source={{uri:'https://urpixpays.com/public/images/profile_pictures/'+profile}} />
                  </View>
                </View>

                <View style={styles.view_flex_2}>
                  <View style={styles.view_texes}>
              <Text style={styles.text_name}>{item.user?item.user.name:'no name'}</Text>
              <Text style={styles.text_date}>{item.user?item.user.register_date:'no user'}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <View style={styles.view_votes}>
              <Text style={styles.text_votes}>{item.vote_count}</Text>
                      <Text style={styles.text_votes}>Votes</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.view_flex_3}>
                    <View style={styles.view_rounded}>
                      <Text
                        style={{
                          fontSize: wp('7%'),
                          fontWeight: 'bold',
                          marginTop: wp('12%'),
                          color: '#ffffff',
                          marginLeft: wp('10%'),
                        }}>
                       {index}
                      </Text>
                      <Text
                        style={{
                          fontSize: wp('6%'),
                          fontWeight: 'bold',
                          marginTop: wp('0%'),
                          color: '#ffffff',
                          marginLeft: wp('6%'),
                        }}>
                        Rank
                      </Text>
                    </View>
                  </View>
                {/* </View> */}
              </View>
            
            
          </View>
          <LinearGradient colors={['#29abe2', '#0099cc','#3b5998']} style={{marginBottom:wp('5%'),
           borderBottomRightRadius:25,justifyContent:'center',alignItems:'center',width:wp('90%')
           }}>
              <FlatList
              data={item.images}
              horizontal={true}
              renderItem={(data) =>{
                // if(data.item.u_id == item.u_id){
                return (
                  <View style={{flex:0.3,flexDirection:'row',justifyContent:'center',alignSelf:'center'}}>
                  <View style={[styles.view_votes1],{flexDirection:'column'
                      ,marginLeft:wp('1%'),marginTop:wp('2%'),marginRight:wp('1%')}}>
                    <View style={{marginRight:wp('1%'),justifyContent:'center',alignItems:'center'}} >
                    <Lightbox 
          style={{justifyContent: "center",}}
          springConfig={{ overshootClamping: true }}
            renderContent={() => (
                  <Image style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                               source={{    uri: data.item.url
                              ,priority: FastImage.priority.normal
                              }}
                              resizeMode={'contain'}
                               /> 
            )}
        >
           <ImageBackground style={{width:wp('15%'),height:wp('12%'),marginBottom:wp('2%'),borderRadius:5,marginLeft:wp('2%')}} 
                          source={{uri:data.item.url}}>
                            <View style={styles.view_overlay}>
                              <View style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                                  <Text style={styles.text_votess}>{data.item.vote}</Text>
                              </View>     
                        </View>
                      </ImageBackground>
              </Lightbox>
        
                     
                    </View>
                  </View>    
                  <View style={{width:wp('0.3%'),height:wp('7%'),marginTop:wp('4%'),marginLeft:wp('1%'),
                  marginRight:wp('2%'),backgroundColor:'#fff'}} />
              </View>
                );
                // }else{
                //   return;
                // }
              }}
              keyExtractor={item => {
                Math.random().toString();
              }}
              /> 
              {item.images.length >0 ?<React.Fragment>

              </React.Fragment>:
              <View style={{padding:wp('6%')}}>
                <Text style={{color:'white'}}>
                  This user has not uploaded any picture yet
                </Text>
              </View>
              }
            </LinearGradient>
        </View>
           )
    }
    else{
      return (
        <View style={[styles.view_photo_parent2]}>
        <View style={styles.view_photo}>
          {/* <ImageBackground style={styles.view_img_bg}> */}
            <View style={styles.view_flexes}>
              <View style={styles.view_flex_1}>
                <View style={styles.view_person_pic}>
                  <Image style={styles.img_style}
                   source={{uri:'https://urpixpays.com/public/images/profile_pictures/'+profile}} 
                   />
                </View>
              </View>

              <View style={styles.view_flex_2}>
                <View style={styles.view_texes}>
            <Text style={styles.text_name}>{item.user?item.user.name:'no user'}</Text>
            <Text style={styles.text_date}>{item.user?item.user.register_date:'no date'}</Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.view_votes}>
            <Text style={styles.text_votes}>{item.vote_count}</Text>
                    <Text style={styles.text_votes}>Votes</Text>
                  </View>
                </View>
              </View>

              <View style={styles.view_flex_3}>
                  <View style={styles.view_rounded}>
                    <Text
                      style={{
                        fontSize: wp('7%'),
                        fontWeight: 'bold',
                        marginTop: wp('12%'),
                        color: '#ffffff',
                        marginLeft: wp('10%'),
                      }}>
                     {index}
                    </Text>
                    <Text
                      style={{
                        fontSize: wp('6%'),
                        fontWeight: 'bold',
                        marginTop: wp('0%'),
                        color: '#ffffff',
                        marginLeft: wp('6%'),
                      }}>
                      Rank
                    </Text>
                  </View>
                </View>
              {/* </View> */}
            </View>
          
          
        </View>
        <LinearGradient colors={['#29abe2', '#0099cc','#3b5998']} style={{marginBottom:wp('5%'),
         borderBottomRightRadius:wp('5%'),justifyContent:'center',alignItems:'center',width:wp('90%')}}>
            <FlatList
            data={item.images}
            horizontal={true}
            renderItem={(data) =>{
              // if(data.item.u_id == item.u_id){
              return (
                <View style={{flex:0.3,flexDirection:'row',}}>
                <View style={[styles.view_votes1],{flexDirection:'column'
                    ,marginLeft:wp('1%'),marginTop:wp('2%'),marginRight:wp('1%')}}>
                  <View style={{marginRight:wp('1%'),justifyContent:'center',alignItems:'center'}} >
                  <Lightbox 
        style={{justifyContent: "center",}}
        springConfig={{ overshootClamping: true }}
          renderContent={() => (
                <Image style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                             source={{    uri: data.item.url
                            ,priority: FastImage.priority.normal
                            }}
                            resizeMode={'contain'}
                             /> 
          )}
      >
         <ImageBackground style={{width:wp('15%'),height:wp('12%'),marginBottom:wp('2%'),borderRadius:5,marginLeft:wp('2%')}} 
                        source={{uri:data.item.url}}>
                          <View style={styles.view_overlay}>
                            <View style={{alignContent:'center',alignItems:'center',justifyContent:'center'}}>
                                <Text style={styles.text_votess}>{data.item.vote}</Text>
                            </View>     
                      </View>
                    </ImageBackground>
            </Lightbox>
      
                   
                  </View>
                </View>    
                <View style={{width:wp('0.3%'),height:wp('7%'),marginTop:wp('4%'),marginLeft:wp('1%'),
                marginRight:wp('2%'),backgroundColor:'#fff'}} />
            </View>
              );
              // }else{
              //   return;
              // }
            }}
            keyExtractor={item => {
              Math.random().toString();
            }}
            /> 
            {item.images.length >0 ?<React.Fragment>

</React.Fragment>:
<View style={{padding:wp('6%')}}>
  <Text style={{color:'white'}}>
    This user has not uploaded any picture yet
  </Text>
</View>
}
          </LinearGradient>
      </View>
           )
    }
    
}
  
  render() {
    console.log(this.props.rank);
    return (
      
      <View style={styles.conatainer}>


        <FlatList
            data={this.props.rank.length ==1?this.props.rank[0].rank:this.props.rank}


            renderItem={this.RenderContentData}
        keyExtractor={item => {
          Math.random().toString();
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    // flexDirection: 'column',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'auto',
    zIndex:0,
    backgroundColor: '#F4F7FC',
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    paddingTop: wp('0.5%'),
    paddingRight: wp('0.5%'),
    paddingLeft: wp('0.5%'),
    paddingBottom: wp('2%'),
    height: wp('38%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_photo_1: {
    flex: 1,
    margin: wp('0.6'),
    height: wp('30%'),
  },
  view_photo: {
    height: '100%',
    width: '100%',
  },
  view_number: {
    marginLeft: wp('0.5%'),
    marginTop: wp('0.5%'),
    height: wp('5.5%'),
    width: wp('5.5%'),
    padding: wp('1%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('0.5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
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
    alignContent:'center',alignItems:'center',justifyContent:'center',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  view_text_parent: {
    height: wp('6%'),
    width: wp('18%'),
    flexDirection: 'row',
    marginTop: wp('6%'),
    borderColor: 'white',
    borderWidth: wp('0.2%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  text_name: {
    fontWeight: '500',
    fontSize: wp('3.5%'),

    color: '#ffffff',
  },
  text_date: {
    fontWeight: '500',
    marginTop: wp('1%'),
    fontSize: wp('3.5%'),
    color: '#ffffff',
  },
  text_number: {
    fontWeight: '500',
    fontSize: wp('2.7%'),
    color: '#ffffff',
  },
  text_votes: {
    fontWeight: '700',
    fontSize: wp('3%'),
    color: '#ffffff',
  },
  text_votess: {
    fontWeight: '700',
    fontSize: wp('3%'),
    color: '#fff',
  },
  text_votese:
  {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    color: '#ffffff',
  },
  gridView: {
    flex: 1,
  },

  view_person_pic: {
    height: wp('10%'),
    width: wp('10%'),
    marginLeft: wp('2%'),
    marginTop: wp('12%'),
    padding: wp('2%'),
    backgroundColor: '#F4F7FC',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_flexes: {
    flexDirection: 'row',
  },
  view_flex_1: {
    flex: 0.5,
  },
  view_flex_2: {
    flex: 2,
  },
  img_style: {
    height: wp('8%'),
    borderRadius:wp('4%'),
    width: wp('8%'),
  },
  view_flex_3: {
    flex: 1,
    flexDirection: 'column',
  },

  view_texes: {
    marginTop: wp('12%'),
  },
  view_votes: {
    marginTop: wp('2%'),
    flexDirection:'row'
  },
  view_votes1: {
    marginTop: wp('5%'),
    marginLeft: wp('5%'),
  },
  view_line: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: wp('1%'),
    width: wp('78%'),
    backgroundColor: '#8CC63F',
  },
  view_lines: {
    flexDirection: 'row',
    marginBottom: wp('1.5%'),
    marginTop: wp('1%'),
  },
  view_line1: {
    height: wp('2%'),
    width: wp('2%'),
    marginRight: wp('-0.5%'),
    zIndex: 9000,
    padding: wp('0.5%'),
    backgroundColor: '#8CC63F',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_line2: {
    height: wp('2%'),
    width: wp('2%'),
    padding: wp('0.5%'),
    marginLeft: wp('-0.5%'),
    zIndex: 9000,
    backgroundColor: '#8CC63F',
    borderRadius: wp('1%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_photo_parent1: {
    height: wp('30%'),
    // backgroundColor: '#8CC63F',
    width: wp('90%'),
    borderTopLeftRadius:25,
    borderTopRightRadius:8,
    borderTopRightRadius:wp('5%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: wp('5%'),
    // marginBottom:wp('17%'),
    elevation:5
  },
  view_photo_parent2: {
    backgroundColor: '#FBB03B',
    height: wp('30%'),
    // backgroundColor: '#8CC63F',
    width: wp('90%'),
    borderTopLeftRadius:25,
    borderTopRightRadius:8,
    borderTopRightRadius:wp('5%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    margin: wp('5%'),
    // marginBottom:wp('17%'),
    elevation:5
  },
  view_rounded: {
    // backgroundColor: '#87D5AA',
    borderTopLeftRadius: wp('50%'),
    height: '100%',
    width: '100%',
    // backgroundColor: 'rgba(255, 255, 255, 0.2)',
    marginLeft: wp('0.1%'),
  },
  // view_rounded2: {
  //   backgroundColor: '#87D5AA',
  //   borderTopLeftRadius: wp('50%'),
  //   height: '100%',
  //   width: '100%',
  //   backgroundColor: 'rgba(251, 176, 59, 0.2)',
  //   marginLeft: wp('0.1%'),
  // },
});

const mapStateToProps = state => {
  return {
    rank: state.BestImages.getdetailsimages,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rankFucn: () => dispatch(getDetailsImage()),
   
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(RankPage);