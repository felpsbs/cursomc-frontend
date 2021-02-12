import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

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

            return Observable.throw(errorObj);
        }) as any;
    }

}

// Definindo o provider no mesmo arquivo
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};