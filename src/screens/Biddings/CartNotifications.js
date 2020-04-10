
import Icon from 'react-native-vector-icons/FontAwesome';

import pro_image from '../../images/buysell1.png';
import Arrow from 'react-native-vector-icons/MaterialIcons';

import React, {Fragment} from 'react';
import { Navigation } from "react-native-navigation";
import {connect} from 'react-redux';
import {CartNotification} from '../../store/actions/index';
import RNPickerSelect from 'react-native-picker-select';
import { Accept } from '../../store/actions/Bid_request';
import validate from '../../Validate/Validate';
import Lightbox from 'react-native-lightbox';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  FlatList,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
  Platform,
  ActivityIndicator
} from 'react-native';
import { WebView } from 'react-native-webview';
const axios = require('axios');


class Cart_Notification extends React.Component {
  constructor(props) {
    super(props);
    this.props.cart();

    this.CartData = null;
    this.totalAmountPayable=null;
  }
  handleResponse = data =>{
    if(data.title === 'Success'){
      this.setState({
        visible:false
      })
      // this.PaymentSuccesfull();
      this.PayWithPaypall(this.totalAmountPayable,this.CartData)
    }else if(data.title ==='Cancel')
    {
      this.setState({
        visible:false 
      })
    }
    else{
      return;
    }
  }

  state= {
    visible:false,
    FirstDropDown:'Email',
    FirstDropDownLabel:'Email',
    SecondFropDopwnLabel:'Email',
    SecondDropDown:'Email',
    loading:false,
    printingPrice:0,
    DropDownValue:[
      { label: 'Email', value: 'Email',color:'#000000' },
    ],
    inputs:{
      password:{
        value:'',
        valid:false,
        validationRules:{
          checkPassword:6
        },
        touched:false,
        warningText:'Password Must Contain 7 to 15 characters which contain one UpperCase character, One numeric digit'
      },
      email:{
        value:'',
            valid:false,
            validationRules:{
              isEmail:true
            },
            touched:false,
            warningText:'Please Enter A Valid Email Address'
      },
      name:{
        value:'',
            valid:false,
            validationRules:{
              minLength:3
            },
            touched:false,
            warningText:'Your Name Must Be 6 Characters Long'
      },
      myNumber:{
        value:'',
            valid:false,
            validationRules:{
              minLength:11
            },
            touched:false,
            warningText:'Your Name Must Be 6 Characters Long'
      },
      address1:{
        value:'',
            valid:false,
            validationRules:{
              minLength:2
            },
            touched:false,
            warningText:'Please Add A Country'
      },
      address2:{
        value:'',
            valid:false,
            validationRules:{
              minLength:4
            },
            touched:false,
            warningText:'Please Add A City '
      },
      city:{
        value:'',
            valid:false,
            validationRules:{
              minLength:3
            },
            touched:false,
            warningText:'Your Password Does Not Match'
      },
      states:{
          value:'',
          valid:false,
          validationRules:{
            minLength:3
          },
          touched:false,
          warningText:'Please Enter Numbers Only And Minimum numbers must be 11'
      },
      zip:{
        value:'',
        valid:false,
        validationRules:{
          minLength:3
        },
        touched:false,
        warningText:'Please Enter your Day of Birth'
      },
      country :{
        value:'',
        valid:false,
        validationRules:{
          minLength:3
        },
        touched:false,
        warningText:'Please Enter your Borth Month'
      },
      SpecialInstructions:{
        value:'',
        valid:false,
        validationRules:{
          minLength:11
        },
        touched:false,
        warningText:'Please Enter your year of Birth'
      },
      confiormPassword:{
        value:'',
            valid:false,
            validationRules:{
              equalTo:'password'
            },
            touched:false,
            warningText:'Your Password Does Not Match'
      },
    }
  }

  onFieldTextChange = (text,field) => {
    let connectedValue = {};
    if (this.state.inputs[field].validationRules.equalTo) {
      const equalControl = this.state.inputs[field].validationRules.equalTo;
      const equalValue = this.state.inputs[equalControl].value;
      connectedValue = {
        ...connectedValue,
        equalTo: equalValue
      };
    }
    if (field === "password") {
      connectedValue = {
        ...connectedValue,
        equalTo: text
      };
    }
    this.setState(prevState =>{
      
      return {
        inputs: {
          ...prevState.inputs,
          confiormPassword: {
            ...prevState.inputs.confiormPassword,
            valid:
              field === "password"
                ? validate(
                    prevState.inputs.confiormPassword.value,
                    prevState.inputs.confiormPassword.validationRules,
                    connectedValue
                  )
                : prevState.inputs.confiormPassword.valid
          },
          [field]: {
            ...prevState.inputs[field],
            value: text,
            valid: validate(
              text,
              prevState.inputs[field].validationRules,
              connectedValue
            ),
            touched:true
            
          }
          
        }
        
      };
      
    })
   

  }

