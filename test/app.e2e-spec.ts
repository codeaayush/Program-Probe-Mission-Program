import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) without token returns 401', () => {
    return request(app.getHttpServer()).get('/').expect(401);
  });

  it('/auth/token (POST) returns JWT for valid credentials', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/token')
      .send({ username: 'admin', password: 'admin' })
      .expect(200);

    expect(res.body.accessToken).toBeDefined();
    expect(res.body.expiresIn).toBe(3600);
    expect(res.body.expiresAt).toBeDefined();
    expect(res.body.tokenType).toBe('Bearer');
  });

  it('/ (GET) with Bearer token returns hello', async () => {
    const tokenRes = await request(app.getHttpServer())
      .post('/auth/token')
      .send({ username: 'admin', password: 'admin' });

    return request(app.getHttpServer())
      .get('/')
      .set('Authorization', `Bearer ${tokenRes.body.accessToken}`)
      .expect(200)
      .expect('Hello World!');
  });

  afterEach(async () => {
    await app.close();
  });
});
