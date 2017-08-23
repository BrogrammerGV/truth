import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventInfoOnePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


//AWS Functions
declare let performMetaGet: any;



@IonicPage()
@Component({
  selector: 'page-event-info-one',
  templateUrl: 'event-info-one.html',
})
export class EventInfoOnePage {


//Variables for Data Load
firstName: string;
nameToUse: string;
eventTime: string;
eventDate: string;
eventMonth: string;
funeralHome: string;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventInfoOnePage');
    this.doSearch();
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



logItem(ref: any){

              var x = JSON.parse(ref.Payload)
              this.firstName = x.Item.firstName.S;
              this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;
              this.eventDate = x.Item.eventDate.S;
              this.eventTime = x.Item.eventTime.S;
              this.funeralHome = x.Item.funeralHome.S;
              this.eventMonth = x.Item.eventMonth.S;

   
    // for (var i = 0; i < x.length; i++) {
    //   console.log(x[i]);
    // }
 
  }



}
