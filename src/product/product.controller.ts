import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query, BadGatewayException  } from '@nestjs/common';
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

  @Post('/:productID')
  async productPost(@Res() res, @Param('productID') productID)  {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException(productID);
    return res.status(HttpStatus.FOUND).json({
      product
    })
  }

  @Put('/:productID')
  async productPut(@Res() res, @Param('productID') productID, @Body() createProductDTO: CreateProductDTO)  {
    const product = await this.productService.updateProduct(productID, createProductDTO);
    if (!product) throw new NotFoundException(productID);
    return res.status(HttpStatus.FOUND).json({
      product
    })
  }

  // TODO: Disabled using Query since it shows errror
  //       Cast to ObjectId failed for value "update" at path "_id" for model "Product"
  // @Put('/update')
  // async updatePut(@Res() res, @Query('productID') productID, @Body() createProductDTO: CreateProductDTO)  {
  //   const product = await this.productService.updateProduct(productID, createProductDTO);
  //   if (!product) throw new NotFoundException(productID);
  //   return res.status(HttpStatus.FOUND).json({
  //     product
  //   })
  // }

  @Delete('/:productID')
  async productDelete(@Res() res, @Param('productID') productID)  {
    const product = await this.productService.deleteProduct(productID);
    if (!product) throw new NotFoundException(productID);
    return res.status(HttpStatus.FOUND).json({
      product
    })
  }

  // TODO: Disabled using Query since it shows errror
  //       Cast to ObjectId failed for value "update" at path "_id" for model "Product"
  // @Delete('/delete')
  // async deleteDelete(@Res() res, @Query('productID') productID)  {
  //   // console.log(productID);
  //   if (!productID.match(/^[0-9a-fA-F]{24}$/)) {
  //     throw new BadGatewayException(productID);
  //   }
  //   const product = await this.productService.deleteProduct(productID);
  //   if (!product) throw new NotFoundException(productID);
  //   return res.status(HttpStatus.FOUND).json({
  //     product
  //   })
  // }

}
