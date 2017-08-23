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

import { EventInfoOnePage } from '../event-info/event-info-one/event-info-one';


//AWS Functions
declare let performMetaGet: any;



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

//Variables for Data Load
nameToUse: string;
eventTime: string;
eventDate: string;
eventMonth: string;
funeralHome: string;






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
    this.app.setTitle('PostScript');
    this.doSearch();
   
  }


  /*  ionViewCanLeave()
    {
        this.storage.get('loggedIn').then((val) => {
        if(val == "Yes")
            {  
            
            }
      });
    }**/

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
             this.navCtrl.setRoot(SelectPage);
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


 doSearch(){
    
    //this is where we pick a guid to search
    performMetaGet({"eventID": "guidstuff3"
    }).then(function(data: any){
      //console.log(this);
      //console.log(data);
      this.logItem(data);

    }.bind(this));


  }


goNext()
{
  this.navCtrl.push(EventInfoOnePage);
}

logItem(ref: any){
  
    var x = JSON.parse(ref.Payload)
console.log(x.Item.firstName);
   this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;
   this.eventDate = x.Item.eventDate.S;
   this.eventTime = x.Item.eventTime.S;
   this.funeralHome = x.Item.funeralHome.S;
   this.eventMonth = x.Item.eventMonth.S;

   
    // for (var i = 0; i < x.length; i++) {
    //   console.log(x[i]);
    // }
 
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
