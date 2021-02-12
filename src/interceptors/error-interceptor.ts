import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertController } from "ionic-angular";
import { Observable } from "rxjs/Rx";
import { StorageService } from "../services/storage.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage : StorageService, public alertCtrl : AlertController) {
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
                case 401:
                    this.handle401();
                    break;
                case 403:
                    this.handle403();
                    break;
                default: 
                    this.handleDefaultError(errorObj);
            }

            // propagando o erro para o controlador que fez a requisição
            return Observable.throw(errorObj); 
        }) as any;
    }
    
    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha na autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK' },
            ]
        });
        alert.present();
    }

    handle403() {
        this.storage.setLocalUser(null);
    }

    handleDefaultError(errorObj) {
        let alert = this.alertCtrl.create({
            title: `Erro ${errorObj.status}: ${errorObj.error}`,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                { text: 'OK' },
            ]
        });
        alert.present();
    }

}

// Definindo o provider no mesmo arquivo
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};