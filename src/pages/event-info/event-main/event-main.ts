import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { EventInfoOnePage } from '../event-info-one/event-info-one';
import { EventMainPage2 } from '../event-main2/event-main2';
import { EventMainPage3 } from '../event-main3/event-main3';

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
  selector: 'page-event-main',
  templateUrl: 'event-main.html',
})
export class EventMainPage {


//Dynamic Variables 
//Variables for Data Load
nameToUse: string;
eventTime: string;
eventDate: string;
eventMonth: string;
funeralHome: string;
firstName: string;


//Bool Checks
showEditScreen : boolean = false;
showShareScreen : boolean = false;
buttonClicked: boolean = false;
facebookClicked: boolean = false;
textClicked: boolean = false;
emailClicked: boolean = false;

//DataLoad Variables
helperText: string;
helperText2: string;
greetingText: string;
messageText: string;



  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventMainPage');
        this.doSearch();
   
  }



 doSearch(){
   
    performMetaGet({"eventID": "guidstuff3"
    }).then(function(data: any){
 
      this.logItem(data);

    }.bind(this));

  }

logItem(ref: any){
  
    var x = JSON.parse(ref.Payload)
console.log(x.Item.firstName);
   this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;
   this.eventDate = x.Item.eventDate.S;
   this.eventTime = x.Item.eventTime.S;
   this.funeralHome = x.Item.funeralHome.S;
   this.eventMonth = x.Item.eventMonth.S;
   this.firstName = x.Item.firstName.S;

   //Setting Variable Texr
        this.helperText = "A Message from "+ this.firstName + "'s Family";
        this.helperText2 = "Thank you for supporting our family during this difficult time We appreciate your condolences and invite you to join us as we celelbrate "  + this.firstName + ".";
        this.messageText = this.helperText2;
        this.greetingText = this.helperText;
 
  }
  goNext()
  {
this.navCtrl.push(EventInfoOnePage)
  }


saveEditText()
{
  if(this.greetingText)
  this.helperText = this.greetingText;
  if(this.helperText)
  this.helperText2 = this.messageText
  

  this.showEditScreen = false;
}



goToCare(){
  this.navCtrl.setRoot(EventMainPage2);
}

goToFeed()
{
  this.navCtrl.setRoot(EventMainPage3);
}




//Modal Swaps On Main Page

swapScreen()
{
this.showEditScreen = true;
}

swapShare()
{
  this.showShareScreen = true;
}

removeEditScreen()
{
  this.showEditScreen=false;
}
removeShareScreen()
{
  this.showShareScreen =false;
}


//Sharing GUI Logic
  showFacebook(){
    this.emailClicked = false;
    this.textClicked = false;
    this.facebookClicked = true;
 
  }

  showText(){
    this.emailClicked = false;
    this.textClicked = true;
    this.facebookClicked = false;
 
  }

    showEmail(){
    this.emailClicked = true;
    this.textClicked = false;
    this.facebookClicked = false;
 
  }

}
