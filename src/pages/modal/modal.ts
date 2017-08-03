import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { SpeakerDetailPage } from '../speaker-detail/speaker-detail';
/**
 * Generated class for the ModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
first:string;
last:string;
 
modalDat: string = this.navParams.get('title');
  constructor(
    public navCtrl: NavController, 
  public navParams: NavParams, 
  public modalCtrl: ModalController,
  public viewCtrl: ViewController,
  ) {
  }


ionViewWillEnter()
{
 if(this.modalDat=="intro")
 {
console.log("ModalData: " + this.modalDat);
this.modalDat = null;
 }


}

closeModal()

{
 let data = {first: this.first, last: this.last};
  this.viewCtrl.dismiss(data);

}

}
