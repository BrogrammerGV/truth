import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { Home1Page } from '../Home/home1/home1';
import { SelectPage } from '../select/select';
import { Search1Page } from '../Home/search1/search1';
//import { FhPage } from '../fh/fh'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = Home1Page;
  tab2Root: any = Search1Page;
  tab4Root: any = AboutPage;
  mySelectedIndex: 1;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
