import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { NativeStorage } from '@ionic-native/native-storage';

import { EffectsPage } from '../effects/effects';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-editor',
  templateUrl: 'editor.html'
})
export class EditorPage {
  
  private loading: Loading;
  public image: any = "assets/images/no-image.png";
  public message: string;
  
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private restProvider: RestProvider,
    private camera: Camera,
    private nativeStorage: NativeStorage) {
    //
  }
  
  ionViewDidLoad() {
  }
  
  public takePhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.CAMERA,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true,
    }).then(imageData => {
      this.image = 'data:image/png;base64,' + imageData;
      this.prepareUpload(this.image);
    }, (error) => {
      console.log(error);
    });
  }
  
  public selectPhoto() {
    this.camera.getPicture({
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      mediaType: this.camera.MediaType.PICTURE,
    }).then(imageData => {
      this.image = 'data:image/png;base64,' + imageData;
      this.prepareUpload(this.image);
    }, (error) => {
      console.log(error);
    });
  }
  
  private prepareUpload(base64Image: any) {
    this.nativeStorage.setItem('originalImage', base64Image);
    
    this.loading = this.loadingCtrl.create({
      content: "Enviando arquivo ao servidor..."
    });
    this.loading.present();
    
    let data = {
      image: base64Image
    }
    
    this.upload(data);
  }
  
  private upload(data: any) {
    this.restProvider.postImage(data, 'image/create/').then((result) => {
      const resultString = JSON.stringify(result);
      let resultObject = JSON.parse(resultString);
      
      this.nativeStorage.setItem('effects', resultObject);
      
      this.loading.dismissAll();
      this.statusMessage("Upload efetuado com sucesso");
      this.message = 'Toque a imagem para continuar';
    }, (error) => {
      console.log(error);
      this.loading.dismissAll();
      this.statusMessage("Erro no upload");
    });
  }
  
  private statusMessage(status) {
    let toast = this.toastCtrl.create({
      message: status,
      duration: 3000
    });
    toast.present();
  }
  
  public goToEffectsPage() {
    this.navCtrl.push(EffectsPage);
  }

}
