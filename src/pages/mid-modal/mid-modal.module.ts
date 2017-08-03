import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MidModalPage } from './mid-modal';

@NgModule({
  declarations: [
    MidModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MidModalPage),
  ],
  exports: [
    MidModalPage
  ]
})
export class MidModalPageModule {}
