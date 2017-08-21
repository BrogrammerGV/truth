import { Component, ViewChild } from '@angular/core';

import { MenuController, NavController, Slides } from 'ionic-angular';

import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';
import { EntryPage} from '../entry/entry';
import { SelectPage} from '../select/select';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html'
})

export class TutorialPage {
  showSkip = true;

	@ViewChild('slides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    public storage: Storage
  ) { }

  startApp() {
//Will need TO change this to still bring in Tabs Page

    this.navCtrl.push(SelectPage).then(() => {
      this.storage.set('hasSeenTutorial', 'true');
    })


this.storage.get('loggedIn')
            .then((loggedIn) => {
        if (loggedIn = 'Yes') {
          console.log("Logged In: " + loggedIn);
          console.log("Has Seen Tutorial: " + loggedIn);
        } else {
        this.navCtrl.push(EntryPage);
        }
      
            })
  }

  onSlideChangeStart(slider: Slides) {
    this.showSkip = !slider.isEnd();
  }

	ionViewWillEnter() {
		this.slides.update();
	}

  ionViewDidEnter() {
    // the root left menu should be disabled on the tutorial page
    this.menu.enable(false);
  }

  ionViewDidLeave() {
    // enable the root left menu when leaving the tutorial page
    this.menu.enable(true);
  }

}
