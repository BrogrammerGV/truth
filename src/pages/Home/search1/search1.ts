import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AboutPage } from '../../about/about';
import { MapPage } from '../../map/map';
import { EntryPage } from '../../entry/entry';
import { SelectPage } from '../../select/select';
/**
 * Generated class for the Search1Page page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

declare let lambda: any;
@IonicPage()
@Component({
  selector: 'page-search1',
  templateUrl: 'search1.html',
})
export class Search1Page {
  public searchText: string = "";
  public searchResults: string[] = [];
  public searched: boolean = false;
  public noResults: boolean = false;
  // set the root pages for each tab
  tab2Root: any = Search1Page;
  tab4Root: any = AboutPage;
  mySelectedIndex: number;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Search1Page');
    var initialSearch = this.navParams.get("search");
    if(initialSearch){
      if(initialSearch != ""){
        this.searchText = initialSearch;
        this.doSearch();
      }
    }
  }

  doSearch(){
    this.searched = true;
    lambda("PostScriptSearch",{queryText: this.searchText
    }).then(function(data: any){
      //console.log(this);
      this.addSearchResult(data);
    }.bind(this));
  }

  addSearchResult(ref: any){
    this.searchResults = [];
    var x = JSON.parse(ref.Payload).Items;

    for (var i = 0; i < x.length; i++) {
      console.log(x[i]);
      this.searchResults.push(x[i]);
    }
  
    this.noResults = !x.length;
  }

  openEvent(item: any){
    console.log(item);
  }
}
