import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventMainPage2 } from './event-main';

@NgModule({
  declarations: [
    EventMainPage2,
  ],
  imports: [
    IonicPageModule.forChild(EventMainPage2),
  ],
  exports: [
    EventMainPage2
  ]
})
export class EventMainPageModule {}
