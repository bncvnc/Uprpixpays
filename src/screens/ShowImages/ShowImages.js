
import React, { Fragment } from 'react';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
    FlatList,
} from 'react-native';
import VoteImage from  '../../images/voteSubmited.png';
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import ImageBig from '../../components/Questiosn/Question';
import {Navigation} from 'react-native-navigation';
import {connect} from 'react-redux';
import {add_voting_to_Images,OnVotePressed,GiveVoteToImages,GiveVoteAndMoveBAck} from '../../store/actions/index';
class ShowImages extends React.Component {
  static={
    ShowVoteButton:false
  }
  renderQuestions = ({item,index}) =>{
    
    return(
      <ImageBig 
      props={this.props}
      voteOnImage ={(index) =>{
        this.props.dispatch(add_voting_to_Images(index))
      }}
      OnVotePressed={(id) =>{
        this.props.dispatch(OnVotePressed(id));
      }}
      item={item}
      index={index}
      />
    )
  }
  state={
    currentStepIndex:0
  }
//   _nextStep() {
//     console.log('next tapped...', this.FlatListReference)
//     if (this.state.currentStepIndex < this.props.questions.length - 1) {
//       this.FlatListReference.scrollToIndex({index: this.state.currentStepIndex + 1, animated: true});
//       this.setState(function(prevState, props) {
//         return {
//           currentStepIndex: prevState.currentStepIndex + 1
//         };
//       });
//     }
//   }
  onViewableItemsChanged = ({ viewableItems, changed }) => {
    console.log("Visible items are", viewableItems[0].index);
    this.setState({
      currentStepIndex:viewableItems[0].index
    })
    console.log("Changed in this iteration", changed);
  }

  
//   _previousStep() {
//     console.log('prev tapped...', this.FlatListReference)
//     if (this.state.currentStepIndex > 0) {
//       this.FlatListReference.scrollToIndex({index: this.state.currentStepIndex - 1, animated: true});
//       this.setState(function(prevState, props) {
//         return {
//           currentStepIndex: prevState.currentStepIndex - 1
//         };
//       });
//     }
//   }
    render() {  
        const dataArray = [
            { title: "View Answer", content: "C. Italy" },
          ];
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
                this.props.dispatch(GiveVoteToImages(this.props.selectedItems,[],[]))
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
                  this.props.dispatch(GiveVoteAndMoveBAck(this.props.selectedItems,[],[]))
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

            <View style={styles.container}>
              <View style={styles.img_bg}> 
              {ShowVote}
               <FlatList
                onViewableItemsChanged={this.onViewableItemsChanged }
                viewabilityConfig={{
                  itemVisiblePercentThreshold: 50
                }}
              //  scrollEnabled={false}
                initialScrollIndex={this.props.initialindex}
               data={this.props.Images}
               ref={(ref) => this.FlatListReference = ref}
               renderItem={this.renderQuestions}
               initialNumToRender={1}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               onScrollToIndexFailed={info => {
                const wait = new Promise(resolve => setTimeout(resolve, 100));
                wait.then(() => {
                  this.FlatListReference.scrollToIndex({ index: this.props.initialindex, animated: true });
                });
              }}
               />

                <View style={styles.SocialBtnBox}>
                        <TouchableOpacity 
                      //  onPress={this._previousStep.bind(this)}
                        >
                            {/* <Text style={styles.BtnTxtView}>PRIVIOUS</Text> */}
                        </TouchableOpacity>
                        {this.props.selectedItems.length >0?<TouchableOpacity 
                       onPress={() =>{
                        this.setState({
                          ShowVoteButton:true
                        })
                       }}
                        style={{borderRadius: 8,  paddingLeft: 15, paddingRight: 15, paddingTop: 8, paddingBottom: 8, backgroundColor: '#29ABE2',marginBottom:wp('2%')}}>
                            <Text style={styles.BtnTxtView}>Submit</Text>
                        </TouchableOpacity>:<React.Fragment></React.Fragment>}
                    </View>
              </View>
            </View>
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
        backgroundColor:'#000000',
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
        flexDirection:'column',
        alignContent:'center',
        alignItems:'center',
        justifyContent:'center',
        marginTop:15,
        padding:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:'#f5f7fa',
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
        // marginLeft:15,
        alignContent:'space-between',
        alignItems:'center',
        alignSelf:'auto',
        justifyContent:'space-between',
        // marginTop:5   
      },
      BtnBox:
      {
          // width:20,
          height:50,
          backgroundColor:'#3b5999',
          borderRadius:100,
          elevation:10,
          paddingHorizontal:20,
          
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

const mapsDispatchToProps = dispatch =>{
  return{
    // GetAllImages :()=>(dispatch(GetVoteImages())),
    // SaveVoteImages:(data)=>(dispatch(SaveVoteImages(data))),
    add_voting_to_Images:(index)=>(dispatch(add_voting_to_Images(index))),
    // GiveVoteToImages:(selectedVotes,likedList,resportsLists)=>(dispatch(GiveVoteToImages(selectedVotes,likedList,resportsLists))),
    // GiveVotesAndMoveBack:(selectedVotes,likedList,resportsLists)=>(dispatch(GiveVoteAndMoveBAck(selectedVotes,likedList,resportsLists))),
    // Add_Image_To_Like_List:(index)=>(dispatch(Add_Image_To_Like_List(index))),
    // ADD_IMAGE_TO_REPORT_LIST:(index)=>(dispatch(ADD_IMAGE_TO_REPORT_LIST(index)))
  }
}
const mapStateToProps = (state)=>{
  return{
    Images:state.BestImages.VoteImages,
    isLoading:state.isLoading.isLoading,
    selectedItems:state.BestImages.selectedItems
  }
}

export default connect(mapStateToProps,null) (ShowImages);