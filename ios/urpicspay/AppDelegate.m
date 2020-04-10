/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "AppDelegate.h"
#import "RNSplashScreen.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <ReactNativeNavigation/ReactNativeNavigation.h>
#import <Firebase.h>
#import "RNFirebaseNotifications.h"
#import "RNFirebaseMessaging.h"
#import <RNGoogleSignin/RNGoogleSignin.h>
@implementation AppDelegate


- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  [RNFirebaseNotifications configure];
  [application registerForRemoteNotifications];
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  NSURL *jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//      NSURL *jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
  
  [ReactNativeNavigation bootstrap:jsCodeLocation launchOptions:launchOptions];
  for (NSString* family in [UIFont familyNames])
  {
    NSLog(@"%@", family);
    for (NSString* name in [UIFont fontNamesForFamilyName: family])
    {
      NSLog(@" %@", name);
    }
  }
  [RNSplashScreen show];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {

  BOOL handled = [[FBSDKApplicationDelegate sharedInstance] application:application
    openURL:url
    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]
  ] || [RNGoogleSignin application:application openURL:url options:options] ;
  // Add any custom logic here.
  return handled;
}
    
  
//- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options
//  {
//    return [[FBSDKApplicationDelegate sharedInstance] application:application openURL:url sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey] annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
//
////    return [RNGoogleSignin application:application
////                               openURL:url
////                     sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
////                            annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
//  }
//  - (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
//    sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
//
//    return [RNGoogleSignin application:application
//                               openURL:url
//                     sourceApplication:sourceApplication
//                            annotation:annotation
//            ];
//  }

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
 [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
 [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}
-(void) userNotificationCenter:(UNUserNotificationCenter *)center didReceiveNotificationResponse:(UNNotificationResponse *)response withCompletionHandler:(void (^)(void))completionHandler {
 
 [[RNFirebaseMessaging instance] didReceiveRemoteNotification:response.notification.request.content.userInfo];
 completionHandler();
}


@end
