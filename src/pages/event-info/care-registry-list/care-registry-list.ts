import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CareRegistryFirstTimeModalPage } from '../care-registry-first-time-modal/care-registry-first-time-modal';
import { Storage } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CallNumber } from '@ionic-native/call-number';

import { CareRegistryAddItemPage } from '../care-registry-add-item/care-registry-add-item';
import { CareRegistryItemDetailsPage } from '../care-registry-item-details/care-registry-item-details';


/**
 * Generated class for the CareRegistryListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare let lambda: any;
@IonicPage()
@Component({
  selector: 'page-care-registry-list',
  templateUrl: 'care-registry-list.html',
})
export class CareRegistryListPage {

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
  public isPlanner: boolean = false;
  public comment: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage, public callNumber: CallNumber, public socialSharing: SocialSharing, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.careCategory = this.navParams.get("careCategory");
    if (!this.careCategory) {
      this.careCategory = "Meals";
    }

    this.storage.get(this.careCategory + "Shown").then((val) => {
      if(!(val == "shown")){
        let myModal = this.modalCtrl.create(CareRegistryFirstTimeModalPage);
        myModal.present();
        this.storage.set(this.careCategory + "Shown","shown");
      }
    });
    

    this.loadCareCategoryInformation();

    this.getData();
  }

  getData(){
    var event: string = this.navParams.get("eventID");
    if (!event){event = "guidstuff";}
    this.eventID = event;
    lambda("GetPostScriptCareRegistry",{eventID: event, careCategory: this.careCategory})
    .then(function(data: any){
      //console.log(this);
      this.showItems(data);
    }.bind(this));
  }

  showItems(ref: any){
    this.availableItems = [];
    this.claimedItems = [];

    for (var i = 0; i < ref.length; i++) {
      if(ref[i].claimed.BOOL){
        this.claimedItems.push(ref[i]);
      }else{
        this.availableItems.push(ref[i]);
      }
    }

    this.claimedItems.sort(function(a, b) {
      return new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime();
    });
    this.availableItems.sort(function(a, b) {
      return new Date(b.dateNeeded).getTime() - new Date(a.dateNeeded).getTime();
    });

    this.noResultsClaimed = !this.claimedItems.length;
    this.noResultsAvailable = !this.availableItems.length;
  }

  addItem() {
    this.navCtrl.push(CareRegistryAddItemPage);
  }

  loadCareCategoryInformation() {
    switch (this.careCategory) {
      case "Meals":
        this.careCategoryFriendlyName = "Meals";
        this.careCategoryDescription = "Bringing food is an easy and comfortable way for loved ones to help.";
        break;
      case "Transportation":
        this.careCategoryFriendlyName = "Transportation";
        this.careCategoryDescription = "Let your loved ones know when they can help provide transportation.";
        break;
      case "Household":
        this.careCategoryFriendlyName = "Household Tasks";
        this.careCategoryDescription = "Let loved ones assist with basic household tasks like laundry, shopping, cleaning, etc.";
        break;
      case "Misc":
        this.careCategoryFriendlyName = "Misc. Support";
        this.careCategoryDescription = "What other tasks can loved ones help with? Pet care? Childcare? Lawn care?";
        break;
    }
  }

  openItem(parm: any){
    this.event = parm;
    if(!this.event.claimed.BOOL || this.isPlanner){
      if(this.event.claimed.BOOL){
        this.secondaryButtonText = "Contact " + this.event.claimedByFirst.S;
      }else{
        if(this.isPlanner){
          this.secondaryButtonText = "Edit Item";
        }else{
          this.secondaryButtonText = "Claim Task";
        }
      }
  
      this.eventClicked = true;
    }
  }

  goBack(){
    this.eventClicked = false;
    //this.navCtrl.pop();
  }

  secondaryButton(){
    if(this.secondaryButtonText == "Edit Item"){
      this.navCtrl.push(CareRegistryAddItemPage);
    }else{
      this.contact();
    }
  }

  contact(){
    let alert = this.alertCtrl.create({
      title: 'Contact ' + this.event.claimedByFirst.S,
      message: 'How do you want to contact ' + this.event.claimedByFirst.S + '?',
      buttons: [
        {
          text: 'Call',
          handler: () => {
            this.call();
          }
        },
        {
          text: 'Text',
          handler: () => {
            this.text();
          }
        },
        {
          text: 'Email',
          handler: () => {
            this.email();
          }
        },
        {
          text: 'Cancel',
          role: "cancel",
          handler: () => {
            console.log('Buy clicked');
          }
        }
      ]
    });
    alert.present();
  }

  call(){
    this.callNumber.callNumber(this.event.claimedByPhone.S, true)
  }

  text(){
    //alert(this.event.claimedByPhone.S);
    var number: string = this.event.claimedByPhone.S;
    this.socialSharing.shareViaSMS("",number).then(() => {
          // Success!
        }).catch((err) => {
          alert(err);
        });
  }

  email(){
    this.socialSharing.canShareViaEmail().then(function(){
      this.socialSharing.shareViaEmail('','',this.event.claimedByEmail.S,'','',null).then(function(){
      }).catch(function(err:any){
        alert(err);
      });
    }.bind(this)).catch(function(){
      alert("Unable to open email client.");
    });
  }

  claimTask(){
    lambda("ClaimCareRegistryTask",{eventID: this.eventID, careID: this.event.careID.S, firstName: "Danielle", lastName: "Burmeister", email: "dburmeister@homesteaderslife.com",phone:"515-822-8103"})
    .then(function(data: any){
      console.log(data);
      if(data){
        alert(data.errorMessage);
      }else{
        alert("Thank you for claiming this task.");
      }
      this.getData();
      this.goBack();
    }.bind(this))
    .catch(function(data:any){
      alert("An error has occurred, please try again later.");
      this.getData();
      this.goBack();
    }.bind(this));
  }
}
