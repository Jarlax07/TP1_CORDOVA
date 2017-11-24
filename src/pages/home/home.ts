import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NgForOf } from '@angular/common/src/directives/ng_for_of';

export interface Result {
  author: string;
  date: number;
  image: string;
  title: string;
}

const fakeresult : Result[] = [{
  author:'Julien COURTIAL',
  date:2017,
  image:'http://lorempixel.com/200/200/',
  title:'L\'aventure d\'un major'
},{
  author: 'Vincente ALIBERT',
  date: 2017,
  image: 'http://lorempixel.com/200/200/',
  title: "L'aventure d'un footballeur"
}]

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  films:Result[];
  constructor(public navCtrl: NavController) {
    this.films=null;
  }

  initializeFilms(){
    this.films=fakeresult;
  }

  getFilms(ev:any){
    this.initializeFilms();

    let val =ev.target.value;

    if (val && val.trim() != '') {
      this.films = this.films.filter((film) => {
        return (film.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }else{
      this.films=null;
      return false;
    }
  }

  isNull(){
    return(this.films==null);
  }

}
