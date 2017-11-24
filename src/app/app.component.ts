import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    nativeStorage: NativeStorage) {
    platform.ready().then(() => {
      
      nativeStorage.getItem('introShowed').then((introShowed) => {
        if (introShowed) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = IntroPage;
          nativeStorage.setItem('introShowed', false);
        }
      }, (error) => {
        this.rootPage = IntroPage;
      });
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
