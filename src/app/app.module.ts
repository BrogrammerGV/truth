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
import { Welcome1Page } from '../pages/Welcome/welcome1/welcome1';
import { Welcome2Page } from '../pages/Welcome/welcome2/welcome2';
import { Welcome3Page } from '../pages/Welcome/welcome3/welcome3';
import { Home1Page } from '../pages/Home/home1/home1';
import { Planning1Page } from '../pages/Home/planning1/planning1';
import { Planning2Page } from '../pages/Home/planning2/planning2';
import { Search1Page } from '../pages/Home/search1/search1';

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
    Welcome1Page,
    Welcome2Page,
    Welcome3Page,
    Home1Page,
    Planning1Page,
    Planning2Page,
    Search1Page
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
        { component: ConfirmPage, name: 'ConfirmPage', segment: 'confirm' }
        
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
    Welcome1Page,
    Welcome2Page,
    Welcome3Page,
    Home1Page,
    Planning1Page,
    Planning2Page,
    Search1Page
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
