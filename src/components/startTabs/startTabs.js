import {Navigation} from 'react-native-navigation';
import {Platform} from 'react-native';
import Icons from 'react-native-vector-icons/Ionicons';
const startTabs = () => {
    
    Promise.all([
        Icons.getImageSource(Platform.OS === 'android' ?"md-map":"ios-map",30),
        Icons.getImageSource(Platform.OS === 'android'? "md-share-alt": "ios-share",30),
        Icons.getImageSource(Platform.OS ==='android' ? "md-menu" :"ios-menu",30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
               
              sideMenu: {
                id: "sideMenu",
                left: {
                  component: {
                    id: "Drawer",
                    name: "UrPicsPay.SideDrawer",
                    
                  }
                },
                center: {
                    component: {
                        name: "UrPicsPay.ActiveChalenge"
                      }
                      
                }
              }
         
            }
          });
         
    })

    
  
    
}

export default startTabs;
