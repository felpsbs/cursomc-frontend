import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "../../config/api.config";
import { ProtutoDTO } from "../../models/produto.dto";

@Injectable()
export class ProdutoService {

    constructor(public http: HttpClient) {
    }

    findById(produtoId: string) {
        return this.http.get<ProtutoDTO>(`${API_CONFIG.baseUrl}/produtos/${produtoId}`);
    }

    findByCategoria(categoriaId: string) {
        return this.http.get(`${API_CONFIG.baseUrl}/produtos?categorias=${categoriaId}`);
    }

    getSmallImageFromBucket(id : string) : Observable<any> { 
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}-small.jpg`;
        return this.http.get(url, { responseType : 'blob' });
    }

    getImageFromBucket(id : string) : Observable<any> { 
        let url = `${API_CONFIG.bucketBaseUrl}/prod${id}.jpg`;
        return this.http.get(url, { responseType : 'blob' });
    }
}