import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProductModule } from './../src/product/product.module';
import CreateProductDTO from './../src/product/dto/product.dto';
import 'dotenv/config';

let productId: string;
const product: CreateProductDTO = {
  name: "laptop",
  description: "Dell Laptop",
  imageURL: "http:localhost/product_image.png",
  price: 1000,
  createdAt: new Date()
};

describe('(e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  describe('AppController', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/').expect(HttpStatus.OK)
        .expect('Products API .. TODO SWAGGER');
    });
  });
  describe('ProductController', () => {
    it('/notfound (GET)', () => request(app.getHttpServer()).get('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (POST)', () => request(app.getHttpServer()).post('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (PUT)', () => request(app.getHttpServer()).put('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (PATCH)', () => request(app.getHttpServer()).patch('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/notfound (DELETE)', () => request(app.getHttpServer()).delete('/notfound').expect(HttpStatus.NOT_FOUND));
    it('/ping (POST)', () => {
      return request(app.getHttpServer())
        .post('/product/ping').expect(HttpStatus.OK)
        .expect('{"message":"received"}');
    });

    it('/.../create (POST)', () => {
      return request(app.getHttpServer())
        .post('/product/create')
        .send(product).expect(HttpStatus.CREATED)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.product).toBeDefined();
          expect(body.product._id).toBeDefined();
          productId = body.product._id;
          expect(body.product.name).toEqual(product.name);
          expect(body.product.description).toEqual(product.description);
          expect(body.product.price).toEqual(product.price);
          expect(body.product.createdAt).toBeDefined();
        })
    });
    it('/.../all (POST)', () => {
      return request(app.getHttpServer())
        .post('/product/all')
        .expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.products).toBeDefined();
          // console.log(res.body.products);
          const products: any = body.products;
          expect(products[0]._id).toBeDefined();
          productId = products[0]._id;
          expect(products[0].name).toBeDefined();
          expect(products[0].description).toBeDefined();
          expect(products[0].price).toBeDefined();
          expect(products[0].createdAt).toBeDefined();
        })
    });
    it('/.../all (GET)', () => {
      return request(app.getHttpServer())
        .get('/product/all')
        .expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          // console.log(res.text);
          expect(res.text).toBeDefined();
          // console.log(res.body);
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.products).toBeDefined();
          // console.log(res.body.products);
          const products: any = body.products;
          expect(products[0]._id).toBeDefined();
          productId = products[0]._id;
          expect(products[0].name).toBeDefined();
          expect(products[0].description).toBeDefined();
          expect(products[0].price).toBeDefined();
          expect(products[0].createdAt).toBeDefined();
        })
    });
    it('/.../:productID not found (GET)', () =>
      request(app.getHttpServer()).get('/product/5ca76cffc2b185489f4bd123').expect(HttpStatus.NOT_FOUND));
    it('/.../:productID (GET)', () => {
      // console.log(productId);
      return request(app.getHttpServer())
        .get('/product/' + productId ).expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.product).toBeDefined();
          expect(body.product._id).toBeDefined();
          productId = body.product._id;
          expect(body.product.name).toBeDefined();
          expect(body.product.description).toBeDefined();
          expect(body.product.price).toBeDefined();
          expect(body.product.createdAt).toBeDefined();
        })
    });
    it('/.../:productID not found (POST)', () =>
      request(app.getHttpServer()).post('/product/5ca76cffc2b185489f4bd123').expect(HttpStatus.NOT_FOUND));
    it('/.../:productID (POST)', () => {
      // console.log(productId);
      return request(app.getHttpServer())
        .post('/product/' + productId ).expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.product).toBeDefined();
          expect(body.product._id).toBeDefined();
          productId = body.product._id;
          expect(body.product.name).toBeDefined();
          expect(body.product.description).toBeDefined();
          expect(body.product.price).toBeDefined();
          expect(body.product.createdAt).toBeDefined();
        })
    });
    it('/.../:productID (DELETE)', () => {
      // console.log(productId);
      return request(app.getHttpServer())
        .delete('/product/' + productId ).expect(HttpStatus.FOUND)
        .expect((res) => {
          expect(res.headers).toBeDefined();
          expect(res.text).toBeDefined();
          expect(res.body).toBeDefined();
          const body: any = JSON.parse(res.text);
          expect(body).toBeDefined();
          expect(body.product).toBeDefined();
          expect(body.product._id).toBeDefined();
          productId = body.product._id;
          expect(body.product.name).toBeDefined();
          expect(body.product.description).toBeDefined();
          expect(body.product.price).toBeDefined();
          expect(body.product.createdAt).toBeDefined();
        })
    }); // it
    it('/.../:productID not found (DELETE)', () =>
      request(app.getHttpServer()).delete('/product/' + productId).expect(HttpStatus.NOT_FOUND));
    // it('/.../create again (POST)', () => {
    //   return request(app.getHttpServer())
    //     .post('/product/create')
    //     .send(product).expect(HttpStatus.CREATED)
    //     .expect((res) => {
    //       expect(res.text).toBeDefined();
    //       const body: any = JSON.parse(res.text);
    //       expect(body).toBeDefined();
    //       expect(body.product).toBeDefined();
    //       expect(body.product._id).toBeDefined();
    //       productId = body.product._id;
    //     })
    // }); // it
    // it('/.../:productID again (DELETE)', () => {
    //   console.log(productId);
    //   return request(app.getHttpServer())
    //     .delete('/product/delete?productID=' + productId )
    //     .expect(HttpStatus.FOUND)
    //     .expect((res) => {
    //       expect(res.headers).toBeDefined();
    //       expect(res.text).toBeDefined();
    //       expect(res.body).toBeDefined();
    //       const body: any = JSON.parse(res.text);
    //       expect(body).toBeDefined();
    //       expect(body.product).toBeDefined();
    //       expect(body.product._id).toBeDefined();
    //       productId = body.product._id;
    //       expect(body.product.name).toBeDefined();
    //       expect(body.product.description).toBeDefined();
    //       expect(body.product.price).toBeDefined();
    //       expect(body.product.createdAt).toBeDefined();
    //     })
    // }); // it
    // it('/.../:productID again not found (DELETE)', () =>
    //   request(app.getHttpServer()).delete('/product/delete/?productID=' + productId).expect(HttpStatus.NOT_FOUND));

  });
});
