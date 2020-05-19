import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  ImageBackground,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  TouchableWithoutFeedback,
  findNodeHandle,
  Dimensions
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import CountDown from 'react-native-countdown-component';
import { Navigation } from "react-native-navigation";
import { FriendsIviteData, ChallengeInviteData } from '../../store/actions/index';
import bg from '../../images/bg-img.jpg';
import techni from '../../images/Tecnisan.jpg';
import Ficons from 'react-native-vector-icons/FontAwesome';
import MenuDrawer from 'react-native-side-drawer';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/Ionicons';
import Topbar from '../../components/topbar/topbar';
import userImage from '../../images/icon/invite-friends.png';
import SideDrawer from '../../screens/sidedrawer/sidedrawer';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
}
  from 'react-native-table-component';
// import { ChallengeInvite } from '../../store/actions/pages';
const { height } = Dimensions.get('window');
console.log(hp('100%'));
class FriendInvite extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['Email_Address','Status'],
      widthArr: [wp('44.5%'), wp('44.5%')],
      email:'',
      name:'',
      tableData:[]
    }
    this._GetChallengeInvites();
  }

  state = {
    // We don't know the size of the content initially, and the probably won't instantly try to scroll, so set the initial content height to 0
    open: false,
    screenHeight: 0,

  };
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    content = contentHeight + 150;
    this.setState({ screenHeight: content });
  };
  // drawerContent = () => {
  //   return (
  //     <View style={[styles.animatedBox]}>
  //       <SideDrawer OpenSideDrawer={this.toggleOpen} goto={(s) => this.gotoScreen(s)} />
  //     </View>

  //   );
  // };
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };

  gotoScreen = (screen) => {

    Navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: {
          text: 'Pushed screen'
        },
        options: {
          topBar: {
            visible: false
          }
        }
      }
    });

  }

  _GetChallengeInvites =() =>{
    fetch('https://urpixpays.com/stagging_urpixpays/challenges/invite/'+this.props.CurrentChallenge[0].id+'/'+this.props.user.no)
    .then((response)=>response.json())
    .then((responseData) =>{
      console.log(responseData.invition);
      let tableData=[];
      for (let i = 0; i < responseData.invition.length; i += 1) {
        const rowData = [];
        rowData.push(`${responseData.invition[i].friend_email}`, `${responseData.invition[i].state}`);
  
        tableData.push(rowData);
        
       
      }
      this.setState({
        tableData:tableData
      })
    }).catch((err) =>{
      console.log(err);
    })
  }
  _scrollToInput (reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode)
  }
  render() {
    const columns = [
     
    ];

    const state = this.state;
    const scrollEnabled = this.state.screenHeight > height;

    const tableData = [];
    for (let i = 0; i < columns.length; i += 1) {
      const rowData = [];
      rowData.push(`${columns[i].email}`, `${columns[i].Name}`);

      tableData.push(rowData);
    }
    console.log(this.state.tableData)
    return (
      <View style={{ flex: 1, zIndex: 0,backgroundColor:'#ffffff' }}>
          <KeyboardAwareScrollView   innerRef={ref => {
    this.scroll = ref
  }}>
          <ScrollView

          >

            <View style={styles.OuterView}>
              <View style={styles.InviteFriendView}>
                {/* Invite Friedns Top IVew */}
                <View style={styles.InviteFriendsTopView}>
                  <Text style={styles.InviteFriendsTopViewText}>
                    Invite Friends
                    </Text>
                </View>
                {/* Invite Friends Middle View */}
                <View style={styles.InviteFriendsMiddleView}>
                  <View style={styles.InviteFriendsPic}>
                    <Image source={userImage} style={{ width: wp('45%'), height: wp('45%') }} />
                  </View>
                  {/* <View style={styles.InviteFriednsTextView}>
                    <View style={styles.InviteFriednsTextBold}>
                      <Text style={styles.InviteFriednsTextBoldInner}>
                        INVITE CHALLENGE AND GET CASH REWARDS!
                            </Text>
                    </View>
                    <View style={styles.InviteFriendsTextInfoView}>
                      <Text style={styles.InviteFriednsText}>1. If your friend signs up through your invitation, both of you will receive $0.10</Text>
                    </View>
                    <View style={styles.InviteFriendsTextInfoView}>
                      <Text style={styles.InviteFriednsText}>2. If your friend’s friend joins, you will receive $0.05</Text>
                    </View>
                    <View style={styles.InviteFriendsTextInfoView}>
                      <Text style={styles.InviteFriednsText}>3. As a member you have a lifetime earnings from your invitees’ purchase transactions</Text>
                    </View>
                  </View> */}
                </View>
                {/* Invite Friends Lower View */}
                <View style={styles.InviteFriendBottomOuterView_p}>
                  <View style={styles.InviteFriendBottomOuterView_1}>
                    <View style={styles.InviteFriednsBottomInnerViewFirst}>
                      <View style={styles.firstInput}>
                        <View style={styles.inputLeft}>
                          <Ficons name={'user'} size={wp('5.6%')} style={{ color: 'white' }} />
                        </View>
                        <View style={styles.inputRight}>
                          <TextInput
                            onFocus={(event: Event) => {
                              // `bind` the function if you're using ES6 classes
                              this._scrollToInput(findNodeHandle(event.target))
                            }}
                          value = {this.state.name}
                            onChangeText={(val)=>this.setState({name:val})}
                            placeholder='Full Name'
                            style={styles.inputStyle} />
                        </View>
                      </View>
                      <View style={styles.secondInput}>
                        <View style={styles.inputLeft}>
                          <Ficons name={'envelope-open'} size={wp('4%')} style={{ color: 'white' }} />
                        </View>
                        <View style={styles.inputRight}>
                          <TextInput
                            onFocus={(event: Event) => {
                              // `bind` the function if you're using ES6 classes
                              this._scrollToInput(findNodeHandle(event.target))
                            }}
                            value={this.state.email}
                            onChangeText={(val)=>this.setState({email:val})}
                            placeholder='Email Address'
                            style={styles.inputStyle} />
                        </View>
                      </View>
                    </View>
                    <TouchableOpacity 
                    onPress={()=>this.props.invitechallenge(this.state.name,this.state.email,this.props.CurrentChallenge[0].id)}
                    style={styles.InviteFriednsBottomInnerViewSecond}>
                      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }}
                        colors={['#bbd9f1', '#138ece', '#0067a9']} style={styles.InviteButton}>
                        <Text style={styles.InviteFriednsBottomInnerViewSecondText}>
                          Enter
                            </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.view_line}>
                  </View>
                  {/* <View style={styles.InviteFriendBottomOuterView_1}>
                    <TouchableOpacity style={styles.InviteFriednsBottomInnerViewSecond}>
                      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1.2, y: 0 }}
                        colors={['#bbd9f1', '#138ece', '#0067a9']} style={styles.InviteButton}>
                        <Text style={styles.InviteFriednsBottomInnerViewSecondText}>
                          Generate link
                            </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View> */}
                </View>
              </View>
              <View style={styles.inviteFirendsTable}>
                <View style={{ marginLeft: wp('5%'), padding: wp('2%') }}>
                  <Text style={{ fontSize: wp('4%'), fontFamily: 'Roboto', fontWeight: '500' }}>
                    Invited Friends
                </Text>
                </View>
                <View style={styles.tebleViewStyle}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={styles.text} />
                  </Table>
                  <ScrollView style={styles.dataWrapper}>
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                      {
                        this.state.tableData.map((rowData, index) => (
                          <Row
                            key={index}
                            data={rowData}
                            widthArr={state.widthArr}
                            style={[styles.row, index % 2 && { backgroundColor: '#f2f2f2' }]}
                            textStyle={styles.text}
                          />
                        ))
                      }
                    </Table>
                  </ScrollView>
                </View>
                <View style={styles.line}>
                  <View style={styles.lineinner}>

                  </View>
                </View>
              </View>
            </View>


          </ScrollView>
          </KeyboardAwareScrollView>
      </View>

    )
  }


}


