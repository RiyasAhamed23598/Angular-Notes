import {TestBed} from "@angular/core/testing";
import {Item, StockInventoryService} from "./stock-inventory.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";

const cartItems: Item[] = [{ id: 12, name: 'dfdsfds', quantity: 10}];

describe('StockInventoryService', () => {
  let service: StockInventoryService;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StockInventoryService,
      ],
      imports: [HttpClientTestingModule]
    });

    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(StockInventoryService);
  });

  it ('should get cart items', () => {
    spyOn(httpClient, 'get').and.returnValue(of([...cartItems]));

    service.getCartItems().subscribe((result: Item[]) => {
        expect(result.length).toBe(1);
        expect(result).toEqual(cartItems);
      }
    )
  })
})
