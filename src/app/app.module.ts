import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ConferenceApp } from './app.component';
import { AccountPage } from '../pages/account/account';
import { LoginPage } from '../pages/login/login';
import { Calendar } from '@ionic-native/calendar';

import { DatePickerModule } from 'datepicker-ionic2';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';

//Custom Pages: CJM 08/03/2017
import { EntryPage } from '../pages/entry/entry';
import { SelectPage } from '../pages/select/select';
import { TabsPage } from '../pages/tabs/tabs';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { CulturePage } from '../pages/culture/culture';
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
import { Welcome1Page } from '../pages/Welcome/welcome1/welcome1';
import { Welcome2Page } from '../pages/Welcome/welcome2/welcome2';
import { Welcome3Page } from '../pages/Welcome/welcome3/welcome3';
import { Home1Page } from '../pages/Home/home1/home1';
import { Planning1Page } from '../pages/Home/planning1/planning1';
import { Planning2Page } from '../pages/Home/planning2/planning2';
import { Search1Page } from '../pages/Home/search1/search1';
import { Search2Page } from '../pages/Home/search2/search2';
import { EventsPage } from '../pages/Home/events/events';

import { EventInfoOnePage } from '../pages/event-info/event-info-one/event-info-one';
import { EventMainPage } from '../pages/event-info/event-main/event-main';
import { EventMainPage2 } from '../pages/event-info/event-main2/event-main2';
import { EventMainPage3 } from '../pages/event-info/event-main3/event-main3';
import { CareModalPage } from '../pages/event-info/care-modal/care-modal';
import { CareRegistryListPage } from '../pages/event-info/care-registry-list/care-registry-list';
import { CareRegistryAddItemPage } from '../pages/event-info/care-registry-add-item/care-registry-add-item';
import { CareRegistryFirstTimeModalPage } from '../pages/event-info/care-registry-first-time-modal/care-registry-first-time-modal';
import { CareRegistryItemDetailsPage } from '../pages/event-info/care-registry-item-details/care-registry-item-details';

@NgModule({
  declarations: [
    ConferenceApp,
    AccountPage,
    LoginPage,
    EntryPage,
    SelectPage,
    TabsPage,
    CulturePage, 
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
    ServiceCemeteryPage,
    Welcome1Page,
    Welcome2Page,
    Welcome3Page,
    Home1Page,
    Planning1Page,
    Planning2Page,
    Search1Page,
    EventInfoOnePage,
    EventMainPage,
    Search2Page,
    EventsPage, 
    EventMainPage2,
    EventMainPage3, 
    CareModalPage,
    EventMainPage3,
    CareRegistryListPage,
    CareRegistryAddItemPage,
    CareRegistryFirstTimeModalPage,
    CareRegistryItemDetailsPage,
     DatePicker,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs' },
        { component: EntryPage, name: 'Schedule', segment: 'entry' },
        { component: SelectPage, name: 'Select', segment: 'select' },
        { component: LoginPage, name: 'LoginPage', segment: 'login' },
        { component: AccountPage, name: 'AccountPage', segment: 'account' },
        { component: CulturePage, name: 'CulturePage', segment: 'culture' },
       
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
    AccountPage,
    LoginPage,
    EntryPage,
    SelectPage,
    TabsPage,
    CulturePage, 
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
    ServiceCemeteryPage,
    Welcome1Page,
    Welcome2Page,
    Welcome3Page,
    Home1Page,
    Planning1Page,
    Planning2Page,
    Search1Page,
    EventInfoOnePage,
    EventMainPage,
    Search2Page,
    EventsPage,
    EventMainPage2,
    EventMainPage3, 
    CareModalPage,
    EventMainPage3,
    CareRegistryListPage,
    CareRegistryAddItemPage,
    CareRegistryFirstTimeModalPage,
    CareRegistryItemDetailsPage,
     DatePicker,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    Calendar,
    SocialSharing, 
    DatePickerModule
  ]
})
export class AppModule { }
