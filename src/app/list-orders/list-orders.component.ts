import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.scss'],
})
export class ListOrdersComponent implements OnInit {

  listOfOrders: any = [];
  listOfCompletedOrders = [];
  listOfPendingOrders = [];

  constructor(private router: Router, private orderService: OrderService, private localNotifications: LocalNotifications) { }

  ngOnInit() {
    console.log('i am called');
    this.checkForOrders();
    // setInterval(() => {
    //   this.notifyUser();
    //   setTimeout(() => {
    //     this.checkForOrders();
    //   }, 3000);
    // }, 15000);
  }

  view(orderId: string) {
    this.router.navigate([`home/order/${orderId}`]);
  }

  checkForOrders() {
    this.orderService.get(null).subscribe((response: any) => {
      this.listOfOrders = response.data;
      this.listOfOrders.sort(this.compare);
    });
  }

  notifyUser() {
    this.localNotifications.schedule({
      id: 1,
      title: 'ElasticRun - DeliveryPartnerApp',
      text: 'Searching for New Orders to Deliver....',
    });
  }
   compare( a, b ) {
    if ( a.status > b.status ){
      return -1;
    }
    if ( a.status < b.status ){
      return 1;
    }
    return 0;
  }

}