  SetPayWithWallet = (totalAmount) =>{

    let filteredValue=this.state.DropDownValue.filter((data) =>{
      // console.log(data.value);
     return data.value == this.state.SecondDropDown;
    })
    let SelectedSize = filteredValue[0].label;
    let printing_priceCheck  = filteredValue[0].label == 'Email' ? 0 :filteredValue[0].value;

 
    console.log(SelectedSize);
// return;

    let CartArray =[];
    this.props.carts.map((data) =>{
      let NetPrice = data.price + parseFloat(printing_priceCheck);
      CartArray.push({
        seller_email:data.seller_email,
        product_name:data.imgname,
        buyer_email:data.buyer_email,
        img_id:data.img_id,
        imgname:data.imgname,
        quantity:1,
        delivery_method:this.state.FirstDropDown.toLowerCase(),
        selected_size:SelectedSize,
        printing_price:printing_priceCheck,
        price:data.price,
        net_price:NetPrice
      })
      
    });
    console.log(CartArray);
    this.PayWithWallet(totalAmount,CartArray)
  }

  SetPaymentPayWithPaypall = (totalAmount) =>{

    let filteredValue=this.state.DropDownValue.filter((data) =>{
      // console.log(data.value);
     return data.value == this.state.SecondDropDown;
    })
    let SelectedSize = filteredValue[0].label;
    let printing_priceCheck  = filteredValue[0].label == 'Email' ? 0 :filteredValue[0].value;

 
    console.log(SelectedSize);
// return;

    let CartArray =[];
    this.props.carts.map((data) =>{
      let NetPrice = data.price + parseFloat(printing_priceCheck);
      CartArray.push({
        seller_email:data.seller_email,
        product_name:data.imgname,
        buyer_email:data.buyer_email,
        img_id:data.img_id,
        imgname:data.imgname,
        quantity:1,
        delivery_method:this.state.FirstDropDown.toLowerCase(),
        selected_size:SelectedSize,
        printing_price:printing_priceCheck,
        price:data.price,
        net_price:NetPrice
      })
      
    });
    console.log(CartArray);
    // this.PayWithWallet(totalAmount,CartArray)
    this.CartData  = JSON.stringify(CartArray);
    this.totalAmountPayable =totalAmount; 
    this.setState({
      visible:true
    })
    
  }


  PayWithWallet = (totalAmout,CartArray) =>{

    axios.post('https://urpixpays.com/stagging_urpixpays/pay_through_wallet', {
      "cart" :JSON.stringify(CartArray),
      "address_form" : {
      "first_name":this.state.inputs.name.value,
      "address":"",
      "address2":"",
      "email":this.state.inputs.email.value,
      "country":"",
      "state":"",
      "zip":"",
      "instructions":"",
      "mobile":this.state.inputs.myNumber.value
        
      },
      "total_amount": totalAmout,
      "uid": this.props.user.no
  })
    .then((response) => {
      console.log(response.data.success);
      if(response.data.success) {
        alert(response.data.data)
        this.props.cart();
      }else{
        alert(response.data.data)
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error)
      
    });

  }

  PayWithPaypall = (totalAmout,CartArray) =>{
    this.setState({
      loading:true
    })
    console.log(CartArray);
    axios.post('https://urpixpays.com/stagging_urpixpays/paypal_payment_done', {
      "cart" :CartArray,
      "address_form" : {
      "first_name":this.state.inputs.name.value,
      "address":"",
      "address2":"",
      "email":this.state.inputs.email.value,
      "country":"",
      "state":"",
      "zip":"",
      "instructions":"",
      "mobile":this.state.inputs.myNumber.value
        
      },
      "total_amount": totalAmout,
      "uid": this.props.user.no
  })
    .then((response) => {
      console.log(response.data.success);
      if(response.data.success) {
        alert(response.data.data)
        this.setState({
          loading:false
        })
        this.props.cart();
      }else{
        alert(response.data.data)
      }
    })
    .catch(function (error) {
      console.log(error);
      alert(error)
      this.setState({
        loading:false
      })
    });

  }

