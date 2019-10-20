import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { ListOrdersComponent } from '../list-orders/list-orders.component';
import { OrderComponent } from '../order/order.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ListOrdersComponent
      },
      {
        path: 'order/:orderId',
        component: OrderComponent
      }
    ])
  ],
  declarations: [HomePage, ListOrdersComponent, OrderComponent]
})
export class HomePageModule {}
