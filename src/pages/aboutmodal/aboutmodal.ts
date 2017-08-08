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
  
  gender: any;
  dateOfBirth: any;
  birthCountry: any;
  stateofbirth: any;
  whenDie: any;
  whereDie: any;
  whereDieSpec: any;
  deathaddr: any;
  NameToUse: string;

  constructor(
  public dataProvider: ConferenceData, 
  public navCtrl: NavController,
   public navParams: NavParams,
   public alertCtrl: AlertController, 
   private storage: Storage, 
   public viewCtrl: ViewController) {
 }


  ionViewWillEnter() {
    
    this.storage.get('firstName').then((val1) => {
      if(val1)
           this.NameToUse = val1;
    });

  }

ionViewDidLoad(){
    this.NameToUse = this.navParams.get('nameToUse');
 this.prePopulate();
 
}


    closeModal()
{

  //Data Builder to Send to Submission Page
  let data = 
  {
    gender: this.gender,
    dateOfBirth: this.dateOfBirth,
    birthCountry: this.birthCountry,
    stateofbirth: this.stateofbirth,
    whenDie: this.whenDie,
    whereDie: this.whereDie,
    whereDieSpec: this.whereDieSpec,
    deathaddr: this.deathaddr,
    
  };
  
  this.viewCtrl.dismiss(data);

}


prePopulate()
{
          this.storage.get('gender').then((val) => {
                      this.gender = val;
                    });
          this.storage.get('dateOfBirth').then((val) => {
                    this.dateOfBirth = val;
                    });
          this.storage.get('birthCountry').then((val) => {
                      this.birthCountry = val;
                    });
          this.storage.get('stateofbirth').then((val) => {
                    this.stateofbirth = val;
                      });                        
          this.storage.get('whenDie').then((val) => {
                 this.whenDie = val;
                      });
          this.storage.get('whereDie').then((val) => {
                    this.whereDie = val;
                      });
          this.storage.get('whereDieSpec').then((val) => {
                     this.whereDieSpec = val;
                      });
          this.storage.get('deathaddr').then((val) => {
                     this.deathaddr = val;
                      });


}

 
}



