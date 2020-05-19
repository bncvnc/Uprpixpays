
import img1 from '../../images/voteSubmited.png';
import { FlatGrid } from 'react-native-super-grid';
import FastImage from 'react-native-fast-image';
import React, {Fragment} from 'react';
import {
  GetVoteImages,
  add_voting_to_Images,
  SaveVoteImages,
  GiveVoteToImages,
  GiveVoteAndMoveBAck,
  Add_Image_To_Like_List,
  ADD_IMAGE_TO_REPORT_LIST,
  OnVotePressed
} from '../../store/actions/index'
import VoteImage from  '../../images/voteSubmited.png';
import Icon_out from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/EvilIcons';
import Icon_out2 from 'react-native-vector-icons/FontAwesome';
import Ioncin from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
  Button
} from 'react-native';

import Topbar from './topbar';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { FlatList } from 'react-native-gesture-handler';

class TopPhotosView extends React.Component {
  constructor(props){
    super(props);



  }

  state={
    selectedItems:[],
    LikedItems:[],
    ReporetedItems:[],
    ShowVoteButton:false
  }

  componentDidMount() {
    // this.props.GetAllImages();
  }
  onCategoryClick = (id) =>{
    this.props.OnVotePressed(id);
    this.state.selectedItems.filter((e) =>{
      console.log(e);
    })
    if(this.state.selectedItems.filter(e => e === id).length > 0)
    {
      this.setState(prevState =>{
        return{
          selectedItems: prevState.selectedItems.filter((item)=> {
            return item !== id;
        })
        }
      });
      console.log('This Function Ran');
    }else{
      this.setState(prevState =>{
        return{
          selectedItems:prevState.selectedItems.concat(id)
        }
      })
    }
  }

  onLikedCliced =(id) =>{
    this.state.LikedItems.filter((e) =>{
      console.log(e);
    })
    if(this.state.LikedItems.filter(e => e === id).length > 0)
    {
      this.setState(prevState =>{
        return{
          LikedItems: prevState.LikedItems.filter((item)=> {
            return item !== id;
        })
        }
      });
      console.log('This Function Ran');
    }else{
      this.setState(prevState =>{
        return{
          LikedItems:prevState.LikedItems.concat(id)
        }
      })
    }
  }
  onReportButtonClicked =(id) =>{
    this.state.ReporetedItems.filter((e) =>{
      console.log(e);
    })
    if(this.state.ReporetedItems.filter(e => e === id).length > 0)
    {
      this.setState(prevState =>{
        return{
          ReporetedItems: prevState.ReporetedItems.filter((item)=> {
            return item !== id;
        })
        }
      });
      console.log('This Function Ran');
    }else{
      this.setState(prevState =>{
        return{
          ReporetedItems:prevState.ReporetedItems.concat(id)
        }
      })
    }
  }

