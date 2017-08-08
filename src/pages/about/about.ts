import { Component } from '@angular/core';
import { PopoverController, NavController } from 'ionic-angular';

import { PopoverPage } from '../about-popover/about-popover';
import {SupportPage } from '../support/support';

declare let callLambda: any;
declare let dataJson: any;


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(public popoverCtrl: PopoverController, public navCtrl: NavController) { }


ionViewCanEnter(){
   callLambda("GET");
}

ionViewDidLoad(){
 console.log(dataJson);
}
  presentPopover(event: Event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({ ev: event });
  }


  goToSup()
  {
    this.navCtrl.push(SupportPage);
  }
  goToPriv()
  {
    
  }

}
