import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProtutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProtutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public service: ProdutoService) {
  }

  ionViewDidLoad() {
    // pegando o parâmtro passado na navegação
    let categoriaId = this.navParams.get('categoriaId');
    this.service.findByCategoria(categoriaId).subscribe(
      response => { this.items = response['content'] },
      error => {}
    );
  }

}
