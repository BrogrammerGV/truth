import { Component, ViewChild } from '@angular/core';
import {Storage} from '@ionic/storage';
import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import {SelectPage} from '../select/select';
import {ModalPage} from '../modal/modal';

@Component({
  selector: 'page-schedule',
  templateUrl: 'entry.html'
})
export class EntryPage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;
  code: any;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    this.app.setTitle('InfoMemories');
   
  }


    ionViewCanLeave()
    {
    
        this.storage.get('loggedIn').then((val) => {
        if(val == "Yes")
            {  
             this.navCtrl.setRoot(SelectPage);
            }
     

      });



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

    
        goToCollector()
        {
          console.log(this.code)
          if(this.code == "memories")
          {
            this.storage.set('loggedIn', 'Yes');
            this.navCtrl.push(SelectPage);
            this.storage.get('loggedIn').then((val) => {
            console.log('Are You Logged In?:', val);
          });
          }
        
            else{

              
              let alert = this.alertCtrl.create({
                title: 'Try Again',
                subTitle: 'Please enter the code provided by your Funeral Home Director',
                buttons: ['Try again']
              });
              alert.present();
              this.code = "Wrong Code"

            }


          }
            
          clearFix()
          {
            this.code = "";
            
          }

            openSocial(network: string, fab: FabContainer) {
              let loading = this.loadingCtrl.create({
                content: `Posting to ${network}`,
                duration: (Math.random() * 1000) + 500
              });
              loading.onWillDismiss(() => {
                fab.close();
              });
              loading.present();
            }

            doRefresh(refresher: Refresher) {
              this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
                this.shownSessions = data.shownSessions;
                this.groups = data.groups;

                // simulate a network request that would take longer
                // than just pulling from out local json file
                setTimeout(() => {
                  refresher.complete();

                  const toast = this.toastCtrl.create({
                    message: 'Sessions have been updated.',
                    duration: 3000
                  });
                  toast.present();
                }, 1000);
              });
            }


  
}
