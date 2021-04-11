import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  selector: 'pm-products',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService],
})
export class ProdutListComponent implements OnInit {
  pageTitle: string = 'Product List';
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;

  private _listFilter: string = '';

  constructor(private productService: ProductService) {}

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value: string) {
    this._listFilter = value;
    console.log('in setter:', value);
    this.filteredProducts = this.performFilter(value);
  }

  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];

  colorOfProcutName: string = 'red';
  colors: string[] = ['red', 'blue', 'green', 'brown', 'black'];

  performFilter(filterBy: string): IProduct[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter((p) =>
      p.productName.toLowerCase().includes(filterBy)
    );
  }

  ngOnInit(): void {
    console.log('ProductListComponent onInit');
    this.products = this.productService.getProducts();
    this.filteredProducts = this.products;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
    let randomNumber = this.GetRandomNumber();
    console.log(randomNumber);
    this.colorOfProcutName = this.colors[randomNumber];
  }

  GetRandomNumber(): number {
    return Math.floor(Math.random() * 4);
  }
}
