
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
import moment from 'moment';
import { FlatList } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
class Products_Purchased extends React.Component {
    state = {
        screenHeight: 0,
        ProductsPurchased:[]
    }
    componentDidMount=() =>{
        this.GetProductsPurchased();
    }
    onContentSizeChange = (contentHeight) => {
        // Save the content height in state
        content = contentHeight + 100;
        this.setState({ screenHeight: content });
    };

    GetProductsPurchased =() =>{
        fetch('https://urpixpays.com/stagging_urpixpays/orders_purchased/'+this.props.user.id)
        .then((response) =>response.json())
        .then((responseData) =>{
            console.log(responseData);
            this.setState({
                ProductsPurchased:responseData.OrdersDetail
            })
        })
    }
    renderProducts =({item}) =>{
        return(
             
            <View style={styles.MainSection}>
            <View style={styles.MainSectionStyle}>
                <View style={styles.headSection}>
                    <View style={styles.IdSection}>
                        <Text style={styles.IdSectionTxt}>ID: {item.order_id}</Text>
                    </View>
                    <View style={styles.DateSection}>
                        <Text style={styles.DateSectionTxt}>{moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                    </View>
                </View>
                <View style={{width:wp('90%'),height:wp('0.3'),backgroundColor:'#29ABE2',marginBottom:wp('2%'),marginTop:wp('2%')}} />
                <View style={styles.NextSection}>
                    <View style={styles.FNameSection}>
                        <Text style={styles.FNameSectionTxt}>First Name</Text>
                    </View>
                </View>
                <View style={styles.NextSection}>
                    <View style={styles.FNameSection}>
                        <Text style={styles.FNameSectionTxtName}>{item.first_name}</Text>
                    </View>
                </View>
                <View style={styles.NextSection}>
                    <View style={styles.FNameSection}>
                        <Text style={styles.FNameSectionTxt}>Email Address</Text>
                    </View>
                </View>
                <View style={styles.NextSection}>
                    <View style={styles.FNameSection}>
                        <Text style={styles.FNameSectionTxtName}>{item.email}</Text>
                    </View>
                </View>
                <View style={{width:wp('90%'),height:wp('0.3'),backgroundColor:'#29ABE2',marginBottom:wp('1.5%'),marginTop:wp('1.5%')}} />
                <View style={styles.NextSection}>
                    <View style={styles.FNameSection}>
                        <Text style={styles.FNameSectionTxt}>Mobile Number</Text>
                    </View>
                    <View style={styles.EmailSection}>
                        <Text style={styles.FNameSectionTxt}>Payment Method</Text>
                    </View>
                </View>
                <View style={styles.NextSection}>
                    <View style={styles.FNameSection}>
                        <Text style={styles.FNameSectionTxtName}>{item.mobile}</Text>
                    </View>
                    <View style={styles.EmailSection}>
                        <Text style={styles.FNameSectionTxtName}>{item.payment_method}</Text>
                    </View>
                </View>
                <View style={styles.GrandSection}>
                    <View style={styles.GrandNextSection}>
                        <Text style={styles.GrandTotalSectionTxtName}>Grand Total</Text>
                    </View>
                    <View style={styles.GrandValNextSections}>
                        <Text style={styles.GrandTotalSectionTxtNameVal1}>{item.grand_total}</Text>
                    </View>
                </View>
                <View style={styles.GrandSection}>
                    <View style={styles.GrandNextSection}>
                        <Text style={styles.GrandTotalSectionTxtName}>Action</Text>
                    </View>
                    <View style={styles.GrandValNextSection}>
                        <Text style={styles.GrandTotalSectionTxtNameVal}>Complete Detail</Text>
                    </View>
                </View>
            </View>
          
        </View>
        )
    }
    render() {  
        let enable = this.state.screenHeight + 100 > 100;
        return (

            <View style={styles.container}>
                
                <ScrollView scrollEnabled={enable}  showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                    onContentSizeChange={this.onContentSizeChange}>
                    <View style={styles.Section}>    

                        <FlatList
                        data={this.state.ProductsPurchased}
                        renderItem={this.renderProducts}
                        />
                        
                        
                        

                      

                    </View>
            </ScrollView>
          
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
        marginTop:wp('3%') ,
        
      },
      MainSection:
      {
        justifyContent:'center',
        alignItems:'center',
        marginBottom:wp('5%')
      },
      MainSectionStyle:
      {
        width:wp('95%'),
        backgroundColor:'#fff',
        padding:wp('3%'),
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        borderTopLeftRadius:2,
        borderTopRightRadius:2,
        
      },
      headSection:
      {
        flexDirection:'row',
        alignItems:'center',
      
      },
      IdSection:
      {
        flex:1,
      },
      IdSectionTxt:
      {
        fontSize: 12,
        fontWeight:'700'
      },
      DateSectionTxt:
      {
        fontSize: 12,
        fontWeight:'500',
        color:'#a1a1a1'
      },
      NextSection:
      {
        
        flexDirection:'row',
        marginTop:wp('1%')
      },
      FNameSection:
      {
        flex:1,
      },
      EmailSection:
      {
        marginLeft:wp('3%'),
        width:wp('41%')
      },
      FNameSectionTxt:
      {
        fontSize: 13,
        fontWeight:'500',
        color:'#a1a1a1'
      },
      FNameSectionTxtName:
      {
        fontSize: 15,
        fontWeight:'bold',
        
      },
      GrandSection:
      {
          flexDirection:'row',
          marginTop:15,
      },
      GrandNextSection:
      {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:2,
        borderBottomLeftRadius:2,
        width:wp('30%'),
        padding:wp('3%'),
        height:wp('10%'),
        backgroundColor:'#fff',
        elevation:5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
      },
      GrandValNextSections:      
       {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderTopRightRadius:2,
        borderBottomRightRadius:2,
        width:wp('58%'),
        height:wp('10%'),
        borderColor:'#29ABE2',
        borderWidth:2,
        backgroundColor:'#fff',
      },
       GrandValNextSection:      
       {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderTopRightRadius:2,
        borderBottomRightRadius:2,
        width:wp('58%'),
        height:wp('10%'),
        backgroundColor:'#29ABE2',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
      },
      GrandTotalSectionTxtName:
      {
        fontSize:15,
      },
      GrandTotalSectionTxtNameVal:
      {
        fontSize:16,
        fontWeight:'bold',
        color:'#fff'
      },
      GrandTotalSectionTxtNameVal1:
      {
        fontSize:16,
        fontWeight:'bold',
      
      },
});

const mapStateToProps = state => {
    return {
      notice: state.BestImages.GetNotifiactions,
      user:state.user.user
    }
  }
  
  export default connect(mapStateToProps,null)(Products_Purchased)