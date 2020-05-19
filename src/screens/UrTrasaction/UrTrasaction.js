
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
import { FlatList } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import moment from 'moment';
class UrTrasaction extends React.Component {
    state = {
        screenHeight: 0,
        ProductsPurchased:[]
    }
    componentDidMount = () =>{
      this.GetProductsPurchased()
    }
    onContentSizeChange = (contentHeight) => {
        // Save the content height in state
       let content = contentHeight + 100;
        this.setState({ screenHeight: content });
    };
    GetProductsPurchased =() =>{
      fetch('https://urpixpays.com/stagging_urpixpays/u_transaction/'+this.props.user.no)
      .then((response) =>response.json())
      .then((responseData) =>{
          console.log(responseData);
          this.setState({
              ProductsPurchased:responseData.transaction
          })
      }).catch((err) =>{
        console.log()
      })
  }
  renderTransactions = ({item}) =>{
    console.log(item);
    return(
      <View style={styles.MainSection}>
                            <View style={styles.MainSectionStyle}>
                                <View style={styles.headSection}>
                                    <View style={styles.IdSection}>
                                        <Text style={styles.IdSectionTxt}>No: {item.id}</Text>
                                    </View>
                                    <View style={styles.DateSection}>
                                        <Text style={styles.DateSectionTxt}>{moment(item.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                                    </View>
                                </View>
                                <View style={{width:wp('90%'),height:wp('0.3'),backgroundColor:'#29ABE2',marginBottom:wp('2%'),marginTop:wp('2%')}} />
                                <View style={styles.NextSection}>
                                    <View style={styles.FNameSection}>
                                        <Text style={styles.FNameSectionTxt}>Name</Text>
                                    </View>
                                </View>
                                <View style={styles.NextSection}>
                                    <View style={styles.FNameSection}>
                                        <Text style={styles.FNameSectionTxtName}>{item.name}</Text>
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
                                <View style={styles.NextSection}>
                                    <View style={styles.FNameSection}>
                                        <Text style={styles.FNameSectionTxt}>Description</Text>
                                    </View>
                                </View>
                                <View style={styles.NextSection}>
                                    <View style={styles.FNameSection}>
                                        <Text style={styles.FNameSectionTxtName}>{item.type}
                                         </Text>
                                    </View>
                                </View>
                                <View style={{width:wp('90%'),height:wp('0.3'),backgroundColor:'#29ABE2',marginBottom:wp('1.5%'),marginTop:wp('1.5%')}} />
                                <View style={styles.NextSection}>
                                    <View style={styles.FNameSection}>
                                        <Text style={styles.FNameSectionTxt}>PIX ID</Text>
                                    </View>
                                    <View style={styles.EmailSection}>
                                        <Text style={styles.FNameSectionTxt}>Amount Trascation</Text>
                                    </View>
                                </View>
                                <View style={styles.NextSection}>
                                    <View style={styles.FNameSection}>
                                        <Text style={styles.FNameSectionTxtName}>{item.no}</Text>
                                    </View>
                                    <View style={styles.EmailSection}>
                                        <Text style={styles.FNameSectionTxtName}>{item.amount}</Text>
                                    </View>
                                </View>
                                <View style={styles.GrandSection}>
                                    <View style={styles.GrandNextSection}>
                                        <Text style={styles.GrandTotalSectionTxtName}>Action</Text>
                                    </View>
                                    <View style={styles.GrandValNextSection}>
                                        <Text style={styles.GrandTotalSectionTxtNameVal}>{item.action}</Text>
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
                        renderItem={this.renderTransactions}
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
        marginTop:10 ,
        
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
        width:wp('42%')
      },
      FNameSectionTxt:
      {
        fontSize: 13,
        fontWeight:'500',
        color:'#a1a1a1'
      },
      FNameSectionTxtName:
      {
        fontSize: 14,
        fontWeight:'bold',
        
      },
      GrandSection:
      {
          flexDirection:'row',
          marginTop:10,
      },
      GrandNextSection:
      {
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        borderTopLeftRadius:2,
        borderBottomLeftRadius:2,
        width:wp('30%'),
        height:wp('10%'),
        borderColor:'#000',
        borderWidth:1,
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

export default connect(mapStateToProps,null)(UrTrasaction)