const styles = StyleSheet.create({
  topbarBox:
  {
    width: wp('100%'),
    height: hp('10%'),
    borderBottomColor: 'rgba(0,0,0,0.5)',
    borderBottomWidth: wp('.4%'),
  },
  header: { height: wp('8%'), backgroundColor: '#f2f2f2' },
  text: { textAlign: 'center', fontWeight: '100', fontSize: wp('3%') },
  dataWrapper: { marginTop: -1 },
  row: { height: wp('8%'), backgroundColor: '#fff' },
  OuterView: {
    paddingLeft: wp('2%'),
    paddingRight: wp('2%'),
    paddingTop: wp('6%')
  },
  InviteFriendView: {
    flex: 1,
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.4)'
  },
  InviteFriendsTopViewText: {
    fontSize: wp('6%'),
    fontFamily: 'Roboto-Bold',
  },
  InviteFriendsTopView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    paddingTop: wp('5%'),
    paddingBottom: wp('3%'),
    borderBottomColor: 'rgba(0,0,0,.4)',
    borderBottomWidth: wp('.2'),
  },
  InviteFriendsPic: {
    justifyContent: 'center',
    alignContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center'
  },
  InviteFriednsTextView: {
    paddingLeft: wp('6%'),
  },
  InviteFriednsTextBold: {
    //   justifyContent:'center',
    marginBottom: wp('3%')
    //   alignItems:'center'
  },
  InviteFriednsTextBoldInner: {
    fontSize: wp('4%'),
    fontFamily: 'Raleway',
    fontWeight: '700'
  },
  InviteFriendsTextInfoView: {
    marginBottom: wp('2.7%'),
    marginRight: wp('1%')
  },
  InviteFriednsText: {
    fontSize: wp('2.7%'),
    textAlign: 'justify',
    fontFamily: 'Roboto',
    fontWeight: '400'
  },
  InviteFriednsBottomInnerViewFirst: {
    // flexDirection:'row',
    // justifyContent:'space-evenly',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignSelf: 'auto'
  },
  firstInput: {
    flexDirection: 'row',
    alignSelf: 'auto',
    width: wp('100%'),
    marginBottom: wp('1%'),
    alignContent: 'center',
    alignItems: 'center',
  },
  inputLeft: {
    backgroundColor: '#29ABE2',
    paddingTop: wp('1%'),
    paddingBottom: wp('1%'),
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    height: wp('9%'),
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center'
  },
  secondInput: {
    flexDirection: 'row',
    width: '100%',
    alignSelf: 'auto',
    marginTop: wp('1%'),
    alignContent: 'center',
    alignItems: 'center',
  },
  inputRight: {
    backgroundColor: '#f2f2f2',
    width: wp('75%'),
    // paddingTop:wp('1%'),
    // paddingBottom:wp('1%'),
    paddingLeft: wp('4%'),
    height: wp('9%'),
    justifyContent: 'center'
  },
  inputStyle: {
    color: 'black',
    fontSize: wp('3.3%'),
    fontFamily: 'Raleway'
  },
  // InviteFriendBottomOuterView:{
  //     justifyContent:'center',
  //     // alignItems:'center',
  //     alignContent:'center',
  //     alignSelf:'auto',
  //     marginTop:wp('2%'),
  //     paddingLeft:wp('3%'),
  // },
  InviteFriendBottomOuterView_p: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // alignItems:'center',
    padding: wp('1.5%'),
  },


  view_line:
  {
    // margin:wp('1%'),
    flex: 0.01,
    // width:wp('0.1%'),
    height: wp('25%'),
    backgroundColor: 'rgba(0,0,0,.3)'

  },

  InviteFriendBottomOuterView_1: {
    justifyContent: 'center',
    // alignItems:'center',
    flex: 1,
    paddingLeft: wp('1.5%'),
    alignContent: 'center',
    alignSelf: 'auto',
    marginTop: wp('2%'),
  },
  InviteFriednsBottomInnerViewSecond: {
    justifyContent: 'flex-start',
    // alignSelf:'auto',
    alignContent: 'center',
    alignItems: 'flex-start',
    marginTop: wp('3%'),
    marginBottom: wp('3%')
  },
  InviteFriednsBottomInnerViewSecondText: {
    fontSize: wp('5%'),
    color: 'white',
    fontWeight: '800',
    fontFamily: 'Roboto'
  },
  InviteButton: {
    // paddingRight:wp('17.5%'),
    // paddingLeft:wp('17.5%'),
    width: wp('43%'),
    paddingTop: wp('1%'),
    alignItems: 'center',
    paddingBottom: wp('1%'),
  },
  inviteFirendsTable: {
    borderRadius: 1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.4)',
    marginTop: wp('5%'),
    marginBottom: wp('10%')
  },
  tebleViewStyle: {
    paddingLeft: wp('3%'),
    paddingRight: wp('3%'),
    marginBottom: wp('4%')
  },
  line: {

    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',

  },
  lineinner: {
    width: wp('40%'),
    height: wp('.5%'),
    backgroundColor: '#29ABE2'
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    zIndex: 0
  },
  animatedBox: {
    // position:'absolute',
    //top:hp('10%'),
    // borderTopColor:'rgba(0,0,0,.5)',
    // borderTopWidth:wp('.4'),
    //bottom:0,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //paddingTop: 20

  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F04812'
  },
  sideMenuContainer: {

    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 20
  },

  sideMenuProfileIcon:
  {
    resizeMode: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },

  sideMenuIcon:
  {
    resizeMode: 'center',
    width: 28,
    height: 28,
    marginRight: 10,
    marginLeft: 20
  },
  menuText: {
    fontSize: 15,
    color: '#222222',
  }
});

const mapStatesToProps = state =>{
  return{
    friendsdata:state.BestImages.SaveInviteFriends,
    CurrentChallenge: state.BestImages.CurrentChallenge,
    user:state.user.user
  }
}
const mapsDispatchToProps = dispatch => {
  return {
    invitechallenge : (name, email,cid) => dispatch(ChallengeInviteData(name, email,cid)),
  }
}
export default connect(mapStatesToProps, mapsDispatchToProps)(FriendInvite);
