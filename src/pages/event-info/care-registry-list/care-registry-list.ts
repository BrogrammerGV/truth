import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CareRegistryFirstTimeModalPage } from '../care-registry-first-time-modal/care-registry-first-time-modal';
import { Storage } from '@ionic/storage';

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
  public noResultsClaimed: boolean = false;
  public noResultsAvailable: boolean = false;
  public availableItems: string[] = [];
  public claimedItems: string[] = [];
  public eventClicked: boolean = false;
  public event: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public storage: Storage) {


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
    if(this.event.claimed.BOOL){
      this.secondaryButtonText = "Contact " + this.event.claimedByFirst.S;
    }else{
      this.secondaryButtonText = "Edit";
    }

    this.eventClicked = true;
  }

  goBack(){
    this.eventClicked = false;
    //this.navCtrl.pop();
  }
}
