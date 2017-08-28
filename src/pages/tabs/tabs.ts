import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { Home1Page } from '../Home/home1/home1';
import { EventsPage } from '../Home/events/events';
import { SelectPage } from '../select/select';
import { Search1Page } from '../Home/search1/search1';
import { EventMainPage } from '../event-info/event-main/event-main';
//import { FhPage } from '../fh/fh'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = Home1Page;
  tab2Root: any = Search1Page;
  tab3Root: any = EventsPage;
  tab4Root: any = EventMainPage;


  constructor(navParams: NavParams) {
    //this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
