import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EntryPage } from '../../../pages/entry/entry';
/**
 * Generated class for the Welcome3Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome3',
  templateUrl: 'welcome3.html',
})
export class Welcome3Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Welcome3Page');
  }

  nextPage(){
    this.navCtrl.push(EntryPage);
  }

}
