import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Result } from '../home/home';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  film:Result;
  url:string;
  browser:InAppBrowser;

  constructor(public navCtrl: NavController, public navParams: NavParams, public iab: InAppBrowser) {
    this.film=navParams.data;
    this.url = 'https://www.themoviedb.org/movie/' + this.film.id;
    this.browser=iab;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  lien(){
    this.iab.create(this.url,'_system');
  }

}
