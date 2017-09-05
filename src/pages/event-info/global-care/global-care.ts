import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the GlobalCarePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//AWS Helpers:
declare let lambda: any;
declare let cognitoHelper: any;
declare let performMetaGet: any;





@IonicPage()
@Component({
  selector: 'page-global-care',
  templateUrl: 'global-care.html',
})
export class GlobalCarePage {

  hasClaimed: boolean = true;
  hasNone: boolean = false;

  //Variables for Data Load
  firstName: string;
  nameToUse: string;
  careTime: string;
  careDate: Date;
  careMonth: string;
  dropOfLocation: string;
  claimedItemName: string;
  additionalInstructions: string;
  googleSearch: string;


  public careCategory: string = "";
  public careCategoryFriendlyName: string = "";
  public careCategoryDescription: string = "";
  public secondaryButtonText: string = "Edit";
  public noResultsClaimed: boolean = true;
  public noResultsAvailable: boolean = true;
  public availableItems: any[] = [];
  public claimedItems: any[] = [];
  public eventClicked: boolean = false;
  public event: any;
  public eventID: string = "";
  public userID: string = "";
  public isPlanner: boolean = false;
  public comment: string = "";







  constructor(public navCtrl: NavController, public navParams: NavParams, public calendar: Calendar, public platform: Platform, public iab: InAppBrowser) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalCarePage');
    this.getData();
    this.doSearch();
  }



  getData() {
    // var userid: string = this.navParams.get("eventID");
    //var userid = undefined;
    //if (!userid){userid = "userid";}
    this.userID = "cole";
    lambda("GetPostScriptCareRegistryClaimedItems", { userID: this.userID })
      .then(function (data: any) {
        //console.log(this);
        this.showItems(data);

      }.bind(this));
  }

  showItems(ref: any) {
    this.claimedItems = [];

    for (var i = 0; i < ref.length; i++) {
      this.claimedItems.push(ref[i]);
    }

    this.claimedItems.sort(function (a, b) {
      return new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime();
    });
    this.noResultsClaimed = !this.claimedItems.length;


  }


  openItem(parm: any) {

    this.event = parm;
    this.hasClaimed = false;
    this.careDate = this.event.dateNeeded.S;
    this.careTime = this.event.timeNeeded.S;
    this.dropOfLocation = this.event.dropOffLocation.S;
    this.googleSearch = this.event.dropOffLocation.S.replace(' ', '+');
    this.claimedItemName = this.event.itemName.S
    this.additionalInstructions = this.event.additionalInstructions.S
    console.log(this.careDate + " " + this.careTime + " " + this.dropOfLocation)


  }




  doSearch() {
    //this is where we pick a guid to search
    performMetaGet({
      "eventID": "guidstuff3"
    }).then(function (data: any) {
      //console.log(this);
      //console.log(data);
      this.logItem(data);

    }.bind(this));

  }



  logItem(ref: any) {

    var x = JSON.parse(ref.Payload)
    this.firstName = x.Item.firstName.S;
    this.nameToUse = x.Item.firstName.S + " " + x.Item.lastName.S;



  }

  goBack() {
    this.hasClaimed = true;
  }

  showNone() {

    this.hasNone = true;
    this.hasClaimed = false;
  }

  showClaim() {

    this.hasNone = false;
    this.hasClaimed = true;
  }



  calendarUpdate() {

    var dd = new Date(this.careDate).getDate();
    var mm = new Date(this.careDate).getMonth() + 1;
    var yy = new Date(this.careDate).getFullYear();
    var hh = new Date(this.careTime).getHours();
    var ms = new Date(this.careTime).getMinutes();
    var x = yy + ',' + mm + ',' + dd + ' ' + hh + ':' + ms;
    var finalDate = new Date(x);

    var startDate = this.careDate;
    var eventDetails = this.firstName + "'s ";

    this.calendar.createEventInteractively(this.claimedItemName, this.dropOfLocation,
      "We are testing this functionality", this.careDate, startDate)

      .then(function (data: any) {
      }.bind(this));


    // this.calendar.createEventInteractively(this.claimedItemName, this.dropOfLocation, "Created by: PostScript:" + eventDetails , finalDate, finalDate)


  }

  openMaps() {

    let addr = this.dropOfLocation;
    const browser = this.iab.create('https://www.google.com/maps/dir/?api=1&destination=' + addr, '_blank');
  }


}
