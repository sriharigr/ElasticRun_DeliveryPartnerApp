import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }
  loggedInUserId: any = 'rohan_13123';
  get(orderId: any) {
   return this.http.get(`http://192.168.43.230:5051/api/order?delivery_partner_id=${this.loggedInUserId}&orderId=${orderId}`);
  }

  update(orderId: any, status) {
    return this.http.put(`http://192.168.43.230:5051/api/order?orderId=${orderId}`, {status});
   }
}
