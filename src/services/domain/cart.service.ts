import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProtutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : Cart {
        let cart: Cart = { items: [] };
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if(cart == null) {
            cart = this.createOrClearCart();
        }

        return cart;
    }

    addProduto(produto: ProtutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.produto.id == produto.id);
        if(position == -1) {
            cart.items.push({ quantidade: 1, produto });
        }

        this.storage.setCart(cart);
        return cart;
    }

}