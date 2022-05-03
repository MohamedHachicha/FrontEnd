import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'UserSearchPipe', pure: false })
export class UserSearchPipe implements PipeTransform {
  transform(value, args?): Array<any> {
    let searchText = new RegExp(args, 'ig');
    if (value) {
      return value.filter(p => {
        if (p.sinisterType) {
          return p.sinisterType.search(searchText) !== -1;
        }
        else{
          return p.declarationDate.search(searchText) !== -1;
        }
        
      });
    }
  }
}