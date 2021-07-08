import { Pipe, PipeTransform } from '@angular/core';
import { BookModel } from '../model/book.model';

@Pipe({
  name: 'selectedBook',
})
export class SelectedBookPipe implements PipeTransform {
  transform(allBooks: BookModel[], id: number): any {
    return allBooks.filter((p) => p.bookId === id);
  }
}
