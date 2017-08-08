import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController, ModalController } from 'ionic-angular';
import { SelectPage } from "../select/select"
import {Storage} from '@ionic/storage';


declare let callLambda: any;
declare let dataJson: any;



@IonicPage()
@Component({
  selector: 'page-fh',
  templateUrl: 'fh.html',
})
export class FhPage {
  /** ngModelVariables  for Data Submission */
military: any
militaryServ: any
militaryMore: any
edu: any
ocupation: any
industry: any
race: any
hispanic: any
NameToUse: any



  constructor(
    public navCtrl: NavController,
   public navParams: NavParams,
   public loadingCtrl: LoadingController,
   private storage: Storage, 
   public viewCtrl: ViewController
   ) 
  
  {
     

  }


ionViewCanEnter()
{
  //callLambda("GET");
}

  ionViewDidLoad() 
  {
     console.log('FH Data Loaded: ');
    this.NameToUse = this.navParams.get('nameToUse');
 this.prePopulate();
     
  }




closeModal()
          {

            //Data Builder to Send to Submission Page
            let data = 
            {
              military: this.military,
              militaryServ: this.militaryServ,
              militaryMore: this.militaryMore,
              edu: this.edu,
              ocupation: this.ocupation,
              industry: this.industry,
              race: this.race,
              hispanic: this.hispanic,
            };
            
            this.viewCtrl.dismiss(data);

          }




prePopulate()
{
          this.storage.get('military').then((val) => {
                      this.military = val;
                    });
          this.storage.get('militaryServ').then((val) => {
                    this.militaryServ = val;
                    });
          this.storage.get('militaryMore').then((val) => {
                      this.militaryMore = val;
                    });
          this.storage.get('edu').then((val) => {
                    this.edu = val;
                      });                        
          this.storage.get('ocupation').then((val) => {
                 this.ocupation = val;
                      });

          this.storage.get('industry').then((val) => {
                    this.industry = val;
                      });
          this.storage.get('race').then((val) => {
                     this.race = val;
                      });

          this.storage.get('hispanic').then((val) => {
                this.hispanic = val;
                      });
}










}
