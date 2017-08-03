import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

/**
 * Generated class for the MidModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-mid-modal',
  templateUrl: 'mid-modal.html',
})


export class MidModalPage {
qDisp: any;
truth: any;
qPlot: any;
name: any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MidModalPage');
    this.name = "Your Loved One";
  }
  
  
  closeModal()
    {
    //Dismiss this
      let data = {truth: this.truth, plot: this.qPlot, qDisp: this.qDisp};
      this.viewCtrl.dismiss(data);

    }


}
