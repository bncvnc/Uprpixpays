/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// import React from 'react';
// import FastImage from 'react-native-fast-image';
// import {GetAppInfo} from '../../store/actions/index';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   TextInput,
//   Image,
//   StatusBar,
//   Button,
// } from 'react-native';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

// import Topbar from './topbar';
// import { connect } from 'react-redux';
// class InfoPage extends React.Component {

//   constructor(props){
//     super(props);
//     this.props.GetInfo();
//   }

//   render() {
//     // let js = JSON>P
//     console.log(this.props.first);
    
//     return (
//       <View style={styles.Container}>
//       {/* <View style={styles.topbar_view}>
//           <Topbar />
//         </View>
//          */}

//         <ScrollView>
 
//               <View style={[styles.View_flex1,{height:wp('34%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400',textAlign:'auto'}}>
//               {this.props.first.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),
//                   letterSpacing:wp('-0.2'),
//                   fontWeight:'400',

//                   textAlign: 'center',
//                 }}>
//                {this.props.first.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                   style={[styles.image,{height:wp('26%')}]}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.first.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}
//                   style={[styles.image,{height:wp('26%')}]}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.first.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>
         

//         <View style={[styles.View_flex1,{height:wp('74%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={[styles.image,{height:wp('25%')}]}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.second.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={[styles.image,{height:wp('25%')}]}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.second.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.second.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',
//                   alignItems: 'center',
//                   textAlign: 'justify',
//                 }}>
//                {this.props.second.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('37%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.third.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),
//                   letterSpacing:wp('-0.2'),
//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.third.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                     style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.third.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}
//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.third.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('75%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fourth.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}
//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fourth.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('3.5%'),fontWeight:'400'}}>
//               {this.props.fourth.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.9%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.fourth.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>






//         <View style={[styles.View_flex1,{height:wp('55%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('3.6%'),fontWeight:'400'}}>
//               {this.props.fifth.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.9%'),
//                   marginTop: wp('1%'),
//                   letterSpacing:wp('-0.2'),
//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.fifth.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fifth.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}
//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fifth.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('37%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sixth.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sixth.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('3.8%'),fontWeight:'400'}}>
//               {this.props.sixth.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.8%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.sixth.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('80%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.sevent.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.8%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.sevent.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sevent.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sevent.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={styles.View_flex1}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eight.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                   style={styles.image}
//                 resizeMode={'contain'}

//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eight.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//              {this.props.eight.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.5%'),
//                   marginTop: wp('1%'),
//                   letterSpacing:wp('-0.2'),
//                   fontWeight:'400',
//                   alignItems: 'center',
//                   textAlign: 'justify',
//                 }}>
//                 {this.props.eight.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.View_flex1,{height:wp('35%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('3.8%'),fontWeight:'400'}}>
//               {this.props.nineght.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.8%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.nineght.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.nineght.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.nineght.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('35%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.tenght.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                   style={styles.image}
//                 resizeMode={'contain'}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.tenght.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('3.8%'),fontWeight:'400'}}>
//              {this.props.tenght.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.8%'),
//                   marginTop: wp('1%'),
//                   fontWeight:'400',
//                   textAlign: 'auto',
//                 }}>
//                 {this.props.tenght.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.View_flex1,{height:wp('40%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.eleven.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.9%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.eleven.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eleven.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eleven.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('35%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twelve.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                   style={styles.image}
//                 resizeMode={'contain'}

//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twelve.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//              {this.props.twelve.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.9%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',
//                   textAlign: 'auto',
//                 }}>
//                 {this.props.twelve.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.View_flex1}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.thirten.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.9%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.thirten.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.thirten.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.thirten.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={styles.View_flex1}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fourten.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                   style={styles.image}
//                 resizeMode={'contain'}

//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fourten.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//              {this.props.eight.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('2.9%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.fourten.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={styles.View_flex1}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.fiften.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.fiften.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fiften.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fiften.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('36%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sixten.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                   style={styles.image}
//                 resizeMode={'contain'}

//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sixten.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//              {this.props.sixten.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.sixten.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.View_flex1,{height:wp('73%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.seventen.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.seventen.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.seventen.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.seventen.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('57%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eighten.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                   style={styles.image}
//                 resizeMode={'contain'}

//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eighten.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//              {this.props.eighten.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.eighten.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.View_flex1,{height:wp('95%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.ninghten.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.ninghten.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.ninghten.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.ninghten.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

//         <View style={[styles.View_flex1,{height:wp('36%')}]}>
         
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section2}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twenty.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                   style={styles.image}
//                 resizeMode={'contain'}

