import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
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
      response => { 
        this.items = response['content'];
        this.loadImageUrls();
      },
      error => {}
    );
  }

  loadImageUrls() {
    this.items.forEach(item => {
      this.service.getSmallImageFromBucket(item.id).subscribe(
        response => { 
          item.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {}
      );
    });
  }

  showDetail() {
    this.navCtrl.push('ProdutoDetailPage');
  }

}
