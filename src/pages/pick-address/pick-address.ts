import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { ItemPedidoDTO } from '../../models/item-pedido.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage.service';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  items: EnderecoDTO[];
  pedido: PedidoDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clientService: ClienteService,
    public cartService: CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.email) {
      this.clientService.findByEmail(localUser.email).subscribe(
        response => { 
          this.items = response['enderecos']; 

          this.pedido = {
            cliente: { id: response['id'] },
            enderecoDeEntrega: null,
            pagamento: null,
            itens: this.getItens()
          }
        },
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage');
          }
        }
      )
    } else {
      this.navCtrl.setRoot('HomePage');
    }
  }

  nextPage(endereco: EnderecoDTO) {
    this.pedido.enderecoDeEntrega = { id: endereco.id };
    this.navCtrl.push('PaymentPage', { pedido: this.pedido });
  }

  private getItens() : ItemPedidoDTO[] {
    let cart = this.cartService.getCart();
    return cart.items.map(item => {
      return { 
        quantidade: item.quantidade,
        produto: { id: item.produto.id }
      }
    });
  }

}
