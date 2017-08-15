import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InfoBirthPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-birth',
  templateUrl: 'info-birth.html',
})
export class InfoBirthPage {

friendlyName: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

ionViewCanEnter()
{
  this.friendlyName = this.navParams.get('firstName');

}
  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoBirthPage');

  }



  goBack()
  {
    this.navCtrl.pop();
  }


}
