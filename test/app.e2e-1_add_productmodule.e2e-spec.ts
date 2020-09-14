import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { ProductModule } from './../src/product/product.module';

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
        .expect('Products API .. TODO SWAGGER');
    });
  });
  describe('ProductController', () => {
    it('/ping (POST)', () => {
      return request(app.getHttpServer())
        .post('/product/ping')
        .expect(200)
        .expect('{"message":"received"}');
    });
  });
});
