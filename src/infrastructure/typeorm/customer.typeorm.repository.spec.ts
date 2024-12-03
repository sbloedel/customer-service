import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmCustomerRepository } from './customer.typeorm.repository';
import { CustomerEntity } from './customer.entity';
import { Customer } from 'src/domain/entities/customer.entity';

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
      ],
    }).compile();

    repository = module.get<TypeOrmCustomerRepository>(
      TypeOrmCustomerRepository,
    );
    mockRepository = module.get<Repository<CustomerEntity>>(
      getRepositoryToken(CustomerEntity),
    );
  });

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
