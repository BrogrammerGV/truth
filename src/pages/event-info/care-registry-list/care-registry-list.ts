import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CareRegistryFirstTimeModalPage } from '../care-registry-first-time-modal/care-registry-first-time-modal';

import { CareRegistryAddItemPage } from '../care-registry-add-item/care-registry-add-item';
import { CareRegistryItemDetailsPage } from '../care-registry-item-details/care-registry-item-details';
/**
 * Generated class for the CareRegistryListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-care-registry-list',
  templateUrl: 'care-registry-list.html',
})
export class CareRegistryListPage {


//GUI Bool Logic
breakfastClicked: boolean = false;
lunchClicked: boolean = false;
dinnerClicked: boolean = false;

//intra-page nav variables
showAddItem: boolean = false;


  public careCategory: string = "";
  public careCategoryFriendlyName: string = "";
  public careCategoryDescription: string = "";
  public noResultsClaimed: boolean = false;
  public noResultsAvailable: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {


  }

  ionViewDidLoad() {
let x: string = this.navParams.get('pageBool');

if( x == 'Y')
{
  this.showAddItem = true;
}else{
    let myModal = this.modalCtrl.create(CareRegistryFirstTimeModalPage);

    myModal.present();
  
}
  this.loadCareCategoryInformation();
    console.log('ionViewDidLoad CareRegistryListPage');
    

  
  }

  addItem() {
    this.navCtrl.push(CareRegistryAddItemPage);
  }

  loadCareCategoryInformation() {
    //this.careCategory = this.navParams.get("careCategory");
    if (!this.careCategory) {
      this.careCategory = "Meals";
    }
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

  openItem(parm: string){
    this.navCtrl.push(CareRegistryItemDetailsPage, {itemID: parm});
  }

  goBack(){
    this.navCtrl.pop();
  }




//Sharing GUI Logic
  showBreakfast(){
    this.breakfastClicked = true;
    this.lunchClicked = false;
    this.dinnerClicked = false;
 
  }

  showLunch(){
       this.breakfastClicked = false;
    this.lunchClicked = true;
    this.dinnerClicked = false;
 
  }

    showDinner(){
     this.breakfastClicked = false;
    this.lunchClicked = false;
    this.dinnerClicked = true;
 
  }


}