//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twenty.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>

//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//              {this.props.twenty.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                 {this.props.twenty.image_detail}
//               </Text>
//             </View>
//           </View>
//         </View>
//         <View style={[styles.View_flex1,{height:wp('57%')}]}>
//           <View style={styles.Box_section}>
//             <View style={styles.Text_View}>
//               <Text style={{color: '#fff', fontSize: wp('4%'),fontWeight:'400'}}>
//               {this.props.twentyone.image_title}
//               </Text>
//             </View>
//             <View style={styles.desc_View}>
//               <Text
//                 style={{
//                   color: '#fff',
//                   fontSize: wp('3%'),
//                   marginTop: wp('1%'),

//                   fontWeight:'400',

//                   textAlign: 'auto',
//                 }}>
//                {this.props.twentyone.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={{flexDirection: 'column',flex:0.6,paddingLeft:wp('1%')}}>
//             <View style={styles.Box_section1}>
//               <View style={styles.desc_View}>
//               <FastImage
//                    style={styles.image}
//                   source={{
//                       uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twentyone.imgname,
//                       priority: FastImage.priority.normal,
//                   }}
//                   resizeMode={FastImage.resizeMode.contain}
//               />
//                 {/* <Image
//                 resizeMode={'contain'}

//                   style={styles.image}
//                   source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twentyone.imgname}}
//                 /> */}
//               </View>
//             </View>
           
//           </View>
//         </View>

        
                



// {/* 
//         <View style={styles.bg_section}>
//           <View style={styles.view_column}>
//             <View style={styles.Icon}>
//               <Image
//                 style={styles.image}
//                 resizeMode={'contain'}

//                 source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.nineght.imgname}}
//               />
//             </View>
//             <View style={styles.Text_bold}>
//               <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
//                 {this.props.nineght.image_title}
//               </Text>
//               </View>
//               <View style={styles.text_description}>
//               <Text style={{fontSize: wp('2%')}}>
//                {this.props.nineght.image_detail}
//               </Text>
//             </View>
//           </View>
//           <View style={styles.view_column}>
//             <View style={styles.Icon}>
//               <Image
//                 resizeMode={'contain'}

//                 style={styles.image}
//                 source={{uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.tenght.imgname}}
//               />
//             </View>
//             <View style={styles.Text_bold}>
//               <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
//                {this.props.tenght.image_title}
//               </Text>
//               </View>
//               <View style={styles.text_description}>
//               <Text style={{fontSize: wp('2%')}}>
//                 {this.props.tenght.image_detail}
//               </Text>
//             </View>
//           </View>
//            <View style={styles.view_column}>
//             <View style={styles.Icon}>
//               <Image
//                 style={styles.image}
//                 resizeMode={'contain'}

//                 source={{uri:'https://urpixpays.com/public/uploads/info_images/1564375760Slide1.PNG'}}
//               />
//             </View>
//             <View style={styles.Text_bold}>
//               <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
//                 Wand
//               </Text>
//               </View>
//               <View style={styles.text_description}>
//               <Text style={{fontSize: wp('2%')}}>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry.
//               </Text>
//             </View>
//           </View>
//           <View style={styles.view_column}>
//             <View style={styles.Icon}>
//               <Image
//                 style={{width: wp('10%'), height: wp('10%')}}
//                 resizeMode={'contain'}

