import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';

@IonicPage() // indica que esssa classe é uma página e ela poderá ser referenciada entre aspas
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public menu: MenuController) {

  }
  
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }
  
  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
