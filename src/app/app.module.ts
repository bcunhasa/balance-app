import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { EditorPage } from '../pages/editor/editor';
import { EffectsPage } from '../pages/effects/effects';
import { DetailsPage } from '../pages/details/details';
import { GalleryPage } from '../pages/gallery/gallery';
import { SettingsPage } from '../pages/settings/settings';
import { IntroPage } from '../pages/intro/intro';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { NativeStorage } from '@ionic-native/native-storage';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EditorPage,
    EffectsPage,
    DetailsPage,
    GalleryPage,
    SettingsPage,
    IntroPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EditorPage,
    EffectsPage,
    DetailsPage,
    GalleryPage,
    SettingsPage,
    IntroPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    RestProvider,
    Camera,
    NativeStorage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
