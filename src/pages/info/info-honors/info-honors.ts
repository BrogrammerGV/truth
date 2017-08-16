import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the InfoHonorsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-info-honors',
  templateUrl: 'info-honors.html',
})
export class InfoHonorsPage {

friendlyName: string;
//dynamic variables
showDialog: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage:Storage) {
  }

  ionViewCanEnter()
  {
     this.storage.get('firstName').then((val) => {
                          this.friendlyName = val;
                        });
           
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoHonorsPage');
  }



showHistory()
{

this.showDialog = true;

}
goBack()
{
  this.navCtrl.pop();
}


}
