import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
        return next.handle(request)
        .catch((error, caught) => {

            let errorObj = error;
            if(errorObj.error) {
                errorObj = errorObj.error;
            }

            // verificando se a resposta é um json
            if(!errorObj.status) {
                errorObj.error = JSON.parse(errorObj);
            }

            console.log('Erro detectado pelo interceptor:');
            console.log(errorObj);

            switch (errorObj.status) {
                case 403:
                    this.handle403();
                    break;
            }

            // propagando o erro para o controlador que fez a requisição
            return Observable.throw(errorObj); 
        }) as any;
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

}

// Definindo o provider no mesmo arquivo
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};