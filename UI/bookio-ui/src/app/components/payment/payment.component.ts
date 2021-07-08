import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/service/cart.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  handler: any = null;
  totalAmount = this.cartService.getTotalPrice();
  cart = this.cartService.getCartItems().length;
  private token;

  constructor(
    private cartService: CartService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStripe();
  }

  pay() {
    var handler = (<any>window).StripeCheckout.configure({
      key: environment.stripe_key,
      locale: 'auto',
      token: function (token: any) {
        console.log(token);
        this.token = token;
        this.router.navigateByUrl('/');
      },
    });

    handler.open({
      name: 'Bookio Checkout',
      description: this.cart,
      amount: this.totalAmount * 100,
    });
  }

  loadStripe() {
    if (!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement('script');
      s.id = 'stripe-script';
      s.type = 'text/javascript';
      s.src = 'https://checkout.stripe.com/checkout.js';
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: environment.stripe_key,
          locale: 'auto',
          token: function (token: any) {
            console.log(token);
            this.toastr.success('Payment Successful');
          },
        });
      };

      window.document.body.appendChild(s);
    }
  }
}
