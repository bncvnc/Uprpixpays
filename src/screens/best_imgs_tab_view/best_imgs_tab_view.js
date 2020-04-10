import * as React from 'react';
import { View, TouchableOpacity,TouchableWithoutFeedback, StyleSheet,ImageBackground,Text,ActivityIndicator,Image } from 'react-native';
import { TabView, SceneMap,TabBar } from 'react-native-tab-view';
import Lightbox from 'react-native-lightbox';
import Animated from 'react-native-reanimated';
import img1 from '../../images/1.jpg';
import img2 from '../../images/2.jpg';
import img3 from '../../images/3.jpg';
import SideDrawer from '../sidedrawer/sidedrawer';
import {GetImages} from '../../store/actions/index';
import FastImage from 'react-native-fast-image';
import Topbar from '../../components/topbar/topbar';
import MenuDrawer from 'react-native-side-drawer';
import Icon_out from 'react-native-vector-icons/FontAwesome';
import { FlatGrid } from 'react-native-super-grid';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

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





class TabViewExample extends React.Component {
  state={
    open:false,
  }

  constructor(props){
    super(props);
   this.props.GetAllImages();

  }
  
 
  // drawerContent = () => {
  //   return (
  //         <TouchableWithoutFeedback onPress={this.toggleOpen} style={[styles.animatedBox]}>
  //         <SideDrawer OpenSideDrawer={this.toggleOpen}  goto={(s)=>this.gotoScreen(s)}  />
  //     </TouchableWithoutFeedback>
        
