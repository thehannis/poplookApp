import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getTopRatedProducts($page = 1): Observable<any> {
    return this.http.get(environment.baseUrl + '/product_list');
  } 

  getProductDetails($id)  {
    return this.http.get<any>(environment.baseUrl + '/product_info/'+$id);
  }
}
