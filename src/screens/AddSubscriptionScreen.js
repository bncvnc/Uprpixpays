import React,{PureComponent} from 'react';
import AddSubscriptionView from '../components/AddSubscriptionView';
import { connect } from 'react-redux';
import Button from '../components/Button';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TextInput,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  FlatList,
  findNodeHandle
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import stripe from 'tipsi-stripe';
stripe.setOptions({
  publishableKey:'pk_test_fnHShgwaSjDlKORi0DnPpEil00939zR5JV'
  
})

class AddSubscription extends PureComponent {
  static title = 'Card Form'

  state = {
    loading: false,
    token: null,
    amountToDeposite:''
  }
  componentDidMount () {
    this.handleCardPayPress();
  }

  DepositeMoney = () =>{
    fetch('https://urpixpays.com/stagging_urpixpays/sendvc1', {
      method:'POST',
      headers: {
      Accept:'application/json',
      'Content-Type':'application/json',
      },
      body:JSON.stringify({
        "user_id":this.props.user.id,
        "user_email":this.props.user.email,
        "amount":this.state.amountToDeposite,
        "token":this.state.token.tokenId
      }),
  })
  .then((reponse) =>reponse.json())
  .then((responseData) =>{
    console.log(responseData);
  })
  }

  handleCardPayPress = async () => {
    try {
      this.setState({ loading: true, token: null })
      const token = await stripe.paymentRequestWithCardForm({
        // Only iOS support this options
        // smsAutofillDisabled: true,
        // requiredBillingAddressFields: '',
        // prefilledInformation: {
        //   billingAddress: {
        //     name: 'Gunilla Haugeh',
        //     line1: 'Canary Place',
        //     line2: '3',
        //     city: 'Macon',
        //     state: 'Georgia',
        //     country: 'US',
        //     postalCode: '31217',
        //     email: 'ghaugeh0@printfriendly.com',
        //   },
        // },
      })

      this.setState({ loading: false, token })
    } catch (error) {
      this.setState({ loading: false })
    }
  }

  render() {
   
    const { loading, token,amountToDeposite } = this.state
    console.log(token);
    return (
      <ScrollView style={{flex:1}}>
      <View style={styles.container}>
    

       
        <Text style={styles.header}>
          Deposit Money
        </Text>
        {/* <Text style={styles.instruction}>
          Click On The Button Below To Add Your Card info and pay through to stripe
        </Text>
        <Button
        // disabled={true}
        style={{
          backgroundColor:'rgba(41, 171, 226, .8)',
          // padding:wp('2%'),
          // justifyContent:'center',
          // alignContent:'center',
          // alignItems:'center',
          // marginTop:wp('2%')
         }}
          text="Click to enter you card and pay"
          loading={loading}
          onPress={this.handleCardPayPress}
        /> */}
        {/* <View
          style={styles.token}
            >
          {token &&
            <Text style={styles.instruction}>
              Token: {token.tokenId}
            </Text>
          }
        </View> */}
          {token &&
            <React.Fragment>
               <View style={{
        //  marginLeft:wp('4%'),
        //  marginRight:wp('4%'),
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        borderColor:'black',
        borderWidth:2,
       }}>
       <TextInput 
        placeholder={'Enter Amount'}
        placeholderTextColor={'black'}
        value={amountToDeposite}
       onChangeText={(text) =>{
        let number = text.replace(/[^0-9]/g, '');
        this.setState({
          amountToDeposite:number
        })
       }}
        style={{
          paddingLeft:wp('4%'),
          width:'100%', 
          height:wp('8%'),
          fontSize:wp('3%')
        
        }}
        />
       </View>
       <View>
           <Button
           style={{
            backgroundColor:amountToDeposite.length >0 ?'rgba(41, 171, 226, .8)':'gray',
            // padding:wp('2%'),
            // justifyContent:'center',
            // alignContent:'center',
            // alignItems:'center',
            // marginTop:wp('2%')
           }}
             disabled={amountToDeposite.length >0 ?false:true}
             text="Deposite Money"
             loading={loading}
             onPress={() =>{
               this.DepositeMoney()
             }}
           />
           </View>
            </React.Fragment>
          }
      
 
      </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instruction: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  token: {
    height: 20,
  },
})
const mapStateToProps = state => {
  return {
    notice: state.BestImages.GetNotifiactions,
    user:state.user.user
  }
}

export default connect(mapStateToProps,null)(AddSubscription)