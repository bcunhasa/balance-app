import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-gallery',
  templateUrl: 'gallery.html',
})
export class GalleryPage {
  
  public image: any = "assets/images/no-image.png";
  
  public instagram: any = "assets/images/instagram.png";
  public facebook: any = "assets/images/facebook.png";
  public twitter: any = "assets/images/twitter.png";
  
  public name: string = "Nome";
  public effect: string = "Efeito";
  
  public galleryList = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider) {
  }

  ionViewDidLoad() {
    this.getGallery();
  }
  
  private getGallery() {
    this.restProvider.getGallery().then((result) => {
      const resultString = JSON.stringify(result);
      const resultObject = JSON.parse(resultString);
      
      this.galleryList = resultObject;
    }, (error) => {
      console.log(error);
    });
  }

}
