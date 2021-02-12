import { Component } from '@angular/core';
import { IonicPage, MenuController, NavController } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage() // indica que esssa classe é uma página e ela poderá ser referenciada entre aspas
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  credenciais : CredenciaisDTO = {
    email: '',
    senha: ''
  };

  constructor(public navCtrl: NavController, public menu: MenuController, public auth: AuthService) {

  }
  
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  ionViewDidEnter() {
    this.auth.refreshToken().subscribe(
      response => { 
        this.auth.successfulLogin(response.headers.get('Authorization')); 
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
    );
  }
  
  login() {
    this.auth.authenticate(this.credenciais).subscribe(
      response => { 
        this.auth.successfulLogin(response.headers.get('Authorization')); 
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {}
    );
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

}
