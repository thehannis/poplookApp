import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, LoadingController } from '@ionic/angular';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {
  products = [];  
  currentPage = 1;

  constructor(private productService: ProductService, private loadingCtrl : LoadingController) { }

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts(event?: InfiniteScrollCustomEvent) {
    const loading = await  this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'bubbles'
    });
    await loading.present();
    
    this.productService.getTopRatedProducts().subscribe((res) => {
      loading.dismiss();
      this.products.push(...res.data);

      event?.target.complete();
      if (event) {
        event.target.disabled = res.total_pages === this.currentPage;
      }
      }
    )
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadProducts(event);
  }

}
