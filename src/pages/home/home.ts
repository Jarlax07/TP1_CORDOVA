import { Component } from '@angular/core';
import { DetailsPage } from '../details/details';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Result {
  title: string;
  overview:string;
  poster_path:string;
  backdrop_path:string;
  release_date:number;

}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  films:Observable<Result[]>;
  params:any;
  pushPage=DetailsPage;

  constructor(private http : HttpClient) {
    this.films=null;

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

    return  this.http.get<Result[]>("https://api.themoviedb.org/3/search/movie?api_key=ebb02613ce5a2ae58fde00f4db95a9c1&language=fr&query="+query).pluck('results');
  }

}