  ChangeBidding = () => {
    this.setState({
      biding:true,
      invitation:false,
      soldProducts:false,
      cart:false,
    })
}

ChangeCartNotification = () => {
  this.setState({
    biding:false,
    invitation:false,
    soldProducts:false,
    cart:true,
  })
}
ChangeSoldProducts = () => {
  this.setState({
    biding:false,
    invitation:false,
    soldProducts:true,
    cart:false,
  })
}
ChangeInvitaion = () => {
  this.setState({
    biding:false,
    invitation:true,
    soldProducts:false,
    cart:false,
  })
}
Run = (value) =>{
   
  let DropDownValue = [
    { label: 'Email', value: 'Email',color:'#000000' },
  ]
  
  if(value =='Digital Prints')
  {
    

    DropDownValue = [
      { label: '4x2', value: '0.39',color:'#000000',key:'keyas' },
      { label: '5x7', value: '0.79',color:'#000000' },
      { label: '8x8', value: '2.19',color:'#000000' },
      { label: '16x20', value: '8.99',color:'#000000' },
      { label: '20x30', value: '11.99',color:'#000000' },
      { label: '20x60', value: '20.99',color:'#000000' },
    ]
    this.setState({
      SecondDropDown:'0.39',
      printingPrice:0.39
    })
    
  }else if(value =='Canvas Prints'){
    DropDownValue = [
      { label: '12x16', value: '30.99',color:'#000000' },
      { label: '14x14', value: '31.99',color:'#000000' },
      { label: '16x20', value: '40.99',color:'#000000' },
      { label: '20x30', value: '60.99',color:'#000000' },
      { label: '30x40', value: '149.99',color:'#000000' },
      { label: '40x60', value: '299.99',color:'#000000' },
    ]
    this.setState({
      SecondDropDown:'30.99',
      printingPrice:30.99
    })
    
  }else if(value =='Acrylic Prints')
  {
    DropDownValue = [
      {label:'11x14',value:'46.99',color:'#000000'},
      {label:'12x12',value:'47.99',color:'#000000'},
      {label:'16x20',value:'82.99',color:'#000000'},
      {label:'20x30',value:'199.99',color:'#000000'},
      {label:'24x36',value:'179.99',color:'#000000'}
    ]
    this.setState({
      SecondDropDown:'46.99',
      printingPrice:46.99

    })
    
  }else if(value =='Metal Prints')
  {
    DropDownValue = [
      {label:'11x14',value:'36.99',color:'#000000'},
      {label:'12x12',value:'37.99',color:'#000000'},
      {label:'16x20',value:'59.99',color:'#000000'},
      {label:'20x30',value:'99.99',color:'#000000'},
      {label:'24x36',value:'129.99',color:'#000000'}
    ]
    this.setState({
      SecondDropDown:'36.99',
      printingPrice:36.99

    })
  }else if (value =='Email'){
    this.setState({
      SecondDropDown:'Email',
      printingPrice:0
    })
  }

  this.setState({
    DropDownValue:DropDownValue,
  })
}