//                 source={{uri:'https://urpixpays.com/public/uploads/info_images/1564375760Slide1.PNG'}}
//               />
//             </View>
//             <View style={styles.Text_bold}>
//               <Text style={{fontSize: wp('4%'),fontWeight:'500'}}>
//                 Vote
//               </Text>
//               </View>
//               <View style={styles.text_description}>
//               <Text style={{fontSize: wp('2%')}}>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry.
//               </Text>
//             </View>
//           </View>
//         </View> */}
//         {/* <View style={styles.spons_section}>
//           <View style={styles.Tex_sec}>
//             <Text style={{fontSize:wp('5%')}}> Sponsporship / Invitation </Text>
//           </View>
//           <View
//             style={{
//               width: wp('50%'),
//               height: wp('0.4'),
//               backgroundColor: '#29ABE2',
//               marginTop: wp('2%'),
//             }}
//           />
//           <Text style={{fontSize: wp('3%'), marginTop: wp('2%'),fontWeight:'200',justifyContent:'center',alignContent:'center',
//           alignItems:'center',textAlign:'center'}}>
//             Lorem Ipsum is simply dummy text of the printing and typesetting
//             industry.and typesetting
//           </Text>
//         </View>
//         <View style={{flexDirection: 'row'}}>
//           <View style={styles.b_View}>
//             <View style={styles.menu_view}>
//               <Text
//                 style={{
//                   fontSize: wp('3.5%'),
//                   textAlign: 'center',
//                   marginTop: wp('2%'),
//                   color: '#29ABE2',
//                 }}>
//                 {' '}
//                 TYPE 1
//               </Text>
//             </View>
//             <Text
//               style={{
//                 fontSize: wp('2.5%'),
//                 marginTop: wp('2%'),
//                 padding: wp('3%'),
//                 fontWeight:'200'
//               }}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry.
//             </Text>
//           </View>
//           <View style={styles.b_View1}>
//             <View style={styles.menu_view}>
//               <Text
//                 style={{
//                   fontSize: wp('3.5%'),
//                   textAlign: 'center',
//                   marginTop: wp('2%'),
//                   color: '#29ABE2',
//                 }}>
//                 {' '}
//                 TYPE 2
//               </Text>
//             </View>
//             <Text
//               style={{
//                 fontSize: wp('2.5%'),
//                 marginTop: wp('2%'),
//                 padding: wp('3%'),
//                 fontWeight:'200'
//               }}>
//               Lorem Ipsum is simply dummy text of the printing and typesetting
//               industry.
//             </Text>
//           </View>
//         </View> */}
//         </ScrollView>
       
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },

//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   Container: {
//     flex: 1,
//   },
//   View_flex: {
//     flexDirection: 'row',
//     width: wp('100%'),
//     height: wp('15%'),
//     backgroundColor: '#666666',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   H_Text: {
//     width: wp('80%'),
//     alignItems: 'center',
//     marginTop: '3.5%',
//   },
//   View_flex1: {
//     width:wp('100%'),
//     marginTop:wp('2%'),
//     height:wp('40%'),
//     flexDirection: 'row',
//     shadowColor: '#000',
//     shadowOffset: {
//     width: 2,
//     height: 2,
//     },
//     shadowOpacity: 0.4,
//     elevation: 7,
//   },
//   Box_section: {
//     flex:1.,
//     backgroundColor: '#29ABE2',
//     shadowColor: '#000',
//     shadowOffset: {
   
//     },
//     shadowOpacity: 0.4,
//     padding: wp('2%'),

//     marginBottom: wp('2%'),
//     marginTop:wp('2%'),
//     marginLeft: wp('2%'),
//     marginRight: wp('2%'),

//     shadowColor: '#000',
//     shadowOffset: {
//       width: 2,
//       height: 2,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 4.65,
//     elevation: 8,
//   },
//   Box_section1: {
//     marginTop: wp('2%'),
//     height:'100%',
//     // shadowColor: '#000',
//     // shadowOffset: {
    
//     // },
//     // shadowOpacity: 0.4,
//     width:wp('10%'),
//   },
//   Box_section2: {
//     marginTop: wp('2%'),
//     height:'100%',
//     marginLeft:wp('2%'),
//     // shadowColor: '#000',
//     // shadowOffset: {
    
//     // },
//     // shadowOpacity: 0.4,
//     width:wp('10%'),
//   },
//   Text_View: {
//   textAlign:'auto'
//   },
//   bg_section: {
//     justifyContent:'space-between',
//     flexDirection: 'row',
//     paddingLeft:wp('2%'),
//     paddingRight:wp('2%'),
//     paddingTop:wp('5%'),
//     paddingBottom:wp('5%'),
//     width: wp('100%'),
//     height: wp('52%'),
//     backgroundColor: '#F2F2F2',
//     shadowColor: '#000',
//     shadowOffset: {
//     width: 2,
//     height: 2,
//     },
//     shadowOpacity: 0.4,
//     elevation: 7,
//   },
//   view_column:
//   {
//       flex:1,
//       padding:wp('1%'),
//       flexDirection:'column',
//       justifyContent:'center',
//       alignSelf:'center',
//       alignItems:'center',
//       alignContent:'center',
//   },
//   Icon: {
    
//   },
//   Text_bold: {
//       justifyContent:'center',
//       marginTop:wp('4%'),
//       alignContent:'center',alignItems:'center',
//       alignSelf:'center'
//   },
 
//    text_description:
//    {
//        marginTop:wp('3%'),
//     justifyContent:'center',
//     alignContent:'center',alignItems:'center',
//     alignSelf:'center'
//    },

