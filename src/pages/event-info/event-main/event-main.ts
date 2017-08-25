import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { EventInfoOnePage } from '../event-info-one/event-info-one';
import { EventMainPage2 } from '../event-main2/event-main2';
import { EventMainPage3 } from '../event-main3/event-main3';
import { Http } from '@angular/http';

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
emailAddressSendInvite: string;


//Email Variables:
deceasedFirstName: string;
deceasedLastName: string;
plannerFirstName: string;
plannerLastName: string;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage, 
    private alrtCtrl: AlertController,
    public http: Http


   ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventMainPage');
  
  this.storage.get('guid').then((val) => {
    console.log('Guid:', val);
    this.doSearch(val);
  });
 
            
   
  }



 doSearch(guid:string){
   
    performMetaGet({"eventID": guid
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

//email vars
this.deceasedFirstName =  x.Item.firstName.S;
this.deceasedLastName = x.Item.lastName.S;
this.plannerFirstName = "Cole";
this.plannerLastName = "McFarland";

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


    sendEmail()
    {
      var re = /^[\W]*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4}[\W]*,{1}[\W]*)*([\w+\-.%]+@[\w\-.]+\.[A-Za-z]{2,4})[\W]*$/;

if(this.emailAddressSendInvite && re.test(this.emailAddressSendInvite))
              {
              let alert = this.alrtCtrl.create({
                              title: "Your email notification has been sent." ,
                              buttons: [{
                                text: 'Ok',
                                handler: () => {
                                  // user has clicked the alert button
                                  // begin the alert's dismiss transition
                                  let navTransition = alert.dismiss();

                                  // start some async method
                                  this.runEmailer().then(() => {
                                    // once the async operation has completed
                                    // then run the next nav transition after the

                                    navTransition.then(() => {
                                      this.navCtrl.push(EventMainPage);
                                    });
                                  });
                                  return false;
                                }
                              }]
                            });

                            alert.present();
              }
             else{

        let alert = this.alrtCtrl.create({
                  title: "Please enter a valid email address." ,
                  buttons: [{
                    text: 'Ok',
                    handler: () => {
                      // user has clicked the alert button
                      // begin the alert's dismiss transition
                      let navTransition = alert.dismiss();

                      // start some async method
                      this.runMethodNull().then(() => {
                        // once the async operation has completed
                        // then run the next nav transition after the

                        navTransition.then(() => {
                          //this.navCtrl.push(EventMainPage);
                        });
                      });
                      return false;
                    }
                  }]
                });

                alert.present();
                
                            }



    }


async runEmailer()
{
  var emailAdd:string; 
  emailAdd = this.emailAddressSendInvite;
    var link = 'http://dev.myhomesteaders.com/UIS/native.asmx/PostScriptShareEmail?toaddress=' +
    emailAdd +
    '&deceasedFirst=' + this.deceasedFirstName + 
    '&deceasedLast=' + this.deceasedLastName + 
    '&plannerFirst=' + this.plannerFirstName + 
    '&plannerLast=' + this.plannerLastName + '&token=6352f04d-34e6-4bf8-8cc9-63593f35a96e';
    this.http.get(link).map(res => res.json()).subscribe(data => {

      console.log("Email sent to "+  emailAdd)
});

}

async runMethodNull()
{
 


}

}