  render() {

    let loader = (
      <React.Fragment>

      </React.Fragment>
    );
      if(this.state.loading){
        loader = (
         <View style={{zIndex:999999,justifyContent:'center',alignItems:'center',alignContent:'center',backgroundColor:'rgba(0,0,0,.6)',position:'absolute',top:0,height:hp('100%'),width:wp('100%')}}>
            <View>
            <ActivityIndicator size={'large'} color='#29ABE2'  />
            <Text style={{color:'white',fontSize:wp('4%')}}>
              Loading...
            </Text>
            </View>
         </View>
        )
      }


    let SubTotal =0.00;
    let ItemPrice =this.props.carts[0]?this.props.carts[0].price: 0.00;
    let TotalPrive =ItemPrice + this.state.printingPrice;

    let email = this.state.inputs.email.valid;
    let name = this.state.inputs.name.valid;
    let Phone = this.state.inputs.myNumber.valid;
    let address1 = this.state.FirstDropDown =='Email'? true: this.state.inputs.address1.valid;
    let address2 = this.state.FirstDropDown =='Email'? true: this.state.inputs.address2.valid;
    let city = this.state.FirstDropDown =='Email'? true: this.state.inputs.city.valid;
    let country = this.state.FirstDropDown =='Email'? true: this.state.inputs.country.valid;
    let states = this.state.FirstDropDown =='Email'? true: this.state.inputs.states.valid;
    let zip = this.state.FirstDropDown =='Email'? true: this.state.inputs.zip.valid;
    let CheckData =this.props.carts.length > 0 ?true:false;
    return (
      <View style={styles.conatainer}>
      
        <ScrollView>
        {loader}
         <View style={styles.view_tabel}>

          <View style={styles.view_tabel_inner}>
          <View style={styles.view_sr_no}>
            <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>S.No</Text>
          </View>

      
          <View style={styles.view_date_view}>
            <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>Date</Text>
          </View>

          <View style={styles.view_image_title}>
            <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
              Image Title
            </Text>
          </View>

          <View style={styles.view_sr_Price}>
            <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>Price</Text>
          </View>

          <View style={styles.view_imge_view}>
            <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
              Image View
            </Text>
          </View>
          <View style={styles.view_imge_action}>
            <Text style={{fontWeight: '500', fontSize: wp('2.7%')}}>
              Action
            </Text>
          </View>
          </View>
          <View style={styles.view_long_line}></View>

          <FlatList
              // itemDimension={wp('40%')}
              data={this.props.carts}
              // spacing={wp('1%')}
              // style={styles.gridView}
              // staticDimension={300}
              // fixed
              // spacing={20}
              renderItem={({ item, index }) => {
                index=index+1
                // console.log(item);
                return(
          <View style={styles.view_tabel_inner2}>
          <View style={styles.view_image_title_data}>
            <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>
                  {this.state.printingPrice}
            </Text>
          </View>

          <View style={styles.view_sr_Price_data}>
            <Text style={{fontWeight: '100', fontSize: wp('2.7%')}}>{item.price}</Text>
          </View>

          <View style={styles.view_imge_view_data}>
           
                <Lightbox 
                    springConfig={{ overshootClamping: true }}
                      renderContent={() => (
                        <Image style={{alignSelf: "center", width: '100%', height: '100%'}}
                        source={{    uri: item.url
                       }}
                       resizeMode={'contain'}
                        /> 
                      )}
                  >
                     <Image style={{height:wp('8%'),width:wp('20%')}}
                        source={{uri: item.url}}
                        />
                        </Lightbox>
          </View>

          <View style={styles.view_imge_action_data}>

                    <RNPickerSelect
                    color="#8cc63f"
                    Icon={() => {
                      return ( <View style={{justifyContent:'center',alignItems:'center',marginTop:Platform.OS==='android'?wp('3.7%'):0}}>
                        <Arrow name="keyboard-arrow-down" size={wp('6%')} color="#8cc63f" /></View>
                        )

                     ;
                    }}

                    value={this.state.FirstDropDown}
                      onValueChange={(value) => {
                        this.Run(value);
                        this.setState({
                          FirstDropDown:value
                        })
                        // if(value == 'Email'){
                        //   this.setState({
                        //     printingPrice:parseFloat(0)
                        //   })
                        // }
                      }}
                      items={[
                        { label: 'Email', value: 'Email',color:'#000000' },
                        { label: 'Digital Prints', value: 'Digital Prints' ,color:'#000000'},
                        { label: 'Canvas Prints', value: 'Canvas Prints',color:'#000000' },
                        { label: 'Acrylic Prints', value: 'Acrylic Prints' ,color:'#000000'},
                        { label: 'Metal Prints', value: 'Metal Prints' ,color:'#000000'},
                      ]
                   }
                      
                    />
                  </View>
                       
                  <View style={styles.view_imge_action_data}>

<RNPickerSelect
color="#8cc63f"
value={this.state.SecondDropDown}
onValueChange={(value,label,key) => {
  console.log(label);
  this.setState({
    SecondDropDown:value =='Email'?0:value,
    printingPrice:parseFloat(value)
  })
}}
Icon={() => {
  return ( <View style={{justifyContent:'center',alignItems:'center',marginTop:Platform.OS==='android'?wp('3.7%'):0}}>
    <Arrow name="keyboard-arrow-down" size={wp('6%')} color="#8cc63f" /></View>
    )

 ;
}}
  items={this.state.DropDownValue}
  
/>
</View>
   
          </View>

                )
              }}
            />

          <View style={styles.view_long_line}></View>
        </View> 
        <View style={styles.ShipView}>
              <Text style={{fontSize:wp('4.5%'),fontWeight:'bold',color:'#000',marginBottom:wp('2%')}}>Shipping Details</Text>
            <View style={styles.ShippingSec}>
              <View style={styles.ShippingSecc}>
                <View style={styles.SectionShip}>
                    <View style={[styles.ShippingTxt,{backgroundColor:!this.state.inputs.name.valid && this.state.inputs.name.touched?'red':'#29ABE2'}]}>
                        <Text style={styles.ShippingTxtView}>Full Name</Text>
                    </View>
                    <View style={styles.ShippingTxtIn}>
                        <TextInput 
                        style={styles.ShippingTxtInView} 
                        placeholder="Place Your Full Name"
                        value={this.state.inputs.name.value}
                        onChangeText={(text) => this.onFieldTextChange(text,'name')} 
                         />
                    </View>
                </View>
                  
                <View style={styles.SectionShip}>
                    <View style={[styles.ShippingTxt,{backgroundColor:!this.state.inputs.email.valid && this.state.inputs.email.touched?'red':'#29ABE2'}]}>
                        <Text style={styles.ShippingTxtView}>Email Address</Text>
                    </View>
                    <View style={styles.ShippingTxtIn}>
                        <TextInput 
                        style={styles.ShippingTxtInView} 
                        autoCapitalize={false}
                        placeholder="Place Your Email Address" 
                        value={this.state.inputs.email.value}
                        onChangeText={(text) => this.onFieldTextChange(text,'email')} 
                        
                        />
                    </View>
                </View>

                <View style={styles.SectionShip}>
                    <View style={[styles.ShippingTxt,{backgroundColor:!this.state.inputs.myNumber.valid && this.state.inputs.myNumber.touched?'red':'#29ABE2'}]}>
                        <Text style={styles.ShippingTxtView}>Phone Number</Text>
                    </View>
                    <View style={styles.ShippingTxtIn}>
                        <TextInput 
                        style={styles.ShippingTxtInView} 
                        placeholder="Place Your Phone Number"
                        value={this.state.inputs.myNumber.value}
                        onChangeText={(text) => this.onFieldTextChange(text,'myNumber')} 
                        />
                    </View>
                </View>

                {/* For Email Image Get  */}
                {this.state.FirstDropDown !='Email'?<React.Fragment>
                <View style={styles.SectionShip}>
                    <View style={[styles.ShippingTxt,{backgroundColor:!this.state.inputs.address1.valid && this.state.inputs.address1.touched?'red':'#29ABE2'}]}>
                        <Text style={styles.ShippingTxtView}>Address No 1</Text>
                    </View>
                    <View style={styles.ShippingTxtIn}>
                        <TextInput
                        style={styles.ShippingTxtInView}
                        placeholder="Place Your Address No 1"
                        value={this.state.inputs.address1.value}
                        onChangeText={(text) => this.onFieldTextChange(text,'address1')} 
                        />
                    </View>
                </View>
                <View style={styles.SectionShip}>
                    <View style={[styles.ShippingTxt,{backgroundColor:!this.state.inputs.address2.valid && this.state.inputs.address2.touched?'red':'#29ABE2'}]}>
                        <Text style={styles.ShippingTxtView}>Address No 2</Text>
                    </View>
                    <View style={styles.ShippingTxtIn}>
                        <TextInput 
                        style={styles.ShippingTxtInView} 
                        placeholder="Place Your Address No 2"
                        value={this.state.inputs.address2.value}
                        onChangeText={(text) => this.onFieldTextChange(text,'address2')} 
                        />
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={styles.SectionShipCity}>
                      <View style={[styles.ShippingTxtCity,{backgroundColor:!this.state.inputs.city.valid && this.state.inputs.city.touched?'red':'#29ABE2'}]}>
                          <Text style={styles.ShippingTxtView}>City</Text>
                      </View>
                      <View style={styles.ShippingTxtIn}>
                          <TextInput 
                          style={styles.ShippingTxtInView} 
                          placeholder="Place Your City"
                          value={this.state.inputs.city.value}
                          onChangeText={(text) => this.onFieldTextChange(text,'city')} 
                           />
                      </View>
                  </View>
                  <View style={styles.SectionShipState}>
                      <View style={[styles.ShippingTxtState,{backgroundColor:!this.state.inputs.states.valid && this.state.inputs.states.touched?'red':'#29ABE2'}]}>
                          <Text style={styles.ShippingTxtView}>State</Text>
                      </View>
                      <View style={styles.ShippingTxtIn}>
                          <TextInput 
                          style={styles.ShippingTxtInView} 
                          placeholder="Place Your State"
                          value={this.state.inputs.states.value}
                          onChangeText={(text) => this.onFieldTextChange(text,'states')} 
                          />
                      </View>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={styles.SectionShipCity}>
                      <View style={[styles.ShippingTxtCity,{backgroundColor:!this.state.inputs.zip.valid && this.state.inputs.zip.touched?'red':'#29ABE2'}]}>
                          <Text style={styles.ShippingTxtView}>ZIP</Text>
                      </View>
                      <View style={styles.ShippingTxtIn}>
                          <TextInput 
                          style={styles.ShippingTxtInView} 
                          placeholder="Zipcode"
                          value={this.state.inputs.zip.value}
                          onChangeText={(text) => this.onFieldTextChange(text,'zip')} 
                          />
                      </View>
                  </View>
                  <View style={styles.SectionShipState}>
                      <View style={[styles.ShippingTxtState,{backgroundColor:!this.state.inputs.country.valid && this.state.inputs.country.touched?'red':'#29ABE2'}]}>
                          <Text style={styles.ShippingTxtView}>Country</Text>
                      </View>
                      <View style={styles.ShippingTxtIn}>
                          <TextInput 
                          style={styles.ShippingTxtInView} 
                          placeholder="Place Your Country"
                          value={this.state.inputs.country.value}
                          onChangeText={(text) => this.onFieldTextChange(text,'country')} 
                          />
                      </View>
                  </View>
                </View>
                <View style={styles.SectionShip}>
                    <View style={styles.ShippingTxttt}>
                        <Text style={styles.ShippingTxtView}>Special Instructions</Text>
                    </View>
                    <View style={styles.ShippingTxtIn}>
                        <TextInput 
                        style={styles.ShippingTxtInView}
                        value={this.state.inputs.SpecialInstructions.value}
                        onChangeText={(text) => this.onFieldTextChange(text,'SpecialInstructions')} 
                        />
                    </View>
                </View>

                </React.Fragment>:<React.Fragment>
                  </React.Fragment>}
                {/* Other Info Ends Here */}
              </View>
              
              <TouchableOpacity 
              disabled={email && name &&  Phone && address1 && address2 && city && country && states && zip && CheckData ?false:true}
              onPress={() =>{
                this.SetPaymentPayWithPaypall(TotalPrive.toFixed(2))
              }} style={styles.SectionShipBtn}>
                  <View style={[styles.ShippingBtn,{backgroundColor:email && name &&  Phone && address1 && address2 && city && country && states && zip && CheckData ?'#29ABE2':'gray'}]}>
                      <Text style={styles.ShippingBtnView}>Pay With Paypal</Text>
                  </View>
              </TouchableOpacity>
            </View>
            
          </View>

          <View style={styles.ShipView1}>
              <Text style={{fontSize:wp('4.5%'),fontWeight:'bold',color:'#000',marginBottom:wp('2%')}}>Cart Details</Text>
            <View style={styles.ShippingSec}>
              <View style={styles.SectionShipp}>
                  <View style={styles.ShippingTxtt}>
                      <Text style={styles.ShippingTxtVieww}>Subtotal</Text>
                      <Text style={styles.ShippingTxtVieww}>Shipping</Text>
                      <Text style={styles.ShippingTxtVieww}>Total</Text>
                  </View>
              </View> 
              <View style={[styles.SectionShipp,{marginTop:wp('5%')}]}>
                  <View style={styles.ShippingTxttCard}>
                      <Text style={styles.ShippingTxtVieww1}>${this.state.printingPrice}</Text>
                      <Text style={styles.ShippingTxtVieww1}>Enter Your Address</Text>
                      <Text style={styles.ShippingTxtVieww1}>${TotalPrive.toFixed(2)}</Text>
                  </View>
              </View> 
              <TouchableOpacity
              disabled={email && name &&  Phone && address1 && address2 && city && country && states && zip && CheckData ?false:true}
              onPress={() =>{
                this.SetPayWithWallet(TotalPrive.toFixed(2));
              }} style={[styles.SectionShip]}>
                  <View style={[styles.ShippingBtn,{backgroundColor:email && name &&  Phone && address1 && address2 && city && country && states && zip && CheckData ?'#29ABE2':'gray'}]}>
                      <Text style={styles.ShippingBtnView}>Pay Through Wallet</Text>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
                   visible={this.state.visible}
                   
                   onRequestClose={()=>this.setState({
                     visible:false
                   })}>
                     <WebView
                    source={{uri:'https://urpixpays.com/stagging_urpixpays/payment-test?cart='+this.CartData+'&paid_amount='+this.totalAmountPayable+'&uid='+this.props.user.no}}
                    // injectedJavaScript={'document.getElementById("price").value="'+AmountTotal+'";document.getElementById("taskId").value="'+this.props.taskId+'";document.getElementById("userId").value="'+this.props.user.id+'";'}
                    onNavigationStateChange={data=> this.handleResponse(data)}
                      />

                  </Modal>
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    paddingTop: wp('5.5%'),
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    paddingBottom: wp('2%'),
    height: wp('45%'),
    width: wp('96%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_img_bg: {
    width: '100%',
    height: '100%',
  },
  view_photo_1: {
    flex: 1,
    margin: wp('0.6'),
    height: wp('30%'),
  },
  view_photo: {
    flex: 1,
    margin: wp('0.6'),
    height: '100%',
    width: '100%',
  },

  view_overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .6)',
  },

