import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

import { RestProvider } from '../../providers/rest/rest';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-effects',
  templateUrl: 'effects.html',
})
export class EffectsPage {
  
  public effectsList = new Array<any>();
  public transformationsList = new Array<any>();
  public filtersList = new Array<any>();
  
  private loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private restProvider: RestProvider,
    private nativeStorage: NativeStorage,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loadEffectsList();
  }
  
  private loadEffectsList() {
    this.nativeStorage.getItem('effects').then((effectsString) => {
      let effectsObject = JSON.parse(effectsString);
      
      let grayscale = {
        title: effectsObject.grayscale.title,
        description: effectsObject.grayscale.description,
        preview: effectsObject.grayscale.preview
      };
      
      let light_corrector = {
        title: effectsObject.light_corrector.title,
        description: effectsObject.light_corrector.description,
        preview: effectsObject.light_corrector.preview
      }
      
      let rotation = {
        title: effectsObject.rotation.title,
        description: effectsObject.rotation.description,
        preview: effectsObject.rotation.preview
      }
      
      this.effectsList.push(grayscale);
      this.filtersList.push(light_corrector);
      this.transformationsList.push(rotation);
    });
  }
  
  public applyEffect(title: string) {
    this.loading = this.loadingCtrl.create({
      content: "Aplicando efeito..."
    });
    this.loading.present();
    
    this.nativeStorage.getItem('originalImage').then((originalImage) => {
      let data = {
        effect: title,
        image: originalImage
      };
      
      this.download(data);
    });
  }
  
  private download(data: any) {
    this.restProvider.postImage(data, 'image/').then((result) => {
      const resultString = JSON.stringify(result);
      const resultObject = JSON.parse(resultString);
      
      this.nativeStorage.setItem('resultImage', resultObject);
      
      this.loading.dismissAll();
      this.statusMessage("Efeito aplicado");
      this.goToResultPage();
    }, (error) => {
      console.log(error);
      this.statusMessage("Erro ao aplicar o efeito");
    });
  }
  
  private statusMessage(status) {
    let toast = this.toastCtrl.create({
      message: status,
      duration: 3000
    });
    toast.present();
  }
  
  public goToResultPage() {
    this.navCtrl.push(DetailsPage);
  }

}
