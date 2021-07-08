import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from 'src/app/model/book.model';
import { AuthService } from 'src/app/service/auth.service';
import { BookService } from 'src/app/service/book.service';
import { Comment } from 'src/app/model/comment.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
  providers: [BookService],
})
export class BookDetailsComponent implements OnInit {
  books: BookModel[];
  id: number;
  sub: any;
  bookIdSnapshot: number;
  comments: Comment[] = [];
  username = this.authService.getUserName();
  book: BookModel;

  commentFC = new FormControl('', Validators.maxLength(150));

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private authService: AuthService
  ) {
    bookService.getAllBooks().subscribe((data) => {
      this.books = data;
    });
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['bookId'];
    });
  }

  deleteBook(bookId) {
    bookId = this.id;
    this.bookService.deleteBook(bookId);

    const index: number = this.books.indexOf(bookId);
    this.books.splice(index, 1);

    this.router.navigateByUrl('/');
  }

  getBookById() {
    this.bookService.getBook(this.id).subscribe((data) => {
      this.book = data;
    });
  }

  onCommentChange() {
    console.log(this.commentFC.value);
  }

  onAddComment() {
    this.comments.push(this.commentFC.value);
  }
}