  submitVotes = () => {

this.setState({
  ShowVoteButton:true
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

  RenderVoteImage =({ item, index }) =>{
            
            let field ='Height'+index;
            let width = 'Widht'+index
            let Loading = 'Loading'+index;
            return(
            
              <TouchableOpacity

              onPress={()=>{
                this.onCategoryClick(item.id,index);
                this.props.add_voting_to_Images(index);
              
              }}
              
              style={styles.view_photo_1}>
            
                                           <ImageBackground  
                                           style={styles.view_img_bg,{height:(this.state[field]?this.state[field]:hp('20%'))}} 
                                           onLoad={
                                            (evt) => {
                                              // console.log(evt.nativeEvent);
                                              this.setState({
                                                [field]: Platform.OS ==='ios'? evt.nativeEvent.source.height:evt.nativeEvent.source.height / evt.nativeEvent.source.width * wp('100%'),
                                                [width]:evt.nativeEvent.width
                                              })
                                            }
                                          }
                                          onLoadStart={() => { this.setState({ [Loading]: true })} }
                                          onLoadEnd={() => { this.setState({ [Loading]: false })} }
                                           source={{uri: item.url}}
                                          // resizeMode={'cover'}
                                          // resizeMode={}
                                          // resizeMode={'contain'}
                                          // resizeMethod={'auto'}
                                           >

                        {this.state[Loading]?
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                        <ActivityIndicator animating={ this.state[Loading] } size={'large'} color={'#29ABE2'} />
                        </View>
                        :<React.Fragment>
                        {
                              item.liked?<TouchableOpacity onPress={()=>{
                                this.onLikedCliced(item.id,index);
                                this.props.Add_Image_To_Like_List(index);
                              }} style={{ height:wp('10%'),width:wp('10%'), marginLeft: wp('1.9%') }}>
                              {/* <i class="far fa-heart"></i> */}
               {item.liked?
               <Ioncin name="ios-heart" style={{fontWeight:'bold'}} size={wp('10%')} color="#29ABE2" />:<Icon name="heart" style={{fontWeight:'bold'}} size={wp('10%')} color="#29ABE2" />}
               </TouchableOpacity>:<TouchableOpacity onPress={()=>{
                                        this.onLikedCliced(item.id,index);
                                             this.props.Add_Image_To_Like_List(index);
                                           }} style={{height:wp('10%'),width:wp('10%'), marginLeft: wp('0.75%') }}>
                                           {/* <i class="far fa-heart"></i> */}
                            {item.liked?
                            <Ioncin name="ios-heart" style={{fontWeight:'bold'}} size={wp('10%')} color="#29ABE2" />:<Icon name="heart" style={{fontWeight:'bold'}} size={wp('10%')} color="#29ABE2" />}
                            </TouchableOpacity>
                            }

                                        {item.reported?
                                        <TouchableOpacity  style={{ height:wp('10%'),width:wp('10%'),  marginLeft: wp('2%'),zIndex:9129 }} >
                                        <Ioncin onPress={()=>{
                                          this.onReportButtonClicked(item.id,index)
                                          this.props.ADD_IMAGE_TO_REPORT_LIST(index);
                                        }} name='ios-help-circle' size={wp('10%')} style={{fontWeight:'bold'}} color='#29ABE2' />
                                        </TouchableOpacity>:<TouchableOpacity style={{ height:wp('12%'),width:wp('12%'), marginLeft: wp('0.75%') ,zIndex:9129}} >
                                        <Icon onPress={()=>{
                                          this.onReportButtonClicked(item.id,index)
                                          this.props.ADD_IMAGE_TO_REPORT_LIST(index);
                                        }} name="question" style={{fontWeight:'bold'}} size={wp('10%')} color="#29ABE2" light />
                                        </TouchableOpacity>}
                                          <TouchableOpacity onPress={() =>{
                                            let ExtraDAta ={
                                              AllImages:this.props.Images,
                                              initialindex:index
                                            }
                                            this.gotoScreen('UrPicsPay.ShowImages',ExtraDAta)
                                          }}  style={{ height:wp('10%'),width:wp('10%'),  marginLeft: wp('2%'),zIndex:9129 }}>
                                          <Icon_out2  name="search-plus" style={{fontWeight:'bold'}} size={wp('10%')} color="#29ABE2" light />
                                          </TouchableOpacity>
                                        <View>
                                            {item.selected?<React.Fragment>
                    {item.selected?<Image  source={img1}  style={{height:wp('15%'),width:wp('15%')}} />:<React.Fragment></React.Fragment>}
                    </React.Fragment>:<React.Fragment></React.Fragment>}
                                        </View></React.Fragment>}
                           
                </ImageBackground>
            </TouchableOpacity>
          )
          }
  

  // componentWillUnmount = () =>{
  //   let data =[];
  //   this.props.SaveVoteImages(data)
  // } 

  render() {
    console.log(this.props.selectedItems);
    const items = [
        { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
      ];

      let loader = (
        <React.Fragment>
  
        </React.Fragment>
      );
        if(this.props.isLoading){
          loader = (
           <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
              <ActivityIndicator size={'large'} color='#29ABE2'  />
           </View>
          )
        }
        let ShowVote = (
          <React.Fragment>
    
          </React.Fragment>
        );
          if(this.state.ShowVoteButton){
            ShowVote = (
             <View 
             style={
               {zIndex:999999,
               justifyContent:'center',
               alignItems:'center',
               alignContent:'center',
               backgroundColor:'rgba(0,0,0,.6)',
               position:'absolute',
               top:0,
               left: 0,
               right: 0, 
               bottom: 0,
               flex: 1
               }}>
               <Image source={VoteImage} style={{width:'100%',height:wp('40%')}} resizeMode={'contain'}  />
               <View style={{
                 marginBottom:wp('2%')
               }}>
                 <Text style={{color:'white',fontSize:18}}>
                   Thanks For Voting
                 </Text>
               </View>
               <View style={{flexDirection:'column',justifyContent:'center',alignContent:'center',alignItems:'center'}}> 
               
               <View > 
               <TouchableOpacity 
               onPress={() =>{
                this.props.GiveVoteToImages(this.props.selectedItems,this.state.LikedItems,this.state.ReporetedItems)
                this.setState({
                  ShowVoteButton:false
                })
              }}
               style={
                 {
                   backgroundColor:'#31658f',
                   justifyContent:'center',
                   alignContent:'center',
                   alignItems:'center',
                   padding:wp('2%'),
                   borderRadius:wp('1%')
                   }}
                   >
                   <Text style={{color:'white',fontSize:wp('3.5%')}}>
                   Continue Voting
                   </Text>
                 </TouchableOpacity>
               </View>
               <View style={{marginTop:wp('2%')}}>
                 <TouchableOpacity
                 style={
                  {
                    justifyContent:'center',
                    alignContent:'center',
                    alignItems:'center',
                    padding:wp('1%'),
                    width:wp('28%'),
                    borderRadius:wp('1%'),
                    borderWidth:1,
                    borderColor:'white'
                    }}
                 onPress={() =>{
                  this.props.GiveVotesAndMoveBack(this.props.selectedItems,this.state.LikedItems,this.state.ReporetedItems)
                   Navigation.pop(this.props.componentId);
                 }}
                 >
                   <Text style={{color:'white',fontSize:wp('3.5%')}}>
                     Done
                   </Text>
                 </TouchableOpacity>

               </View>
               </View>
             </View>
            )
          }
    return (
      <View style={styles.conatainer}>
        {/* <View style={styles.topbar_view}>
          <Topbar />
        </View> */}
      {loader}
      {ShowVote}
        <FlatList
          data={this.props.Images}
          renderItem={this.RenderVoteImage}
          keyExtractor={(item) =>item.id}
        />

        {this.props.selectedItems.length >0 || this.state.LikedItems.length >0  || this.state.ReporetedItems.length >0?
          <TouchableOpacity onPress={()=>{this.submitVotes()}} style={{position:'absolute', borderRadius: 8, bottom: 30, right: 20, paddingLeft: 15, paddingRight: 15, paddingTop: 8, paddingBottom: 8, backgroundColor: '#29ABE2'}}>
            <Text style={{fontWeight: 'bold', fontSize: wp('5%'), color: 'white'}}>Submit</Text>
          </TouchableOpacity>:<React.Fragment></React.Fragment>
        }
       
        
        
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
    backgroundColor: '#F4F7FC',
    zIndex:0
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    paddingTop: wp('3%'),
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    paddingBottom: wp('2%'),
    flexDirection: 'row',
    height: wp('35%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_photo_1: {
    flex: 1,
    borderRadius:5,
    borderColor:'white',
    marginTop:wp('1.5%'),
  },
  view_number: {
    zIndex:2,
    borderRadius: wp('0.5%'),

  },
  view_img_bg: {
    width: '100%',
    height: '100%',
    

  },
  
  text_style: {
    fontWeight: '500',
    color: 'blue',
    fontSize:wp('3%')
  },
  view_overlay:
  {
      height:'100%',
      width:'100%',
      backgroundColor:'rgba(0, 0, 0, .6)',
      
  },
  view_text_parent: {

    height:wp('6%'),
    width:wp('18%'),
    flexDirection:'row',
    marginTop:wp('6%'),
    borderColor:'white',
    borderWidth:wp('0.2%'),
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    alignContent:'center',
    
  },
  text_number:
  {
        // fontWeight:'bold',
        fontSize:wp('2%'),
        marginRight:wp('0.1%'),
        color:'#ffffff'
  },
  text_votes:
  {
    
    fontWeight:'bold',
    fontSize:wp('3%'),
    marginLeft:wp('0.1%'),
    color:'#ffffff'

  },
  gridView: {
    // marginTop:wp('5%'),
    flex: 1,
  },

 
});
const mapsDispatchToProps = dispatch =>{
  return{
    GetAllImages :()=>(dispatch(GetVoteImages())),
    SaveVoteImages:(data)=>(dispatch(SaveVoteImages(data))),
    add_voting_to_Images:(index)=>(dispatch(add_voting_to_Images(index))),
    GiveVoteToImages:(selectedVotes,likedList,resportsLists)=>(dispatch(GiveVoteToImages(selectedVotes,likedList,resportsLists))),
    GiveVotesAndMoveBack:(selectedVotes,likedList,resportsLists)=>(dispatch(GiveVoteAndMoveBAck(selectedVotes,likedList,resportsLists))),
    Add_Image_To_Like_List:(index)=>(dispatch(Add_Image_To_Like_List(index))),
    ADD_IMAGE_TO_REPORT_LIST:(index)=>(dispatch(ADD_IMAGE_TO_REPORT_LIST(index))),
    OnVotePressed:(id) =>dispatch(OnVotePressed(id))
  }
}
const mapStateToProps = (state)=>{
  return{
    Images:state.BestImages.VoteImages,
    isLoading:state.isLoading.isLoading,
    selectedItems:state.BestImages.selectedItems
  }
}

export default connect(mapStateToProps,mapsDispatchToProps) (TopPhotosView);
