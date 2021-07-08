import { Pipe, PipeTransform } from '@angular/core';
import { BookModel } from '../model/book.model';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  transform(Books: BookModel[], searchValue: string): BookModel[] {
    if (!Books || !searchValue) {
      return Books;
    }
    return Books.filter((book) =>
      book.title.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }
}
