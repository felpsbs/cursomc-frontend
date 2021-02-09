import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage() // para o lazy loading
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public service: CategoriaService) {
  }

  ionViewDidLoad() {
    // para a chamada assíncrona
    this.service.findAll().subscribe(
      response => { console.log(response) },
      error => { console.log(error) }
    );
  }

}
