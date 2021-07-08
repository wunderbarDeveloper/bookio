import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';
import { CartService } from 'src/app/service/cart.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: BookModel[] = [];
  searchValue: string;
  isLoggedIn: boolean = false;

  constructor(
    private bookService: BookService,
    private authService: AuthService,
    private cartService: CartService,
    private dialog: MatDialog
  ) {}

  openDialog() {
    let dialogRef = this.dialog.open(AddBookDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.bookService.addBook(result);
      console.log(result);
    });
  }

  public getBooks() {
    this.bookService.getAllBooks().subscribe((book) => {
      this.books = book;
    });
  }

  ngOnInit() {
    this.getBooks();
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  addToCart(book: BookModel) {
    this.cartService.addToCart(book);
  }
}
