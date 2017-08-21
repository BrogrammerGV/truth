import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../../about/about';
import { MapPage } from '../../map/map';
import { EntryPage } from '../../entry/entry';
import { SelectPage } from '../../select/select';
/**
 * Generated class for the Search1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search1',
  templateUrl: 'search1.html',
})
export class Search1Page {
  public searchText: string = "";
  // set the root pages for each tab
  tab2Root: any = Search1Page;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Search1Page');
    this.searchText = this.navParams.get("search");
  }
}
