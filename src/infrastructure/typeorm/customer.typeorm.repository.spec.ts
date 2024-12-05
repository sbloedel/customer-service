import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCustomerRepository } from './customer.typeorm.repository';
import { CustomerEntity } from './customer.entity';
import { Customer } from '../../domain/entities/customer.entity';
import { WinstonLoggerService } from '../../core/logger/winston-logger.service';

describe('TypeOrmCustomerRepository', () => {
  let repository: TypeOrmCustomerRepository;
  let mockRepository: Repository<CustomerEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeOrmCustomerRepository,
        {
          provide: getRepositoryToken(CustomerEntity),
          useClass: Repository<CustomerEntity>,
        },
        WinstonLoggerService,
      ],
    }).compile();

    repository = module.get<TypeOrmCustomerRepository>(
      TypeOrmCustomerRepository,
    );
    mockRepository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

  describe('save', () => {
    it('should save a customer', async () => {
      const customer = new Customer(
        'John',
        'Doe',
        'Smith',
        'john.doe@example.com',
        '1234567890',
      );
      const customerEntity = new CustomerEntity();
      customerEntity.firstName = customer.firstName;
      customerEntity.middleName = customer.middleName;
      customerEntity.lastName = customer.lastName;
      customerEntity.emailAddress = customer.emailAddress;
      customerEntity.phoneNumber = customer.phoneNumber;

      jest.spyOn(mockRepository, 'create').mockReturnValue(customerEntity);
      jest.spyOn(mockRepository, 'save').mockResolvedValue(customer);

      const result = await repository.save(customer);

      expect(result).toEqual(customer);
      expect(mockRepository.save).toHaveBeenCalledWith(customerEntity);
    });
  });

  describe('findById', () => {
    it('should return a customer if found', async () => {
      const customerEntity: CustomerEntity = {
        id: '1',
        firstName: 'John',
        middleName: 'Doe',
        lastName: 'Smith',
        emailAddress: 'john.doe@example.com',
        phoneNumber: '1234567890',
      };

      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(customerEntity);

      const result = await repository.findById('1');
      expect(result).toEqual(
        new Customer(
          customerEntity.firstName,
          customerEntity.middleName,
          customerEntity.lastName,
          customerEntity.emailAddress,
          customerEntity.phoneNumber,
          customerEntity.id,
        ),
      );
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });

    it('should return undefined if customer is not found', async () => {
      jest.spyOn(mockRepository, 'findOne').mockResolvedValue(undefined);

      const result = await repository.findById('1');
      expect(result).toBeUndefined();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: '1' },
      });
    });
  });

  //TODO: Add tests for findByPhoneNumber.  Skipped due to time constraints
});
