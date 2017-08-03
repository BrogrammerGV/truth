import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { ConferenceData } from '../../providers/conference-data';

import { AlertController } from 'ionic-angular';
import { FhPage } from '../fh/fh';
import { EntryPage } from '../entry/entry';
import {Storage} from '@ionic/storage';

@IonicPage({
  segment: 'speaker/:speakerId'
})
@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'aboutmodal.html'
})



export class AboutModal {
  speaker: any;
  gender: any;
  fullname: any;
  dateOfBirth: any;
  birthCountry: any;
  stateofbirth: any;
  dateOfDeath: any;
  countryOfDeath: any;
  deathaddr: any;
  edu: any;
  hispanic: any;
  race: any;
  NameToUse: string;


  constructor(public dataProvider: ConferenceData, public navCtrl: NavController,
   public navParams: NavParams,public alertCtrl: AlertController, private storage: Storage, public viewCtrl: ViewController) {
 }

gotToNextDataPage()
{

  //Data Builder to Send to Submission Page
  let data = 
  {
    fullname: this.fullname,
    gender: this.gender,
    dateOfBirth: this.dateOfBirth,
    birthCountry: this.birthCountry,
    stateofbirth: this.stateofbirth,
    dateOfDeath: this.dateOfDeath,
    countryOfDeath: this.countryOfDeath,
    deathaddr: this.deathaddr,
    edu: this.edu,
    hispanic: this.hispanic,
    race: this.race
  }
 
 this.navCtrl.push(FhPage, data)

}

  ionViewWillEnter() {
    
    this.storage.get('firstName').then((val1) => {
      console.log("VAL: " + val1);
      if(val1)
        {
           this.NameToUse = val1;
        }
     
  });

  }

  goToSessionDetail(session: any) {
    this.navCtrl.push('SessionDetailPage', { sessionId: session.id });
  }



showPrompt() {
this.storage.clear();

    let prompt = this.alertCtrl.create({
      title: 'Change Name',
      message: "Enter the name of your loved one who has passed",
      inputs: [
        {
          name: 'firstName',
          placeholder: 'First Name'
        },
        {
          name: 'lastName',
          placeholder: 'Last Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.storage.set('firstName', data.firstName);
            this.storage.set('lastName', data.lastName);
          }
        }
      ]
    });
    prompt.present();
  }

  closeModal()
    {
    //Dismiss this
      this.viewCtrl.dismiss();

    }


}



