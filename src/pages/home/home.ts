import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

@IonicPage() // indica que esssa classe é uma página e ela poderá ser referenciada entre aspas
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
