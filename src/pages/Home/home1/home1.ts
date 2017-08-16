import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { LoginPage } from '../../../pages/login/login';
declare let registerCognito: any;
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
  public buttonText: string = "Login";
  shouldHeight = document.body.clientHeight + 'px';

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
    this.buttonText = "Next";
  }

  searching(){
    this.buttonClicked = true;
    this.planningClicked = false;
    this.searchingClicked = true;
  }
  
  login(){
    if(this.buttonText == "Login"){
      this.navCtrl.push(LoginPage);
    }else{
      registerCognito({
        ClientId: 'mvt58lr4h6sc8rrs1t62n9h6o', /* required */
        Password: 'TestPassword1', /* required */
        Username: 'TestUser', /* required */
        UserAttributes: [
          {
            Name: 'family_name', /* required */
            Value: 'TestUser'
          },
          {
            Name: 'email', /* required */
            Value: 'test@test.com'
          },
          /* more items */
        ]
      });
    }
  }
}
