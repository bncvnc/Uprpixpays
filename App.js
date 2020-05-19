/**
 * @format
 */
import Icons from 'react-native-vector-icons/FontAwesome';
import IconsM from 'react-native-vector-icons/MaterialIcons';

import {Platform,Text,TextInput} from 'react-native';
import { Navigation } from "react-native-navigation";
import MainScreen from './src/screens/mainscreen/mainscreen';
import SignUp from "./src/screens/signup/signup";
import Login from "./src/screens/login/login";
import ResetPassword from './src/screens/login/reset_password';
import Forgot_Password from './src/screens/login/forgor_password';
// import Icons from 'react-native-vector-icons/Ionicons';
import ActiveChalenge from "./src/screens/challenges/activechallenges";
import OpenChallenge from "./src/screens/challenges/openchallenges";
import ClosedChalleng from "./src/screens/challenges/closechallenges"; 
import {Provider} from 'react-redux';
import Bidding from  './src/screens/Biddings/bidding_notification';
import BuyAndSell from "./src/screens/buyAndSell/buyAndSell";
import FriendInvite from "./src/screens/inviteFriends/inviteFriends";
import AllBuyAndSell from "./src/screens/allBuyAndSell/allBuyAndSell";
import InfoScreen from "./src/screens/info/info";
import SideDrawer from "./src/screens/sidedrawer/sidedrawer";
import Topbar from "./src/components/topbar/topbar";
import TopPhotos from "./src/screens/TopPhotos/TopPhotos";
import configureStore from './src/store/configurStore';
import Blog from "./src/screens/Blog/Blog";
import AlBlogs from './src/screens/Blog_2/Blog_2';
import TopPhotosView from './src/screens/topphotos_urpics/topphots_urpics';
import BalanceOverView from './src/screens/Balance_overview_ur/Balance_overview';
import SoldTable from './src/screens/Biddings/Sold_tabel';
import BuyAndSellView from'./src/screens/buy_sell/buy_sell';
import ChallengePrice from './src/screens/challnge_prize/challenge_ prize';
import Details from './src/screens/details_ur/details_ur';
import InfoPage from './src/screens/info/info_page_updated';
import MyPhotos from './src/screens/my_photos_ur/my_photos';
import Notification from './src/screens/notification_ur/notifications_ur';
import OpenChalennges from './src/screens/open_challanges/open_challanges';
import Rank from './src/screens/rank/rank';
import RankPage from './src/screens/rank_page/rank_page';
import TabViewExample from './src/screens/best_imgs_tab_view/best_imgs_tab_view';
import Mychallenge from "./src/screens/challenges/mychallenges";
import PastChallenges from "./src/screens/challenges/pastChallenges";
import inviteChallange from './src/screens/inviteFriends/challengeInvite';
import Myprofile from './src/screens/my_profile_ur/my_profile_ur';
import Biddings from './src/screens/Biddings/bidding_notification';
import VerificationCode from './src/screens/login/Verification_code';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ChallengeTopPhotos from './src/screens/ChallengeTopPhotos/ChallengeTopPhotos';
import ChallengeEnded from './src/screens/challenges/ChallengeEnded';
import CartNotifications from './src/screens/Biddings/CartNotifications';
import AddSubscriptionScreen from './src/screens/AddSubscriptionScreen';
import Products_Purchased from './src/screens/Products_Purchased/Products_Purchased';
import UrTrasaction from './src/screens/UrTrasaction/UrTrasaction';
import UrPortfolio from './src/screens/portfolio/UrPortfolio';
import depositThroughToPaypall from './src/screens/depositThroughToPaypall/depositThroughToPaypall';
import socialSingup from './src/screens/signup/socialSingup';
import ShowImages from './src/screens/ShowImages/ShowImages';
import ShowProfileImages from './src/screens/ShowImages/ShowProfileImages';






const store = configureStore();

