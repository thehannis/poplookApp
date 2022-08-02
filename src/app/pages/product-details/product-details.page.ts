import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import SwiperCore, { Pagination } from 'swiper';
import { TouchSequence } from 'selenium-webdriver';

SwiperCore.use([Pagination]);
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailsPage implements OnInit, AfterContentChecked {

  product = null;
  images = [];
  description = null;
  price = null;
  colors = null;
  
  @ViewChild('swiper') swiper: SwiperComponent;

  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 10,
    pagination: true
  };

  constructor(private route: ActivatedRoute, private productService: ProductService) { }
  
  ngAfterContentChecked() {
    if(this.swiper) {
      this.swiper.updateSwiper({});
    };
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.getProductDetails(id).subscribe(res => {
      this.product = res.data;
      this.images = this.product.image_url;
      this.description = this.product.description.replace(/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, ' ');
      this.price = this.product.price;
      this.colors = this.product.color_related;
    })
  }

  swiperSlideChanged(e) {
  }

}
