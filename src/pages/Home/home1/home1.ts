import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../../pages/login/login';

/**
 * Generated class for the Home1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
})
export class Home1Page {
  public buttonClicked: boolean = false;
  public searchingClicked: boolean = false;
  public planningClicked: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
    this.buttonClicked = false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Home1Page');
  }

  planning(){
    this.buttonClicked = true;
    this.planningClicked = true;
    this.searchingClicked = false;
  }

  searching(){
    this.buttonClicked = true;
    this.planningClicked = false;
    this.searchingClicked = true;
  }
  
  login(){
    this.navCtrl.push(LoginPage);
  }

}
