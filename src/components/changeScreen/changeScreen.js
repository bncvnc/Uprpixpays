import {Navigation} from 'react-native-navigation';
const changeScreen = (screen) =>{
    Navigation.setRoot({
        root: {
          stack:{
            id:'AppStack',
            children:[
              {
                component:{
                  name:screen,
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

  export default changeScreen;