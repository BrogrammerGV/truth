import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { EventInfoOnePage } from '../event-info-one/event-info-one';
import { EventMainPage } from '../event-main/event-main';
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


//Bool Checks
showEditScreen : boolean = false;
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


swapScreen()
{

this.showEditScreen = true;

}

removeEditScreen()
{
  this.showEditScreen=false;
}

saveEditText()
{
  if(this.greetingText)
  this.helperText = this.greetingText;
  if(this.helperText)
  this.helperText2 = this.messageText
  

  this.showEditScreen = false;
}

goToEvents()
{
  this.navCtrl.setRoot(EventMainPage);
}

goToFeed()
{
  this.navCtrl.setRoot(EventMainPage3);
}

}
