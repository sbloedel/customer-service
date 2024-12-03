import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customer.controller';
import { CreateCustomerDto } from '../dtos/create-customer.dto';
import { Customer } from 'src/domain/entities/customer.entity';
import { CustomerService } from '../../application/customer/customer.service';

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
          },
        },
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
});
