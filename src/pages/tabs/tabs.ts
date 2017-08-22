import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { MapPage } from '../map/map';
import { EntryPage } from '../entry/entry';
import { SelectPage } from '../select/select';
import { Search1Page } from '../Home/search1/search1';
//import { FhPage } from '../fh/fh'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = EntryPage;
  tab2Root: any = Search1Page;
  tab4Root: any = AboutPage;


  constructor(navParams: NavParams) {
    //this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
