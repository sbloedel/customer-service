import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customer } from '../../domain/entities/customer.entity';
import { CustomerService } from '../../application/customer/customer.service';
import { NotFoundException } from '@nestjs/common';
import { WinstonLoggerService } from '../../core/logger/winston-logger.service';

describe('CustomerController', () => {
  let customerController: CustomerController;
  let customerService: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerController],
      providers: [
        {
          provide: CustomerService,
          useValue: {
            createCustomer: jest.fn(),
            getCustomerById: jest.fn(),
          },
        },
        WinstonLoggerService,
      ],
    }).compile();

    customerController = module.get<CustomerController>(CustomerController);
    customerService = module.get<CustomerService>(CustomerService);
  });

  describe('createCustomer', () => {
    it('should create a new customer', async () => {
      const createCustomerDto: CreateCustomerDto = {
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        emailAddress: 'john.doe@example.com',
        phoneNumber: '1234567890',
      };

      const mockCustomer: Customer = {
        id: '1',
        ...createCustomerDto,
      };

      jest
        .spyOn(customerService, 'createCustomer')
        .mockResolvedValue(mockCustomer);

      const result = await customerController.createCustomer(createCustomerDto);

      expect(result).toBe(mockCustomer);
    });
  });

  describe('getCustomerById', () => {
    it('should return a customer if found', async () => {
      const customer: Customer = {
        id: '1',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        emailAddress: 'john.doe@example.com',
        phoneNumber: '1234567890',
      };

      jest
        .spyOn(customerService, 'getCustomerById')
        .mockResolvedValue(customer);

      expect(await customerController.getCustomerById({ id: '1' })).toBe(
        customer,
      );
    });

    it('should throw a NotFoundException if customer is not found', async () => {
      jest
        .spyOn(customerService, 'getCustomerById')
        .mockRejectedValue(new NotFoundException());

      await expect(
        customerController.getCustomerById({ id: '1' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  //TODO: Add tests for updateCustomer method and other controller methods
});
