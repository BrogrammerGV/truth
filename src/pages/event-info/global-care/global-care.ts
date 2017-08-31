import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  eventTime: string;
  eventDate: string;
  eventMonth: string;
  funeralHome: string;

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







  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GlobalCarePage');
    this.getData();
    this.doSearch();
  }



  getData(){
   // var userid: string = this.navParams.get("eventID");
   //var userid = undefined;
    //if (!userid){userid = "userid";}
    this.userID = "cole";
    lambda("GetPostScriptCareRegistryClaimedItems",{userID: this.userID})
    .then(function(data: any){
      //console.log(this);
      console.log(data);
      this.showItems(data);
    }.bind(this));
  }

  showItems(ref: any){
    this.claimedItems = [];

    for (var i = 0; i < ref.length; i++) {
        this.claimedItems.push(ref[i]);
    }

    this.claimedItems.sort(function(a, b) {
      return new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime();
    });
    this.noResultsClaimed = !this.claimedItems.length;
  }


 openItem(parm: any){
    
    this.hasClaimed = false;

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
    this.eventDate = x.Item.eventDate.S;
    this.eventTime = x.Item.eventTime.S;
    this.funeralHome = x.Item.funeralHome.S;
    this.eventMonth = x.Item.eventMonth.S;



  }

goBack()
{
  this.hasClaimed = true;
}

showNone()
{
  
  this.hasNone = true;
  this.hasClaimed=false;
}

showClaim()
{
    
  this.hasNone = false;
  this.hasClaimed=true;
}

}
