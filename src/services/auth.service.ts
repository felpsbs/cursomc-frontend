import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { CartService } from "./domain/cart.service";
import { StorageService } from "./storage.service";

@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(
        public http : HttpClient, 
        public storage : StorageService,
        public cartService: CartService) {
    }

    authenticate(credenciais : CredenciaisDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/login`, 
            credenciais, 
            {
                observe: 'response',
                responseType: 'json'
            }
        );
    }

    refreshToken() {
        return this.http.post(
            `${API_CONFIG.baseUrl}/auth/refresh-token`, 
            {}, 
            {
                observe: 'response',
                responseType: 'text' // para não ocorrer um parse para json, já que é um noContent
            }
        );
    }

    successfulLogin(authValue : string) {
        let token = authValue.substring(7);
        let user : LocalUser = {
            token,
            email: this.jwtHelper.decodeToken(token).sub
        };

        this.storage.setLocalUser(user);
        this.cartService.createOrClearCart();
    }

    logout() {
        this.storage.setLocalUser(null);
    }

}