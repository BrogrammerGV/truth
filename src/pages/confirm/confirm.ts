import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import { SupportPage } from '../support/support';
import { SelectPage } from '../select/select';

/**
 * Generated class for the ConfirmPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-confirm',
  templateUrl: 'confirm.html',
})
export class ConfirmPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfirmPage');
  }


  closePage()
  {
    try {
       this.navCtrl.pop();
    }
    catch(err){
      this.navCtrl.setRoot(SelectPage)
    }
  }
  goToSup()
  {
    this.navCtrl.push(SupportPage)
  }

}
