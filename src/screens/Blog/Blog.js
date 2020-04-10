
import Icon from 'react-native-vector-icons/MaterialIcons';
import pro_image from '../../images/profile.png';
import img1 from '../../images/1.jpg';


import React, {Fragment} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
  View,
  ImageBackground,
  Image,
  Text,
  StatusBar,
} from 'react-native';
import Topbar from '../../components/topbar/topbar';
import { connect } from 'react-redux';
import MenuDrawer from 'react-native-side-drawer';
import SideDrawer from '../sidedrawer/sidedrawer';



class Blog extends React.Component {

  state={
    open:false,
  }


  drawerContent = () => {
    return (
          <TouchableWithoutFeedback onPress={this.toggleOpen} style={[styles.animatedBox]}>
          <SideDrawer  goto={(s)=>this.gotoScreen(s)}  />
      </TouchableWithoutFeedback>
        
    );
  };
  toggleOpen = () => {
    this.setState({ open: !this.state.open });
  };
  
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };
  renderFotter =() => {
    return(
      <View style={{paddingVertical:20}}>
          <ActivityIndicator animating size="large" />
      </View>
    )
  }

  gotoScreen = (screen) =>{
    
    Navigation.push(this.props.componentId, {
        component: {
          name: screen,
          passProps: {
            text: 'Pushed screen'
          },
          options: {
            topBar: {
              visible:false
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

  render() {
    return (
      <View style={styles.conatainer}>
         {/* <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={250}
          overlay={true}
          opacity={.9}
        > */}
        {/* <View style={styles.topbarBox}>
        <Topbar OpenSideDrawer={this.toggleOpen} style={{zIndex:9999}} title={'Blog'}/>
      </View> */}
        <ScrollView>

       <View style={{marginBottom:wp('7%')}}>
       <View style={styles.view_photo_parent}>
          <Text
            style={{
              fontSize: wp('4%'),
              fontWeight: '700',
              marginTop: wp('5%'),
            }}>
            A Comfortabel Car is best for your journey
          </Text>
          <Text
            style={{
              fontSize: wp('3%'),
              fontWeight: '100',
              marginTop: wp('2%'),
            }}>
            If true, the grid will be scrolling horizontally. If you want your
            item to fill the height when using a horizontal grid, you should
            give it a
          </Text>

          <View style={styles.view_flexes}>
            <View style={styles.view_flex_1}>
              <View style={styles.view_person_pic}>
                <Image style={styles.img_style} source={pro_image} />
              </View>
            </View>

            <View style={styles.view_flex_2}>
              <View style={styles.view_texes}>
                <Text style={styles.text_name}>Arif Sahab</Text>
                <Text style={styles.text_comments}>Auguts 12,2019</Text>
              </View>
            </View>
            <View style={styles.view_flex_2}>
              <View style={styles.view_texes1}>
                <Text style={styles.text_comments}>200</Text>
                <Text style={styles.text_comments}>views </Text>
                <Text style={styles.text_comments}>5</Text>
                <Text style={styles.text_comments}>comment </Text>
              </View>
            </View>
          </View>

          <View style={styles.view_photo}>
            <ImageBackground
              style={styles.view_img_bg}
              source={img1}></ImageBackground>
          </View>

          <Text
            style={{fontSize: wp('3%'), marginTop: wp('3%'),textAlign:'justify',fontWeight:'300'}}>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English. Many desktop publishing
            packages and web page editors now use Lorem Ipsum as their default
            model text, and a search for 'lorem ipsum' will uncover many web
            sites still in their infancy. Various versions have evolved over the
            years, sometimes by accident, sometimes on purpose (injected humour
            and the like).
          </Text>
        </View>

        <View style={styles.view_gray}>
          <View style={styles.view_flex_one}>
            <Text
              style={{fontWeight: '600', fontSize: wp('5%'), color: '#ffffff'}}>
              Newsletter
            </Text>
            <Text
              style={{fontWeight: '100', fontSize: wp('3%'), color: '#ffffff',marginTop:'2%'}}>
              Get Urpixpays Updates{' '}
            </Text>
            <Text
              style={{fontWeight: '100', fontSize: wp('3%'), color: '#ffffff'}}>
              Please Subscribe
            </Text>
          </View>
          <View style={styles.view_flex_two}>
              <View style={styles.view_icon_mail}>
                <Icon name="drafts" size={wp('5%')} color="white" />
              </View>
            

           
              <View style={styles.view_input}>
                <TextInput
                  style={styles.input}
                  placeholder="Email or Phone Number"
                />
              
            </View>
          </View>
        </View>
       </View>

        </ScrollView>

       {/* </MenuDrawer> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    //padding: wp('2%'),
    alignItems: 'center',
    alignSelf: 'auto',
    backgroundColor: '#F4F7FC',
  },
  topbarBox:
  {
    width:wp('100%'),
    height:hp('10%'),
    borderBottomColor:'rgba(0,0,0,0.5)',
    borderBottomWidth:wp('.4%'),

    // shadowOffset:{  width: 10,  height: 10,  },
    // shadowColor: 'black',
    // shadowOpacity: 1.0,
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    padding: wp('2%'),

    width: wp('98%'),
  },

  view_photo: {
    height: wp('60%'),
    width: wp('95%'),
  },

  view_img_bg: {
    width: '100%',
    height: '100%',
  },

  text_style: {
    fontWeight: '500',
    color: 'blue',
    fontSize: wp('3%'),
  },
  view_overlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .4)',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  view_text: {
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_overlay1: {
    height: wp('9%'),
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, .8)',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_person_pic: {
    height: wp('10%'),
    width: wp('10%'),
    marginLeft: wp('2%'),
    padding: wp('2%'),
    backgroundColor: '#F4F7FC',
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    marginBottom: wp('3%'),
    alignItems: 'center',
    alignContent: 'center',
  },
  img_style: {
    height: wp('8%'),
    width: wp('8%'),
  },
  view_flexes: {
    flexDirection: 'row',
    marginTop: wp('5%'),
  },
  view_flex_1: {
    flex: 0.5,
  },
  view_flex_2: {
    flex: 2,
    marginTop: wp('2%'),
    marginLeft: wp('2%'),
  },

  view_flex_3: {
    flex: 1,
    flexDirection: 'row',
  },
  view_texes1: {
    marginTop: wp('3%'),
    flexDirection: 'row',
  },
  text_comments: {
    fontSize: wp('3%'),
    color: '#626260',
    marginRight: wp('1.5%'),
  },
  text_name: {
    fontWeight: '500',
    fontSize: wp('3%'),
  },
  view_gray: {
    backgroundColor: '#626260',
    flexDirection: 'row',
    height: wp('25%'),
    width: wp('100%'),
    marginTop: wp('10%'),
  },
  view_flex_one: {
    flex: 0.8,
    marginLeft: wp('3%'),
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  view_flex_two: {
    flex: 1.2,
    marginRight: wp('3.5%'),
    flexDirection: 'row',
    marginLeft: wp('3%'),
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  },
  view_icon_mail: {
    height: wp('8%'),
    width: wp('12%'),
    marginRight:wp('0.6%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: '#1DA1F3',
  },
  view_input: {
    height: wp('8%'),
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    width: wp('40%'),
    backgroundColor: '#F4F7FC',
  },
  input: {
      justifyContent:'center',
      alignSelf:'center',
      height:'100%',
      alignItems:'center',
      alignContent:'center',
    fontSize: wp('3%'),
    color: '#999999',
  },
  view_style: {
    justifyContent: 'center',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
  }
});
export default connect(null,null) (Blog);