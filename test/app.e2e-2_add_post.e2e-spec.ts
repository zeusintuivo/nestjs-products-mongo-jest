import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProductModule } from './../src/product/product.module';
import CreateProductDTO from './../src/product/dto/product.dto';
import 'dotenv/config';

let productId: string;

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
        .get('/')
        .expect(200)
        .expect('Hello World!');
    });
  });
  describe('ProductController', () => {
    it('/ping (POST)', () => {
      return request(app.getHttpServer())
        .post('/product/ping')
        .expect(200)
        .expect('{"message":"received"}');
    });
    it('/create (POST)', () => {

      const product: CreateProductDTO = {
        name: "laptop",
        description: "Dell Laptop",
        imageURL: "http:localhost/product_image.png",
        price: 1000,
        createdAt: new Date()
      };
      return request(app.getHttpServer())
        .post('/product/create')
        .send(product)
        .expect(200)
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
        // .expect(HttpStatus.OK);
        .expect(HttpStatus.CREATED);
    });
  });
});
