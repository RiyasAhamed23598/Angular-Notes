import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {catchError, map, Observable} from "rxjs";

export interface Item {
  id: number,
  name: string,
  quantity: number
}

@Injectable()
export class StockInventoryService {
  constructor(private httpClient: HttpClient) {
  }

  getCartItems(): Observable<Item[]> {
    return this.httpClient.get('/api/cart').pipe(
      map((response: Object) => response as Item[]),
      catchError((error: any) => {throw(error.message)})
    )
  }
}
