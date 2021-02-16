import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { ProtutoDTO } from '../../models/produto.dto'
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  item: ProtutoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let produtoId = this.navParams.get('produtoId');
    this.produtoService.findById(produtoId).subscribe(
      response => { 
        this.item = response;
        this.getImageUrlIfExists(); 
      },
      error => {}
    );
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id).subscribe(
      response => {
        this.item.imgUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.item.id}.jpg`;
      },
      error => {}
    );
  }

}
