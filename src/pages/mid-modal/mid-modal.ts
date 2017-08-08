import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-mid-modal',
  templateUrl: 'mid-modal.html',
})


export class MidModalPage {
namePull: any;
disp: any;
plotYN: any;
cemeteryName: any;
attendies: any;
famView: any;
pubPrivVis: any;
funMemServ: any;
celeLife: any;
processional: any;
lunch: any;
gravServ: any;
fhdirector: any;
physicianName: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController, 
    private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MidModalPage');
    this.prePopulate();
    this.namePull = this.navParams.get('nameToUse');
     
            
  }
  
 
  
  closeModal()
    {

    let data = 
    {
        disp: this.disp, 
        plotYN: this.plotYN, 
        cemeteryName: this.cemeteryName,
        attendies: this.attendies,
        famView: this.famView,
        funMemServ: this.funMemServ,
        pubPrivVis: this.pubPrivVis,
        celeLife: this.celeLife,
        processional: this.processional,
        lunch: this.lunch,
        gravServ: this.gravServ, 
        fhdirector: this.fhdirector,
        physicianName: this.physicianName

    };

      this.viewCtrl.dismiss(data);

    }


prePopulate()
{
          this.storage.get('disp').then((val) => {
                      this.disp = val;
                    });
          this.storage.get('plotYN').then((val) => {
                    this.plotYN = val;
                    });
          this.storage.get('attendies').then((val) => {
                      this.attendies = val;
                    });
          this.storage.get('funMemServ').then((val) => {
                    this.funMemServ = val;
                      });                        
          this.storage.get('famView').then((val) => {
                 this.famView = val;
                      });

          this.storage.get('celeLife').then((val) => {
                    this.celeLife = val;
                      });
          this.storage.get('processional').then((val) => {
                     this.processional = val;
                      });

          this.storage.get('lunch').then((val) => {
                this.lunch = val;
                      });
          this.storage.get('gravServ').then((val) => {
                      this.gravServ = val;
                    });
          this.storage.get('pubPrivVis').then((val) => {
                    this.pubPrivVis = val;
                      });        
         this.storage.get('cemeteryName').then((val) => {
                    this.cemeteryName = val;
                      });     
          this.storage.get('fhdirector').then((val) => {
                    this.fhdirector = val;
                      });        
         this.storage.get('physicianName').then((val) => {
                    this.physicianName = val;
                      });     
}



}
