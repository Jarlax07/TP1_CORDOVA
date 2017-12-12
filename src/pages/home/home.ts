import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { api_key } from '../../app/tmdb';
import { AlertController } from 'ionic-angular';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { Shake } from '@ionic-native/shake';
import { Subscription } from 'rxjs/Subscription';

export interface Result {
  title: string;
  overview:string;
  poster_path:string;
  backdrop_path:string;
  release_date:number;
  id:number;

}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  films:Observable<Result[]>;
  params:any;
  pushPage=DetailsPage;




  constructor(private http: HttpClient, public alertCtrl: AlertController, public navCtrl: NavController, private shake : Shake, private shakeSubscription : Subscription ) {
    this.films=null;


  }

  ionViewDidEnter() {
    this.shakeSubscription = this.shake.startWatch()
      .switchMap(() => this.discoverMovies())
      .subscribe(movies => this.showRandomMovieAlert(movies));
  }

  ionViewWillLeave(){
    this.shakeSubscription.unsubscribe();
  }

  getFilms(ev:any){

    let val =ev.target.value;

    if(val){
      this.films=this.fetchResults(val);
    }else{
      this.films=Observable.of([]);
    }

  }


  fetchResults(query : string):Observable<Result[]>{

    return  this.http.get<Result[]>("https://api.themoviedb.org/3/search/movie?api_key="+api_key+"&language=fr-FR&query="+query).pluck('results');
  }

  private discoverMovies():Observable<Result[]>{
    return this.http.get<Result[]>("https://api.themoviedb.org/3/discover/movie?api_key="+api_key+"&language=fr-FR&primary_release_year=2018").pluck('results');

  }

  private showRandomMovieAlert(movies: Result[]): void{
    let i = Math.floor(Math.random() * movies.length);

    let confirm = this.alertCtrl.create({
      title: movies[i].title,
      message: movies[i].overview,
      buttons: [
        {
          text: 'Annuler'
        },
        {
          text: 'Details',
          handler: () => {
            this.navCtrl.push(DetailsPage, movies[i]);
          }
        }
      ]
    });
    confirm.present();
  }


}
