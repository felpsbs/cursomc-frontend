import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public service: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    // pegando o parâmtro passado na navegação
    let categoriaId = this.navParams.get('categoriaId');
    let loader = this.presentLoaging();
    this.service.findByCategoria(categoriaId).subscribe(
      response => { 
        this.items = response['content'];
        loader.dismiss();
        this.loadImageUrls();
      },
      error => {
        loader.dismiss();
      }
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

  showDetail(produtoId: string) {
    this.navCtrl.push('ProdutoDetailPage', { produtoId });
  }

  presentLoaging() {
    let loader = this.loadingCtrl.create({
      content: 'Aguarde...',
      // duration: 3000 vamos controlar a duração manualmente
    });

    loader.present();
    return loader; // vamos controlar a duração manualmente
  }

}