Navigation.registerComponentWithRedux(`UrPicsPay.MainScreen`, () => MainScreen,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.SignUp`, () => SignUp,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Login`, () => Login,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ActiveChalenge`, () => ActiveChalenge,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.OpenChallenge`, () => OpenChallenge,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ClosedChalleng`, () => ClosedChalleng,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.BuyAndSell`, () => BuyAndSell,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.FriendInvite`, () => FriendInvite,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.AllBuyAndSell`, () => AllBuyAndSell,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.InfoScreen`, () => InfoScreen,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.SideDrawer`, () => SideDrawer,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Topbar`, () => Topbar,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.TopPhotos`, () => TopPhotos,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Blog`, () => Blog,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.AlBlogs`, () => AlBlogs,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.AlBlogs`, () => AlBlogs,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.TopPhotosView`, () => TopPhotosView,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.BalanceOverView`, () => BalanceOverView,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.SoldTable`, () => SoldTable,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.BuyAndSellView`, () => BuyAndSellView,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ChallengePrice`, () => ChallengePrice,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Details`, () => Details,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.InfoPage`, () => InfoPage,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.MyPhotos`, () => MyPhotos,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Notification`, () => Notification,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.OpenChalennges`, () => OpenChalennges,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.PastChallenges`, () => PastChallenges,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Rank`, () => Rank,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.RankPage`, () => RankPage,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.TabViewExample`, () => TabViewExample,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Mychallenge`, () => Mychallenge,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Bidding`, () => Bidding,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.inviteChallange`, () => inviteChallange,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ResetPassword`, () => ResetPassword,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Forgot_Password`, () => Forgot_Password,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Myprofile`, () => Myprofile,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Biddings`, () => Biddings,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.VerificationCode`, () => VerificationCode,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ChallengeTopPhotos`, () => ChallengeTopPhotos,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ChallengeEnded`, () => ChallengeEnded,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.CartNotifications`, () => CartNotifications,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.AddSubscriptionScreen`, () => AddSubscriptionScreen,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.Products_Purchased`, () => Products_Purchased,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.UrTrasaction`, () => UrTrasaction,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.UrPortfolio`, () => UrPortfolio,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.depositThroughToPaypall`, () => depositThroughToPaypall,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.socialSingup`, () => socialSingup,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ShowImages`, () => ShowImages,Provider,store);
Navigation.registerComponentWithRedux(`UrPicsPay.ShowProfileImages`, () => ShowProfileImages,Provider,store);


if(Platform.OS==='android'){
	Navigation.setDefaultOptions({
		layout: {
			orientation: ["portrait"],
			backgroundColor: 'transparent'
		},
		animations: {
			setRoot: {
			  waitForRender: true,
			  
			},
			put: {
			  waitForRender: true,
			},
			push: {
			  waitForRender: true,
			  content: {
				x: {
					from: 1000,
					to: 0,
					duration: 300,
					interpolation: 'decelerate',
					springVelocity: 1,
					
				},
				alpha: {
					from: 0.5,
					to: 1,
					duration: 100,
				},
				
			},
			  sideMenu: {
				left: {
					visible: false,
					enabled: false
				  }
			}
      },
      startApp: {
        content: {
			x: {
				from: 1000,
				to: 0,
				duration: 100,
			},
			alpha: {
				from: 0.5,
				to: 1,
				duration: 100,
			}
		},
    },
		  },
	});
}




Navigation.events().registerAppLaunchedListener(() => {
	if (Text.defaultProps == null) Text.defaultProps = {};
	Text.defaultProps.allowFontScaling = false;
	if (TextInput.defaultProps == null) TextInput.defaultProps = {};
	TextInput.defaultProps.allowFontScaling = false;
	Navigation.setDefaultOptions({
		layout: {
			orientation: ["portrait"],
		},
	
	});
  Navigation.setRoot({
    
    root:{
      stack:{
        id:'AppStack',
        children:[
          {
            component:{
              name:'UrPicsPay.Login',
            }
          }
        ],
        options:{
          topBar:{
            visible:false
          }
        }
      }
    }
  });
});


// Navigation.events().registerAppLaunchedListener(() => {
 
// });