  view_line: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: wp('0.1%'),
    width: '100%',
    backgroundColor: '#ffffff',
  },

  view_text_top: {
    flexDirection: 'row',
  },

  view_flex_1: {
    flex: 1,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('1.5%'),
    paddingRight: wp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view_flex_2: {
    flex: 1,
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('1.5%'),
    paddingRight: wp('1.5%'),

    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text_view_top: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#ffffff',
  },
  country_city: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text_country_city: {
    fontWeight: '500',
    fontSize: wp('3%'),
  },
  ImageStyle: {
    padding: wp('2%'),
    margin: wp('2%'),
    height: wp('3%'),
    width: wp('3%'),
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  category_text: {
    flex: 1,
    fontFamily: 'Raleway-Regular',
    color: '#ffffff',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    fontSize: wp('3%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  SectionStyle1: {
    borderColor:'#8cc63f',
    borderWidth:wp('0.1%'),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('17%'),
    height: wp('6%'),
  },

  SectionStyle2: {
    marginTop: wp('3%'),
    marginLeft: wp('1%'),
    marginRight: wp('2%'),
    backgroundColor: '#01b1d7',
    flexDirection: 'row',
    width: wp('30%'),
    height: wp('7%'),
  },
  view_flex_1_sec: {
    flex: 0.8,
    
    flexDirection: 'row',
    paddingLeft:wp('1%'),
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  view_flex_2_sec: {
    flex: 0.2,
    
    flexDirection: 'row',
    paddingRight:wp('0.5%'),
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  communication1: {
    height: wp('5%'),
    alignSelf: 'center',
    alignItems: 'center',
    borderColor: '#8cc63f',
    borderWidth: wp('0.2%'),
    alignContent: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  view_nav_bar: {
    marginTop: wp('5%'),
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    flexDirection: 'row',
    height: wp('9%'),
    width: wp('100%'),
    backgroundColor: '#B5B5B5',
  },
  view_nav_bar_inner: {
    flexDirection: 'row',
    height: wp('9%'),
  },
  img_view: {
    height: wp('7.5%'),
    width: wp('7.5%'),
  },
  text_view: {
    fontSize: wp('3%'),
    fontWeight: '500',
    color: '#ffffff',
  },
  item_view: {
    justifyContent: 'center',
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
  },
  view_line1: {
    height: '100%',
    flexDirection: 'column',
    marginLeft: wp('1.5%'),
    marginRight: wp('1.5%'),
    width: wp('0.2%'),
    backgroundColor: '#ffffff',
  },
  view_line_right: {
    height: '100%',
    flexDirection: 'column',
    width: wp('0.2%'),
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },

  view_tabel: {
    flex:1,
    width: wp('100%'),
    // height: wp('70%'),
  },
  view_tabel_inner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width:'100%',
    height:wp('8%'),
  },
  view_tabel_inner2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    borderBottomColor:"rgba(0,0,0,0.7)",
    borderBottomWidth:wp('0.1%'),
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    width:'100%',
    height:wp('10%'),
  },
  view_sr_no: {
    width: wp('8%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view: {
    width: wp('17%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_image_title: {
    width: wp('17%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_Price: {
    width: wp('10%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_view: {
    width: wp('23%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_action: {
    width: wp('24%'),
    height:'100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_no_data: {
    width: wp('8%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    fontWeight:'200',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_date_view_data: {
    width: wp('17%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_image_title_data: {
    width: wp('17%'),
    paddingLeft: wp('1%'),
    paddingRight: wp('1%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_sr_Price_data: {
    width: wp('10%'),
    height:'100%',
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_view_data: {
    width: wp('23%'),
    borderRightWidth: wp('0.2%'),
    borderRightColor: 'rgba(0, 0, 0, .4)',
    height:'100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_imge_action_data: {
    width: wp('23%'),
    height:'100%',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view_long_line: {
    height: wp('0.2%'),
    flexDirection: 'column',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .4)',
  },
  ShipView:
  {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:wp('5%')
},
ShipView1:
{
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
ShippingSec:
{
    flexDirection:'column',
    width:wp('98%'),
    backgroundColor:'#fff',
    alignContent: 'center',
    elevation:2,
    marginBottom:wp('7%')
},
ShippingSecc:
{
    flexDirection:'column',
    width:wp('98%'),
    backgroundColor:'#fff',
    alignContent: 'center',
   
    padding:12,
},
SectionShip:
{
  width:wp('92%'),
  height:wp('10%'),
  flexDirection:'row', 
  marginBottom:wp('3%'),  
  borderRadius:1,
  borderWidth:1,
  borderColor:'#d1d1d1',
},
SectionShipBtn:
{
  width:wp('95%'),
  height:wp('10%'),
  flexDirection:'row', 

},
SectionShipCity:
{
  width:wp('36%'),
  height:wp('10%'),
  flexDirection:'row', 
  marginBottom:wp('3%'),  
  borderRadius:1,
  borderWidth:1,
  borderColor:'#d1d1d1',
  marginRight:wp('1%'),
},
SectionShipState:
{
  width:wp('55%'),
  height:wp('10%'),
  flexDirection:'row', 
  marginBottom:wp('3%'),  
  borderRadius:1,
  borderWidth:1,
  borderColor:'#d1d1d1',
  marginRight:wp('1%'),
  
},
SectionShipp:
{
  width:wp('98%'),
  height:wp('10%'),
  flexDirection:'row', 
  marginBottom:wp('3%'),  
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop:wp('2%'),
},

ShippingTxt:
{
  width:wp('28%'),
  height:wp('10%'),
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'#29ABE2',
  marginRight:wp('3%'),
},
ShippingTxttt:
{
  width:wp('35%'),
  height:wp('10%'),
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'#29ABE2',
  marginRight:wp('3%'),
},
ShippingTxtCity:
{
  width:wp('9%'),
  height:wp('10%'),
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'#29ABE2',
  marginRight:wp('1.5%'),
},
ShippingTxtState:
{
  width:wp('14%'),
  height:wp('10%'),
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'#29ABE2',
  
},
ShippingTxtt:
{
  flexDirection:'row',
  width:wp('98%'),
  height:wp('15%'),

  backgroundColor:'#29ABE2',
 
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},  
ShippingTxttCard:
{
  flexDirection:'row',
  width:wp('98%'),
  height:wp('15%'), 
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
ShippingTxtView:
{
  fontSize:wp('3.5%'),
  color:'#fff',
  fontWeight:'bold'
},
ShippingTxtIn:
{
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
},
ShippingTxtInView:
{
  width:wp('100%'),
  fontSize:wp('3.2%'),
  color:'#000000',
  fontWeight:'400',

},
ShippingBtn:
{
  width:wp('98%'),
  height:wp('10%'),
  alignContent: 'center',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor:'#29ABE2',
},
ShippingBtnView:
{
  fontSize:wp('4%'),
  color:'#fff',
  fontWeight:'bold'
},
ShippingTxtVieww:
{
  flex:1,
  fontSize:wp('4%'),
  color:'#fff',
  fontWeight:'bold',
  marginLeft:wp('7%'),
},
ShippingTxtVieww1:
{
  flex:1,
  fontSize:wp('3%'),
  color:'#000',
  marginLeft:wp('8%'),
},
});

const mapStateToProps = state => {
  return {
    carts: state.BestImages.SaveCartBid,
    user:state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cart: () => dispatch(CartNotification()),
    accept: (val) => dispatch(Accept(val)),

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart_Notification)
