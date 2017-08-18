import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { PopoverPage } from '../pages/about-popover/about-popover';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';
//import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { SignupPage } from '../pages/signup/signup';

//Custom Pages: CJM 08/03/2017
import { EntryPage } from '../pages/entry/entry';
import { AboutModal } from '../pages/aboutmodal/aboutmodal';
import { SelectPage } from '../pages/select/select';
import { TabsPage } from '../pages/tabs/tabs';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { SupportPage } from '../pages/support/support';
import { FhPage } from '../pages/fh/fh';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { ModalPage } from '../pages/modal/modal';
import { MidModalPage } from '../pages/mid-modal/mid-modal';
import { CulturePage } from '../pages/culture/culture';
import { ConfirmPage } from '../pages/confirm/confirm';
import { InfoNamePage } from '../pages/info/info-name/info-name';
import { InfoBirthPage } from '../pages/info/info-birth/info-birth';
import { InfoSsnModalPage } from '../pages/info/info-ssn-modal/info-ssn-modal';
import { InfoDeathPage } from '../pages/info/info-death/info-death';
import { InfoAddrPage } from '../pages/info/info-addr/info-addr';
import { InfoMilitaryPage } from '../pages/info/info-military/info-military';
import { InfoHonorsPage } from '../pages/info/info-honors/info-honors';
import { InfoEduPage } from '../pages/info/info-edu/info-edu';
import { InfoWorkPage } from '../pages/info/info-work/info-work';

import { CultureSpousePage } from '../pages/culture/culture-spouse/culture-spouse';
import { CultureSpousecontPage } from '../pages/culture/culture-spousecont/culture-spousecont';
import { CultureParentsPage } from '../pages/culture/culture-parents/culture-parents';
import { CultureFatherPage } from '../pages/culture/culture-father/culture-father';
import { CultureRacePage } from '../pages/culture/culture-race/culture-race';


import { ServiceDispPage } from '../pages/service/service-disp/service-disp';
import { ServiceViewingPage } from '../pages/service/service-viewing/service-viewing';
import { ServiceModalPage } from '../pages/service/service-modal/service-modal';
import { ServiceViewModalPage } from '../pages/service/service-view-modal/service-view-modal';
import { ServiceRemainsPage } from '../pages/service/service-remains/service-remains';
import { ServiceCemeteryPage } from '../pages/service/service-cemetery/service-cemetery';

import { ServiceRemainsModalPage } from '../pages/service/service-remains-modal/service-remains-modal';

@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    EntryPage,
    SignupPage,
    AboutModal,
    SelectPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    FhPage,
    ModalPage,
    MidModalPage,
    CulturePage, 
    ConfirmPage,
    InfoNamePage, 
    InfoBirthPage, 
    InfoSsnModalPage, 
    InfoDeathPage, 
    InfoAddrPage,
    InfoMilitaryPage, 
    InfoHonorsPage, 
    InfoEduPage, 
    InfoWorkPage, 
    CultureSpousePage,
    CultureSpousecontPage, 
    CultureParentsPage,
    CultureFatherPage, 
    CultureRacePage,
    ServiceDispPage,
    ServiceModalPage, 
    ServiceViewingPage,
    ServiceViewModalPage,
    ServiceRemainsPage,
    ServiceRemainsModalPage,
    ServiceCemeteryPage


  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: EntryPage, name: 'Schedule', segment: 'entry' },
        { component: SelectPage, name: 'Select', segment: 'select' },
        { component: AboutModal, name: 'AboutModal', segment: 'speakerDetail/:speakerId' },
        { component: MapPage, name: 'Map', segment: 'map' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
        { component: SupportPage, name: 'SupportPage', segment: 'support' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: SignupPage, name: 'SignupPage', segment: 'signup' },
        { component: FhPage, name: 'FhPage', segment: 'fh' },
        { component: ModalPage, name: 'ModalPage', segment: 'modal' },
        { component: MidModalPage, name: 'MidModalPage', segment: 'midModal' },
        { component: CulturePage, name: 'CulturePage', segment: 'culture' },
        { component: ConfirmPage, name: 'ConfirmPage', segment: 'confirm' },
       
        { component: InfoNamePage, name: 'InfoNamePage', segment: 'infoName' },
         { component: InfoBirthPage, name: 'InfoBirthPage', segment: 'infoBirth' },
              { component: InfoSsnModalPage, name: 'InfoSSNModalPage', segment: 'infoSSNModal' },
              { component: InfoDeathPage, name: 'InfoDeathPage', segment: 'infoDeath' },
                 { component: InfoAddrPage, name: 'InfoAddrPage', segment: 'infoAddr' },
        { component: InfoMilitaryPage, name: 'InfoMilitaryPage', segment: 'infoMilitary' }, 
           { component: InfoHonorsPage, name: 'InfoHonorsPage', segment: 'infoHonors' },
         { component: InfoEduPage, name: 'InfoEduPage', segment: 'infoEdu' },
                  { component: InfoWorkPage, name: 'InfoWorkPage', segment: 'infoWork' },
                      { component: CultureSpousePage, name: 'CultureSpousePage', segment: 'cultureSpouse' },
    { component: CultureSpousecontPage, name: 'CultureSpousecontPage', segment: 'cultureSpousecont' } ,
       { component: CultureParentsPage, name: 'CultureParentsPage', segment: 'cultureParents' },
           { component: CultureFatherPage, name: 'CultureFatherPage', segment: 'cultureFather' }   ,       
                    { component: CultureRacePage, name: 'CultureRacePage', segment: 'cultureRace' }          
                 
                     
                  
                 
        
      ]
    }),BrowserModule, 
    
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    AccountPage,
    LoginPage,
    MapPage,
    PopoverPage,
    EntryPage,
    SignupPage,
    AboutModal,
    SelectPage,
    TabsPage,
    TutorialPage,
    SupportPage,
    FhPage,
    ModalPage,
    MidModalPage,
    CulturePage, 
    ConfirmPage,
    InfoNamePage, 
    InfoBirthPage, 
    InfoSsnModalPage, 
    InfoDeathPage, 
    InfoAddrPage, 
    InfoMilitaryPage, 
    InfoHonorsPage, 
    InfoEduPage, 
    InfoWorkPage, 
    CultureSpousePage,
    CultureSpousecontPage, 
    CultureParentsPage, 
    CultureFatherPage, 
    CultureRacePage,
    ServiceDispPage,
    ServiceModalPage,
    ServiceViewingPage,
    ServiceViewModalPage,
    ServiceRemainsPage,
    ServiceRemainsModalPage,
    ServiceCemeteryPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
