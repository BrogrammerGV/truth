import { Component } from '@angular/core';
import { FhPage } from '../fh/fh';

import {
  ActionSheet,
  ActionSheetController,
  Config,
  NavController,
  ModalController,
  AlertController
} from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';

import { ConferenceData } from '../../providers/conference-data';

import { AboutModal } from '../aboutmodal/aboutmodal';
import { EntryPage } from '../entry/entry';
import { Storage } from '@ionic/storage';
import { ModalPage } from '../modal/modal';
import  { MidModalPage } from '../mid-modal/mid-modal';

declare let callLambda: any;
declare let dataJson: any;


@Component({
  selector: 'page-select',
  templateUrl: 'select.html'
})
export class SelectPage {
  actionSheet: ActionSheet;
  speakers: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public confData: ConferenceData,
    public config: Config,
    public inAppBrowser: InAppBrowser, 
    private storage: Storage,
    public modalCtrl: ModalController,
    public alertCtrl: AlertController,

  ) {}

  ionViewDidLoad() {
    callLambda("GET"); 

     this.storage.get('firstName').then((val) => {
       console.log("Username: " + val)
    //if(val = null || val != '' || val == undefined)
            if(val == null|| val == '')
              this.openIntroModal();
            });
  }



  goToMainData()
      {
            let myModal = this.modalCtrl.create(AboutModal);
            myModal.present();
      }

   goDirectToFH()
      {
        this.navCtrl.push(FhPage);
      }
     
   openModal()
      {
        let myModal = this.modalCtrl.create(MidModalPage);
               myModal.onDidDismiss(data => { 
                  this.storage.set('truth', data.truth);
                  this.storage.set('plot', data.plot);
                  this.storage.set('disp', data.qDisp);
                  
        });

        myModal.present();
      }

openIntroModal()
      {
          let myModal = this.modalCtrl.create(ModalPage);
          myModal.present();
          myModal.onDidDismiss(data => { 
                    this.storage.set('firstName', data.first);
                    this.storage.set('lastName', data.last);
          });
      }


showPrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Start',
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
            console.log('Saved clicked' + data.firstName);
          }
        }
      ]
    });
    prompt.present();
  }

}

