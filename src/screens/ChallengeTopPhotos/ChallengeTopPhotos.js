
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
  getDetailsImage
} from '../../store/actions/index'
import VoteImage from  '../../images/vote-01.png';
import Photos from '../../images/Photos.png';
import Icon_out from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/EvilIcons';
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

import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';

class ChallengeTopPhotos extends React.Component {
  constructor(props){
    super(props);



  }

  state={
    selectedItems:[],
    LikedItems:[],
    ReporetedItems:[],
    ShowVoteButton:false
  }

  componentWillMount =( ) =>{
   
  }
  
  onCategoryClick = (id) =>{
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
  

  // componentWillUnmount = () =>{
  //   let data =[];
  //   this.props.SaveVoteImages(data)
  // } 


    RenderContenct =({ item, index }) =>{
      let Loading = 'Loading'+index;
    return (

      <View style={styles.view_photo_1}>
        <ImageBackground style={styles.view_img_bg} source={{
          uri: item.url
        }}
        onLoadStart={() => { this.setState({ [Loading]: true })} }
        onLoadEnd={() => { this.setState({ [Loading]: false })} }
          >
            { this.state[Loading]?<View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
              <ActivityIndicator animating={ this.state[Loading] } size={'large'} color={'#29ABE2'} />
              <Text>
                Loading Image ...
              </Text>
              </View>:<React.Fragment>
              <View style={styles.view_overlay}>
          <View style={{ marginLeft: wp('0.75%') }}>
                      <Text
                      style={{fontSize:wp('4%'),color:'#ffffff',fontWeight:'bold'}}
                      >#{index+1}</Text>
                  </View>
              <View style={styles.view_text_container}>
                <Image style={styles.votesImg} source={Photos
                } />
                <Text style={styles.votes}>{item.vote}</Text>
                
            </View>
          </View>
                </React.Fragment>}
          
        </ImageBackground>
      </View>

    )
  }

  render() {
    console.log(this.state);
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
               <View style={{flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}> 
               
               <View style={{marginRight:wp('3%')}}> 
               <Button 
                color={'#29ABE2'} 
                title={'Continue Voting'}
                onPress={() =>{
                  this.props.GiveVoteToImages(this.state.selectedItems,this.state.LikedItems,this.state.ReporetedItems)
                  this.setState({
                    ShowVoteButton:false
                  })
                }}
                />
               </View>
               <View style={{marginRight:wp('4%')}}>
               <Button 
               color={'#29ABE2'} 
               title={'Done'}
               onPress={() =>{
                this.props.GiveVotesAndMoveBack(this.state.selectedItems,this.state.LikedItems,this.state.ReporetedItems)
                 Navigation.pop(this.props.componentId);
               }}
               />
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
      <FlatGrid
              itemDimension={wp('40%')}
              items={this.props.rank.length ==1?this.props.rank[0].images:this.props.rank}
              spacing={wp('0.1%')}
              style={styles.gridView}
              // staticDimension={300}
              // fixed
              // spacing={20}
              renderItem={this.RenderContenct}
            />

        {this.state.selectedItems.length >0 || this.state.LikedItems.length >0  || this.state.ReporetedItems.length >0?
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
    flexDirection: 'column',
   
  },
 
  view_photo_1: {

    height: wp('25%'),
  },

  view_img_bg: {
    width: '100%',
    height: '100%',
  },
  view_overlay: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'rgba(0, 0, 0, .4)',
  },

  votesImg:
  {
    width:wp('5%'),
    height:wp('5%'),
    marginRight:wp('1.5%')
  },
  votes: {
    fontSize: wp('3.5%'),
    color: 'white',
    fontWeight: '600',
  },
  votesText: {
    color: 'white',
    fontSize: wp('2%')
  },
  view_text_container:
  {
    flexDirection:'row',
    height: wp('10%'),
    width: wp('10%'),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop:wp('10%'),
    marginLeft:wp('2%')
   
  }

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
    rankFucn: () => dispatch(getDetailsImage()),
  }
}
const mapStateToProps = (state)=>{
  return{
    Images:state.BestImages.VoteImages,
    isLoading:state.isLoading.isLoading,
    rank: state.BestImages.getdetailsimages,
  }
}

export default connect(mapStateToProps,mapsDispatchToProps) (ChallengeTopPhotos);
