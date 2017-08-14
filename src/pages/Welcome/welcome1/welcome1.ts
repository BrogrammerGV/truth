import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Welcome2Page } from '../welcome2/welcome2';
import { EntryPage } from '../../../pages/entry/entry';

/**
 * Generated class for the Welcome1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-welcome1',
  templateUrl: 'welcome1.html',
})
export class Welcome1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  nextPage(){
    this.navCtrl.push(Welcome2Page);
  }

  skipPage(){
    this.navCtrl.push(EntryPage);
  }
}
