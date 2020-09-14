import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
// import { ProductsController } from './../src/product/product.controller';
import { ProductModule } from './../src/product/product.module';
import CreateProductDTO from './../src/product/dto/product.dto';
// import CreateProductDTO from './../src/product/dto/product.dto';
import 'dotenv/config';

export const app = `http://localhost:${process.env.PORT}/api`;

export const database = process.env.MONGO_URI;

let sellerToken: string;
// let productSeller: CreateProductDTO = {
  // seller: true,
  // username: 'productSeller',
  // password: 'password',
// };
beforeAll(async () => {
  await mongoose.connect(database);
  await mongoose.connection.db.dropDatabase();

  const {
    data: { token },
  } = await axios.post(`${app}/auth/register`);

  sellerToken = token;
});

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
        .set('Authorization', `Bearer ${sellerToken}`)
        .set('Accept', 'application/json')
        .send(product)
        .expect(200)
        .expect('{"message":"received"}');
    });
  });
});
