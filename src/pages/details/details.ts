import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NativeStorage } from '@ionic-native/native-storage';

import { EditorPage } from '../editor/editor';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  
  public image: any = "assets/images/no-image.png";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private nativeStorage: NativeStorage) {
  }

  ionViewDidLoad() {
    this.loadImage();
  }
  
  private loadImage() {
    this.nativeStorage.getItem('resultImage').then((resultImage) => {
      let resultObject = JSON.parse(resultImage);
      this.image = resultObject.image;
    });
  }
  
  public postOnInstragram() {
    //
  }
  
  public postOnFacebook() {
    //
  }
  
  public postOnTwitter() {
    //
  }
  
  public goToEditorPage() {
    this.navCtrl.push(EditorPage);
  }

}
