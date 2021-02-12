import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "../services/storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        let localUser = this.storage.getLocalUser();

        // para não colocar esse cabeçalho nas requisições para o bucket
        let baseUrlLength = API_CONFIG.baseUrl.length;
        let requsetToAPI = request.url.substring(0, baseUrlLength) == API_CONFIG.baseUrl;

        if(localUser && requsetToAPI) {
            // clonando a requisição e adicionando o token
            const authRequest = request.clone({headers: request.headers.set('Authorization', `Bearer ${localUser.token}`)});
            return next.handle(authRequest);       
        }

        return next.handle(request);       
    }

}

// Definindo o provider no mesmo arquivo
export const AuthInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};