//   spons_section: {
//     flexDirection: 'column',
//     marginTop: wp('5%'),
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   Tex_sec: {
//     alignItems: 'center',
//   },
//   b_View: {
//     width: wp('45%'),
//     height: wp('30%'),
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     backgroundColor: '#F2F2F2',

//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     borderRadius:wp('2%'),
    

//     shadowRadius: 4.0,
//     elevation: 7,
//     marginTop: wp('5%'),
//     marginLeft: wp('3%'),
//   },
//   menu_view: {
//     width: wp('45%'),
//     height: wp('8%'),
//     borderRadius:wp('2%'),
//     backgroundColor: '#fff',
//     backgroundColor: '#F2F2F2',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 2,
//       height: 2,
//     },
//     shadowOpacity: 0.4,
//     elevation: 7,
//   },
//   b_View1: {
//     width: wp('45%'),
//     height: wp('30%'),
//     backgroundColor: '#fff',
//     shadowColor: '#000',
//     borderRadius:wp('2%'),
//     backgroundColor: '#F2F2F2',

//     shadowOffset: {
//       width: 2,
//       height: 2,
//     },
//     shadowOpacity: 0.4,
//     elevation: 7,
//     marginTop: wp('5%'),
//     marginLeft: wp('2%'),
//   },
//   image:{
//     width: wp('31%'), 
//     height: wp('35%')
//   }
// });

// const mapsDispatchToProps = (dispatch) =>{
//   return{
//       GetInfo:()=>(dispatch(GetAppInfo()))
//   }

// }
// const mapsStateTpProps = (state) =>{
//   return{
    
//         first:state.BestImages.first,
//         second:state.BestImages.second,
//         third:state.BestImages.third,
//         fourth:state.BestImages.fourth,
//         fifth:state.BestImages.fifth,
//         sixth:state.BestImages.sixth,
//         sevent:state.BestImages.sevent,
//         eight:state.BestImages.eight,
//         nineght:state.BestImages.nineght,
//         tenght:state.BestImages.tenght,
//         eleven:state.BestImages.eleven,
//         twelve:state.BestImages.twelve,
//         thirten:state.BestImages.thirten,
//         fourten:state.BestImages.fourten,
//         fiften:state.BestImages.fiften,
//         sixten:state.BestImages.sixten,
//         seventen:state.BestImages.seventen,
//         eighten:state.BestImages.eighten,
//         ninghten:state.BestImages.ninghten,
//         twenty:state.BestImages.twenty,
//         twentyone:state.BestImages.twentyone

//   }   
// }


// export default connect(mapsStateTpProps,mapsDispatchToProps) (InfoPage);

import React from 'react';
import FastImage from 'react-native-fast-image';
import {GetAppInfo} from '../../store/actions/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon_bar from 'react-native-vector-icons/MaterialIcons';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  Image,
  StatusBar,
  Button,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import Topbar from './topbar';
import { connect } from 'react-redux';
class InfoPage extends React.Component {
  constructor(props){
    super(props);
    this.props.GetInfo();
  }
  state = {
    screenHeight: 0,
  }   
  onContentSizeChange = (contentHeight) => {
      // Save the content height in state
      content = contentHeight + 200;
      this.setState({ screenHeight: content });
  };
  render() {
       let enable = this.state.screenHeight + 100 > hp('100%');
    console.log(this.props.first);
    return (
      <View style={styles.Container}>
        <ScrollView scrollEnabled={true}  showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator ={false}
                    onContentSizeChange={this.onContentSizeChange}>
          <View style={styles.mainSection}>
              <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                          uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.first.imgname,
                          priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'auto'}}>
                  {this.props.first.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View1}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                  {this.props.first.image_detail}
                  </Text>
                </View>
              </View>
              <View style={{width:wp('98%'),height:wp('2%'),backgroundColor:'#efeded'}} />
              <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                          uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.second.imgname,
                      priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'auto'}}>
                  {this.props.second.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign:'justify',
                      padding:5
                      
                    }}>
                  {this.props.second.image_detail}
                  </Text>
                </View>
              </View>
        
              <View style={{width:wp('98%'),height:wp('2%'),backgroundColor:'#efeded'}} />
              <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.third.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'justify'}}>
                  {this.props.third.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1%'),
                      fontWeight:'400',
                      paddingLeft:wp('2%'),
                      textAlign:'justify'
                    }}>
                    {this.props.third.image_detail}
                  </Text>
                </View>
              </View>
              <View style={{width:wp('98%'),height:wp('2%'),backgroundColor:'#efeded'}} />
              <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fourth.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.fourth.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.fourth.image_detail}
                  </Text>
                </View>
            </View>
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fifth.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.fifth.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.fifth.image_detail}
                  </Text>
                </View>
            </View>  
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sixth.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.sixth.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.sixth.image_detail}
                  </Text>
                </View>
            </View>
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sevent.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.sevent.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.sevent.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eight.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.eight.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.eight.image_detail}
                  </Text>
                </View>
            </View>
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.nineght.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.nineght.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.nineght.image_detail}
                  </Text>
                </View>
            </View>   
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.tenght.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.tenght.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.tenght.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eleven.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.eleven.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.eleven.image_detail}
                  </Text>
                </View>
            </View>  
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twelve.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.twelve.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.twelve.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.thirten.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.thirten.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.thirten.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fourten.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.fourten.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.fourten.image_detail}
                  </Text>
                </View>
            </View>
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.fiften.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.fiften.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.fiften.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.sixten.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.sixten.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.sixten.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.seventen.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.seventen.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.seventen.image_detail}
                  </Text>
                </View>
            </View>
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.eighten.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.eighten.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.eighten.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.ninghten.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.ninghten.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.ninghten.image_detail}
                  </Text>
                </View>
            </View>  
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twenty.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.twenty.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.twenty.image_detail}
                  </Text>
                </View>
            </View> 
            <View style={styles.BodySection}>
                <View style={styles.desc_View}>
                  <FastImage
                      style={styles.image}
                      source={{
                        uri:'https://urpixpays.com/public/uploads/info_images/'+this.props.twentyone.imgname,
                        priority: FastImage.priority.normal,
                      }}
                      resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.Text_View}>
                  <Text style={{color: '#000', fontSize: wp('4%'),fontWeight:'bold',textAlign:'center'}}>
                  {this.props.twentyone.image_title}
                  </Text>
                </View>
                <View style={{backgroundColor:'#8e8e8e',width:wp('98%'),height:wp('.2%')}} />
                <View style={styles.desc_View}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: wp('3.5%'),
                      marginTop: wp('1%'),
                      marginBottom: wp('1.5%'),
                      letterSpacing:wp('-0.2'),
                      fontWeight:'400',
                      textAlign: 'center',
                    }}>
                    {this.props.twentyone.image_detail}
                  </Text>
                </View>
            </View>  
          </View>    
        </ScrollView>
       
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor:'#efeded',
    zIndex:0,
  },
  view_header: {
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: 'black',
    shadowOpacity: 0.4,
    elevation: 5,
    alignContent: 'center',
    backgroundColor: '#666666',
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('10%'),
  },
  view_icon1: {
    
    justifyContent: 'flex-start',
    paddingLeft: wp('4%'),
    alignItems: 'center',
    alignContent: 'flex-start',
  },
  view_text: {
    flex:1.8,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  mainSection:
  {
    flexDirection:'column',
    paddingTop:wp('5%'),
    paddingBottom:wp('3%'),
    alignItems:'center',
    justifyContent:'center'
  },
  BodySection:
  {
    flexDirection:'column',
    backgroundColor:'#fff',
    width:wp('98%'),
    height:'auto',
    borderRadius:3,
    elevation:3
  },
  desc_View:
  {
    padding:10,
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  desc_View1:
  {
    padding:10,
    alignItems:'center',
    justifyContent:'center'
  },
  image:
  {
    width:wp('90%'),
    height:wp('30%')
  },
  Text_View:
  {
    padding:15,
  }
});
const mapsDispatchToProps = (dispatch) => {
  return{
    GetInfo:()=>(dispatch(GetAppInfo()))
  }
}
const mapsStateTpProps = (state) => {
  return {
        first:state.BestImages.first,
        second:state.BestImages.second,
        third:state.BestImages.third,
        fourth:state.BestImages.fourth,
        fifth:state.BestImages.fifth,
        sixth:state.BestImages.sixth,
        sevent:state.BestImages.sevent,
        eight:state.BestImages.eight,
        nineght:state.BestImages.nineght,
        tenght:state.BestImages.tenght,
        eleven:state.BestImages.eleven,
        twelve:state.BestImages.twelve,
        thirten:state.BestImages.thirten,
        fourten:state.BestImages.fourten,
        fiften:state.BestImages.fiften,
        sixten:state.BestImages.sixten,
        seventen:state.BestImages.seventen,
        eighten:state.BestImages.eighten,
        ninghten:state.BestImages.ninghten,
        twenty:state.BestImages.twenty,
        twentyone:state.BestImages.twentyone
  }   
}
export default connect(mapsStateTpProps,mapsDispatchToProps) (InfoPage);