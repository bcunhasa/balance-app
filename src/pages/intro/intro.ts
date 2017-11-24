import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
  }
  
  public goToTabsPage() {
    this.nativeStorage.setItem('introShowed', true);
    this.navCtrl.push(TabsPage);
  }

}
