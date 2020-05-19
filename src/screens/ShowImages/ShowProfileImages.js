
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
import Icons from 'react-native-vector-icons/dist/FontAwesome';
import PorfolioImages from '../../components/Questiosn/PorfolioImages';
import {Navigation} from 'react-native-navigation';
export default class ShowProfileImages extends React.PureComponent {

  renderQuestions = ({item}) =>{
    return(
      <PorfolioImages 
      item={item}
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
    // console.log("Visible items are", viewableItems[0].index);
    // this.setState({
    //   currentStepIndex:viewableItems[0].index
    // })
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
componentDidMount () {
  this.FlatListReference.scrollToIndex({ index: this.props.initialindex, animated: true });
  // const wait = new Promise(resolve => setTimeout(resolve, 500));
  // wait.then(() => {
  //   console.log(this.props.initialindex); 
  //   this.FlatListReference.scrollToIndex({ index: this.props.initialindex, animated: true });
  // }).catch((err) =>{
  //   console.log(err);
  // });
}
    render() {  
        const dataArray = [
            { title: "View Answer", content: "C. Italy" },
          ];
       console.log(this.props.initialindex);
       console.log(this.props.AllImages);
        return (

            <View style={styles.container}>
              <View  style={styles.img_bg}> 
               <FlatList
                onViewableItemsChanged={this.onViewableItemsChanged }
                // viewabilityConfig={{
                //   itemVisiblePercentThreshold: 50
                // }}
              //  scrollEnabled={false}
                initialScrollIndex={this.props.initialindex}
               data={this.props.AllImages}
               ref={(ref) => this.FlatListReference = ref}
               renderItem={this.renderQuestions}
              //  initialNumToRender={0}
               horizontal
               pagingEnabled
               showsHorizontalScrollIndicator={false}
               onScrollToIndexFailed={info => {
                 console.log('THis Funtion is running');
                const wait = new Promise(resolve => setTimeout(resolve, 500));
                wait.then(() => {
                  console.log(this.props.initialindex); 
                  this.FlatListReference.scrollToIndex({ index: this.props.initialindex, animated: true });
                }).catch((err) =>{
                  console.log(err);
                });
              }}
               />
                {/* <View style={styles.SocialBtnBox}>
                        <TouchableOpacity 
                       onPress={this._previousStep.bind(this)}
                        style={styles.BtnBox}>
                            <Text style={styles.BtnTxtView}>PRIVIOUS</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                       onPress={this._nextStep.bind(this)}
                        style={styles.BtnBox}>
                            <Text style={styles.BtnTxtView}>NEXT</Text>
                        </TouchableOpacity>
                    </View> */}
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
        marginTop:5   
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