  //   );
  // };
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


  
  FirstRoute = () => (
    <View style={styles.container}>
      {/* <MenuDrawer 
          open={this.state.open} 
          drawerContent={this.drawerContent()}
          drawerPercentage={60}
          animationTime={250}
          overlay={true}
          opacity={.9}
        > */}
          
    <FlatGrid
          itemDimension={wp('40%')}
          items={this.state.items}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({item, index}) => {
            console.log(item);
            return (
              <View style={styles.view_photo_1}>
                <View style={{flex: 0.85}}>

                <FastImage
                     style={styles.view_img_bg}
                  source={{
                      img1,
                      priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
              />

                
                </View>
                <View style={styles.view_img_settings}>
                  <Text style={styles.text_color}>Streeet</Text>
                </View>
              </View>
    
          )
          }}
          keyExtractor = { (item, index) => index.toString() }
        />
         {/* </MenuDrawer> */}
    </View>
);


 SecondRoute = () => {
   let best =(<ActivityIndicator/>)
   if(this.props.BestImages.BestImages.length >3 )
   {
    best = (<FlatGrid
      itemDimension={wp('40%')}
      items={this.props.BestImages.BestImages}
      style={styles.gridView}
      renderItem={({item, index}) => (
          <View style={styles.view_photo_1}>
            <View style={{flex: 0.8}}>
              {/* <Lightbox>
              <FastImage
                     style={styles.view_img_bg}
                  source={{
                       uri:'https://urpixpays.com/public/uploads/info_images/'+item.imgname,
                      priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  
              />
              </Lightbox> */}
              <FastImage
                     style={styles.view_img_bg}
                  source={{
                       uri:'https://urpixpays.com/public/uploads/info_images/'+item.imgname,
                      priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                  
              />
              {/* <ImageBackground
                style={styles.view_img_bg}
                resizeMethod='auto'
                source={{uri:'https://urpixpays.com/public/uploads/info_images/'+item.imgname}}></ImageBackground> */}
                
            </View>
            <View style={styles.view_img_settings}>
              <Text style={styles.text_color}>{item.imgtitle}</Text>
            </View>
          </View>

      )}
      keyExtractor = { (item, index) => index.toString() }
    />);
   }
   return(
    <View style={styles.container}>
      {best}
      </View>
      
  )
 };
 ThirdRoute = () => (
    <View style={styles.container}>
    <FlatGrid
          itemDimension={wp('40%')}
          items={this.props.BestImages.BestImages}
          style={styles.gridView}
          // staticDimension={300}
          // fixed
          // spacing={20}
          renderItem={({item, index}) => (
              <View style={styles.view_photo_1}>
                <View style={{flex: 0.85}}>
                  <ImageBackground
                    style={{flex:1}}
                    source={img3}></ImageBackground>
                </View>
                <View style={styles.view_img_settings}>
                  <Text style={styles.text_color}>Streeet</Text>
                </View>
              </View>
    
          )}
          keyExtractor = { (item, index) => index.toString() }
        />
    </View>
);

  
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Recent' },
      { key: 'second', title: 'Best' },
      { key: 'third', title: 'Winner' },
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (

        
      <View style={styles.tabBar}>
        {props.navigationState.routes.map((route, i) => {
          return (
              <TouchableOpacity
              style={[styles.tabItem,{ borderBottomWidth:this.state.index === i ? wp('.6%'):0,
                borderBottomColor:this.state.index === i ?'#29ABE2':'black'}]}
              onPress={() => this.setState({ index: i })}>
              <Animated.Text style={[{fontSize:wp('5%'),color:'rgba(0,0,0,.5)',
              fontFamily:'Roboto'}]}>{route.title}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };



    _renderScene = SceneMap({
      first: this.FirstRoute,
      second: this.SecondRoute,
      third: this.SecondRoute,
  
    });
  
    // renderSomething = () => {
    //   alert('Hlleow');
    // }
  

  render() {
    console.log(this.state.items);
    console.log(this.props.BestImages.BestImages);
    return (
      
      <View style={{flex:1,zIndex:0,backgroundColor:'#ffffff'}}>
         {/* <View style={styles.topbarBox}>
        <Topbar OpenSideDrawer={this.toggleOpen} style={{zIndex:9999}} title={'Best Images'}/>
      </View> */}
        {/* <TabView 
        navigationState={this.state}
        renderScene={({ route }) => {   
          switch (route.key) {
          case 'first':
              return this.SecondRoute();
          case 'second':
              return this.SecondRoute();
          case 'third':
          return this.SecondRoute();
          default:
              return null;
          }
      }}
        // renderScene={this.props.BestImages.BestImages.length > 1 ? this._renderScene : this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={this._handleIndexChange}
      /> */}
       <View style={styles.container}>
       <FlatGrid
      itemDimension={wp('40%')}
      items={this.props.BestImages.BestImages}
      style={styles.gridView}
      // staticDimension={300}
      // fixed
      // spacing={20}
      renderItem={({item, index}) => 
      {
        let field ='Height'+index;
        let width = 'Widht'+index
        let Loading = 'Loading'+index;
      return(
          <View style={styles.view_photo_1}>
            <View style={{flex: 0.8}}>
              <Lightbox
                  style={{justifyContent: "center"}}
                  springConfig={{ overshootClamping: true }}
                  renderContent={() => (
                    <FastImage
                    onLoadStart={() => { this.setState({ [Loading]: true })} }
                    onLoadEnd={() => { this.setState({ [Loading]: false })} }
                    style={{alignSelf: "center", width: '100%', height: '100%',resizeMode:'contain'}}
                 source={{
                      uri:'https://urpixpays.com/public/uploads/info_images/'+item.imgname,
                     priority: FastImage.priority.high,
                 }}
                 resizeMode={FastImage.resizeMode.contain}
                 
             > 
             {this.state[Loading]?
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                        <ActivityIndicator animating={ this.state[Loading] } size={'large'} color={'#29ABE2'} />

                        </View>
                        :<React.Fragment></React.Fragment>}
             </FastImage>
                  )}
              >
              <FastImage
                  onLoadStart={() => { this.setState({ [Loading]: true })} }
                  onLoadEnd={() => { this.setState({ [Loading]: false })} }
                  style={styles.view_img_bg}
                  source={{
                       uri:'https://urpixpays.com/public/uploads/info_images/'+item.imgname,
                      priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                  
              > 
              {this.state[Loading]?
                        <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',flex:1}}>
                        <ActivityIndicator animating={ this.state[Loading] } size={'large'} color={'#29ABE2'} />

                        </View>
                        :<View style={{justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'auto',width:'100%',height:'100%'}}>
                        <Icon_out name="search-plus" size={wp('5%')} color="#ffffff" />
                        </View>}
              
              </FastImage>
              </Lightbox>

                
            </View>
            <View style={styles.view_img_settings}>
              <Text style={styles.text_color}>{item.imgtitle}</Text>
            </View>
          </View>

      )
      }
    }
      keyExtractor = { (item, index) => index.toString() }
    />
    </View>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    paddingTop:10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
   
    padding:wp('5%'),
    fontWeight:'bold',
   
  },
  conatainer: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'auto',
    backgroundColor: '#F4F7FC',
  },
  topbar_view: {
    flexDirection: 'column',
    height: hp('10%'),
    width: wp('100%'),
  },
  view_photo_parent: {
    paddingTop: wp('3%'),
    paddingRight: wp('2%'),
    paddingLeft: wp('2%'),
    paddingBottom: wp('2%'),
    flexDirection: 'row',
    height: wp('35%'),
    width: wp('100%'),
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  view_photo_1: {

    width:'100%',
    height: hp('20%'),}
    ,
  view_number: {
    marginLeft: wp('0.5%'),
    marginTop: wp('0.5%'),
    height: wp('5.5%'),
    width: wp('5.5%'),
    padding: wp('1%'),
    backgroundColor: '#ffffff',
    borderRadius: wp('0.5%'),
    justifyContent: 'center',
    alignSelf: 'auto',
    alignItems: 'center',
    alignContent: 'center',
  },
  view_img_bg: {
    width: '100%',
    height: '100%',
    

  },
  
  
  text_style: {
    fontWeight: '500',
    color: 'blue',
    fontSize:wp('3%')
  },
  view_overlay:
  {
      height:'100%',
      width:'100%',
      backgroundColor:'rgba(0, 0, 0, .6)',
      
  },
  view_text_parent: {

    height:wp('6%'),
    width:wp('18%'),
    flexDirection:'row',
    marginTop:wp('6%'),
    borderColor:'white',
    borderWidth:wp('0.2%'),
    justifyContent:'center',
    alignSelf:'center',
    alignItems:'center',
    alignContent:'center',
    
  },
  text_number:
  {
        fontWeight:'bold',
        fontSize:wp('4%'),
        marginRight:wp('0.1%'),
        color:'#ffffff'
  },
  text_votes:
  {
    
    fontWeight:'bold',
    fontSize:wp('3%'),
    marginLeft:wp('0.1%'),
    color:'#ffffff'

  },
  gridView: {
    flex: 1,
  },

  view_img_settings: {

    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    alignSelf:'auto',
    flex: 0.2,
    marginTop: wp('1%'),
    marginLeft: wp('1%'),
  },
  text_color: {
    fontSize: wp('3.5%'),
    fontWeight: '400',
  },
  shadow:
  {
    alignItems: 'center',
    shadowOffset:{  width: 2,  height: 2,  },
    shadowColor: 'black',
    shadowOpacity: 1.0,
  
  },
  topbarBox:
  {
    width:wp('100%'),
    height:hp('10%'),
    borderBottomColor:'rgba(0,0,0,0.5)',
    borderBottomWidth:wp('.4%'),
  },
  
});


const mapsDispatchToProps = dispatch =>{
  return{
    GetAllImages :()=>dispatch(GetImages())
  }
}
const mapStateToProps = (state)=>{
  return{
    BestImages:state.BestImages
  }
}
export default connect(mapStateToProps,mapsDispatchToProps) (TabViewExample);