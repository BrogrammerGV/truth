import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the InfoMilitaryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-military',
  templateUrl: 'info-military.html',
})
export class InfoMilitaryPage {
friendlyName: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }


  ionViewCanEnter()
  {
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });
           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoMilitaryPage');
  }

}
