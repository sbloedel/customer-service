import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, VersioningType } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateCustomerDto } from '../src/api/dtos/create-customer.dto';

//TODO: I got stuck on this one.  I couldn't figure out how to truncate the db tables between tests
//TODO: Need to consider a few error cases here (ie bad requests, not found errors, etc)
describe('CustomerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
    });
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('should create a customer', async () => {
    const createCustomerDto: CreateCustomerDto = {
      firstName: 'John',
      middleName: 'Doe',
      lastName: 'Smith',
      emailAddress: 'john.doe@example.com',
      phoneNumber: '5036551212',
    };

    const response = await request(app.getHttpServer())
      .post('/v1/customers')
      .send(createCustomerDto)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        emailAddress: 'john.doe@example.com',
        phoneNumber: '+15036551212',
      }),
    );
  });

  it('should get customer by phone number', async () => {
    const phoneNumber = '5036551212';

    const response = await request(app.getHttpServer())
      .get(`/v1/customers?phoneNumber=${phoneNumber}`)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        emailAddress: 'john.doe@example.com',
        phoneNumber: '+15036551212',
      }),
    );
  });

  it('should update a customer', async () => {
    const updateCustomerDto: CreateCustomerDto = {
      firstName: 'John2',
      middleName: 'Doe2',
      lastName: 'Smith2',
      emailAddress: 'john.doe2@example.com',
      phoneNumber: '5036551213',
    };

    const fetchedData = await request(app.getHttpServer())
      .get(`/v1/customers?phoneNumber=5036551212`)
      .expect(200);

    const response = await request(app.getHttpServer())
      .put(`/v1/customers/${fetchedData.body.id}`)
      .send(updateCustomerDto)
      .expect(200);

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        firstName: 'John2',
        middleName: 'Doe2',
        lastName: 'Smith2',
        emailAddress: 'john.doe2@example.com',
        phoneNumber: '+15036551213',
      }),
    );
  });

  it('should delete a customer', async () => {
    const fetchedData = await request(app.getHttpServer())
      .get(`/v1/customers?phoneNumber=5036551213`)
      .expect(200);

    const response = await request(app.getHttpServer())
      .delete(`/v1/customers/${fetchedData.body.id}`)
      .expect(200);

    expect(response.status).toEqual(200);
  });
});
