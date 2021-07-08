import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { BookModel } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.css'],
})
export class AddBookDialogComponent implements OnInit {
  addBookForm: FormGroup;
  books: BookModel[];

  constructor(
    private bookService: BookService,
    private dialogRef: MatDialog,
    private bookDiarogRef: MatDialogRef<AddBookDialogComponent>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addBookForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      author: new FormControl('', Validators.required),
      publisher: new FormControl('', Validators.required),
      published: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(5)]),
      pages: new FormControl('', [Validators.required, Validators.min(10)]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(20),
        Validators.maxLength(250),
      ]),
      imageUrl: new FormControl('', Validators.required),
    });
    this.bookService.getAllBooks().subscribe(
      (data) => {
        this.books = data;
      },
      (error) => {
        throwError(error);
      }
    );
  }

  save() {
    this.bookDiarogRef.close(this.addBookForm.value);
    this.bookService.addBook(this.addBookForm.value);
  }

  close() {
    this.dialogRef.closeAll();
  }
}
