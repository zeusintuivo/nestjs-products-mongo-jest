import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException } from '@nestjs/common';
import CreateProductDTO from '../product/dto/product.dto';

import { ProductService } from '../product/product.service';


@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {  }
  @Post('/ping')
  pingPost(@Res() res)  {
    return res.status(HttpStatus.OK).json({
      message: 'received'
    })
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

  @Get('/all')
  async allGet(@Res() res)  {
    const products = await this.productService.getProducts();
    if (!products) throw new NotFoundException();
    return res.status(HttpStatus.FOUND).json({
      products
    })
  }

  @Post('/all')
  async allPost(@Res() res)  {
    const products = await this.productService.getProducts();
    if (!products) throw new NotFoundException();
    return res.status(HttpStatus.FOUND).json({
      products
    })
  }

  @Get('/:productID')
  async productGet(@Res() res, @Param('productID') productID)  {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException(productID);
    return res.status(HttpStatus.FOUND).json({
      product
    })
  }

}
