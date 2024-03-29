import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { ProdutoDTO } from "../../models/produto.dto";
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

    getTotal() {
        let cart = this.getCart();
        let sum = 0;
        cart.items.forEach(item => {
            sum += item.produto.preco * item.quantidade;
        });

        return sum;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.produto.id == produto.id);
        if(position == -1) {
            cart.items.push({ quantidade: 1, produto });
        }

        this.storage.setCart(cart);
        return cart;
    }

    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.produto.id == produto.id);
        if(position != -1) {
            cart.items.splice(position, 1);
        }

        this.storage.setCart(cart);
        return cart;
    }
    
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.produto.id == produto.id);
        if(position != -1) {
            cart.items[position].quantidade++; 
        }

        this.storage.setCart(cart);
        return cart;
    }

    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(item => item.produto.id == produto.id);
        if(position != -1) {
            cart.items[position].quantidade--; 
            if(cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto);
            }
        }

        this.storage.setCart(cart);
        return cart;
    }

}