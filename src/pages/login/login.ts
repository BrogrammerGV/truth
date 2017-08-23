import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';

declare let loginCognito: any;
@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  public userName: string;
  public password: string;
  public confirm: boolean = false;
  public confirmationCode: string;
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, private storage: Storage) { }

  next() {
    if (this.confirm) {
      this.confirmCode();
    }
    else {
      this.login();
    }
  }

  forgotPassword() {

  }

  resendConfirmation() {

  }

  login() {
    if (this.userName && this.password) {
      loginCognito(this.userName, this.password)
        .then(function (data: any) {
          //console.log(this);
          this.storage.set("authToken", data);
          alert("Successfully logged in");
        }.bind(this))
        .catch(function (data: any) {
          if (data == "User is not confirmed.") {
            this.confirm = true;
          } else {
            alert("Invalid username/password combination.");
          }
        }.bind(this));
    } else {
      alert("Please enter an email address and password.");
    }
  }

  confirmCode() {
    if (this.confirmationCode) {

    } else {
      alert("Please enter a confirmation code.");
    }
  }

  goBack() {
    this.navCtrl.pop();
  }
}
