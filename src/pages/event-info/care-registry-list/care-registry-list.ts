import { Component } from '@angular/core';

import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { CareRegistryFirstTimeModalPage } from '../care-registry-first-time-modal/care-registry-first-time-modal';

import { DatePickerModule } from 'datepicker-ionic2';
import { DatePickerDirective } from 'datepicker-ionic2';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';


import { CareRegistryAddItemPage } from '../care-registry-add-item/care-registry-add-item';
import { CareRegistryItemDetailsPage } from '../care-registry-item-details/care-registry-item-details';
import { EventMainPage2 } from '../event-main2/event-main2';

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
    providers: [DatePicker]

})



export class CareRegistryListPage {


    //GUI Bool Logic
    breakfastClicked: boolean = false;
    lunchClicked: boolean = false;
    dinnerClicked: boolean = false;
    timeFilledOut: boolean = false;
    showAddItem: boolean = false;
    showAddItemAll: boolean = false;
    showConfirm: boolean = false;


    //intra-page nav variables
    mealDate: string;
    mealTime: any;
    footerButtonText: string = "Add Item";

    itemDate: string;


    //AWS Variables
    additionalInstructions: string;
    dropOfLocation: string;

    careItemName: string;
    careItemShort: string;
    careItemDate: string;



    public careCategory: string = "";
    public careCategoryFriendlyName: string = "";
    public careCategoryDescription: string = "";
    public noResultsClaimed: boolean = false;
    public noResultsAvailable: boolean = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController,
        public datePicker: DatePicker, public alertCtrl: AlertController) {


    }


    ionViewDidLoad() {

        let x: string = this.navParams.get('pageBool');
        let y: string = this.navParams.get('careCategory');

        if (x == 'Y') {

            if (y == 'Meals') {
                this.showAddItem = true;
                this.footerButtonText = "Next";
            }
            else {
                this.showAddItemAll = true;
                this.footerButtonText = "Add Item";
            }
        }
        else {
            let myModal = this.modalCtrl.create(CareRegistryFirstTimeModalPage);
            myModal.present();
        }
        this.loadCareCategoryInformation();
        console.log('ionViewDidLoad CareRegistryListPage');
    }

    addItem() {

        if (this.showConfirm && (this.showAddItem || this.showAddItemAll)) {
            this.showConfirm = false;
            this.showAddItem = false;
            this.showAddItemAll = false;
            this.navCtrl.push(EventMainPage2);
            return;
        }
        if (this.careItemName && this.careItemShort && this.careItemDate) {
            this.showConfirm = true;
            this.footerButtonText = "Add Another Item"
        }
        if (this.timeFilledOut) {

            if (this.breakfastClicked || this.lunchClicked || this.dinnerClicked) {

                if (this.dropOfLocation && this.additionalInstructions) {
                    this.timeFilledOut = false;
                    this.showConfirm = true;
                    this.footerButtonText = "Add Another Item"
                }
                else {
                    this.presentAlert();
                }

            }
            else {
                this.presentAlert();
            }
        }
        else {
            if (this.breakfastClicked || this.lunchClicked || this.dinnerClicked) {

                if ((this.mealDate && this.mealTime) && !this.timeFilledOut) {
                    this.mealTime = this.coleConvert(this.mealTime);
                    this.timeFilledOut = true;
                    this.footerButtonText = "Add Care Item"
                }
                else {
                    this.presentAlert();
                }

            }
            else {
                if (this.careCategory == 'Meals')
                    this.presentAlert();
            }
        }
    }


    loadCareCategoryInformation() {
        this.careCategory = this.navParams.get("careCategory");
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

    openItem(parm: string) {
        this.navCtrl.push(CareRegistryItemDetailsPage, { itemID: parm });
    }

    goBack() {
        this.navCtrl.pop();
    }




    //Sharing GUI Logic
    showBreakfast() {
        this.breakfastClicked = true;
        this.lunchClicked = false;
        this.dinnerClicked = false;

    }

    showLunch() {
        this.breakfastClicked = false;
        this.lunchClicked = true;
        this.dinnerClicked = false;

    }

    showDinner() {
        this.breakfastClicked = false;
        this.lunchClicked = false;
        this.dinnerClicked = true;

    }




    //Custom View Controller/Provider for calendar popup
    showCalendar() {
        this.datePicker.showCalendar();
        this.openDatePicker()
    }
    openDatePicker() {
        this.datePicker.onDateSelected.subscribe(
            (date: string) => {
                console.log(date);
                var x = date.toString();
                this.mealDate = x.slice(4, 7) + '.' + x.slice(7, 10)
            });
    }

    showCalendarAll() {
        this.datePicker.showCalendar();
        this.openDatePickerAll()
    }
    openDatePickerAll() {
        this.datePicker.onDateSelected.subscribe(
            (date: string) => {
                console.log(date);
                var x = date.toString();
                this.careItemDate = x.slice(4, 7) + '.' + x.slice(7, 10)
            });
    }
    //End of Custom Date Pickers




    coleConvert(time: any) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];
        if (time.length > 1) {
            time = time.slice(1);
            time[5] = +time[0] < 12 ? ' a.m.' : ' p.m.';
            time[0] = +time[0] % 12 || 12;
            if (time[2] == "00") {
                time[1] = "";
                time[2] = "";
            }
        }
        return time.join('');
    }




    presentAlert() {
        let alert = this.alertCtrl.create({

            subTitle: 'Please complete all the required information.',
            buttons: ['Dismiss']
        });
        alert.present();
    }


}
