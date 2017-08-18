import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../../../pages/login/login';
import { Planning1Page } from '../../../pages/Home/planning1/planning1';
import { Search1Page } from '../../../pages/Home/search1/search1';
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
  myForm: FormGroup;
  public userInfo: {first: string, last: string, email: string, password: string} = {first: '', last: '', email: '', password: ''};
  public buttonClicked: boolean = false;
  public searchingClicked: boolean = false;
  public planningClicked: boolean = false;
  public buttonText: string = "Login";
  searchText: string = "";
  shouldHeight = document.body.clientHeight + 'px';

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
  }


  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      'firstName': ['', [Validators.required, Validators.minLength(2), this.nameValidator.bind(this)]],
      'lastName': ['', [Validators.required, Validators.minLength(2), this.nameValidator.bind(this)]],
      'password': ['', [Validators.required, Validators.minLength(8), this.passwordValidator.bind(this)]],
      'email': ['', [Validators.required, this.emailValidator.bind(this)]]
    });
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

  onSubmit(){
    var message: string = "";

    let alert = this.alertCtrl.create({
      title: 'Required',
      subTitle: '',
      buttons: ['OK']
    });
    if(!this.isValid('firstName')){
      message += "-Please provide a valid first name.<br />";
    }
    if(!this.isValid('lastName')){
      message += "-Please provide a valid last name.<br />";
    }
    if(!this.isValid('email')){
      message += "-Please provide a valid email address.<br />";
    }
    if(!this.isValid('password')){
      message += "-Password must be 8 characters and contain 1 number and capital.<br />";
    }

    if(message != ""){
      alert.setSubTitle(message);
      alert.present();
    }else{
      var that: any = this;
      registerCognito({
        ClientId: '4qedlf7cu5lo5r670tk6d90d19', /* required */
        Password: this.userInfo.password, /* required */
        Username: this.userInfo.email, /* required */
        UserAttributes: [
          {
            Name: 'given_name', /* required */
            Value: this.userInfo.first
          },
          {
            Name: 'family_name', /* required */
            Value: this.userInfo.last
          },
          {
            Name: 'email', /* required */
            Value: this.userInfo.email
          },
          /* more items */
        ]

      }).then(function(data: any){
        that.navCtrl.setRoot(Planning1Page, {user: that.userInfo});
      }).catch(function(err: any){
        alert.setMessage(err.message);
        alert.present();
      });
    }
    
  }

  

  isValid(field: string) {
    let formField = this.myForm.get(field);
    return formField.valid;
  }

  nameValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("^[a-zA-Z ,.'-]+$")) {
      return {invalidName: true};
    }
  }

  passwordValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match("(?=[-_a-zA-Z0-9]*?[A-Z])(?=[-_a-zA-Z0-9]*?[a-z])(?=[-_a-zA-Z0-9]*?[0-9])[-_a-zA-Z0-9]{8,}")) {
      return {invalidPassword: true};
    }
  }

  emailValidator(control: FormControl): {[s: string]: boolean} {
    if (!control.value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
      return {invalidEmail: true};
    }
  }

  doSearch(){
    if(this.searchText != ""){
      this.navCtrl.setRoot(Search1Page,{search: this.searchText});
    }else{
      alert("Please enter a search term.");
    }
  }
}
