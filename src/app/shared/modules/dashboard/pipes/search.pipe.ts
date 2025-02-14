import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  
  transform(ProductArray:any[],searchString:string): any {
    if(!ProductArray || !searchString){
      return ProductArray
    }
    else{
      return ProductArray.filter((i:any)=>i.brand.trim().
    toLowerCase().includes(searchString.trim().toLowerCase()))
    }
  }

}
