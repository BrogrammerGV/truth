import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormGroup, FormBuilder, FormControl, Validators} from "@angular/forms";
import { AlertController } from 'ionic-angular';

import { LoginPage } from '../../../pages/login/login';
import { Welcome2Page } from '../../../pages/Welcome/welcome2/welcome2';
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
  userInfo: {name: string, email: string, password: string} = {name: '', email: '', password: ''};
  public buttonClicked: boolean = false;
  public searchingClicked: boolean = false;
  public planningClicked: boolean = false;
  public buttonText: string = "Login";
  shouldHeight = document.body.clientHeight + 'px';

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController) {
  }


  ngOnInit(): any {
    this.myForm = this.formBuilder.group({
      'name': ['', [Validators.required, Validators.minLength(3), this.nameValidator.bind(this)]],
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
    if(!this.isValid('name')){
      message += "-Please provide a valid name.<br />";
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
        ClientId: 'dh2cl44233vp0pkosqa5eqrhp', /* required */
        Password: this.userInfo.password, /* required */
        Username: this.userInfo.email, /* required */
        UserAttributes: [
          {
            Name: 'name', /* required */
            Value: this.userInfo.name
          },
          {
            Name: 'email', /* required */
            Value: this.userInfo.email
          },
          /* more items */
        ]

      }).then(function(data: any){
        that.navCtrl.setRoot(LoginPage);
      }).catch(function(err: any){
        console.log(err);
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
}
