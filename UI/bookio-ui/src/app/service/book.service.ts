import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BookModel } from '../model/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Array<BookModel>> {
    return this.http.get<Array<BookModel>>('http://localhost:8080/api/books');
  }

  getBook(id: number): Observable<BookModel> {
    return this.http.get<BookModel>('http://localhost:8080/api/books/' + id);
  }

  addBook(book: BookModel): Observable<BookModel> {
    return this.http.post<BookModel>('http://localhost:8080/api/books', book);
  }

  deleteBook(bookId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/api/books/${bookId}`);
  }
}
