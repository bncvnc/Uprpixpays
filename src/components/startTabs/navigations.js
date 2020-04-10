

import {Navigation} from 'react-native-navigation';
import Icons from 'react-native-vector-icons/FontAwesome';
import IconsI from 'react-native-vector-icons/Ionicons';
import IconsM from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';
const appNavigation =()=>
{
  if(Platform.OS === 'android'){

    Promise.all([
      IconsM.getImageSource(Platform.OS === 'android' ?'timeline':'timeline',30),
      IconsM.getImageSource(Platform.OS === 'android'? "lock-open": "lock-open",30),
      IconsM.getImageSource(Platform.OS ==='android' ? "lock" :"lock",30),
      // Icons.getImageSource(Platform.OS === 'android' ?Icon1:Icon1,30),
      IconsM.getImageSource(Platform.OS === 'android'? "menu": "menu",30),
      Icons.getImageSource(Platform.OS ==='android' ? "arrow-back" :"ios-menu",30),
      IconsI.getImageSource(Platform.OS === 'android' ?'md-notifications-outline':'md-notifications-outline',30),
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
            bottomTabs :{
              children: [
                {
                  stack: {
                    children: [{
                      
                      component:{
                        name:'UrPicsPay.Mychallenge',
                        id:'MyChallenges',
                        options: {
                          topBar: {
                            
                            background: {
                              color: '#ffffff'
                            },
                           
                            title: {
                              text: 'My Challanges',
                              color:'#000000',
                              alignment: 'center'                              
                            },
                           
                            leftButtons: [{
                             
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'#000000',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: {
                    
                      bottomTab: {
                      
                        text: 'Active',
                        icon:sources[0],
                        // badge: '2',
                        // badgeColor: 'lightgray',
                        iconColor: 'lightgrey',
                        // dotIndicator: {
                        //   color: 'green', // default red
                        //   size: 8, // default 6
                        //   visible: true // default false
                        // },
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10,

                       
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [{
                      component:{
                        name:'UrPicsPay.OpenChallenge',
                        id:'open',
                        options: {
                          topBar: {
                            background: {
                              color: '#ffffff'
                            },

                            title: {
                              text: 'Open Challenges',
                              color:"#000000",
                              alignment: 'center'                              

                            },
                            leftButtons: [{
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'grey',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: {
                      bottomTab: {
                        text: 'Open',
                        icon:sources[1],
                        iconColor: 'lightgrey',
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10
                      }
                    }
                  }
                }, {
                  stack: {
                    children: [{
                      component:{
                        name:'UrPicsPay.ClosedChalleng',
                        id:'close',

                        options: {
                          topBar: {
                            background: {
                              color: '#ffffff'
                            },

                           
                            title: {
                              text: 'Closed Challenges',
                              color:'#000000',
                              alignment: 'center'                              
                            },
                            leftButtons: [{
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'#000000',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: {
                      bottomTab: {
                        borderColor: 'red',
                        borderHeight: 1.3,
                        text: 'Closed',
                        icon:sources[2],
                        iconColor: 'lightgrey',
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10
                      }
                    }
                  }
                }, 
                {
                  stack: {
                    children: [{
                      component:{
                        name:'UrPicsPay.PastChallenges',
                        id:'past',

                        options: {
                          topBar: {
                            background: {
                              color: '#ffffff'
                            },
                           

                            title: {
                              text: 'Past Challanges',
                              color:'#000000',
                              alignment: 'center'                              
                            },
                            leftButtons: [{
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'#000000',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: { 
                      bottomTab: {
                        borderColor: 'red',
                        borderHeight: 1.3,
                        text: 'Past',
                        icon:sources[2],
                        iconColor: 'lightgrey',
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10
                      }
                    }
                  }
                }, 
              ]
            },         
          }
        }
      }
    });
  })
  }else{

    Promise.all([
      IconsM.getImageSource(Platform.OS === 'android' ?'timeline':'timeline',30),
      IconsM.getImageSource(Platform.OS === 'android'? "lock-open": "lock-open",30),
      IconsM.getImageSource(Platform.OS ==='android' ? "lock" :"lock",30),
      // Icons.getImageSource(Platform.OS === 'android' ?Icon1:Icon1,30),
      IconsM.getImageSource(Platform.OS === 'android'? "menu": "menu",30),
      Icons.getImageSource(Platform.OS ==='android' ? "arrow-back" :"ios-menu",30),
      IconsI.getImageSource(Platform.OS === 'android' ?'md-notifications-outline':'md-notifications-outline',30),
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
            bottomTabs :{
              children: [
                {
                  stack: {
                    children: [{
                      
                      component:{
                        name:'UrPicsPay.Mychallenge',
                        id:'MyChallenges',
                        options: {
                          topBar: {
                            drawBehind: false,
                            animate: true,
                            hideOnScroll: true,
                            background: {
                              color: '#ffffff'
                            },
                           
                            title: {
                              text: 'My Challanges',
                              color:'#000000',
                              alignment: 'center'                              
                            },
                           
                            leftButtons: [{
                             
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'#000000',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: {
                    
                      bottomTab: {
                      
                        text: 'Active',
                        icon:sources[0],
                        // badge: '2',
                        // badgeColor: 'lightgray',
                        iconColor: 'lightgrey',
                        // dotIndicator: {
                        //   color: 'green', // default red
                        //   size: 8, // default 6
                        //   visible: true // default false
                        // },
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10,

                       
                      }
                    }
                  }
                },
                {
                  stack: {
                    children: [{
                      component:{
                        name:'UrPicsPay.OpenChallenge',
                        id:'open',
                        options: {
                          topBar: {
                            background: {
                              color: '#ffffff'
                            },
                            drawBehind: false,
                            animate: true,
                            hideOnScroll: true,
                            title: {
                              text: 'Open Challenges',
                              color:"#000000",
                              alignment: 'center'                              

                            },
                            leftButtons: [{
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'grey',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: {
                      bottomTab: {
                        text: 'Open',
                        icon:sources[1],
                        iconColor: 'lightgrey',
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10
                      }
                    }
                  }
                }, {
                  stack: {
                    children: [{
                      component:{
                        name:'UrPicsPay.ClosedChalleng',
                        id:'close',

                        options: {
                          topBar: {
                            background: {
                              color: '#ffffff'
                            },
                            drawBehind: false,
                            animate: true,
                            hideOnScroll: true,
                           
                            title: {
                              text: 'Closed Challenges',
                              color:'#000000',
                              alignment: 'center'                              
                            },
                            leftButtons: [{
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'#000000',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: {
                      bottomTab: {
                        borderColor: 'red',
                        borderHeight: 1.3,
                        text: 'Closed',
                        icon:sources[2],
                        iconColor: 'lightgrey',
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10
                      }
                    }
                  }
                }, 
                {
                  stack: {
                    children: [{
                      component:{
                        name:'UrPicsPay.PastChallenges',
                        id:'past',

                        options: {
                          topBar: {
                            background: {
                              color: '#ffffff'
                            },
                           
                            drawBehind: false,
                            animate: true,
                            hideOnScroll: true,
                            title: {
                              text: 'Past Challanges',
                              color:'#000000',
                              alignment: 'center'                              
                            },
                            leftButtons: [{
                              id: 'openSideDrawer',
                              icon:sources[3],
                              color:'#000000',
                            }],
                            rightButtons:[{
                              id: 'openSideDrawer2',
                              icon:sources[5],
                              color:'#000000',
                              // color:'#ffffff',
                            }]
                          }
                        }
                      }
                    }],
                    options: { 
                      bottomTab: {
                        borderColor: 'red',
                        borderHeight: 1.3,
                        text: 'Past',
                        icon:sources[2],
                        iconColor: 'lightgrey',
                        selectedIconColor: '#29abe2',
                        textColor: 'lightgrey',
                        selectedTextColor: '#29abe2',
                        fontFamily: 'ProximaNova-Bold',
                        fontSize:10
                      }
                    }
                  }
                }, 
              ]
            },         
          }
        }
      }
    });
  })
  }
}
export default appNavigation;