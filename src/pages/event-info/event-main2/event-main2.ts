import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { EventInfoOnePage } from '../event-info-one/event-info-one';
import { EventMainPage } from '../event-main/event-main';
import { EventMainPage3 } from '../event-main3/event-main3';
import { CareModalPage } from '../care-modal/care-modal';


/**
 * Generated class for the EventMainPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */



//AWS Functions
declare let performMetaGet: any;


@IonicPage()
@Component({
  selector: 'page-event-main2',
  templateUrl: 'event-main2.html',
})
export class EventMainPage2 {


  //Dynamic Variables 
  //Variables for Data Load
  nameToUse: string;
  eventTime: string;
  eventDate: string;
  eventMonth: string;
  funeralHome: string;
  firstName: string;
  careCategory: string;


  //Bool Checks
  showEditScreen: boolean = false;
  showAddItem: boolean = false;
  hasSeenCare: boolean = false;
  careButtonText: string = "Get Started";

  //Vars
  helperText: string;
  helperText2: string;
  greetingText: string;
  messageText: string;



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    public modalCtrl: ModalController
  ) {
  }






  ionViewCanEnter() {
    this.storage.get('hasSeenCare').then((val) => {
      if (val == "Y") {
        this.hasSeenCare = true;
        this.careButtonText = "Add Care Item";

      }

    });

  }




  ionViewDidLoad() {
    console.log('ionViewDidLoad EventMainPage');
    this.storage.get('guid').then((val) => {
      console.log('Guid:', val);
      this.doSearch(val);
    });


  }



  doSearch(guid: string) {

    performMetaGet({
      "eventID": guid
    }).then(function (data: any) {

      this.logItem(data);

    }.bind(this));

  }

  logItem(ref: any) {

    var x = JSON.parse(ref.Payload)
    console.log(x.Item.firstName);
    this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;
    this.eventDate = x.Item.eventDate.S;
    this.eventTime = x.Item.eventTime.S;
    this.funeralHome = x.Item.funeralHome.S;
    this.eventMonth = x.Item.eventMonth.S;
    this.firstName = x.Item.firstName.S;

    //Setting Variable Texr
    this.helperText = "A Message from " + this.firstName + "'s Family";
    this.helperText2 = "Thank you for supporting our family during this difficult time We appreciate your condolences and invite you to join us as we celelbrate " + this.firstName + ".";
    this.messageText = this.helperText2;
    this.greetingText = this.helperText;

  }
  goNext() {
    this.navCtrl.push(EventInfoOnePage)
  }


  swapScreen() {

    this.showEditScreen = true;

  }

  removeEditScreen() {
    this.showEditScreen = false;
  }

  saveEditText() {
    if (this.greetingText)
      this.helperText = this.greetingText;
    if (this.helperText)
      this.helperText2 = this.messageText


    this.showEditScreen = false;
  }

  goToEvents() {
    this.navCtrl.setRoot(EventMainPage);
  }

  goToFeed() {
    this.navCtrl.setRoot(EventMainPage3);
  }




  getStarted() {

    if (this.careButtonText == "Get Started") {

      this.storage.set('hasSeenCare', "Y");
      this.hasSeenCare = true;
      this.careButtonText = "Add Care Item"
      this.openCareModal();


    }
    if(this.careButtonText=="Add Care Item")
    {
       this.showAddItem = true;
       this.careButtonText = "Add Item"
    }
    else {

      if(!this.careCategory){
          this.storage.set('hasSeenCare', "N");
      this.careButtonText = "Get Started"
      this.hasSeenCare = false;
    }
    else 
    {
      console.log(this.careCategory)
    }
    
    }


  }




  openCareModal() {
    let myModal = this.modalCtrl.create(CareModalPage);

    myModal.present();
  }

}
