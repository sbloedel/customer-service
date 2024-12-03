import { Test, TestingModule } from '@nestjs/testing';
import { CustomerService } from './customer.service';
import { CustomerRepository } from 'src/domain/repositories/customer.repository';
import { Customer } from 'src/domain/entities/customer.entity';
import * as uuid from 'uuid';
import { NotFoundException } from '@nestjs/common';

jest.mock('uuid');

describe('CustomerService', () => {
  let customerService: CustomerService;
  let customerRepository: CustomerRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomerService,
        {
          provide: 'CustomerRepository',
          useValue: {
            save: jest.fn(),
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    customerService = module.get<CustomerService>(CustomerService);
    customerRepository = module.get<CustomerRepository>('CustomerRepository');
  });

  beforeEach(() => {
    (uuid.v4 as jest.Mock).mockReturnValue('fixed-uuid');
  });

  describe('createCustomer', () => {
    it('should create and save a new customer', async () => {
      const firstName = 'John';
      const middleName = 'Doe';
      const lastName = 'Smith';
      const emailAddress = 'john.doe@example.com';
      const phoneNumber = '1234567890';

      const customer = new Customer(
        firstName,
        middleName,
        lastName,
        emailAddress,
        phoneNumber,
        'fixed-uuid',
      );

      jest.spyOn(customerRepository, 'save').mockResolvedValue(customer);

      const result = await customerService.createCustomer(
        firstName,
        middleName,
        lastName,
        emailAddress,
        phoneNumber,
      );

      expect(result).toEqual(customer);
      expect(customerRepository.save).toHaveBeenCalledWith(customer);
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

      jest.spyOn(customerRepository, 'findById').mockResolvedValue(customer);

      const result = await customerService.getCustomerById('1');
      expect(result).toEqual(customer);
      expect(customerRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should throw a NotFoundException if customer is not found', async () => {
      jest.spyOn(customerRepository, 'findById').mockResolvedValue(null);

      await expect(customerService.getCustomerById('1')).rejects.toThrow(
        NotFoundException,
      );
      expect(customerRepository.findById).toHaveBeenCalledWith('1');
    });
  });
});
