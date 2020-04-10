package com.urpixpays;
import android.os.Bundle;
import android.content.Intent;
import com.facebook.FacebookSdk;
import com.reactnativenavigation.NavigationActivity;

import org.devio.rn.splashscreen.SplashScreen;
public class MainActivity extends NavigationActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }



}