import React, { Component } from 'react';
import { View } from 'react-native';
import { LoginButton } from 'react-native-fbsdk';

export default class FBLoginButton extends Component {



  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      user.name = json.name
      user.id = json.id
      user.user_friends = json.friends
      user.email = json.email
      user.username = json.name
      user.loading = false
      user.loggedIn = true
      user.avatar = setAvatar(json.id)     
      console.log(user.name+''+ user.email); 
    })
   
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render() {
    return (
      <View>
         <LoginButton
  publishPermissions={['publish_actions']}
  readPermissions={['public_profile']}
  onLoginFinished={
    (error, result) => {
      if (error) {
        console.log('login has error: ', result.error)
      } else if (result.isCancelled) {
        console.log('login is cancelled.')
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          const { accessToken } = data
          initUser(accessToken)

          console.log(data);
        })
      }
    }
  }
  onLogoutFinished={logout} />
      </View>
    );
  }
};

module.exports = FBLoginButton;