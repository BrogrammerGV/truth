import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { InfoHonorsPage } from '../info-honors/info-honors'
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
militaryInfo: any;

//dynamic variables
showDialog: boolean = false;



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

showHistory()
{

this.showDialog = true;

}



goNext()
{
this.navCtrl.push(InfoHonorsPage);
}


}
