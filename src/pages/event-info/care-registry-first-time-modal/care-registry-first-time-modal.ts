import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CareRegistryFirstTimeModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-care-registry-first-time-modal',
  templateUrl: 'care-registry-first-time-modal.html',
})
export class CareRegistryFirstTimeModalPage {

  public careCategory: string = "";
  public careCategoryFriendlyName: string = "";
  public careCategoryDescription: string = "";
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CareRegistryFirstTimeModalPage');
  }
  
  closeModal()
      {
        this.viewCtrl.dismiss();
      }

}
