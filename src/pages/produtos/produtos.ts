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

  items : ProdutoDTO[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public service: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    // pegando o parâmtro passado na navegação
    let categoriaId = this.navParams.get('categoriaId');
    let loader = this.presentLoaging();
    this.service.findByCategoria(categoriaId, this.page, 10).subscribe(
      response => { 
        let start = this.items.length;
        this.items = this.items.concat(response['content']);
        let end = this.items.length - 1;
        loader.dismiss();
        this.loadImageUrls(start, end);
      },
      error => {
        loader.dismiss();
      }
    );
  }

  loadImageUrls(start: number, end: number) {
    for (let i = start; i <= end; i++) {
      let item = this.items[i];
      this.service.getSmallImageFromBucket(item.id).subscribe(
        response => { 
          item.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {}
      );
    }
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

  doRefresh(event) {
    this.page = 0;
    this.items = [];
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  doInfinite(event) {
    // sempre que bater no fundo da página e esse método for chamado
    this.page++;
    this.loadData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

}
