import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body } from '@nestjs/common';
import CreateProductDTO from '../product/dto/product.dto';

import { ProductService } from '../product/product.service';


@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {

  }
  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO)  {
    // console.log(createProductDTO);
    const product = await this.productService.createProduct(createProductDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'received',
      product: product
    })
  }
  @Post('/ping')
  pingPost(@Res() res)  {
    return res.status(HttpStatus.OK).json({
      message: 'received'
    })
  }
}
