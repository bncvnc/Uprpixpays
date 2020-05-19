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
    Platform,
    ActivityIndicator
} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import { WebView } from 'react-native-webview';
import {connect} from 'react-redux';
import { Navigation } from 'react-native-navigation';
import {BalanceOverview,UserProfileData} from '../../store/actions/index';
class depositThroughToPaypall extends React.Component {
    state = {
        screenHeight: 0,
        Portfolio:{},
        userpix:{},
        pickImage:[],
    }
    handleResponse = data =>{
        if(data.title === 'Success'){
          this.setState({
            PayVivaPaypall:false
          })
          this.PaymentSuccesfull();
          // this.PayWithPaypall(this.totalAmountPayable,this.CartData)
        }else if(data.title ==='Cancel')
        {
          this.setState({
            PayVivaPaypall:false 
          })
        }
        else{
          return;
        }
      }
      PaymentSuccesfull =() =>{
        fetch('https://urpixpays.com/stagging_urpixpays/paypal_status/'+this.props.user.no+'/'+this.props.payableamount)
        .then((response) =>response.json())
        .then((responseData ) =>{
          console.log(responseData);
          this.props.BalanceOverview();
          this.props.UserProfileData();
          alert('The amount was successfully added to your wallet');
          Navigation.pop(this.props.componentId);
        }).catch((err) =>{
          console.log(err);
        })
      }
    render() {  
        return (

            <View style={{flex:1}}>
                 <WebView
                    source={{uri:'https://urpixpays.com/stagging_urpixpays/paypal/'+this.props.payableamount}}
                    onNavigationStateChange={data=> this.handleResponse(data)}
                    sharedProcess={true}
                    startInLoadingState={true}
                    renderLoading={() =>{
                      return(
                        <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,left: 0,right: 0, bottom: 0,flex: 1}}>
                        <ActivityIndicator size={'large'} color='#29ABE2'  />
                        </View>
                      )
                    }}
                    // injectedJavaScript={'document.getElementById("price").value="'+AmountTotal+'";document.getElementById("taskId").value="'+this.props.taskId+'";document.getElementById("userId").value="'+this.props.user.id+'";'}
                    // onNavigationStateChange={data=> this.handleResponse(data)}
                      />    
            </View>
           
        );
    }
}
const styles = StyleSheet.create({

});

const mapStateToProps = state => {
  return {
    user: state.user.user,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    rankFucn: () => dispatch(getDetailsImage()),
    BalanceOverview:() =>dispatch(BalanceOverview()),
    UserProfileData:() =>dispatch(UserProfileData())
   
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(depositThroughToPaypall);
