import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from 'src/app/model/book.model';
import { BookService } from 'src/app/service/book.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  username: string;
  email: string = 'yourmail@mail.com';
  books: number = 5;

  constructor(private route: ActivatedRoute, private bookService: BookService) {
    this.username = this.route.snapshot.params.username;
  }

  ngOnInit(): void {}
}
