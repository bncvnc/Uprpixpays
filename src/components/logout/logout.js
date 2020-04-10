

import {Navigation} from 'react-native-navigation';



export default logout= () => {
    Navigation.setRoot({
    
        root:{
          stack:{
            id:'AppStack',
            children:[
              {
                component:{
                  name:'UrPicsPay.logout',
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
}