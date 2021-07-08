import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems;
  totalAmount;
  isLoggedIn = this.authService.isLoggedIn();

  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.totalAmount = this.cartService.getTotalPrice();
  }

  removeFromCart(id: number) {
    this.cartService.removeProductFromCart(id);
  }

  emptyCart() {
    // this.cartService.cleanCart();
    this.cartItems = [];
    this.totalAmount = 0;
  }

  onDiscountapplied() {
    this.totalAmount = this.totalAmount / 10;
  }
}
